# 🚀 Next.js Template (Example Project)

[![GitHub stars](https://img.shields.io/github/stars/luan-thnh/nextjs-exmaple?style=for-the-badge)](https://github.com/luan-thnh/nextjs-exmaple/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/luan-thnh/nextjs-exmaple?style=for-the-badge)](https://github.com/luan-thnh/nextjs-exmaple/network)
[![CI](https://img.shields.io/github/actions/workflow/status/luan-thnh/nextjs-exmaple/ci.yml?branch=main&style=for-the-badge)](https://github.com/luan-thnh/nextjs-exmaple/actions)
[![Issues](https://img.shields.io/github/issues/luan-thnh/nextjs-exmaple?style=for-the-badge)](https://github.com/luan-thnh/nextjs-exmaple/issues)
[![License](https://img.shields.io/badge/license-ADD%20LICENSE-lightgrey?style=for-the-badge)](#license)

A modern, production-ready Next.js template using the App Router, TypeScript, Tailwind, shadcn UI primitives and batteries-included tooling (pnpm, Husky, Commitlint, React Query, next-intl, Auth.js and more). Great as a starting point for admin dashboards and professional web apps.

---

## ✨ Key features

- Next.js (App Router) + TypeScript + Tailwind CSS
- UI built with shadcn-ui / Radix + component library pattern
- Authentication: Auth.js (NextAuth) integration (server-side route under /api/auth)
- Data fetching with TanStack Query (React Query) + Axios
- Form handling: React Hook Form + Zod validation
- i18n: next-intl, with locale-aware routing
- State: Zustand and URL state via Nuqs
- Testing: Vitest (unit) + Playwright (E2E)
- CI: GitHub Actions configured to lint, type check, format check, build
- Dev tooling: pnpm (recommended), Husky + Commitlint + lint-staged, Knip (unused file detection)
- Dockerfile producing a small standalone Next.js image

---

## 🧰 Prerequisites

- Node.js >= 20.x
- pnpm (recommended): https://pnpm.io/
- Docker (optional, for container builds)

---

## 🚀 Installation

1. Clone repository
```bash
git clone https://github.com/luan-thnh/nextjs-exmaple.git
cd nextjs-exmaple
```

2. Install dependencies
```bash
pnpm install
```
If you don't have pnpm:
```bash
npm install -g pnpm
pnpm install
```

3. Create environment file
```bash
cp .env.example .env.local
# Edit .env.local to suit your environment
```

Important envs in .env.example:
- NODE_ENV (development|test|production)
- NEXT_PUBLIC_API_URL – default: http://localhost:3000/api
- NEXT_PUBLIC_APP_NAME – app name displayed in UI

4. Prepare Git hooks (Husky)
Husky hooks are installed automatically when the `prepare` script runs during pnpm install. If needed:
```bash
pnpm prepare
```

---

## ▶️ Development

Run the development server:
```bash
pnpm dev
```
Open http://localhost:3000

Build for production:
```bash
pnpm build
pnpm start
```

Useful scripts
| Script | Purpose |
|---|---|
| pnpm dev | Start dev server (Next.js) |
| pnpm build | Build production app |
| pnpm start | Start built app |
| pnpm lint | Run ESLint |
| pnpm format | Prettier format |
| pnpm format:check | Check formatting |
| pnpm type-check | TypeScript type checking |
| pnpm lint:knip | Find unused files/exports (knip) |
| pnpm prepare | Install husky hooks |

---

## 🧪 Testing

Unit tests (Vitest)
```bash
# Run tests once
pnpm exec vitest run

# Run in watch mode
pnpm exec vitest
```

End-to-end tests (Playwright)
```bash
# Ensure dev server is running (Playwright webServer config will reuse an existing server)
pnpm dev

# Run Playwright tests
npx playwright test
```

CI is configured in .github/workflows/ci.yml and runs lint, type-check, format-check and build.

---

## 🐳 Docker

Build image
```bash
docker build -t nextjs-example:latest .
```

Run container
```bash
docker run --rm -p 3000:3000 -e NODE_ENV=production nextjs-example:latest
```

Notes:
- Dockerfile uses Next.js standalone output. It relies on the selected package manager lockfile (pnpm/yarn/npm).
- To reduce image size, build in CI or a multi-stage build as provided.

---

## 📡 API Reference (high-level)

This template includes an API surface under Next.js App Router API routes:

- /api/auth/[...nextauth] — Authentication handlers provided by Auth.js (NextAuth). The server-side configuration is in src/config/auth and wired to the route.
  - GET /api/auth/* and POST /api/auth/* are delegated by route handlers.

Client-side API base
- Use NEXT_PUBLIC_API_URL environment variable for frontend requests (default: http://localhost:3000/api)

Example: Fetch posts (Axios)
```ts
// simple fetch using axios
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

async function listPosts() {
  const res = await api.get('/posts'); // adjust path to your API route
  return res.data;
}
```

React Query example (using TanStack Query)
```ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export function usePosts() {
  return useQuery(['posts'], async () => {
    const { data } = await api.get('/posts');
    return data;
  });
}
```

Refer to src/apis/* for concrete request, query and type patterns.

---

## 🧭 Routing & i18n

- App entry: src/app/layout.tsx and src/app/page.tsx. Root route redirects to the dashboard.
- Locale-aware routing is enabled under the [locale] route segment. Supported messages in src/locales (en.json, vi.json).
- next-intl is configured via src/i18n/request.ts and integrated in next.config.ts plugin.

---

## 🤝 Contributing

Thanks for considering contributions! This project follows a conventional setup to keep code consistent.

Commit conventions
- We use Conventional Commits. Commit messages are validated by Commitlint via Husky.
- Format: type(scope?): subject
- Examples:
  - feat(auth): add login route
  - fix(ui): correct button spacing
  - chore(deps): update tailwind

Pre-commit hooks
- Husky + lint-staged automatically run ESLint and Prettier on staged files.
- If your hooks are not installed, run:
```bash
pnpm prepare
```

Local checks before PR
```bash
pnpm lint
pnpm type-check
pnpm format:check
pnpm lint:knip
```

Opening a PR
- Create a feature branch from main
- Write clear PR description and link issue (if any)
- Ensure CI passes (GitHub Actions will run lint/type/format/build)

Code style
- Prettier with plugin for import sorting and Tailwind formatting is configured.
- ESLint rules are configured for React/Next and best practices.

---

## ⚖️ License

This repository currently does not include a license file. Please add a LICENSE file to indicate the terms under which you want to distribute the project.

Recommended (example MIT license):
```
MIT License

Copyright (c) <YEAR> <OWNER>

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

To add MIT quickly:
```bash
# create MIT LICENSE
curl -s https://opensource.org/licenses/MIT > LICENSE
# update package.json "license" field to "MIT"
```

Replace <YEAR> and <OWNER> as appropriate.

---

## 🧑‍💻 Author / Contact

- Repository: https://github.com/luan-thnh/nextjs-exmaple
- Author: luan-thnh
- Contact: contact@example.com (update in src/config/site.ts to your real email)

---

## 📚 Further Reading & References

- Next.js App Router: https://nextjs.org/docs/app
- next-intl: https://next-intl-docs.vercel.app/
- Auth.js (NextAuth): https://authjs.dev/
- TanStack Query: https://tanstack.com/query
- shadcn UI / Radix: https://ui.shadcn.com/ & https://www.radix-ui.com/
- pnpm: https://pnpm.io/
- Vitest: https://vitest.dev/
- Playwright: https://playwright.dev/

---

If you'd like, I can:
- Add a CONTRIBUTING.md and PULL_REQUEST_TEMPLATE,
- Generate a starter LICENSE (MIT) file and update package.json,
- Or add quickstart examples for the Dashboard module (posts CRUD).