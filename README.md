# NUTRIRICH

This repository now includes a complete React + Vite frontend build in [frontend](D:/NUTRIRICH/frontend) for the NUTRIRICH supplements storefront and Fitness Fort gym pages.

To run it locally after installing dependencies:

```bash
cd frontend
npm install
npm run dev
```

Use [frontend/.env.example](D:/NUTRIRICH/frontend/.env.example) to wire backend and Razorpay later.

## Deploying on Vercel

This repo is now configured for Vercel from the repository root with [vercel.json](D:/NUTRIRICH/vercel.json).

Vercel will:

- install dependencies from `frontend/`
- run the Vite production build from `frontend/`
- serve the built files from `frontend/dist`
- rewrite SPA routes like `/shop` and `/shop/:productId` to `index.html`

Set these project environment variables in Vercel before enabling live checkout or API calls:

- `VITE_API_URL`
- `VITE_RAZORPAY_KEY_ID`
