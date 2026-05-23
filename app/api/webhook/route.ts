import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    try {
      const updateUser = await db
        .update(user)
        .set({
          plan: "pro",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
        })
        .where(eq(user.id, userId!));

      if (!updateUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
