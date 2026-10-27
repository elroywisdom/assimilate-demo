# Coza Buddy — Design System & Implementation Guide (Kumo + Tailwind CSS v4)

This blueprint documents how Coza Buddy integrates `@cloudflare/kumo` with the brand tokens extracted from the Figma specifications into a Next.js App Router project.

---

## 1. Overview & Architecture

Coza Buddy uses:
- **Component Primitives & Tokens**: `@cloudflare/kumo`
- **Icon Set**: `@phosphor-icons/react`
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **Brand Theming**: `src/design-system/theme.css` with dark-first color mappings
- **Barrel Export**: `src/design-system/index.ts` as the single point of import across the codebase

---

## 2. Core Brand Tokens (Figma Spec)

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `color-brand-deep` | `#170D25` | Deep purple canvas background (Dark mode body background) |
| `color-surface-dark` | `#09090B` | Near-black surface for cards, sheets, inputs |
| `color-brand-primary` | `#711CFF` | Primary brand purple for active states, indicators, focus rings |
| `color-brand-secondary` | `#6B079D` | Secondary brand purple for hover states & accents |
| `color-brand-accent` | `#FF01F8` | Vivid magenta/pink accent for highlights, badges, destructive states |
| `color-button-primary` | `#8311B3` | Main CTA button fill (Component 8 in Figma) |
| `color-border` | `#2A1F3A` | Dividers, card borders, subtle outlines |
| `color-text-primary` | `#FFFFFF` | Headings, primary text |
| `color-text-secondary` | `#555059` | Secondary / muted text |
| `color-accent-amber` | `#F0AD4D` | Warning, pending, caution indicators |

---

## 3. Step-by-Step Setup

### Step 1: Dependencies
```bash
npm install @cloudflare/kumo @phosphor-icons/react
```

### Step 2: Brand Overrides (`src/design-system/theme.css`)
Overrides Kumo tokens with Coza Buddy brand colors using `@theme`:
- Sets `--color-kumo-canvas` to `#170D25` (dark) and `#FFFFFF` (light).
- Sets `--color-kumo-base` and `--color-kumo-elevated` to `#09090B` (dark).
- Sets `--color-kumo-brand` to `#711CFF`.
- Sets `--color-kumo-brand-hover` to `#6B079D`.
- Sets `--coza-button-primary` to `#8311B3`.
- Sets `--color-kumo-line` to `#2A1F3A`.

### Step 3: Global Styles Setup (`src/app/globals.css`)
Order matters in Tailwind v4:
```css
@source "../../node_modules/@cloudflare/kumo/dist/**/*.{js,jsx,ts,tsx}";
@import "@cloudflare/kumo/styles";
@import "tailwindcss";
@import "../design-system/theme.css";
```

### Step 4: Central Barrel Export (`src/design-system/index.ts`)
```typescript
"use client";

export * from "@cloudflare/kumo";
export * from "@phosphor-icons/react";
```

### Step 5: Root Layout (`src/app/layout.tsx`)
Sets `data-mode="dark"` for the default dark-first aesthetic, and wraps the content in `<div className="isolate min-h-screen">` for proper modal and popover stacking contexts.

---

## 4. UI Rules for Development
1. Always import components from `@/design-system` (e.g. `import { Button, Input, LayerCard, Text } from "@/design-system"`).
2. Use semantic tokens (`bg-kumo-canvas`, `bg-kumo-base`, `text-kumo-default`, `border-kumo-line`) rather than hardcoded Tailwind colors.
3. Light and dark modes are handled automatically through `data-mode` using CSS `light-dark()`. Avoid raw `dark:` utility classes.
