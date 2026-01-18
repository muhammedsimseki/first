# Shop MVP Monorepo

This repo contains a minimal e-commerce MVP built with Next.js (App Router), TypeScript, Tailwind, Postgres, and Prisma.

## Structure

- `apps/web`: Next.js storefront + admin.

## Requirements

- Node.js 20+
- Postgres 14+

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables and update as needed:
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

3. Run database migrations:
   ```bash
   cd apps/web
   npx prisma migrate dev
   ```

4. Seed demo data (10 products):
   ```bash
   npx prisma db seed
   ```

5. Start the dev server:
   ```bash
   npm run dev
   ```

## Admin access

- Visit `/admin` and enter the password from `ADMIN_PASSWORD` in your `.env`.
- Admin prices are entered in USD (e.g. `49.00`).

## Checkout flow

- Checkout collects name, phone, and address.
- Orders are created in Postgres with `pending` status.
- No payment processing in Phase 1.

## Smoke check

Run a basic smoke check to ensure files and environment variables are present:

```bash
npm run smoke-check
```

## Notes / defaults

- Cart is stored in `localStorage` (client-side only).
- Product images are stored as URL strings.
