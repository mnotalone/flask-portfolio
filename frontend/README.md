# Frontend (React + Vite + Tailwind)

This folder contains a standalone React frontend scaffolded to mirror the existing Flask portfolio content.

Quick start (requires Node.js >= 18 and npm):

1. Install dependencies

   npm install

2. Copy existing static assets used by the Flask project into the frontend public folder so the same relative paths work. From the repo root run (PowerShell):

   cp -Re static frontend\public\static

   Or manually copy `static/` into `frontend/public/static` so `/static/logo-bg1.png` and other local images are available in the frontend.

3. Run dev server:

   npm run dev

4. Build for production:

   npm run build

Notes / next steps:
- The app preserves content, layout, and the client-side behavior (theme toggle, smooth scroll offset, mobile menu). It uses Tailwind for styling.
- After verifying the frontend you can either host it standalone (Vercel/Netlify) or copy the `dist/` output into your Flask static folder and have Flask serve it.
- If you want I can: (a) finish migrating any remaining templates into React pages, (b) automate copying of static assets into `public/`, or (c) configure Flask to serve the React build automatically.
