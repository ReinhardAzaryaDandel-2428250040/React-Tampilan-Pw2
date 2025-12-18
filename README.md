Umazing Team (Vite + React + Tailwind + Framer Motion)

Quick start (pnpm):

```bash
pnpm create vite umazing-team --template react
cd umazing-team
pnpm install
pnpm install tailwindcss postcss autoprefixer framer-motion
npx tailwindcss init -p
# (ensure tailwind.config.js contains './index.html' and './src/**/*.{js,jsx}')
pnpm dev
```

Or when using the provided files in this folder:

```bash
# from c:/Users/user1/Downloads/Reinhard/React
pnpm install
pnpm dev
```

This scaffold includes:
- `src/components/Navbar.jsx`
- `src/sections/Home.jsx`
- `src/sections/Character.jsx`
- `src/sections/Predict.jsx`
- `src/App.jsx` and `src/main.jsx`

Character data is fetched from `https://uma-api-chi.vercel.app/`.
