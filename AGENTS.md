<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# COZA BUDDY — AGENT UI & DESIGN SYSTEM INSTRUCTIONS

## 1. Design System & Component Library
- This project uses **@cloudflare/kumo** styled with Tailwind CSS v4 and branded for Coza Buddy.
- Brand tokens are mapped in `src/design-system/theme.css` based on `DESIGN-SYSTEM.md`.
- **Always import UI components from `@/design-system`** (e.g., `import { Button, Input, LayerCard, Text } from "@/design-system"`).
- Never install external UI libraries or invent custom primitive styles when a Kumo component exists.

## 2. API Reference & Props
- Before using any component, inspect the official component documentation in:
  `node_modules/@cloudflare/kumo/ai/USAGE.md`
- For exact props, types, and supported variants, query:
  `node_modules/@cloudflare/kumo/ai/component-registry.json` or `component-registry.md`.

## 3. Styling Guidelines
- **ONLY use semantic Kumo tokens**:
  - Surfaces: `bg-kumo-canvas` (page), `bg-kumo-base` (cards/inputs), `bg-kumo-elevated`, `bg-kumo-recessed`, `bg-kumo-tint`
  - Text: `text-kumo-default`, `text-kumo-strong`, `text-kumo-subtle`, `text-kumo-inactive`
  - Borders: `border-kumo-line`, `border-kumo-hairline`
  - Status: `bg-kumo-success`, `bg-kumo-warning`, `bg-kumo-danger`, `bg-kumo-info`
- **NEVER use raw Tailwind colors** (e.g., do NOT use `bg-blue-500`, `text-gray-700`).
- **NEVER use `dark:` class modifiers**. Colors automatically adapt via `light-dark()` tokens using the `data-mode` attribute.
- Always combine conditional classes using the `cn()` utility exported from `@/design-system`.

## 4. Next.js App Router Rules
- Add `"use client";` at the top of any component file that uses state, event listeners, or client-side interactivity.
- Static presentation components can remain Server Components.
