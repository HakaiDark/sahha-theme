# Shopify Migration Plan — SahhaDaily (Liquid / Dawn, DIY, $0 theme)

**Date:** 2026-06-10
**Status:** Plan (direction confirmed: full Liquid rebuild on free Dawn theme)

## Decision

Move the **entire storefront into Shopify** as a native **Online Store 2.0 Liquid theme**, built by the owner-developer on the **free Dawn theme**. Retire the headless Next.js site on Netlify. Domain moves to Shopify. No premium theme, no paid tooling — only the Shopify subscription (required for checkout anyway).

| Decision | Choice |
|---|---|
| Frontend | **Liquid theme** (Online Store 2.0), Shopify-hosted |
| Theme base | **Dawn** (free, first-party, OS 2.0 reference) — customized in code |
| Who builds | **The owner (solo dev)**, himself, locally via Shopify CLI |
| Bilingual EN/AR | **Translate & Adapt** (free, first-party) + `dir="rtl"` |
| Catalog source of truth | **Shopify** (products, metafields). The Next.js `products.ts` becomes a one-time import source + design reference |
| Payment | Cash on Delivery / manual at launch; cards later (admin setting, no code) |
| Domain | Moves to **Shopify** |

### Why Liquid over Hydrogen (for this owner)
Solo dev + owner, catalog that will grow. Liquid matches the current site's visual quality, scales the catalog with zero code (CMS-native), has a native app ecosystem, and removes the burden of owning hosting/cart/checkout infrastructure forever. Hydrogen keeps React but it's Remix (a real port, not copy-paste) and keeps the founder as permanent infra maintainer.

### What carries over vs gets rebuilt
- **Carries over:** brand (colors, Cairo/Tajawal fonts, copy, Arabic), product data (via CSV), images, inline botanical SVGs, and the current site as a **pixel-perfect design reference**.
- **Rebuilt:** every React component → Liquid sections/blocks. Framer Motion → CSS animations + IntersectionObserver (or Motion One / GSAP, both free).

### Superseded
The earlier headless scaffold (`src/lib/shopify/`, `src/lib/commerce.ts`, `.env.local.example`) is **no longer needed** — delete once this direction is committed. The **import CSV (`shopify-products-import.csv`) is still used** (theme-agnostic).

---

## Tooling (all free)

- **Shopify CLI** — `shopify theme init` (clones Dawn), `shopify theme dev` (local server + hot reload), `shopify theme push/pull`. Develop like a normal codebase; version with Git.
- **Dawn** — free OS 2.0 theme; clean, fast, accessible, RTL-capable.
- **Translate & Adapt** — free first-party app for EN/AR locales.
- **Theme editor** — visual section/block editing in admin (for non-code tweaks later).

---

## Phase 0 — Shopify + local setup

1. Confirm a Shopify plan (Basic is fine; includes everything needed).
2. Install Shopify CLI; `shopify theme init` to scaffold Dawn into a Git repo.
3. `shopify theme dev` → live local preview against the store.
4. Set store currency **USD**, Lebanon market, COD/manual payment, Lebanon shipping zone (same admin steps as before — commerce config is theme-independent).

## Phase 1 — Data into Shopify

1. **Products:** import `shopify-products-import.csv` (handles + SKUs already match), then set **prices + inventory**, and upload the immersive packshots from `public/products/immersive/` as product images.
2. **Long-form content:** move each product's description/benefits/nutrition/how-to-use into the product body + **metafields** (so templates render structured sections like the current product page).
3. **Merchandising:** model **wellness goals** and **routine bundles** as **metaobjects** (or collections + metafields), mirroring `merchandising.ts`. These power the goal filter, bundles, and "fits these routines" panel.
4. **Collections:** create one per category (Health & Wellness, Vitamins & Minerals, Bones & Joints, etc.) so the shop filters work with zero code.

## Phase 2 — Brand the theme (global skin)

1. Drop brand tokens into the theme CSS: `--green`, `--deep-green`, `--sage`, `--beige`, `--ink`, `--accent` (port from `globals.css`). Wire Dawn's theme settings to them.
2. Load **Cairo + Tajawal** (Google Fonts `<link>` in `theme.liquid`); set them as the theme font stack.
3. Recreate the **two-tone Sahha/Daily wordmark** (green + orange `<span>`) in the header/footer.
4. Header, footer, urgency banner, floating WhatsApp bubble → Dawn header/footer/announcement-bar + a small custom snippet for the WhatsApp button.

## Phase 3 — Custom sections (the distinctive look)

Rebuild the homepage's bespoke pieces as **Liquid sections** (so they're reusable + editable in the theme editor):
- **Hero** with motion → section + CSS keyframes (gated behind `prefers-reduced-motion`).
- **Botanical atmosphere layer** → paste the inline SVGs (`Fern`, `Vine`, `Cedar`, `CedarRidge`, `BotanicalDivider`) into snippets; tint/opacity via CSS, same as today.
- **Routine finder / wellness-goal filter** → section reading the goal metaobjects.
- **Routine bundles** → section reading the bundle metaobjects.
- **Reveal-on-scroll** → one small IntersectionObserver script, reused site-wide.

## Phase 4 — Product + shop templates

- **Product template:** structured sections from metafields (benefits, nutrition table, how-to-use accordion, gallery, rating/reviews, "fits these routines"). Add-to-cart is native Dawn.
- **Shop/collection template:** Dawn's filtering & sorting (native, CMS-driven) + your goal/format filters via metafield filters. Replaces the current client-side `ShopFilters`.
- **Cart:** Dawn's native cart drawer, re-skinned to brand.

## Phase 5 — Bilingual EN/AR

- Install **Translate & Adapt**; add Arabic locale; translate theme strings + product content.
- RTL: set `dir="rtl"` for Arabic locale; mirror layout in CSS logical properties.
- Keep the two-tone wordmark convention for صحة / دايلي.

## Phase 6 — Launch

1. Native checkout test (COD order end-to-end), mobile pass (cart drawer, header).
2. SEO: titles/meta, redirects from old Netlify URLs → matching Shopify handles (slugs already match, so most map 1:1).
3. Point the **domain at Shopify**; keep the old default Online Store theme unpublished.
4. Decommission Netlify once DNS has propagated and orders flow.

---

## WhatsApp
Keep as a secondary "Questions? Order on WhatsApp" support link (decision deferred from before). Native Shopify checkout is the primary buy path.

## Open items
- Confirm plan tier.
- Decide where each `products.ts` field lands (body vs metafield) — I can produce a field→metafield map.
- Reviews app (free tier) if you want star ratings to be real rather than static.
