---
name: T.O.Q — Transforma o Quiebra
description: Desarrollo de software a medida para individuos y pymes en Latinoamérica
colors:
  signal-blue: "#3b82f6"
  signal-blue-wash: "rgba(59, 130, 246, 0.16)"
  signal-blue-line: "rgba(59, 130, 246, 0.32)"
  near-black: "#08090b"
  panel-black: "#0c0e11"
  paper-white: "#f2f4f7"
  slate: "#8d949e"
  hairline: "rgba(255, 255, 255, 0.10)"
  hairline-strong: "rgba(255, 255, 255, 0.22)"
  live-green: "#4ade80"
  alert-red: "#f87171"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.3rem, 6vw, 9.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.042em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.8rem, 3.6vw, 3.05rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.038em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.026em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.66rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  sm: "4px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "44px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.sm}"
    padding: "14px 30px"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.near-black}"
    rounded: "{rounded.sm}"
    padding: "14px 30px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "14px 30px"
  button-secondary-hover:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "14px 30px"
  input:
    backgroundColor: "rgba(255, 255, 255, 0.015)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "13px 16px"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
---

<!-- DIRECTION: this file states the target visual direction, confirmed with the user on 2026-09-19, and intentionally diverges from parts of today's shipped implementation. Core identity tokens (color values, type families, radius, easing) are carried forward as-is from the incumbent CSS — those are not in question. What changes is how they get used: less ambient decoration, less universal card-wrapping, more editorial restraint. See "Drift from current implementation" at the end of Do's and Don'ts for the specific places the shipped pages (index.html, sobre-nosotros.html, tienda.html, checkout.html) have not yet been brought in line. Treat this file as the bar new and refined work must meet, not a description of every pixel currently live. -->

# Design System: T.O.Q — Transforma o Quiebra

## Overview

**Creative North Star: "The Blueprint Room"**

Not a sci-fi command deck — an actual draftsman's studio. A blueprint is dark paper with precise white lines: nothing on it is decorative, every mark measures or annotates something real. That's the discipline this system borrows: strong typographic hierarchy, generous whitespace, a single accent color used the way a draftsman's red pencil is used — rarely, and only to mark what matters. Grid lines, hairline borders, and mono-font annotations ("// Servicios", "01 · Misión") are the blueprint's own vocabulary; they stay. What doesn't belong in a blueprint — ambient glow, atmospheric gradients, decoration that doesn't measure anything — doesn't belong here either.

T.O.Q builds real software for real businesses ("hecho con código, no con plantillas" — made with code, not templates), and the design has to prove that claim rather than contradict it. The system is technological, modern, and premium, but sober: it earns "premium" through restraint and precision, not through visual noise. It is explicitly not a generic SaaS template — no floating gradient blobs, no icons parked in soft rounded chips, no purple-to-blue glow washes, no motion that plays for its own sake. If an element doesn't communicate something (a real product, a real number, a state change), it doesn't ship.

**Confirmed rejections:** AI-generated-template aesthetics; purple/blue atmospheric gradients and glow-as-decoration; icon-in-a-box ornamentation; wrapping every content block in a bordered card by default; ambient motion (orbiting rings, drifting auroras, parallax floor/ceiling grids) that isn't tied to a real interaction or state.

**Key Characteristics:**
- Near-black canvas, paper-white type, one blue accent spent sparingly
- Mono-font labels function as technical annotations, not typographic flourish
- Editorial composition — type hierarchy and whitespace carry weight, not containers
- Motion is feedback (scroll reveal, hover, loading, live status), never ambience
- Real product screenshots and real people are the imagery; nothing is stock or decorative

## Colors

A near-monochrome system (black canvas, white type, gray for secondary text) with a single accent spent deliberately rather than washed across the page.

### Primary
- **Signal Blue** (`#3b82f6`): the one accent. Reserved for meaning — links, the active nav underline, a focused input ring, a live-status pulse, a primary CTA's supporting line. It is a signal, not a mood; if it's covering more than a hairline or a small icon, it's being overused.

### Neutral
- **Near-Black** (`#08090b`): the base canvas (`--bg`).
- **Panel Black** (`#0c0e11`): a barely-lighter surface for alternating section backgrounds (`--bg-soft`) — the only "layering" this system does; never a drop shadow.
- **Paper White** (`#f2f4f7`): primary text and inverted-button fills (`--text`).
- **Slate** (`#8d949e`): secondary/muted text — body copy, captions, disabled states (`--muted`).
- **Hairline** (`rgba(255,255,255,.10)`) / **Hairline Strong** (`rgba(255,255,255,.22)`): the only border vocabulary. Structure comes from these 1px lines, not from fills or shadows.

### Status
- **Live Green** (`#4ade80`): "live"/success only — the ObtenYA status pulse, the sent-message confirmation banner, the order-confirmation checkmark.
- **Alert Red** (`#f87171`): form-validation and payment-selection errors. Currently hardcoded per use site rather than a custom property — promote it to a `--danger` token the next time the CSS is touched.

### Named Rules
**The Signal Rule.** Signal Blue appears for exactly one reason at a time: to mark something live, active, focused, or clickable. It never fills a background as an atmospheric wash (`--accent-soft` radial glows behind hero copy or feature cards are the pattern to retire — see Drift Notes). If a surface needs to feel "premium," reach for whitespace and hairline borders before reaching for blue.

## Typography

**Display Font:** Inter (with system sans fallback)
**Label/Mono Font:** JetBrains Mono (with system mono fallback)

**Character:** Inter carries the entire editorial voice — light body weight (300) for reading, 600 for commitment (headlines, names, prices); JetBrains Mono is reserved for anything that reads as a technical annotation: section kickers, eyebrow labels, nav microcopy, prices' unit suffixes. The pairing reads as "engineer who writes well," not "startup pitch deck."

### Hierarchy
- **Display** (600, `clamp(2.3rem, 6vw, 9.5rem)`, line-height 1.02, letter-spacing -0.042em): page-defining hero headlines only (the "T.O.Q" wordmark treatment, page H1s).
- **Headline** (600, `clamp(1.8rem, 3.6vw, 3.05rem)`, line-height 1.06, letter-spacing -0.038em): section titles ("Nuestros productos", "Software a tu medida").
- **Title** (600, ~1.4rem, letter-spacing -0.026em): card/product/person names within a section.
- **Body** (300, 1rem, line-height 1.75–1.8): all reading copy. Cap prose measure around 58–72ch (`prose-legal` already does this for legal copy).
- **Label** (500, 0.6–0.66rem, letter-spacing 0.14–0.2em, uppercase, mono): eyebrow kickers ("// Servicios"), nav items, form field labels, price-unit suffixes, badges.

### Named Rules
**The Annotation Rule.** Mono type is for things that *point at* content (labels, kickers, units, status text), never for content itself. If a sentence needs to be read for meaning rather than scanned for structure, it's Inter.

## Layout

Single centered container, `max-width: 1120px`, `padding: 0 26px`. Sections stack full-bleed with generous vertical rhythm (~104–130px top/bottom padding on desktop, collapsing to ~78px under 640px). Two breakpoints do the structural work: 920px (desktop nav → burger, multi-column grids collapse to one column, sticky asides go static) and 640px (section padding tightens, hero shrinks, CTA rows stack).

The retained blueprint device is the visible grid: a faint 1px line grid can appear behind a hero as a measuring surface, but it should read as paper, not as a scene — flat, still, and low-contrast, not the animated 3D floor/ceiling/orbit rig currently in the code (see Drift Notes). Content density stays editorial: one clear column of reading width per section, supporting content (images, stats) set beside it rather than boxed independently.

## Elevation & Depth

Flat by default. Depth comes from typographic scale, whitespace, and single hairline borders — not from shadows or blur. The one legitimate use of blur is the sticky header's backdrop blur, which serves a real function (keeping nav legible over scrolling content), not atmosphere.

A soft shadow may appear as *direct feedback* to an interaction — e.g. a primary button lifting a few pixels on hover — but never as a resting-state decoration on a static panel, and never as the diffuse ambient glow (`--accent-soft` radial washes, card "glare" sweep on every hover) the current implementation uses throughout. If a card needs to look important, give it more whitespace or a stronger headline, not a glow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces sit flush with the canvas at rest. Shadow and glow are reserved for direct interaction feedback on real controls (buttons, active form fields), never for passive atmosphere.

## Shapes

Sharp and restrained: a single 4px corner radius (`--r`) system-wide for buttons, inputs, and the (now more selectively used) card containers — this is already close to "no rounding," and stays that way; do not soften it toward pill shapes. The only exception is true circles (the live-status pulse dot, the order-confirmation checkmark), which use `border-radius: 9999px` deliberately to read as an indicator, not a container. Structure is drawn with 1px hairline borders (`--border` / `--border-strong`), never with heavier strokes or double borders.

## Components

### Buttons
- **Shape:** 4px radius, 1px border (outline variant) or filled with no border-radius softening.
- **Primary:** paper-white fill, near-black text, `14px 30px` padding. On hover: solid white + a soft lift shadow — this is earned feedback on a real control, keep it.
- **Secondary/Ghost:** transparent fill, 1px hairline-strong border, paper-white text. Hover fills with a faint white wash (`rgba(255,255,255,.06)`), never with the accent color.
- **Interaction detail worth keeping:** the diagonal "sheen" sweep on hover and the `scale(.95–.98)` press-down on active are purposeful micro-feedback, not ambient decoration — they respond to the user's own cursor/press, so they stay.

### Badges / Labels
- **Style:** mono, uppercase, 0.6–0.66rem, letter-spacing 0.14–0.2em, slate text, transparent background, 1px hairline border, 4px radius, `6px 12px` padding.
- **Use:** status/category markers ("Producto insignia"), not decorative chips. One badge per context, not a row of colorful tags.

### Cards / Containers
- **When to use one at all:** a border earns its place by holding exactly one nameable, discrete thing — a single product, a single person, a single contact channel, a single payment method as a real selectable control. It does not exist to add visual weight to a paragraph or a generic content block.
- **Corner Style:** 4px.
- **Background:** transparent at rest; a near-imperceptible white wash (`rgba(255,255,255,.02)`) only on hover for genuinely interactive cards.
- **Border:** 1px hairline, strengthening to hairline-strong on hover/focus.
- **What to drop:** the per-card "glare" sweep and the `--accent-soft` radial gradient backgrounds on feature cards — replace that visual interest with the real product screenshot, a stronger headline, or more breathing room.

### Inputs / Fields
- **Style:** near-black-wash background (`rgba(255,255,255,.015)`), 1px hairline border, 4px radius, mono uppercase label above the field.
- **Focus:** border shifts to paper-white plus a thin Signal Blue ring (`box-shadow: 0 0 0 3px var(--accent-soft)`) — the one place a blue "glow" is legitimate, because it marks focus state, not ambience.
- **Error:** alert-red inline message below the field, shown only on invalid submit.

### Navigation
- Sticky header, blurred glass background over scroll, 1px hairline bottom border. Links are Inter at `.9rem`, slate at rest, paper-white with a thin Signal Blue underline on hover/active — restrained, no pill backgrounds. Mobile collapses to a burger-triggered full-width dropdown with the same link treatment stacked.

### Status Indicator (signature component)
A small circular pulse dot (`border-radius: 9999px`, live-green, soft pulsing box-shadow ring) marks "live"/real-time state — e.g. "En vivo · obtenya.lat". This is the one place ambient-feeling motion is justified: it represents an actually-true real-time fact, not decoration.

## Do's and Don'ts

### Do:
- **Do** spend Signal Blue on exactly one meaningful thing per view: a live indicator, a focus ring, an active nav link, a primary link.
- **Do** use mono-labeled kickers (`// Servicios`, `01 · Misión`) as the system's signature annotation device — they're the blueprint voice.
- **Do** let real product screenshots and real team photos carry visual interest; they are evidence the software is real.
- **Do** keep interaction feedback that responds to the user (button sheen, press-scale, hover lift, focus ring) — that's purposeful motion.
- **Do** default to whitespace and type hierarchy before reaching for a bordered container.

### Don't:
- **Don't** wash a section background in an `--accent-soft` (or any) radial glow for atmosphere. Blue marks meaning, not mood.
- **Don't** wrap every content block in a bordered card by default — reserve cards for single, nameable, genuinely discrete things.
- **Don't** put icons inside soft rounded color chips as decoration; if an icon is needed, set it inline at a fixed small size with no container.
- **Don't** run ambient background motion that isn't tied to a real state — no drifting "aurora" blobs, no auto-rotating orbit rings, no animated 3D floor/ceiling grid planes.
- **Don't** apply a hover "glare" sweep to every card by default — reserve shine/glow effects for the primary CTA only, where it's rare enough to mean something.
- **Don't** reach for purple or multi-hue gradients; this system has exactly one accent hue.

### Drift from current implementation
These shipped patterns predate this direction and should be treated as refinement debt, not as precedent for new work:
- The hero's animated 3D perspective floor/ceiling grid, orbiting rings, and drifting "aurora" glow blobs (`index.html`, repeated in `sobre-nosotros.html`'s hero) — ambient decoration with no state to represent.
- The `[data-glare]` hover sweep applied to nearly every `[data-card]` and the image "frame" component — currently a blanket effect rather than a rare accent.
- `--accent-soft` used as a full-panel radial background wash on feature/pricing cards (the ObtenYA feature panel, service bento cards) — should shrink to focus rings and status indicators only.
- Near-universal card-wrapping: sections like "Servicios" and the footer nav wrap plain text blocks in bordered cards that don't hold a single discrete thing.
- The hardcoded `#f87171` error color should become a real `--danger` custom property alongside the existing token set.
