import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import { Resend } from 'resend'
import EmailVerification from "@/components/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME!} <onboarding@resend.dev>`,
        to: user.email,
        subject: "Verify your email",
        react: EmailVerification({ username: user.name, verificationUrl: url }),
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    additionalFields: {
      plan: {
        type: "string",
        defaultValue: "free",
      },
      stripeCustomerId: {
        type: "string",
        required: false,
      },
      stripeSubscriptionId: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [nextCookies()],
});
