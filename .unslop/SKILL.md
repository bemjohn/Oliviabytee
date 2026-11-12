# Unslop: The Human Design Review System for AI-Generated UIs
Based on [heydamir/unslop](https://github.com/heydamir/unslop)

## Purpose
`unslop` is a strict, systematic design review standard that transforms generic, "vibecoded" AI interfaces into character-driven, human-crafted software.

---

## The 9-Pass Redline Review Order

When reviewing or building any page, execute these passes in this exact order:

### 1. Spacing & Rhythm
- Eliminate cramped containers; give elements room to breathe.
- Establish consistent vertical rhythm (e.g. `py-16 sm:py-24` on major sections).
- Avoid squishing grids horizontally (e.g. 6 items in 1 row -> expand to a generous 3-column or 2-column layout).
- Ensure comfortable internal card padding (`p-6` to `p-10`).

### 2. Color Palette & Restraint
- Ban generic AI purple/blue gradients (`from-indigo-500 to-purple-600`).
- Stick to the brand's bespoke palette:
  - Canvas: Obsidian Wine (`#080305`, `#0d0508`, `#120609`, `#14060a`)
  - Accent: Champagne Gold (`#d4af37`, `#e5c158`, `#f3e5ab`)
  - Surface Borders: Deep Wine/Black Satin (`#261016`, `#3b1722`)
  - Typography: Warm Ivory (`#f5ede3`), Cashmere Rose (`#e0d3d6`), Muted Dust (`#a59599`)
- Limit accents to intentional moments (CTA buttons, key highlights); never rainbow-color an interface.

### 3. Icon Discipline
- Remove decorative icons that add zero information value (e.g. an icon next to every single link, headline, or paragraph).
- Use icons strictly for utility (navigation arrows, close modals, audio/video controls).
- Never place icons inside pills where plain typographic labels are cleaner.

### 4. Editorial Copywriting (Anti-Robot Voice)
- Eliminate generic AI marketing buzzwords: "Unleash your potential", "Elevate your journey", "Cutting-edge", "Game-changing", "Seamless experience".
- Write like a luxury human editorial director: concise, understated, factual, and confident.
- Remove redundant subtitles and filler text.

### 5. Typographic Hierarchy
- Use a high-contrast serif for luxury headlines (`font-serif-luxury`: Bodoni / Playfair Display).
- Use a crisp, legible sans-serif for functional reading (`font-sans-luxury`: Plus Jakarta Sans).
- Enforce strict size hierarchy: Headline (`text-3xl` to `text-6xl`) -> Subheading (`text-sm` to `text-base`) -> Meta/Action (`text-xs font-bold uppercase tracking-wider`).

### 6. Layout Balance & Composition
- Avoid monolithic rows or identical repetitive boxes.
- Create visual hierarchy with asymmetrical focal points (e.g. large hero banner, split editorial showcase, grand portrait cards).
- Design responsive layouts with equal care for mobile, tablet, and desktop viewports.

### 7. Detail & Restraint
- Strip fake "status dots", artificial live indicators, or faux telemetry unless functionally authentic.
- Remove nested borders and excessive drop-shadow glows (`shadow-[0_0_50px_purple]`).
- Prefer subtle, dark inner-ring borders and soft ambient vignettes.

### 8. Custom Brand Visuals
- Use high-fidelity, brand-specific couture photography.
- Avoid generic stock photos of disconnected subjects.
- Maintain consistent lighting, color temperature, and mood across all imagery.

### 9. Subtle, Intentional Motion
- Avoid jarring, fast bounce animations or distracting spinning elements.
- Use slow, cinematic transitions:
  - 8-10s Ken Burns slow-zoom on hero photography.
  - Smooth opacity fades (`duration-700 ease-out`).
  - Subtle hover elevation (`group-hover:-translate-y-1.5`).

---

## Anti-Slop Checklist
- [ ] No purple/cyan AI gradients
- [ ] No emoji in production UI
- [ ] No decorative icons next to plain text
- [ ] No cramped 6-in-a-row grids
- [ ] No generic AI marketing filler
- [ ] Clean typography with generous whitespace
- [ ] Deep, purposeful brand colors
