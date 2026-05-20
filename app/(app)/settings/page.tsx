import { createCheckoutSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isPro = session?.user.plan === 'pro'

    return (
      <div>
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        {!isPro && (
          <form action={createCheckoutSession}>
            <Button type="submit">Upgrade to Pro - $9/month</Button>
          </form>
        )}

        {isPro && (
          <p className="text-sm text-emerald-600 font-medium">
            ✓ You are on the Pro plan
          </p>
        )}
      </div>
    );
}