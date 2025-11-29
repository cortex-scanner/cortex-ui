# Cortex UI Codebase Guide

## Commands

- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build` (runs `vite build` + `tsc`)

## Code Style & Conventions

- **Framework**: React 19 + Vite + TypeScript.
- **Routing**: @tanstack/react-router (File-based routing in `src/routes`).
- **State**: @tanstack/react-query for async data.
- **Styling**: Tailwind CSS. Use `cn()` helper from `@/lib/utils` to merge classes.
- **UI Components**: shadcn UI primitives located in `src/components/ui`.
- **Imports**: ALWAYS use absolute imports with `@/` alias (e.g., `import { Button } from "@/components/ui/button"`).
- **Naming**: PascalCase for components (`Button.tsx`), camelCase for helpers (`utils.ts`).
- **API**: Use raw `fetch` via helpers in `@/api/common.ts`. Handle errors using `parseErrorResponse`.
- **Types**: Strict TypeScript. Define types in shared `types/` folder or co-locate if specific.
