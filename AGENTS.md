# Agent Guidelines for Cortex UI Repository

This document outlines essential guidelines for AI agents operating within this repository. Adhering to these conventions ensures code quality, consistency, and efficient collaboration.

## Build, Lint, and Test Commands

- **Install Dependencies**: `npm install`
- **Build Project**: `npm run build`
- **Run Development Server**: `npm run dev`
- **Lint Code**: `npm run lint`
- **Fix Linting Issues**: `npm run lint:fix`
- **Run Tests**: `npm run test` (Note: This project uses `@nuxt/test-utils`. Refer to Nuxt.js testing documentation for running single tests.)

## Code Style Guidelines

- **Formatting**:
  - Comma Dangle: `never`
  - Quotes: `double`
  - Semicolons: `always`
  - Indent: `2 spaces`
  - Brace Style: `1tbs` (one true brace style)
- **Imports**: Follow standard Nuxt.js and Vue.js import conventions.
- **Naming Conventions**:
  - Components: PascalCase (e.g., `AppHeader.vue`)
  - Files: kebab-case (e.g., `app-footer.vue`)
  - Variables/Functions: camelCase
- **Types**: Utilize TypeScript for type safety.
- **Error Handling**: Implement robust error handling using `try-catch` blocks where appropriate.
- **Pre-commit Hook**: `npm run lint` is run as a pre-commit hook. Ensure your changes pass linting before committing.
