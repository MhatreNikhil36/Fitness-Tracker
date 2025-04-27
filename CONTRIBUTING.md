# Contributing to **Fitness-Tracker**

First off, **thanks for taking the time to contribute!**  
This project grows with every bug you squash, feature you ship, and doc you improve.

> **TL;DR**  
> 1. Fork → Branch → PR.  
> 2. Follow the style guides & commit conventions.  
> 3. Make sure `npm test` and `docker compose up` work.  
> 4. One logical change per pull-request.  
> 5. Be excellent to each other.

---

## Table of Contents
1. [Workflow](#workflow)
2. [Project Setup](#project-setup)
3. [Coding Standards](#coding-standards)
4. [Commit Message Conventions](#commit-message-conventions)
5. [Running Tests](#running-tests)
6. [Docker & Database](#docker--database)
7. [Pull-Request Checklist](#pull-request-checklist)
8. [Issue Reporting](#issue-reporting)
9. [Security Policy](#security-policy)
10. [Code of Conduct](#code-of-conduct)
11. [License](#license)

---

## Workflow

```text
           +-- bugfix/awesome-fix  →  (feature branch)
fork  →  clone  →  create branch   →  hack ✔  →  push →  PR
```

1. **Fork** the repo and clone your fork.
2. **Create a branch**  
   ```
   git checkout -b feat/<short-description>
   ```
3. **Code away** – keep the scope focused.
4. **Commit** using the [conventional commits](https://www.conventionalcommits.org/) spec (see below).
5. **Push** and open a **Draft PR** early; mark “Ready for review” when tests pass.

Our default branch is **`main`**. Each PR is squashed & merged.

---

## Project Setup

```bash
# frontend
cd src
npm ci                # installs exact, locked deps
npm start             # local dev server on :3000

# backend
cd server
npm ci
npm run dev           # nodemon with hot reload on :5000
```

Environment variables live in `server/.env.example` and `src/.env.example`; copy + fill in anything marked `REPLACE_ME`.

---

## Coding Standards

| Area              | Tooling / Guideline |
|-------------------|---------------------|
| **JS / JSX**      | ESLint + Prettier (`npm run lint:fix`) |
| **SQL**           | MySQL8 – use snake_case for tables & columns |
| **React**         | Functional components + hooks, no class comps |
| **API**           | RESTful, prefixed with `/api` |
| **Dockerfiles**   | Multi-stage builds, smallest possible base |
| **Tests**         | Jest + React Testing Library |

Please **run Prettier** before committing (a pre-commit hook is already configured).

---

## Commit Message Conventions

```text
<type>(scope?): <short summary>
```

Typical types: **feat**, **fix**, **docs**, **refactor**, **test**, **build**, **ci**, **chore**.

Examples:

```
feat(auth): add Google OAuth flow
fix(goal): prevent divide-by-zero in BMI calc
docs(readme): add local docker workflow
```

---

## Running Tests

```
npm test             # runs full Jest suite (CI will, too)
npm run coverage     # generates coverage report
```

A PR is ✅ only if tests & linting pass.

---

## Docker & Database

* **Spin-up full stack**

  ```bash
  docker compose up --build
  ```

* **Init DB** – schema lives in `initdb/init.sql`; Compose runs it automatically for fresh volumes.

* **Migrations** – use SQL files in `migrations/*` + bump `init.sql`. Document the migration in the PR body.

---

## Pull-Request Checklist

- [ ] Root issue linked (e.g. `Fixes #42`).
- [ ] One logical change-set; no drive-by refactors.
- [ ] `npm run lint` returns 0 warnings/errors.
- [ ] Tests added/updated and passing.
- [ ] Docs/README updated if behavior changed.
- [ ] Screenshots/GIFs for UI tweaks.
- [ ] No commented-out code or console logs.

---

## Issue Reporting

When filing a bug, include:

| Field            | What to provide                                   |
|------------------|---------------------------------------------------|
| **Repro Steps**  | numbered list; minimal credentials if required    |
| **Expected**     | what you thought would happen                     |
| **Actual**       | what actually happened (+ logs, stack traces)     |
| **Environment**  | OS, browser, Node/Docker versions                 |
| **Screenshots**  | *if UI related*                                   |

Feature requests welcome – please search first to avoid duplicates.

---

## Security Policy

If you spot a vulnerability, **do not** open a public issue.  
Email `security@fit-track.example` and we’ll coordinate a responsible disclosure.

---

## Code of Conduct

We follow the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).  
Be kind, inclusive, and constructive. Harassment or discrimination is never tolerated.

---

## License

This project is distributed under the **MIT License** – see `LICENSE` for details.

---

Happy tracking – and happy hacking! 🎉  
