---
name: "frontend-design"
description: "Universal design constitution and luxury e-commerce guidelines for Oliviabytee to eliminate generic AI slop aesthetics, enforcing zero-pill discipline, top-bar contract, typographic hierarchy, and domain authenticity."
---

# Oliviabytee Luxury Atelier Design & Engineering Constitution

This specification defines the non-negotiable frontend engineering and design rules for the **Oliviabytee** luxury raw hair & bespoke wig web application. It enforces production-grade visual standards and eliminates generic "AI slop" aesthetics.

---

## 1. Core Principles & Order of Resolution

When design requirements or constraints conflict, resolve them in this exact order:

1. **Function**: Every interactive control must have a working handler; no dead clicks, mock stubs, or placeholder boxes.
2. **Legibility & Accessibility**: WCAG AA contrast, visible focus states (`focus-visible`), touch targets $\ge 40\text{px}$ (mobile $\ge 44\text{px}$), `prefers-reduced-motion` compliance.
3. **Layout Integrity**: Desktop baseline is 1440px wide ($1100\text{px}$–$1280\text{px}$ maximum container width). Nothing overflows, clips, or wraps in a way that breaks layout. Single-line controls with truncation escape hatch.
4. **Spatial Math**: Container outer padding $\ge$ inner padding between children (minimum container padding 16px). Button padding: horizontal $\approx 2\times$ vertical (`py-2 px-4`). Nested radius math: $r_{\text{inner}} = r_{\text{outer}} - \text{padding}$.
5. **Aesthetic Direction**: Deep obsidian & warm metallic gold luxury palette, high-contrast serif display paired with clean sans body, editorial discipline, and strict anti-slop restraint.

---

## 2. Anti-AI Slop Bans & Restraint

### A. Zero-Pill & Metadata Discipline
- **No Static Pill Enclosures**: Never wrap static metadata (donor origin, texture, grams, cap sizes, dates, categories) in rounded pill capsules or bordered chips. Render metadata as **clean, unboxed text** with subtle typographic separators (`·`, `/`).
- **Interactive Controls vs. Metadata**:
  - *Static Text Metadata (NO PILLS)*: Informational labels rendered as quiet inline text.
  - *Interactive Segmented Tabs (FUNCTIONAL BUTTONS)*: Category switchers and customizer option selectors are functional button elements (`<button>`) with active/inactive states.
- **No Badge Sandwich on Cards**: Cards must lead directly with the primary product photography and title or a quiet text kicker, never a cluster of stacked pill badges.

### B. Eradicating Mechanical Pseudo-Technical Clutter
- **No Code-Comment Headers**: Prohibit prefixing section headers or card titles with comment syntax (`//`, `/* */`, `>_`, `#`) or uppercase snake-case identifiers. Use clean, natural title-case prose.
- **No Fake Status Flags or Telemetry Tickers**: Prohibit mock execution IDs, compiler modes, fake latency tickers ("ONLINE // LATENCY: 12ms"), or arbitrary AI scores ("98/100 INNOVATION SCORE").
- **No Roleplay or Jargon Control Labels**: Interactive controls must use plain, everyday human language (`"Add to Bag"`, `"Customize Crown"`, `"Place Order via Korapay"`, `"Chat on WhatsApp"`). Never use robotic or sci-fi labels.
- **No Spurious Controls**: Every button, input, and selector rendered must perform a real function.

### C. Visual Restraint & Icon Decoupling
- **No Decorative Status or Pulsing Dots**: Prohibit placing decorative pulsing green or colored dots (`bg-emerald-500 rounded-full animate-pulse`) next to headings, brand marks, or nav links. Status dots are reserved strictly for active operational states.
- **No Line-by-Line Decorative Icons**: Avoid prefixing every bullet point or feature with an emoji or generic icon. Let clean typography and generous whitespace organize the content.
- **Affordance-Only Icons**: Reserve icons strictly for functional interactive affordances (bag, search, close, chevron).

---

## 3. Top Navigation Bar Contract

The top navigation bar strictly follows a **one-row, three-zone contract**:

$$\text{[Brand title / Wordmark]} \quad\text{—}\quad \text{[4–5 nav links, 1–2 word labels, single-line]} \quad\text{—}\quad \text{[1 primary action]}$$

- **Zone 1 (Brand Wordmark)**: A single element lockup (circular emblem + `OLIVIABYTEE`). No subtitles, location chips, or taglines attached inside the header navigation row. Slogans and trust badges belong in the announcement strip, hero, or footer.
- **Zone 2 (Nav Links)**: Curated navigation items (`Home`, `Collections`, `Bespoke Studio`) housed in the custom luxury glass capsule menu. `Raw Provenance` and `Track Order` are removed from the header navigation bar as designated by the user.
- **Zone 3 (Primary Action)**: 1 primary action button (Shopping Bag drawer trigger with tabular quantity indicator).

---

## 4. Typography & Color Architecture

### A. The 2+1 Font System
- **Display / Hero / Editorial**: `Bodoni Moda` & `Playfair Display` (High-contrast luxury serif for headings and hero titles).
- **Body & UI Controls**: `Plus Jakarta Sans` (Clean, geometric, legible sans-serif for descriptions, buttons, and inputs).
- **Data & Currency Figures**: `JetBrains Mono` with `tabular-nums` for all prices, order numbers, inches, and density percentages (`font-mono-tabular`).

### B. 60-30-10 Color Allocation
- **60% Neutral Canvas**: Deep obsidian/charcoal black (`#0B0608` / `#12070A`).
- **30% Structural Surfaces**: Rich dark plum-wine card backings (`#180A0E` / `#1C0B11`), subtle hairline borders (`#2E141B` / `#30161D`), and muted stone-rose typography (`#B5A5A8`).
- **10% Metallic Gold Accent**: High-intent warm gold (`#D4AF37` / `#E5C158` / `#F3E5AB`) strictly reserved for primary CTAs, active states, and focal accents.

### C. Headline Containment
- Display headlines must always specify `text-wrap: balance` (or `text-balance`) and reasonable `max-w` constraints to eliminate orphan words.
- All numbers in tables, prices, and stats must use `font-variant-numeric: tabular-nums`.

---

## 5. E-Commerce & Atelier Product Experience

- **Contiguous Purchase Flow**: Keep product titles, prices, variant choices, and the primary Add to Bag button in one clear module.
- **Currency Invariant**: Locked to Nigerian Naira (`₦ NGN`) with commas (e.g. `₦640,000`).
- **Lagos Delivery Invariant**: Highlight the free delivery threshold (`✦ FREE LAGOS DELIVERY OVER ₦1,000,000 ✦`).
- **Interactive Multi-Page Structure**: Separate views for Home, Collections, Bespoke Studio, and Raw Provenance.
- **Zero Broken Images**: All images must feature descriptive `alt` attributes, `referrerPolicy="no-referrer"`, and fail gracefully to styled neutral fallback backdrops.
