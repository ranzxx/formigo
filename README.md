<div align="center">

# formigo.

**Drop a feedback button into any website — in seconds.**

Formigo is a SaaS micro-tool that lets developers embed a fully functional feedback widget via a single script tag. Collect user feedback, get real-time notifications, and manage everything from a clean dashboard.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square)](https://orm.drizzle.team)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E699?style=flat-square)](https://neon.tech)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)
[![Pusher](https://img.shields.io/badge/Pusher-Realtime-300D4F?style=flat-square)](https://pusher.com)

🔗 **Live Demo**: [formigo-app.vercel.app](https://formigo-app.vercel.app)

</div>

---

## Screenshots

| Dashboard Page | Widget Preview |
|---|---|
| ![Dashboard Page](./public/screenshots/dashboard.avif) | ![Widget Preview](./public/screenshots/widget.avif) |

---

## What is Formigo?

Building a feedback system from scratch is tedious — forms, storage, notifications, rate limiting, plans. Formigo handles all of that so you don't have to.

Add this to your site:

```html
<script
  src="https://formigo-app.vercel.app/widget.js"
  data-project-id="YOUR_PROJECT_ID"
></script>
```

That's it. A feedback button appears. Responses go straight to your dashboard.

---

## Features

- **Embeddable widget** — One script tag, zero dependencies, works on any site
- **Real-time notifications** — Pro users get instant feedback alerts via Pusher
- **Project & domain management** — Scope feedback to specific domains, create multiple projects
- **Free & Pro plans** — Managed via Stripe with a feedback limit for Free tier (100/month per project)
- **Clean dashboard** — Stats overview and quick-start guide built in
- **Type-safe throughout** — Zod validation on all API inputs, Drizzle for fully typed queries

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | Neon (serverless PostgreSQL) |
| ORM | Drizzle ORM |
| Auth | Better Auth |
| Payments | Stripe |
| Real-time | Pusher |
| File uploads | UploadThing |
| UI | shadcn/ui + Tailwind CSS |
| Validation | Zod |

---

## Project Structure

```
formigo/
├── app/
│   ├── api/
│   │   ├── feedback/        # POST endpoint for widget submissions
│   │   └── stripe/          # Webhook handler
│   ├── dashboard/           # Protected dashboard pages
│   └── (auth)/              # Sign in / sign up
├── db/
│   ├── drizzle.ts           # Drizzle client with schema
│   └── schema.ts            # user, project, feedback tables
├── lib/
│   ├── auth.ts              # Better Auth config
│   ├── pusher.ts            # Pusher server client
│   └── stripe.ts            # Stripe client
└── public/
    └── widget.js            # Embeddable feedback widget
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/ranzxx/formigo.git
cd formigo
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the following:

```env
# DB
DATABASE_URL=

# BETTER AUTH
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Pusher
# SERVER SIDE
PUSHER_APP_ID = ""
PUSHER_SECRET = ""

# CLIENT SIDE
NEXT_PUBLIC_PUSHER_APP_KEY = ""
NEXT_PUBLIC_PUSHER_CLUSTER = ""

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=

# UploadThing
UPLOADTHING_TOKEN=

# Next URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Push the database schema

```bash
npx drizzle-kit push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How the Widget Works

The embedded `widget.js` script renders a floating button on the host site. When clicked, it opens a feedback form. On submit, it calls:

```
POST https://formigo-app.app/api/feedback
{ "projectId": "...", "message": "..." }
```

The API:
1. Validates the project exists
2. Checks domain allowlist (if configured)
3. Enforces the Free plan monthly limit (100 feedbacks/month)
4. Inserts the feedback into the database
5. Triggers a Pusher event for Pro plan users

---

## Plans

| | Free | Pro |
|---|---|---|
| Projects | Unlimited | Unlimited |
| Feedback limit | 100 / month per project | Unlimited |
| Real-time notifications | ✗ | ✓ |
| Priority support | ✗ | ✓ |

---

## License

MIT