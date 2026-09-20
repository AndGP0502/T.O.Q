# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences: (1) individuals and entrepreneurs launching a personal project or business idea, who need custom apps, sites, or tools without generic templates; (2) small and medium businesses (clinics, gyms, other operations) that need to digitize processes — patient/appointment management, billing, memberships, e-commerce, and similar. Primary market is Latin America; the team is based in Ecuador (contact number +593, Instagram @t.o.q593). Confirmed with the user.

## Product Purpose

T.O.Q builds custom software — not templates — around how a business actually works. It designs, builds, and maintains bespoke software for clients, and also develops and sells its own product line (ObtenYA, Medicore, Gym System, Portales Web) as ready-to-buy software. Success means clients evolve digitally instead of falling behind: "Transforma o Quiebra" (transform or go bankrupt).

## Positioning

"El software no es el objetivo de una empresa: es la herramienta que le permite alcanzarlo" — software isn't the goal, it's the tool that gets a business there. The mechanism: understand how a business actually works, what makes it different, and what's holding back its growth, *before* building — so the software adapts to the business instead of the business adapting to generic software. Backed by real products already in production ("el código en producción es nuestro argumento"), not pitch decks.

## Operating Context

- Client engagement model: understand the client's current workflow first, then design → build → maintain the software around it.
- Sells its own product line directly through a "Tienda" catalog and checkout flow: browse products → checkout summary → confirm order → hand off to WhatsApp to close (no live payment capture yet).
- Contact channels: WhatsApp (+593 98 376 0090), email (transformaoquiebra@gmail.com), Instagram (@t.o.q593), and a contact form on the landing page.
- The product catalog for checkout lives in the `CATALOGO` constant in `js/checkout.js`; current slugs are `obtenya`, `medicore-clinicas`, `gym-system`, `portales-web`, `software-medida`.
- T.O.Q is an early-stage startup: presented publicly as a company/brand, but not yet formally incorporated (confirmed with the user).

## Capabilities and Constraints

- Two-person team, both building product, not just managing: André Garzón (CEO, founder, developer) and Dennys Chanchicocha (COO, co-founder, developer).
- Own product line:
  - **ObtenYA** (flagship) — LATAM business prospecting/scraping: finds businesses, extracts contacts, AI-scored and segmented lead lists, digital-presence scoring (1–100 across website/Google reputation/social). Live at obtenya.lat. $0 / $25 / $65 per month.
  - **Medicore** — clinic management (patients, appointments, records, billing, remote access, mobile app). $25–$55/month subscription.
  - **Gym System** — gym management (members, payments, memberships, attendance, invoicing connected to Ecuador's SRI). $150–$300 one-time.
  - **Portales Web** — full online stores (stock-managed catalog, separate client/admin logins, order panel, payment gateways). Quote-based, per project.
  - **Software a medida** — general bespoke software for individuals or companies outside the above.
- Checkout currently ends in a WhatsApp handoff, not a live charge: Stripe, PayPal, and Payphone integrations are explicitly marked `TODO` in `js/checkout.js`.
- The landing-page contact form simulates submission; no backend is wired yet (`TODO backend` in `js/main.js`).
- Legal pages (Términos y condiciones, Política de privacidad) have two open placeholders: country of incorporation (unresolved — see Operating Context) and a pending local legal review.
- ObtenYA's product logo asset (`assets/img/productos/obtenya/obtenya-logo.png`) is a temporary placeholder copied from another product; the real logo is still missing.
- No stated accessibility standard beyond what's already built (see Accessibility & Inclusion).
- Static site: no build step, no Node, no framework (plain HTML/CSS/JS).

## Brand Commitments

- Name and tagline are core identity: "T.O.Q — Transforma o Quiebra." Framed as a diagnosis, not a threat: businesses that adopt technology in time grow; those that don't disappear.
- Voice: direct, no unnecessary jargon; clients always know their project status and what they're paying for.
- Values (from Misión y Visión): ship working software over polished pitches; talk straight; hold the company to the same urgency it demands of clients.
- Mission: deliver high-quality custom software with accessible technology, agile delivery, and close support, so no business is left behind for lack of digital tools.
- Vision: become the reference software developer for LATAM SMEs, known for turning traditional businesses into efficient digital operations, with proprietary products used across the continent.
- Founders are real, named individuals with real photos — not placeholder personas.

## Evidence on Hand

- Real team photos (`assets/img/equipo/`) and real product screenshots for ObtenYA, Medicore, Gym System, and Portales Web (`assets/img/productos/`).
- Real external product: ObtenYA is live at obtenya.lat.
- No testimonials, case studies, or client logos exist yet — future work must not fabricate them.
- Pricing shown ($0/$25/$65 ObtenYA, $25–$55 Medicore, $150–$300 Gym System, quote-based Portales Web) is real and stated; do not alter without confirmation.

## Product Principles

1. Software adapts to the business, not the other way around — no generic templates.
2. Working, deployed software is the proof of value, not decks or promises.
3. Radical clarity with clients about project status and cost.
4. The founders build the product themselves — engineering and business strategy sit in the same people.
5. "Transformar o quebrar" applies internally too: the company holds itself to the same urgency it sells.

## Accessibility & Inclusion

No specific accessibility standard has been established beyond the site's existing `prefers-reduced-motion` support and its opt-down motion control (`data-motion="sutil"` or `"ninguno"` on `<html>`).
