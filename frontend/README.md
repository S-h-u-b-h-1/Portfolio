# Frontend

React + Vite + TypeScript frontend for the portfolio website.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
```

## Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Key variables:

- `VITE_API_BASE_URL`: Backend root URL. Use `http://localhost:5001` locally and the Render backend URL in production.
- `VITE_SITE_URL`: Public site URL after Vercel/custom-domain setup.
- `VITE_RESUME_URL`: Public resume path or CDN URL.

## Vercel Deployment

Use this folder as the Vercel project root.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Production API URL: `VITE_API_BASE_URL=https://YOUR_RENDER_BACKEND_URL.onrender.com`

The `vercel.json` file provides SPA routing and cache headers for built assets.

## Public Placeholders

- `public/favicon.svg`
- `public/og-image.svg`
- `public/resume/Shubhaang_Kataruka_Resume_PLACEHOLDER.html`

Replace the resume placeholder with a verified PDF before launch and update `VITE_RESUME_URL`.
