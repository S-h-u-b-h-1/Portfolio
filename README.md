# Shubhaang Kataruka Portfolio

Professional portfolio and resume website for Shubhaang Kataruka, a 3rd-year B.Tech CS & AI student positioned as an AI Engineer + Data Systems Builder.

## Structure

```txt
portfolio/
  frontend/   React + Vite + TypeScript + Tailwind CSS
  backend/    Node.js + Express + TypeScript + Prisma
  assets/     Source photos, resume, logos, certificates, and project images
```

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router, Lucide React
- Backend: Node.js, Express, TypeScript, Prisma ORM
- Database: Neon PostgreSQL
- Deployment: Vercel for frontend, Render for backend
- Domain: Namecheap DNS connected to Vercel

## Features

- Premium responsive portfolio UI with dark/light mode
- Home, About, Projects, Experience, Skills, Achievements, Writing, Ask AI, and Contact pages
- Filterable project case studies with search
- Ask Shubhaang AI chat with verified portfolio context, Gemini/OpenAI-compatible provider support, and safe local fallback
- Contact form API with Prisma persistence
- Keyboard shortcuts, command palette, mobile menu, animated grid, and section progress
- SEO metadata, favicon placeholder, Open Graph placeholder, robots file, and resume placeholder

## Local Setup

Install dependencies from the repository root:

```bash
npm install
```

Create local environment files:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Generate the Prisma client:

```bash
npm run prisma:generate
```

Run both apps:

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`
- Health check: `http://localhost:5001/api/health`

## Environment

Frontend variables:

```txt
VITE_API_BASE_URL=http://localhost:5001
VITE_SITE_URL=
VITE_RESUME_URL=/resume/Shubhaang_Kataruka_Resume_PLACEHOLDER.html
```

Backend variables:

```txt
NODE_ENV=development
PORT=5001
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/DATABASE?sslmode=require
DIRECT_URL=postgresql://USER:PASSWORD@HOST.REGION.aws.neon.tech/DATABASE?sslmode=require
AI_PROVIDER=openai-compatible
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini

# Gemini native option:
# AI_PROVIDER=gemini
# AI_API_KEY=
# AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
# AI_MODEL=gemini-3.5-flash

# Optional backward-compatible aliases:
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash
```

Do not commit real `.env` files. Only `.env.example` files should be tracked.

## Backend API

- `GET /api/health`
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/portfolio`
- `POST /api/contact`
- `POST /api/chat`

`POST /api/contact` expects:

```json
{
  "name": "Sender name",
  "email": "sender@example.com",
  "company": "Optional company",
  "purpose": "Hiring / collaboration / project",
  "message": "A clear message with enough context."
}
```

## Deploy Frontend To Vercel

Use `frontend/` as the Vercel project root.

Recommended settings:

- Root directory: `frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://YOUR_RENDER_BACKEND_URL.onrender.com`
- Environment variable after domain setup: `VITE_SITE_URL=https://YOUR_DOMAIN`
- Environment variable after resume upload: `VITE_RESUME_URL=/resume/Shubhaang_Kataruka_Resume.pdf`

`frontend/vercel.json` includes SPA rewrites and long-lived caching for built assets.

## Deploy Backend To Render

This repository includes `render.yaml` for a Render web service configured with `backend` as the root directory.

Manual Render settings:

- Root directory: `backend`
- Build command: `npm install --include=dev && npm run build && npx prisma generate && npx prisma migrate deploy`
- Start command: `npm run start`
- Health check path: `/api/health`
- Runtime: Node 20+

Production environment variables:

- `NODE_ENV=production`
- `PORT=10000`
- `DATABASE_URL`: Neon pooled PostgreSQL connection string
- `DIRECT_URL`: Neon direct PostgreSQL connection string
- `FRONTEND_URL`: Vercel production URL or custom domain
- `CORS_ORIGIN`: Vercel preview/production domains and custom domain, comma-separated
- `AI_PROVIDER`: `local`, `openai-compatible`, or `gemini`
- `AI_API_KEY`: optional provider key. If missing, chat uses verified local fallback.
- `AI_BASE_URL`: provider base URL
- `AI_MODEL`: provider model name

For Gemini native mode, use:

```txt
AI_PROVIDER=gemini
AI_API_KEY=<GEMINI_API_KEY>
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
AI_MODEL=gemini-3.5-flash
```

For Gemini through OpenAI-compatible mode, use:

```txt
AI_PROVIDER=openai-compatible
AI_API_KEY=<GEMINI_API_KEY>
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
AI_MODEL=gemini-3.5-flash
```

The backend also supports `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_MODEL`, `GEMINI_API_KEY`, and `GEMINI_MODEL` aliases.

## Neon + Prisma

After creating a Neon database, set both database URLs in Render and locally.

Useful commands:

```bash
npm run prisma:generate
npm run prisma:deploy
npm run prisma:migrate --workspace backend
```

Use `prisma:migrate` only for local development migrations. Use `prisma:deploy` for Render production deploys.

From inside `backend/`, the equivalent commands are:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma migrate dev
```

No seed script is required right now because portfolio content is static JSON/TS data and the database stores contact/chat records created by users.

## GitHub Setup

Recommended first push flow after setting your actual GitHub repository URL:

```bash
git init
git add .
git commit -m "Initial commit: Shubhaang portfolio website"
git branch -M main
git remote add origin <MY_GITHUB_REPO_URL>
git push -u origin main
```

Before pushing, confirm no secret files are staged:

```bash
git status --short
git diff --cached --name-only
```

## Content And Assets

Editable content lives in:

- `frontend/src/data`
- `backend/src/data`
- `backend/src/data/knowledge-base.json`

Placeholder public assets live in:

- `frontend/public/favicon.svg`
- `frontend/public/og-image.svg`
- `frontend/public/resume/Shubhaang_Kataruka_Resume_PLACEHOLDER.html`

Before launch, replace placeholder contact fields, proof URLs, project screenshots, certificates, and the resume file with verified assets. The UI avoids fake social links by rendering missing links as unavailable.

## Namecheap Domain Setup

1. Buy the domain in Namecheap.
2. Open the Vercel project and add the custom domain in project settings.
3. Copy the DNS records Vercel provides.
4. In Namecheap, open Advanced DNS for the domain.
5. Add or update the Vercel DNS records.
6. Wait for DNS propagation.
7. Confirm the domain is verified in Vercel and HTTPS is active.

Use the final custom domain in:

- Vercel: `VITE_SITE_URL`
- Render: `FRONTEND_URL` and `CORS_ORIGIN`

## Troubleshooting

- Frontend cannot reach backend: confirm `VITE_API_BASE_URL` points to the Render backend root, for example `https://YOUR_RENDER_BACKEND_URL.onrender.com`.
- CORS error in browser: confirm Render has `FRONTEND_URL` and `CORS_ORIGIN` set to the Vercel/custom domain.
- Render TypeScript build cannot find Express/CORS/Node types: confirm the Render build command uses `npm install --include=dev`.
- Render build fails on Prisma: confirm `DATABASE_URL` and `DIRECT_URL` are valid Neon PostgreSQL URLs with `sslmode=require`.
- Contact form fails: check Render logs, Neon connection strings, and the `/api/health` endpoint.
- AI returns local fallback only: confirm Render has `AI_PROVIDER`, `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL` set for the provider you actually use. For Gemini native mode, `AI_BASE_URL` should be `https://generativelanguage.googleapis.com/v1beta`.
- Vercel routes show 404 on refresh: confirm `frontend/vercel.json` is included and the Vercel root directory is `frontend`.
- Resume button opens placeholder: replace the placeholder file and set `VITE_RESUME_URL=/resume/Shubhaang_Kataruka_Resume.pdf`.

## Final Testing Checklist

- Run `npm run check`
- Run frontend dev server with `npm run dev --workspace frontend`
- Run backend dev server with `npm run dev --workspace backend`
- Confirm `/api/health` returns `status: ok`
- Submit the contact form and confirm the message is stored in Neon
- Ask suggested AI questions and confirm unknown topics return the verified-information fallback
- Test project search, filters, and case study modals
- Test command palette, mobile menu, theme toggle, and keyboard shortcuts
- Check desktop, tablet, and mobile layouts
- Replace the resume placeholder with a verified PDF
- Replace social/contact placeholders with real links
- Confirm Vercel frontend can reach the Render backend through `VITE_API_BASE_URL`
- Confirm Render `CORS_ORIGIN` includes the Vercel production domain and custom domain
