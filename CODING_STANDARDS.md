# Coding Standards & Procedures

This document outlines the coding standards and best practices for the Astrology project.

## 1. Project Structure
- **`src/`**: All source code must reside here.
- **`src/pages/`**: Top-level page components (views). Each page acts as a route handler.
- **`src/components/`**: Reusable UI components.
    - `layout/`: Components affecting the overall layout (Header, Footer, Sidebar).
    - `features/`: Complex feature-specific components.
    - `ui/`: Small, generic atomic components (Buttons, Inputs).
- **`src/types/`**: shared TypeScript interfaces and types.
- **`src/hooks/`**: Custom React hooks.
- **`src/utils/`**: Helper functions and utilities.

## 2. Naming Conventions
- **Files**:
    - React Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
    - Hooks: `useCamelCase.ts` (e.g., `useAuth.ts`)
    - Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- **Variables & Functions**: `camelCase`.
- **Constants**: `UPPER_SNAKE_CASE` for environment configuration or global constants.
- **Interfaces/Types**: `PascalCase`. No "I" prefix (e.g., `User`, not `IUser`).

## 3. Component Rules
- **Functional Components**: Use `const Component = () => {}` syntax.
- **Strong Typing**: Always define props interface. Avoid `any`.
- **Separation of Concerns**:
    - "Smart" components (Pages) handle data fetching and state.
    - "Dumb" components (UI) verify props and render.
- **Exports**: Use named exports (`export const`) for utilities, default exports (`export default`) for Pages/Components are acceptable but consistency is key. (We prefer default exports for top-level pages).

## 4. Code Style
- **Quotes**: Single quotes `'` preferred.
- **Semicolons**: Always use semicolons `;`.
- **Imports**: Organize imports:
    1. React / libraries
    2. Internal absolute imports (`@/components/...`)
    3. Styles/Images
- **Absolute Imports**: Use `@/` alias to refer to `src/` root.

## 5. State Management
- Use `useState` for local UI state.
- Use Context or external libraries for global state if needed.
- Keep state as local as possible.

## 6. CSS / Styling
- Use Tailwind CSS or CSS Modules (if applicable).
- Avoid inline styles.

## 7. Workflow
- **Linting**: No lint warnings allowed before commit.
- **Types**: No TypeScript errors permitted.
