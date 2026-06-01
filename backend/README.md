# Backend

Node.js + Express + TypeScript API for the portfolio website.

## Stack

- Express
- TypeScript
- Prisma ORM
- PostgreSQL / Neon
- CORS
- dotenv

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## API Routes

- `GET /api/health`
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/portfolio`
- `POST /api/chat`
- `POST /api/contact`

## Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set `DATABASE_URL` before running Prisma commands.

The local API defaults to `http://localhost:5001`. `GET /api/health` returns `{ "status": "ok" }`.

## Render Deployment

Manual service settings:

- Root directory: `backend`
- Build command: `npm install --include=dev && npm run build && npx prisma generate && npx prisma migrate deploy`
- Start command: `npm run start`
- Health check path: `/api/health`

Required production variables:

- `NODE_ENV=production`
- `PORT=10000`
- `DATABASE_URL`: Neon pooled connection string
- `DIRECT_URL`: Neon direct connection string for Prisma migrations
- `FRONTEND_URL`: Vercel frontend URL
- `CORS_ORIGIN`: Vercel frontend domains, comma-separated

Optional AI variables:

- `AI_PROVIDER`: `local`, `openai-compatible`, or `gemini`
- `AI_API_KEY`
- `AI_BASE_URL`
- `AI_MODEL`

Gemini native mode:

```env
AI_PROVIDER=gemini
AI_API_KEY=<GEMINI_API_KEY>
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
AI_MODEL=gemini-3.5-flash
```

Gemini OpenAI-compatible mode:

```env
AI_PROVIDER=openai-compatible
AI_API_KEY=<GEMINI_API_KEY>
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
AI_MODEL=gemini-3.5-flash
```

With no `AI_API_KEY`, the assistant still answers from the local knowledge base and refuses unverified topics.

## Prisma

Local development:

```bash
npm run prisma:migrate
```

Production deployment:

```bash
npm run prisma:deploy
```
