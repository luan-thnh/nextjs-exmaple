# Example Project

This project is a Next.js application designed with a modular architecture, utilizing modern tooling like pnpm, Husky, Commitlint, and localized content handling.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand), [Nuqs](https://nuqs.47ng.com/) (URL state)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) (React Query)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Authentication**: [Auth.js](https://authjs.dev/) (NextAuth)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **UI Components**: [shadcn-ui](https://ui.shadcn.com/) (Design System) using [Radix UI](https://www.radix-ui.com/) primitives & [Tremor](https://www.tremor.so/)
- **Testing**: [Vitest](https://vitest.dev/) (Unit), [Playwright](https://playwright.dev/) (E2E)
- **Tooling**: [Husky](https://typicode.github.io/husky/), [Commitlint](https://commitlint.js.org/), [Knip](https://knip.dev/), [Prettier](https://prettier.io/), [ESLint](https://eslint.org/)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 20.x
- **Package Manager**: [pnpm](https://pnpm.io/installation) (recommended)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd examples
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Setup:**

    Copy the `.env.example` file to `.env.local`:

    ```bash
    cp .env.example .env.local
    ```

    Update the environment variables in `.env.local` as needed.

4.  **Run Development Server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📜 Available Scripts

| Script            | Description                                  |
| :---------------- | :------------------------------------------- |
| `pnpm dev`        | Starts the development server                |
| `pnpm build`      | Builds the application for production        |
| `pnpm start`      | Starts the production server                 |
| `pnpm lint`       | Runs ESLint to check for code quality issues |
| `pnpm format`     | Formats code using Prettier                  |
| `pnpm type-check` | Runs TypeScript type checking                |
| `pnpm lint:knip`  | Checks for unused files and exports          |
| `pnpm prepare`    | Installs Husky hooks                         |

## 📂 Project Structure

The project follows a modular structure inside the `src` directory to maintain scalability and clean separation of concerns.

```plaintext
src/
├── apis/        # API definition and fetching logic (React Query mutations/queries)
├── app/         # Next.js App Router pages and layouts
├── components/  # Shared global components (atomic design or general UI)
├── config/      # Global configuration files (constants, env vars)
├── hooks/       # Custom React hooks
├── i18n/        # Internationalization configuration (next-intl setup)
├── libs/        # Shared libraries, utilities, and helpers (e.g., axios instance, cn utility)
├── locales/     # Translation JSON files
├── modules/     # Feature-based modules (components, logic specific to a feature like 'dashboard')
├── stores/      # State management stores (Zustand)
├── tests/       # Test setup and mocks
├── types/       # Global TypeScript type definitions
└── proxy.ts     # Proxy configuration (if applicable)
```

## 🐶 Husky Configuration & Troubleshooting

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality control via git hooks (e.g., pre-commit linting, commit message linting).

**Why use Husky?**
It ensures that every commit meets the quality standards (no lint errors, correct commit message format) before it reaches the repository.

### Common Issues

If you see errors like `command not found` or hooks are skipped, try the following solutions based on your OS.

#### 🐧 Linux / macOS

1.  **Permission Denied**:
    If you get `The '.husky/pre-commit' hook was ignored because it's not set as executable`:

    ```bash
    chmod +x .husky/pre-commit .husky/commit-msg
    ```

    Or recursively:

    ```bash
    chmod +x .husky/*
    ```

2.  **Hook not running**:
    Ensure the `prepare` script ran.
    ```bash
    pnpm prepare
    ```

#### 🪟 Windows

1.  **Git Bash / Command Prompt**:
    Usually works automatically. If it fails, try running:

    ```bash
    pnpm prepare
    ```

2.  **PowerShell Execution Policy**:
    If you see unauthorized access errors:

    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

3.  **Command not found (pnpm)**:
    Only use `pnpm` if you have it installed globally or in your path. If you just installed Node, install pnpm:
    ```bash
    npm install -g pnpm
    ```

### 📝 Commit Convention (Commitlint)

We use **Conventional Commits** specs. Your commit messages will be checked by Husky.

**Format:** `<type>(<scope>): <subject>`

**Examples:**

- ✅ `feat(auth): add login page`
- ✅ `fix(ui): correct button padding`
- ✅ `chore(deps): update react to v19`
- ❌ `add login page` (Missing type)
- ❌ `Fix button` (Capitalized type not allowed usually, strict lowercase)

**Allowed Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries
