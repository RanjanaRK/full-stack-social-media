<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev

# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# Full-Stack Social Media web application with Next.js, Prisma, Neon PostgreSQL, and BetterAuth

A modern full-stack web application built with:

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **ORM**: Prisma + Accelerate
- **Database**: Neon PostgreSQL
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: better-auth + argon2
- **Forms**: react-hook-form + zod
- **UI Enhancements**: lucide-react, sonner, embla-carousel
- **Email**: nodemailer

---

## Features

- Secure auth with `better-auth` and `argon2`
- Schema validation with `zod` + `react-hook-form`
- Accessible UI via `shadcn/ui`
- Image optimization with `@imagekit/next`
- Email support via `nodemailer`

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

### 2. Install dependencies: bun install

### 3. Database Setup

This project uses PostgreSQL via Neon and Prisma ORM.

- Step 1: Create a Neon Database

- Step 2: Configure .env

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require"
```

- Step 3: Push Prisma Schema

```bun

bunx prisma db push
```

- Step 4 (Optional): Open Prisma Studio

```bun

bunx prisma studio

```

### 4. Configure environment variables:

Create a .env file based on .env.example and Update the values.

### 5. Start the development server:

```bash
bun dev
```

The app will be available at http://localhost:3000
