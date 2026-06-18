# Sahha Daily — Project Status & Roadmap

_The single "where are we" file. Last updated: 2026-06-15._

Sahha Daily storefront — a **Dawn 15.4.1** Shopify theme (Liquid) branded to the Sahha
palette + Cairo/Tajawal fonts. Store: **`sahhadaily.myshopify.com`** (free Partner dev
store). The old Next.js site is being retired.

Legend: ✅ done · 🔵 owner (needs Shopify admin) · ⚪ Claude (theme code).

**We are working through Phase 1 ONE owner-step at a time, in maximum detail** (owner
does each admin step, replies "done", then gets the next). **Phase 1 COMPLETE** (all of 1.1–1.8 done).
Next position: **end-to-end storefront preview**, then Phase 5 (Arabic/RTL) / Phase 6 (launch).

---

## The phases at a glance

| Phase | What | Status |
|---|---|---|
| 2 | Brand skin (colors, fonts, wordmark, WhatsApp bubble) | ✅ done, committed, pushed |
| 3 | Custom homepage sections (hero, experts, who-we-are) | ✅ done, committed, pushed |
| 4 | Product page + shop-card badge + routine finder/bundles | ✅ done, committed, pushed |
| 0 | Store setup (currency/market/payments/shipping) | ✅ **done** |
| 1 | Get the catalog into Shopify | ✅ **DONE — all of 1.1–1.8 complete** |
| 5 | Bilingual (Arabic / RTL) | ⚪ later (after owner adds the locale) |
| 6 | Launch (test order, domain, go live) | 🔵 later |

---

## ✅ Done so far

**Theme code (Phases 2–4)** — all committed and on GitHub, and pushed to the store as an
unpublished theme named **"Sahha Daily"**.
- Phase 2: `assets/sahha-brand.css` (brand tokens, Cairo/Tajawal), two-tone wordmark, WhatsApp bubble.
- Phase 3: `sections/sahha-hero|sahha-experts|sahha-who-we-are.liquid`.
- Phase 4: `sections/sahha-product-details.liquid` (reads `product.metafields.custom.*`),
  `snippets/sahha-card-badge.liquid` (+ card-product edits, `custom.badge`),
  `sections/sahha-routine-finder.liquid` (wellness_goal metaobjects),
  `sections/sahha-routine-bundles.liquid` (routine_bundle metaobjects). Wired into
  `templates/product.json` + `templates/index.json`. **All degrade gracefully** — hidden
  until the data exists, so safe already on the store.

**GitHub** — repo `HakaiDark/sahha-theme` (**private**). Inherited Dawn maintainer CI was
removed; slimmed to a single **Theme Check** workflow (`.github/workflows/ci.yml`, with
`checks: write` permission) that is **green**. The 2 pre-existing Dawn `icon_with_text`
schema-translation errors were fixed in `locales/en.default.schema.json`. Dependabot PR
closed. Push via GitHub Desktop (origin is connected; local commits can also be pushed by
Claude if the owner approves the master push).

**Phase 0 — store** (all in admin):
- Business entity switched **Germany → Lebanon / Individual** (this required deactivating
  Shopify Payments — fine: not used, COD only, and Shopify Payments isn't available in
  Lebanon anyway).
- Currency **USD**, store address + timezone **Lebanon/Beirut**.
- **Cash on Delivery (COD)** active (PayPal/Shopify Payments off).
- **Lebanon shipping zone** with a flat rate. (Local delivery left off — optional.)
- `shopify theme dev --store sahhadaily.myshopify.com` works for local preview.

**Phase 1 — Step 1.1 (metafield definitions): DONE by hand.** We *tried* to skip this (betting
the CSV `[type]` headers would auto-create the defs) — they DON'T on this store, so the import
loaded zero metafields until we created all 13 `custom.*` definitions manually (Settings → Custom
data → Products). The 4 list fields are "List of values". `custom.wellness_goals` (metaobject ref)
is still created later, in Step 1.6.

**Phase 1 — Step 1.2 (import 14 products): DONE.** Took several rounds to crack Shopify's current
importer — see the "Import gotchas" box in `PHASE1_DATA_IMPORT.md`. Three fixes baked into the v2
CSV / generator: (1) `Variant Price` = `0.00` placeholder (blank price rejects the whole row);
(2) metafield headers in the parenthesized `Name (product.metafields.custom.key)` export-format (the
`Metafield: …[type]` syntax is silently ignored); (3) list metafields newline-separated, not JSON
arrays. All 14 products now carry full, correctly-structured metafields. Price still `0.00` + stock
0/`deny` → not orderable until Step 1.4.

---

## 🔵 Phase 1 — remaining owner steps (detail in `PHASE1_DATA_IMPORT.md`)

- [x] **1.2 — Import products. DONE.** 14 products imported with full metafields. Re-import
      anytime with the same file (overwrite by handle). Price=`0.00` placeholder; Image blank (1.3).
- [x] **1.3 — Upload the 14 images. DONE.** Packshots from `migration/product-images/` attached to each product.
- [x] **1.4 — Set Price + Inventory. DONE.** Real prices set via bulk editor. **Track quantity left
      UNTICKED** (owner's choice, for testing) → all products always-available; on-hand numbers entered
      but dormant until tracking is turned on later. Price > 0 ⇒ orderable.
- [x] **1.5 — Create collections. DONE.** 8 smart collections by Product type (counts sum to 14)
      + built-in `all`. (Default `frontpage`/"Home page" collection left untouched — theme doesn't use it.)
- [ ] **1.6 — Create metaobjects** (split into 3 parts — see "Resume here"):
      - **A.** `wellness_goal` def (type `wellness_goal`; fields `label`/`short_label`/`description`) + 6 entries. **DONE.**
      - **B.** `routine_bundle` def (type `routine_bundle`; fields `title`/`eyebrow`/`description`/`products` = Product list) + 3 entries. **DONE.**
      - **C.** Define the `custom.wellness_goals` product metafield (Metaobject ref → Wellness goal, **list**). **DONE.** (Used dedicated Metaobject reference, NOT "mixed reference" — mixed isn't reliably filterable in Search & Discovery. All 6 wellness_goal entries Active; a stale "5" count in the def view is cosmetic.)
- [x] **1.7 — Tag products with goals. DONE.** 13 products tagged via bulk editor (Berberine left
      empty by design); all 6 goals confirmed visible in the picker.
- [x] **1.8 — Install Search & Discovery. DONE.** Filters live: Availability, Price, Wellness goals,
      Format. Routine Finder + PDP goal chips now actually filter the shop.

## 💡 Later ideas (owner-flagged)
- **Add a 7th wellness goal for Berberine** (CC0530, the lone "Heart and Liver" product, currently
  has NO goal — deliberately, the 6 goals don't cover heart/liver/metabolic). Owner wants a goal like
  *"Heart, liver & metabolic"* (short label "Metabolic"/"Heart"); consider also tagging Omega-3 (CC0350).
  **Zero code** — Routine Finder auto-builds a card per `wellness_goal` entry; just add the metaobject
  entry + tag products. Flagged 2026-06-17.

## 🐞 Fixed during preview (2026-06-18)
- **Experts bio modal was overlaying the whole site & blocking all clicks.** `.sahha-experts__modal`
  set `display:grid` unconditionally, which overrode the HTML `hidden` attribute (author CSS beats the
  UA `[hidden]{display:none}` rule) → all 3 invisible (opacity:0) full-screen modals sat on top of the
  page eating clicks, each with an "Ask … on WhatsApp" button. Fix: added
  `.sahha-experts__modal[hidden] { display:none; }` in `sections/sahha-experts.liquid`. Pushed to store
  theme #192337019213.
- **Routine Finder cards + PDP "fits these routines" chips all hit "No products found".** The links built
  the filter value from `goal.system.id`, which returns the **bare numeric id** (e.g. `340538884429`), but
  Search & Discovery's metaobject filter needs the **full GID** `gid://shopify/Metaobject/<id>`. Fix: wrap
  it — `{{ 'gid://shopify/Metaobject/' | append: goal.system.id | url_encode }}` — in
  `sections/sahha-routine-finder.liquid` + `sections/sahha-product-details.liquid`. Verified filtering live.
- **All three fixes pushed to store theme #192337019213; NOT yet committed to git** (owner to approve a master commit).

## ⚪ Claude — left on the code side
- After data is in + owner previews: any visual tweaks to product page / homepage.
- Phase 5 (Arabic/RTL) once the locale is added.
- Optional: real-reviews app instead of static `custom.rating`.

---

## ▶️ Resume here (Step 1.6, Part A — wellness_goal metaobject)
Owner is creating the `wellness_goal` metaobject + 6 entries in admin (Settings → Custom data →
Metaobjects). **Exact identifiers verified against theme code** (`sections/sahha-routine-finder.liquid`
reads `shop.metaobjects.wellness_goal.values` → `goal.label.value`, `goal.short_label.value`,
`goal.description.value`; links by `goal.system.id`):
- Definition **type** must be exactly `wellness_goal`. Fields (keys): `label`, `short_label` (single line),
  `description` (multi-line). Entry handles don't matter (theme links by internal id).
- **6 entries** (Label · Short label · Description) — copy from `migration/data/merchandising.ts`
  `wellnessGoals[]`: Daily energy and foundations·Energy, Immune support·Immunity, Beauty hair and skin·Beauty,
  Calm focus and evening reset·Calm, Bones joints and active living·Joints, Family gummies·Family.

**Then Part B** — `routine_bundle` metaobject (`sahha-routine-bundles.liquid` reads
`shop.metaobjects.routine_bundle.values` → `bundle.title.value`, `bundle.eyebrow.value`,
`bundle.description.value`, `bundle.products.value`): type `routine_bundle`; fields `title`, `eyebrow`
(single line), `description` (multi-line), `products` (**Product list reference**). 3 entries from
`merchandising.ts` `routineBundles[]` (daily-core, beauty-glow, active-mobility — SKUs in PHASE1 §D).

**Then Part C** — define product metafield `custom.wellness_goals` = **List of `wellness_goal` references**
(Settings → Custom data → Products → Add definition). Powers the Routine Finder filter + PDP goal chips.

After 1.6: **1.7** tag products→goals (PHASE1 §D table), **1.8** install Search & Discovery + add filters.

## Notes for resuming
- Account *ownership* of the store may still be the German associate's — separate from the
  business entity, doesn't block anything, handle at launch.
- `migration/` is git-tracked but excluded from theme pushes via `.shopifyignore`.
- Theme is ahead of the data on purpose — the catalog import is what "turns the lights on".
