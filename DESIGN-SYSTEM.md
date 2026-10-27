# Coza Buddy — Design System Specification & Implementation Guide

**Product:** Coza Buddy  
**Source:** CTS App Figma file (`I6vmO0aNVeIdOpo0xU6Grm`)  
**Owner:** El-Roy Wisdom  
**Font:** Geist (variable)  
**Spacing scale:** 4px base  
**Color mode:** Dark-first (`data-mode="dark"`)  
**Implementation Library:** `@cloudflare/kumo` + Tailwind CSS v4  
**Status:** Verified against live Figma file & production implementation spec  
**Last synced:** October 2026

---

## 1. Color Tokens (from Figma variables)

All colors extracted from actual Figma fills and bound variables.

### Brand Colors (7 core colors)

| Token                   | Hex       | RGB         | Source                   | Usage                                                |
| ----------------------- | --------- | ----------- | ------------------------ | ---------------------------------------------------- |
| `color-brand-deep`      | `#170D25` | 23,13,37    | fill14 / Frame 7 (15:4)  | Deep surface, page background, nav, modal overlay    |
| `color-brand-secondary` | `#6B079D` | 107,7,157   | fill12 / Frame 5 (15:2)  | Secondary brand, hover states                        |
| `color-brand-primary`   | `#711CFF` | 113,28,255  | fill11 / Frame 4 (9:12)  | **Primary brand** — CTAs, active states, focus rings |
| `color-brand-accent`    | `#FF01F8` | 255,1,248   | fill13 / Frame 6 (15:3)  | Accent brand, highlights, badges, destructive/errors |
| `color-surface-light`   | `#FFFFFF` | 255,255,255 | fill8 / Frames 2,5,6,7,8 | Light mode surface, cards, input fills               |
| `color-surface-dark`    | `#09090B` | 9,9,11      | fill9 / Frame 3 (9:11)   | Near-black surface, elevated cards, inputs           |
| `color-accent-amber`    | `#F0AD4D` | 240,173,77  | fill10 / Frame 8 (15:5)  | Warning, alerts, pending states                      |

### Semantic Color Map

| Semantic Token         | Hex       | Usage                                                         |
| ---------------------- | --------- | ------------------------------------------------------------- |
| `color-background`     | `#170D25` | Page/body background (dark mode)                              |
| `color-surface`        | `#09090B` | Card/sheet background (dark mode)                             |
| `color-surface-light`  | `#FFFFFF` | Light mode surface                                            |
| `color-text-primary`   | `#FFFFFF` | Headings, primary body text                                   |
| `color-text-secondary` | `#555059` | Secondary text (from bound variable on Sign in / OTP screens) |
| `color-text-on-brand`  | `#FFFFFF` | Text on `#711CFF` / `#FF01F8` / `#8311B3`                     |
| `color-border`         | `#2A1F3A` | Dividers, card borders, input borders                         |
| `color-button-primary` | `#8311B3` | Component 8 button fill (from bound variable)                 |
| `color-success`        | `#711CFF` | Success states                                                |
| `color-warning`        | `#F0AD4D` | Alerts, pending states                                        |
| `color-error`          | `#FF01F8` | Error states                                                  |
| `color-link`           | `#711CFF` | Hyperlinks                                                    |
| `color-focus-ring`     | `#711CFF` | Keyboard focus indicator                                      |
| `color-gradient-start` | `#B738F6` | Splash screen gradient start                                  |
| `color-gradient-end`   | `#3E045B` | Splash screen gradient end                                    |

### Figma Color Styles to Create

```
Brand / Deep              #170D25
Brand / Secondary         #6B079D
Brand / Primary           #711CFF
Brand / Accent            #FF01F8
Neutral / White           #FFFFFF
Neutral / Near Black      #09090B
Neutral / Amber           #F0AD4D
Neutral / Light Lavender  #F6F7FD
Neutral / Very Light Gray #F9FAFB
Semantic / Button Primary #8311B3
Semantic / Text Secondary #555059
Semantic / Gradient Start #B738F6
Semantic / Gradient End   #3E045B
```

---

## 2. Typography — Geist

Load **Geist** (variable font). Use the variable axis for weight.

### Published Text Styles (18 styles from Figma)

All under **"Global Tokens/"** namespace:

| Token             | Name in Figma               | Size | Weight | Line Height | Usage              |
| ----------------- | --------------------------- | ---- | ------ | ----------- | ------------------ |
| `type-heading-1`  | Global Tokens/Headings/H-1  | 40px | 700    | 120%        | Page titles        |
| `type-heading-2`  | Global Tokens/Headings/H-2  | 32px | 600    | 125%        | Section headers    |
| `type-heading-3`  | Global Tokens/Headings/H-3  | 24px | 600    | 130%        | Card titles        |
| `type-heading-4`  | Global Tokens/Headings/H-4  | 20px | 500    | 140%        | Subsection headers |
| `type-heading-5`  | Global Tokens/Headings/H-5  | 18px | 500    | 140%        | Small headings     |
| `type-heading-6`  | Global Tokens/Headings/H-6  | 16px | 600    | 140%        | Labels             |
| `type-heading-7`  | Global Tokens/Headings/H-7  | 15px | 500    | 140%        | Captions           |
| `type-heading-8`  | Global Tokens/Headings/H-8  | 14px | 500    | 140%        | Small captions     |
| `type-heading-9`  | Global Tokens/Headings/H-9  | 13px | 500    | 140%        | Tiny text          |
| `type-heading-10` | Global Tokens/Headings/H-10 | 12px | 500    | 130%        | Micro text         |
| `type-body-1`     | Global Tokens/Body/B-1      | 18px | 400    | 160%        | Primary body       |
| `type-body-2`     | Global Tokens/Body/B-2      | 16px | 400    | 150%        | Standard body      |
| `type-body-3`     | Global Tokens/Body/B-3      | 15px | 400    | 150%        | Secondary body     |
| `type-body-4`     | Global Tokens/Body/B-4      | 14px | 400    | 150%        | Small body         |
| `type-body-5`     | Global Tokens/Body/B-5      | 13px | 400    | 140%        | Captions           |
| `type-body-6`     | Global Tokens/Body/B-6      | 12px | 400    | 140%        | Tiny captions      |
| `type-body-7`     | Global Tokens/Body/B-7      | 11px | 400    | 130%        | Micro captions     |
| `type-body-8`     | Global Tokens/Body/B-8      | 10px | 400    | 130%        | Nano text          |

### Screen-Specific Styles (from actual screens)

| Style Name         | Usage                   |
| ------------------ | ----------------------- |
| Callout / Bold     | Emphasized callout text |
| Body / Medium      | Medium-weight body text |
| Subtitle / Bold    | Bold subtitles          |
| Subtitle / Light   | Light subtitles         |
| Body / Regular     | Regular body text       |
| Subtitle / Medium  | Medium-weight subtitles |
| Body / Bold        | Bold body text          |
| Subtitle / Regular | Regular subtitles       |
| shadow             | Drop shadow effect      |

---

## 3. Spacing Scale (4px Base)

| Token      | Value | Tailwind Class   | Usage                |
| ---------- | ----- | ---------------- | -------------------- |
| `space-1`  | 4px   | `p-1`, `gap-1`   | Tight gaps           |
| `space-2`  | 8px   | `p-2`, `gap-2`   | Component padding    |
| `space-3`  | 12px  | `p-3`, `gap-3`   | Small section gaps   |
| `space-4`  | 16px  | `p-4`, `gap-4`   | Standard padding     |
| `space-5`  | 20px  | `p-5`, `gap-5`   | Comfortable spacing  |
| `space-6`  | 24px  | `p-6`, `gap-6`   | Page section margins |
| `space-8`  | 32px  | `p-8`, `gap-8`   | Large section breaks |
| `space-10` | 40px  | `p-10`, `gap-10` | Hero spacing         |
| `space-12` | 48px  | `p-12`, `gap-12` | Major divisions      |
| `space-16` | 64px  | `p-16`, `gap-16` | Full-bleed padding   |

**Figma auto-layout gaps:**

- `gap: 24` (vertical auto-layout, Onboarding screens)
- `gap: 178` (vertical auto-layout, Onboarding Screen container)
- `padding: 28 top/bottom` (vertical center layout)

---

## 4. Border Radius Tokens

| Token         | Value  | Tailwind Class   | Usage                       |
| ------------- | ------ | ---------------- | --------------------------- |
| `radius-sm`   | 8px    | `rounded-lg`     | Buttons, inputs             |
| `radius-md`   | 12px   | `rounded-xl`     | Cards, popups               |
| `radius-lg`   | 30px   | `rounded-[30px]` | Large rounded modal cards   |
| `radius-xl`   | 32px   | `rounded-[32px]` | Prominent mobile containers |
| `radius-full` | 9999px | `rounded-full`   | Avatars, pills              |

---

## 5. Shadow / Elevation

| Token         | Value                           | Source                               | Usage            |
| ------------- | ------------------------------- | ------------------------------------ | ---------------- |
| `shadow-none` | none                            | —                                    | Flat elements    |
| `shadow-sm`   | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | —                                    | Subtle elevation |
| `shadow`      | Custom effect                   | Onboarding Screen 4 (style "shadow") | Card elevation   |

---

## 6. Layout Tokens (from Figma auto-layout variables)

| Token                           | Value                                                   | Source  | Usage                         |
| ------------------------------- | ------------------------------------------------------- | ------- | ----------------------------- |
| `layout-default`                | constraints: left/top                                   | layout1 | Default positioning           |
| `layout-vertical-center`        | gap: 24, padding: 28 tb, align: center, justify: center | layout2 | Vertically centered content   |
| `layout-vertical-space-between` | gap: 178, align: space_between                          | layout3 | Space-between vertical stacks |

---

## 7. Component Specifications

### 7.1 Component Sets Found in Figma

| Component Set     | Node ID          | Name              | Usage                                   |
| ----------------- | ---------------- | ----------------- | --------------------------------------- |
| StatusBar         | 22:101           | StatusBar         | Time + battery (top of mobile screens)  |
| Home Indicator    | 22:142           | Home Indicator    | iOS home bar (bottom of mobile screens) |
| Component 8       | 22:195 / 24:2592 | Component 8       | Primary Button component (#8311B3 fill) |
| Keyboard - iPhone | 22:1236          | Keyboard - iPhone | iOS keyboard (OTP Verification only)    |
| Check box         | 22:21357         | Check box         | Terms checkbox (Sign in Page only)      |
| iPhone 14         | 68:2269          | iPhone 14         | Device frame mockup                     |

### 7.2 Buttons

| Variant                | Background  | Text      | Radius            | Height | Usage                           |
| ---------------------- | ----------- | --------- | ----------------- | ------ | ------------------------------- |
| Button / Primary       | `#8311B3`   | `#FFFFFF` | `radius-sm` (8px) | 56px   | Main CTAs (Component 8: 361×56) |
| Button / Brand Primary | `#711CFF`   | `#FFFFFF` | `radius-sm` (8px) | 44px   | Primary actions                 |
| Button / Brand Accent  | `#FF01F8`   | `#FFFFFF` | `radius-sm` (8px) | 44px   | Accent actions                  |
| Button / Secondary     | `#6B079D`   | `#FFFFFF` | `radius-sm` (8px) | 44px   | Secondary actions               |
| Button / Ghost         | transparent | `#711CFF` | none              | 44px   | Tertiary actions                |

---

## 8. Screen Inventory (from Figma "Designs" page)

### Onboarding / Authentication Flow

| Screen                 | Node ID  | Size    | Background             | Key Elements                                                     |
| ---------------------- | -------- | ------- | ---------------------- | ---------------------------------------------------------------- |
| Splash Screen          | 22:27340 | 393×852 | transparent (gradient) | "CTS App" text, H-9 style, logo                                  |
| Sign in Page           | 28:1276  | 393×852 | #FFFFFF / #170D25      | StatusBar, "Don't have an account? Register", Component 8 button |
| Select Language        | 22:26737 | 393×852 | #F6F7FD / #170D25      | Component 8 button (#8311B3)                                     |
| Enter Email & Password | 22:26690 | 393×852 | #FFFFFF / #170D25      | StatusBar, Home Indicator, content frame                         |
| Enter OTP              | 22:26597 | 393×852 | #FFFFFF / #170D25      | "Already have an account? Log in", Component 8 button            |
| OTP Verification       | 22:26628 | 393×852 | #FFFFFF / #170D25      | Keyboard - iPhone instance                                       |
| OTP Verified           | 22:26658 | 393×852 | #170D25                | Confirmation card & CTA                                          |

### Onboarding Screens (with imagery)

| Screen              | Node ID | Size    | Radius | Layout                           | Background       |
| ------------------- | ------- | ------- | ------ | -------------------------------- | ---------------- |
| Onboarding Screen   | 63:1041 | 393×852 | 32px   | VERTICAL, SPACE_BETWEEN, gap 178 | Gradient overlay |
| Onboarding Screen 2 | 69:1852 | 393×852 | 32px   | VERTICAL, SPACE_BETWEEN, gap 178 | Image fill       |
| Onboarding Screen 3 | 69:1875 | 393×852 | 32px   | VERTICAL, SPACE_BETWEEN, gap 178 | Image fill       |
| Onboarding Screen 4 | 68:1785 | 393×852 | 30px   | —                                | #F6F7FD          |
| Onboarding Screen 5 | 70:1093 | 393×852 | 30px   | —                                | #F6F7FD          |

### Dashboard Screens

| Screen                      | Node ID | Size    | Radius | Background        |
| --------------------------- | ------- | ------- | ------ | ----------------- |
| CTS Member Dashboard Design | 68:3152 | 867×393 | 30px   | #F9FAFB / #09090B |
| Counters                    | 69:1185 | 867×393 | 30px   | #F9FAFB / #09090B |
| Events                      | 69:1422 | 903×393 | 30px   | #F9FAFB / #09090B |

---

## 9. Figma Variables JSON (for Local Variables)

```json
{
  "colors": {
    "brand/deep": "#170D25",
    "brand/secondary": "#6B079D",
    "brand/primary": "#711CFF",
    "brand/accent": "#FF01F8",
    "neutral/white": "#FFFFFF",
    "neutral/near-black": "#09090B",
    "neutral/amber": "#F0AD4D",
    "neutral/light-lavender": "#F6F7FD",
    "neutral/very-light-gray": "#F9FAFB",
    "semantic/button-primary": "#8311B3",
    "semantic/text-secondary": "#555059",
    "semantic/gradient-start": "#B738F6",
    "semantic/gradient-end": "#3E045B",
    "semantic/success": "#711CFF",
    "semantic/warning": "#F0AD4D",
    "semantic/error": "#FF01F8",
    "semantic/focus-ring": "#711CFF"
  },
  "spacing": {
    "space-1": 4,
    "space-2": 8,
    "space-3": 12,
    "space-4": 16,
    "space-5": 20,
    "space-6": 24,
    "space-8": 32,
    "space-10": 40,
    "space-12": 48,
    "space-16": 64
  },
  "borderRadius": {
    "radius-sm": 8,
    "radius-md": 12,
    "radius-lg": 30,
    "radius-xl": 32,
    "radius-full": 9999
  },
  "layout": {
    "gap-small": 24,
    "gap-large": 178,
    "padding-vertical": 28
  }
}
```

---

## 10. Kumo Component & Token Implementation Mapping (Next.js)

This section guides agents and developers on how to implement the Coza Buddy design system using `@cloudflare/kumo` with Tailwind CSS v4.

### 10.1 Token Translation Table

| Figma Token             | Hex Code  | Kumo Semantic Token                 | CSS Variable Override                        | Usage in Components         |
| :---------------------- | :-------- | :---------------------------------- | :------------------------------------------- | :-------------------------- |
| `color-brand-deep`      | `#170D25` | `bg-kumo-canvas`                    | `--color-kumo-canvas`                        | Page body background        |
| `color-surface-dark`    | `#09090B` | `bg-kumo-base` / `bg-kumo-elevated` | `--color-kumo-base`                          | Cards, modals, sheets       |
| `color-brand-primary`   | `#711CFF` | `bg-kumo-brand`                     | `--color-kumo-brand`                         | Primary CTA, focus ring     |
| `color-brand-secondary` | `#6B079D` | `bg-kumo-brand-hover`               | `--color-kumo-brand-hover`                   | Hover state for primary     |
| `color-button-primary`  | `#8311B3` | Custom CTA / emphasis               | `--coza-button-primary`                      | Component 8 button fill     |
| `color-border`          | `#2A1F3A` | `border-kumo-line`                  | `--color-kumo-line`, `--color-kumo-hairline` | Dividers, input borders     |
| `color-text-primary`    | `#FFFFFF` | `text-kumo-default`                 | `--text-color-kumo-default`                  | Headings, primary text      |
| `color-text-secondary`  | `#555059` | `text-kumo-subtle`                  | `--text-color-kumo-subtle`                   | Captions, muted labels      |
| `color-brand-accent`    | `#FF01F8` | `bg-kumo-danger`                    | `--color-kumo-danger`                        | Error states, badge alerts  |
| `color-accent-amber`    | `#F0AD4D` | `bg-kumo-warning`                   | `--color-kumo-warning`                       | Pending, warning indicators |

### 10.2 Component Translation Table

| Figma Component               | Figma Specs                       | Kumo Equivalent Component                                                                      |
| :---------------------------- | :-------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Component 8 (Main CTA)**    | 361×56, fill `#8311B3`, r: 8px    | `<Button variant="primary" size="lg" className="w-full h-14 bg-[var(--coza-button-primary)]">` |
| **Brand Primary Button**      | 44px, fill `#711CFF`, r: 8px      | `<Button variant="primary" size="base">`                                                       |
| **Secondary Button**          | 44px, fill `#6B079D`, r: 8px      | `<Button variant="secondary" size="base">`                                                     |
| **Ghost Button**              | 44px, transparent, text `#711CFF` | `<Button variant="ghost" size="base">`                                                         |
| **Inputs (Email / Password)** | Border `#2A1F3A`, bg `#09090B`    | `<Input>` or `<Field>` wrapped                                                                 |
| **Check box (Terms)**         | Node `22:21357`                   | `<Checkbox>`                                                                                   |
| **Modal / Bottom Sheet**      | Dark overlay `#170D25`            | `<Dialog>` / `<Drawer>`                                                                        |
| **Toast Notifications**       | Status feedback                   | `<Toast>` / `<Toasty>`                                                                         |
| **Tabs / Segmented Control**  | Recessed fill                     | `<Tabs>`                                                                                       |

### 10.3 Architecture Setup in Next.js

1. **`src/design-system/theme.css`**: Defines CSS `@theme` mapping Figma hexes to Kumo variables.
2. **`src/design-system/index.ts`**: Central re-export of `@cloudflare/kumo` and `@phosphor-icons/react`.
3. **`src/app/globals.css`**: Imports `@cloudflare/kumo/styles`, `tailwindcss`, and `../design-system/theme.css`.
4. **`src/app/layout.tsx`**: Sets `data-mode="dark"` and `<div className="isolate">` around children.

---

## 11. Implementation Checklist

- [x] Extract all Figma colors, text styles, radius, and spacing tokens
- [x] Create Kumo semantic token mapping table
- [x] Create component translation table (Figma -> Kumo)
- [ ] Configure `src/design-system/theme.css` with Coza Buddy hexes
- [ ] Re-export Kumo primitives from `src/design-system/index.ts`
- [ ] Set `data-mode="dark"` and `isolate` stacking context in `src/app/layout.tsx`
- [ ] Add `AGENTS.md` instructions for AI agents
- [ ] Build Onboarding & Authentication flow screens
