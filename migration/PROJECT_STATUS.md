# Sahha Daily — Project Status & Roadmap

_The single "where are we" file. Last updated: 2026-06-24 (Phase 7: HOMEPAGE COMPLETE + PDP COMPLETE; all 14 product content files prepped & owner is pasting them in. Next: finish pasting + verify flagged values, decide/add the Berberine wellness goal, then motion pass)._

> **▶️ RESUME (read this first):** All PDP theme code is DONE & pushed to store theme #192337019213 (round-trip verified) but **NOT committed to git** (owner approves commits). **Owner has PASTED ALL 14 products' content** (2026-06-24) from `migration/content/<handle>.md` — still worth verifying the ⚠️ flagged source values vs physical labels. **NEW big task added by owner: port the CATALOG / shop (collection) page** — see STILL LEFT #1 (original = `.shop-layout` 280px sticky `.filters` sidebar + grid; ours is still Dawn's default collection chrome; `.pcard` cards already done). Other pending: **Berberine wellness goal** (pick short label `Metabolic` vs `Heart`; tag Berberine ±Omega-3 — admin only) and the **motion pass** (scroll-reveal + paper-grain). Nothing committed to git yet.

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

## 🎨 Phase 7 — Design port: match the live site (IN PROGRESS, started 2026-06-18)
**Goal:** make the Shopify theme match `www.sahhadaily.com` as closely as possible. Source of truth =
the **live site** + the current `SahhaDaily` repo (`src/app/globals.css` — a complete "editorial botanical"
design system). **Ignore project MD files for design decisions** (owner flagged them as possibly stale).
**Owner decisions (2026-06-18):** headings → **Playfair Display** (Cairo for Arabic only); **full motion**
(entrance/scroll animations + Lenis-style smooth scroll).

Original system highlights to replicate: Playfair headings + big editorial type scale; warm ivory paper
`#F4F0E6` + subtle paper-grain overlay; generous section padding; large radii/soft shadows; split-screen
hero (floating product, halo, orbits); manifesto; pinned horizontal product showcase; marquee; stats;
editorial product cards; sticky header w/ scroll states (logo image); custom cursor; preloader; reveal
animations. (Leaf particles were REMOVED in their redesign — don't add.)

### ⚠️ Two hard rules for this port (see memory [[design-port-sahha]])
- **REM ×1.6:** Dawn root font = **10px** (`theme.liquid:231` `font-size: calc(var(--font-body-scale)*62.5%)`);
  original site = **16px**. Every `rem` copied from `SahhaDaily/src/app/globals.css` must be **×1.6**; `vw`/`px` unchanged.
- **NEVER push `config/settings_data.json`** — owner edits it via the customizer (logo, color schemes). Pushing wipes the logo.
  Push code only with `--only <file>`. CLI: `HOMEBREW_NO_AUTO_UPDATE=1 /opt/homebrew/Cellar/shopify-cli/4.1.0/bin/shopify theme push --store sahhadaily.myshopify.com --theme 192337019213 --only <files>`.

Progress:
- [x] **Foundation (done, pushed)** — `assets/sahha-brand.css` + `layout/theme.liquid`: headings Cairo→**Playfair
      Display 500** + editorial type scale (`.sahha-display/h-xl/h-lg/h-md`, now ×1.6-corrected so sizes match the
      original), Title-Case headings (`text-transform: capitalize`), Playfair loaded, wordmark → Playfair italic 600,
      tokens (paper `#F4F0E6`, radii 10/18/30/44, shadows, gutter, maxw), `.sahha-kicker/btn/wrap/section` sized to original.

### 🎯 Owner feedback to address, section by section (2026-06-18 — owner cleared context after this)
The owner wants the design built **section by section, matching the original exactly**, then fine-tuned. Specific issues raised:
1. **Heading word-coloring missing.** Headings like "Premium Wellness Supplements" render the first words **black** (`--ink`)
   instead of **green**. The original colors specific words green/orange via spans (`.green`/`.accent`/`.it`). Our generic
   `text-transform`/heading rule has no per-word color — each section's heading markup needs colored spans like the original.
2. **Body text color wrong on light + dark.** Body copy isn't the right tone; on dark-green sections it should be **ivory/paper
   (`#F4F0E6`)** but isn't. Check each section's color-scheme + custom CSS (some hardcode `--ink`).
3. **"Find your routine" (routine finder) background too dark.** It defaults to `scheme-2` (`#1C3C2A` green-deep). The original's
   finder uses a lighter green — change the section's background/scheme to match (likely `#2E5B3F` herbal green or a mint tint).
4. (Earlier) ivory page bg is `#F6F2E9`; true value `#F4F0E6` — owner to fix in customizer (Theme settings → Colors), since we can't push settings_data.json.

### ✅ DONE so far in the port (2026-06-19/21, committed)
- **Hero — DONE & pushed.** Rebuilt `sections/sahha-hero.liquid` to match the LIVE `.hx-*` hero (orbs + floating
  product + one rating pill — NOT the stale `.hero-*` block with orbits/halo/stats). Title now **green** (owner #1),
  Playfair **500**, all rems **×1.6**, wide wrap **1560px** (was wrongly 1360 → fixed text position). Heading/tagline are
  `inline_richtext` (italic word → orange via `em`/`.it`). **Product rotation:** optional "Rotate product images from"
  collection cross-fades product images (owner set it to **health-and-wellness**); degrades to single image/placeholder.
  **Image-consistency finding:** all 14 packshots are already uniform (square, product 940px/94% tall, centred 50/50);
  only #07 calcium is 1500² but same ratio. So do NOT resize individual packshots — they already match. (I wrongly shrank
  Ashwagandha then reverted.) Bottle-body width varies ~5% naturally — that's fine, the live site has it too.
- **Header / nav — DONE & pushed.** (a) New `sections/sahha-marquee.liquid` slim bilingual scrolling marquee, wired into
  `layout/theme.liquid` just before `{% sections 'header-group' %}` (site-wide, above sticky header). (b) Restyled Dawn
  header via CSS appended to `sahha-brand.css`: nav links uppercase/letter-spaced/ink + orange hover underline, header
  bottom line + blurred-paper bg on scroll, **logo locked to 77px (65px scrolled), left-aligned**, grid overridden to
  **logo left · nav centered · icons right**. (c) Removed Dawn's "Welcome to our store" announcement bar by trimming
  `sections/header-group.json` to just the header section (pulled live first to preserve settings; country/language
  selector survives — it's on the header, not the bar).
- ⚠️ **Push gotcha learned:** `shopify theme push --only <file>` can report "success" but silently NOT upload (it happened
  to the hero, blanking the whole section). **Always round-trip verify**: pull the file back to /tmp and diff. The
  `--only` flag also only honours the LAST occurrence on `pull` (repeat-flag pulls just the last file).

### ▶️ RESUME HERE (next session): continue the section-by-section port, in this order
For each: read the matching component/CSS in `SahhaDaily` (live site = source of truth), rebuild the Liquid section markup +
its `{% stylesheet %}` with ×1.6 rem, colored heading spans, correct scheme, push that file, **round-trip verify**, then have owner preview.
1. **Product cards — DONE & pushed (round-trip verified).** First tried a CSS retrofit of Dawn's `.card`
   markup; owner flagged "size & structure different — check the live site." So I pulled the **live
   deployed** HTML+CSS (`sahhadaily.com/shop` + `/_next/static/css/…`) — the real `.pcard` structure
   differs from a plain restyle — and **rebuilt `snippets/card-product.liquid` to emit the live `.pcard`
   markup directly** (dropping Dawn's card chrome/quick-add; live has none). Structure now matches exactly:
   `.pcard` → `.pcard-media` (square, `--r-lg`, 4n tint rotation on `.grid__item`, 72% centered packshot
   + drop-shadow + white halo, `--brand-shadow-sm` → hover shadow) · full-card `.pcard-link` overlay ·
   `.pcard-body` → `.pcard-meta` (**two** cats: `product.type` olive + `custom.format` muted, space-between)
   · `h3` (Tajawal 700, 2-line clamp) · `.rrow` (stars from `custom.rating`, `.rcount` from
   `custom.review_count`, inline `.tag` badge from `custom.badge` mapped to bestSeller/popular/new/lowStock,
   pushed right; sold-out → lowStock tag) · `.pcard-foot` (**owner chose Price + View →**: green
   `.pcard-price` left, animated `.alink` "View →" right). CSS = faithful port of the live `.pcard*` rules
   in `assets/sahha-brand.css`, **rem ×1.6**, px/%/breakpoints unchanged (incl. 760/460px responsive).
   `snippets/sahha-card-badge.liquid` is now orphaned (logic inlined) — harmless OrphanedSnippet warning,
   left in place. No add-to-cart on cards (matches live; PDP handles purchase).
   **Owner feedback round 2–3 (2026-06-22) — RESOLVED & committed:**
   - **Bottle/card not clickable — REAL root cause found via headless-Chrome `elementFromPoint` test:** Dawn's
     `assets/base.css` `a:empty { display:none }` reset was hiding the EMPTY `.pcard-link` overlay anchor
     (0×0, display:none) — so the image was the topmost element with no link. The earlier z-index/height
     "fix" never worked because the anchor wasn't rendering at all. Fix: `.pcard .pcard-link { display:block; … }`
     (specificity beats `a:empty` 0,1,1), made the overlay a real focusable link (`aria-label`, dropped
     `aria-hidden`/`tabindex=-1`), title back to plain `<h3 class="pcard-titlelink">` (no nested 2nd link).
     Verified in a real browser: topmost element over the bottle is now `A.pcard-link` → product URL.
   - **Section smaller than hero — NOT a global page-width change.** Live `page.tsx` wraps the essentials grid
     in `.wrap-wide` (1560px = hero band). Added class `sahha-wide` to the featured-collection root +
     `.sahha-wide .page-width,.sahha-wide .page-width-desktop{max-width:1560px}` + roomier vertical padding via
     `.sahha-wide > .collection`. Bottle image 72%→86% + hover zoom. (Global Page width left at 1200; no
     settings_data.json push needed.)
   - **Hero heading `<p>` blocker:** `index.json` hero heading was `<p>…</p>` in an inline_richtext setting →
     blocked all `index.json` pushes + `theme dev` sync. Stripped the wrapper (richtext headings keep `<p>`).
   - **⚠️ Incident:** pushing `index.json` clobbered the owner's customizer-set hero `collection`
     (`health-and-wellness` rotation) → hero image vanished; restored by re-adding it to the hero settings.
     Lesson: treat `templates/*.json` like `settings_data.json` — pull-first or change in customizer. See [[design-port-sahha]].
**✅ HOMEPAGE COMPLETE (2026-06-22).** All sections ported + polished + footer. Verified font-for-font against www.sahhadaily.com in headless Chrome.
Original design system reference: `SahhaDaily/src/app/globals.css`. Push CLI in [[design-port-sahha]].
- [x] **Hero** — done.
- [x] **Header / nav** (marquee, restyle, logo, welcome bar removed) — done.
- [x] **Product cards** (editorial `.pcard`, click fix, split-colour titles, uniform image box, stars) — done.
- [x] **Featured "everyday essentials"** — 1560 band, kicker + green/orange heading, more row spacing.
- [x] **Shop by category** — NEW `sahha-categories.liquid` (replaced routine finder); tiles from real collections, name green / count orange.
- [x] **Experts** — widened, names green, headings half green/half orange, ×1.6 text fix.
- [x] **Routine bundles** — KEPT (owner), widened, titles green + product specs orange, ×1.6 fix.
- [x] **Who-we-are** — widened, value text orange, Arabic half green/half orange, bg `#F1E9DA`, image uploaded + preserved in index.json.
- [x] **Footer** — NEW `sahha-footer.liquid` (replaced Dawn footer); brand + Explore + Get-in-touch (locations/WhatsApp/IG), flows into who-we-are (no margin).
- [x] Global: headings green base + orange `<em>`; body text solid; all section text ×1.6.

### ✅ PDP REBUILT (2026-06-23, pushed to store theme #192337019213, NOT committed to git)
- **NEW `sections/sahha-product.liquid`** replaces Dawn's `main-product` in `templates/product.json`. Emits the live `.pdx`
  editorial layout: gallery (`.pdx-media` gradient frame, **is-cutout** floating packshot vs **is-scene** full-bleed creatives,
  `.pdx-thumbs`) + info column (category·SKU eyebrow, Playfair green `h1`, stars, desc, benefit chips, buy card, goal chips) +
  tab block. **Real Shopify commerce**: own `<product-form>` add-to-cart (single-variant catalog) via Dawn `product-form.js`
  (AJAX cart-drawer, native-POST fallback) + a 2nd "Order on WhatsApp" CTA + a trust row (COD · 100% original · WhatsApp).
  `{{ product | structured_data }}` JSON-LD preserved for SEO.
- **NEW `sections/sahha-faq.liquid`** = "Questions about this product" (after related-products). Sticky-free intro + accordion;
  Q&As auto-built from metafields (how/ingredients/who/safety) + 2 editable store-wide answers (COD ordering, authenticity).
- `templates/product.json` now: `sahha-product` (main) → `related-products` ("Complete your routine") → `sahha-faq`.
  **`sections/sahha-product-details.liquid` is now ORPHANED** (logic absorbed) — left in place, can delete.
- **Tabs** = How to use / Ingredients / Nutrition / **Good to know** (4th tab holds `key_features` + `notes`, which the
  original `.pdx` had no slot for). Lists are **soft-card grids with an orange accent rule (NO checkmarks — owner rejected ✓)**.
- **Nutrition = branded supplement-facts TABLE** (`.pdx-sf`), owner liked WeightWorld's table. **`custom.nutrition` list format:**
  `# caption` (serving-size bar) · `Nutrient | Per serving | %NRV` (%NRV optional → column auto-hides) · `+ footer note`.
  Legacy `Label: value` colon lines still render as 2-col rows.
- **Bugs fixed this round:** (1) container bled to viewport edges — `.sahha-wide` is only a marker that widens inner
  `.page-width`; added scoped `width: min(100% - 2*var(--gutter), 1560px); margin-inline:auto`. (2) Gallery showed the same
  bottle on every thumb — the stage `<img>` had a `srcset` that **overrides `src`**, so JS swaps were ignored; removed
  srcset/sizes. (3) Removed `position:sticky` from gallery + FAQ intro (owner disliked scroll-follow). (4) Perf: gallery frame
  layer-promoted (`translateZ(0)`+`contain:paint`) so its shadows rasterise once (was repainting every scroll frame).

### ✅ PDP DESIGN ITERATIONS (2026-06-24, all pushed + round-trip verified, NOT committed)
Section-CSS gotcha learned: `{% stylesheet %}` blocks compile into ONE cached `compiled_assets/styles.css`; after a push the
owner MUST hard-refresh / use incognito or changes look "blocked" (cost ~2 rounds of confusion — it was always just cache).
- **Tabs merged → 3 tabs:** How to use / **Ingredients & Nutrition** / Good to know. The Ingredients & Nutrition tab is a
  **2-column split** (`.pdx-facts.is-split`, collapses <820px): **left** = ingredients line + "Nutritional information" + the
  supplement-facts table; **right** = "Safety advice" callout (owner asked to flip nutri-left / safety-right).
- **Coloring (owner: "more green/orange", text "looked black"):** body paragraphs (`.pdx-lead`) + table nutrient names/%NRV →
  `--muted` (was near-black `--ink`/`--ink-soft`); feature cards (`.pdx-list`) text → `--green`; sub-headings (`.pdx-subh`)
  → green + an orange lead dash; table header labels → green; active tab → `--tint-mint` bg + orange underline. Amount column
  stays `--green`. **NO checkmarks anywhere** (owner rejected ✓ twice — cards use an orange top-rule; chips use an accent dot).
- **Mobile:** hero stacks <980, buy buttons stack <600, facts split collapses <820, table padding/cols tightened <600, tab
  labels shrink <600, FAQ stacks <980. Confirmed responsive to ~320px.

### ✅ PDP gallery lag FIXED (2026-06-24)
Owner: clicking a thumbnail showed the OLD image for ~2s, then popped to the new one. Cause in `sections/sahha-product.liquid`
gallery JS: it set `stageImg.style.opacity='1'` immediately after changing `src`, so the browser kept showing the old image until
the new full-size file downloaded (no preload). Fix: (1) **preload every `data-full` gallery image** on init (`new Image()`),
(2) load the new image via a loader and only swap `src` + fade in on its `onload` (instant when cached). Also bumped `data-full`
to width 1100 to match the stage's initial image (true cache hit). CDP-verified: thumb-2 click swaps the stage `src`, no JS errors.

### ✅ CONTENT ENRICHMENT — all 14 files PREPPED (2026-06-24); owner pasting them in
Source = `migration/Information/<handle>.md` (scraped WeightWorld; product page link inside each). **No Admin API token** →
content is MANUAL admin (owner pastes). Method: **"I prep, you paste."** (Re-import rejected: CSV `0.00` prices + blank images
would reset prices/images/inventory.)
- **Paste-ready files live in `migration/content/<handle>.md`** — one per product, code-fenced block per field, **Berberine is the
  gold-standard format**. Rules baked in: ONE JOB PER FIELD (no phrase repeated across Key features / Benefits / Why-use; Why-use
  usually left EMPTY); benefits **feature-led not medical** (EFSA-pending claims stripped); Description = hook (not specs);
  Ingredients = active only; Nutrition = the `#`/`|`/`+` pipe-format that drives `.pdx-sf`.
- **Owner has PASTED ALL 14 products' content (2026-06-24) ✅.** Each field maps to: Description box (1) + metafields (8).
- ✅ **SOURCE-DATA FLAGS — VERIFIED 2026-06-24 against label photos; see "STILL LEFT #2" for the resolution + the 3 admin edits owner must still apply.** (original flags below, kept for history)
- ⚠️ ~~**SOURCE-DATA FLAGS to verify vs physical labels**~~ (agents caught these): Marine Collagen=60 servings(2cap), Magnesium=90,
  Omega-3=120, Women's Gummies=**45-day** (source "5 months" wrong); **Vitamin D3+K2** source says 365/1-yr but product is **240
  tablets** (aligned to 240 — confirm); **Glucosamine** kept MSM in facts table (source lists it), fixed garbled Vit C %NRV
  262.5%→31%, 1-cap vs 2-cap serving disagreement; **Multivitamins (27 rows)** has garbled source rows (`Boron 0 mcg`,
  `Folic Acid …|0` %NRV, Potassium in mcg) — owner to reconcile, Claude offered to clean; **Kids Gummies** "vegan" left off
  (only FAQ claimed it).

### ▶️ STILL LEFT (in priority order)
1. ~~**🆕 CATALOG / shop (collection) page port**~~ — ✅ **BUILT & PUSHED 2026-06-24 (round-trip verified; awaiting owner preview).**
   Approach: **kept Dawn's vertical-facet markup + its filter/sort JS intact** (so live Search & Discovery filtering keeps
   working — Availability/Price/Wellness goals/Format) and **restyled** it into the live `.shop-layout`. Changes (4 files):
   - `templates/collection.json` — product-grid now `filter_type: "vertical"`, `columns_desktop: 3`, `image_ratio: square`,
     padding 24/64. (Pull-first diff confirmed no customizer settings clobbered.)
   - `sections/main-collection-banner.liquid` — **rebuilt** into the editorial `.sahha-shop-hero` (kicker · green Playfair
     collection title · Arabic flourish · lead from collection.description). New editable settings: `kicker`, `arabic_line`,
     `lead`. Schema class = `section sahha-shop-banner sahha-wide`.
   - `sections/main-collection-product-grid.liquid` — schema class → `section sahha-shop sahha-wide` (marker only; no markup change).
   - `assets/sahha-brand.css` — new "SHOP / COLLECTION PAGE" block: 280px sticky filters panel (`.facets-wrapper` → live
     `.filters`), green uppercase "Filter by" + reset pill, on-brand facet summaries/checkboxes, results+sort bar
     (`.facets-vertical-sort` → `.cat-results-head`), 1560 band via `.sahha-wide`, mobile stacks <990 (Dawn drawer <750).
     All scoped under `.sahha-shop`/`.sahha-shop-hero` (2-class specificity beats Dawn's later-loaded component-facets.css). REM ×1.6.
   - ⚠️ **Tradeoff:** filter controls stay Dawn **checkbox lists + price slider** (restyled), NOT the original's pills/dropdowns —
     keeps the working filter JS (rebuilding `facets.liquid` would mean rewiring it). Theme check 0 errors / 12 pre-existing warnings.
   - **Owner feedback round 1 (2026-06-24) — ALL FIXED & pushed (verified live via headless Chrome + CDP width measurement):**
     1. **Floating WhatsApp bubble removed** — dropped `{% render 'sahha-whatsapp-bubble' %}` from `layout/theme.liquid`
        (snippet now orphaned → that's the +1 theme-check warning, 13 total; PDP still has its own "Order on WhatsApp" CTA).
     2. **Sort by was "missing"** — the vertical sort+count bar's flex was hitting the `.facets-vertical-sort` custom element,
        not the inner `.facets-vertical-form`; fixed → now a proper toolbar: **count left (green serif) · Sort-by right**, divider under.
     3. **Headings recoloured** — hero `h1` is now two-tone **"Shop" (green) + collection name (orange italic `<em>`)**, matching
        the site convention. ⚠️ Had to **HARDCODE** `Shop <em>{{ collection.title }}</em>` in the markup: adding a `title_prefix`
        section *setting* made the banner push **silently no-op** (server rejected the new schema; CLI reported success). See gotcha below.
     4. **Filter panel polish** — confirmed true 280px sidebar (CDP: facets-vertical = `280px 1016px` grid; eyeball "narrow" was
        thumbnail scaling). Green "FILTER" header w/ green underline, unified all group labels green (Price summary uses a plain
        `<span>` not `.facets__summary-label`, so styled `.facets__summary > div > span` too), bigger labels/rows, hover tint.
   - ⚠️ **NEW push gotcha:** if a section push silently no-ops **repeatedly even after touch/whitespace bump**, suspect a
     **server-side schema rejection** (theme-check passes locally but Shopify is stricter) — Shopify keeps the last-valid version
     and the CLI still says "success". Fix: simplify/remove the new schema setting (here: hardcode instead of a new `text` setting).
   - Owner-side tweaks they CAN do: the "Routine" facet name (it's the Wellness-goals filter label in the **Search & Discovery**
     app) and the "FILTER:" heading text (locale string) — both editable without code.
   - **Owner feedback round 2 (2026-06-24) — ALL FIXED & verified live (CDP measurement):**
     1. **Kicker "catalog" + Arabic word now orange** — banner splits the kicker/arabic settings on spaces and wraps the last
        kicker word + 2nd Arabic word ("أصلية") in `<em>` (orange via `.sahha-shop-hero .sahha-kicker em` / `__ar em`). ⚠️ Use
        `&nbsp;` as the word separator, NOT a literal space — Liquid `{%- -%}` whitespace-strip ate the spaces (rendered "Productcatalog").
     2. **Sort by moved LEFT** — toolbar `justify-content: flex-start` so it clusters with the count: "14 products  SORT BY …".
     3. **Filter panel overflow bug FIXED** — Dawn hard-codes the inner `.facets__form-vertical` to 26rem (260px), wider than the
        panel's content box → dividers/underline overflowed past the rounded card edge. Fix: `.sahha-shop .facets__form-vertical
        { width:100%; box-sizing:border-box }` + 3-class `.sahha-shop .facets-vertical .facets-wrapper` to win Dawn's padding-right:3rem.
        CDP-verified: form 226px, sits inside panel (form_right 303 < panel_right 330).
     4. **Sticky confirmed** — owner wanted the filter to stay put while scrolling; `position:sticky; top:100px` works (CDP: after
        scrolling 900px, panel_top=100). Stays in view.
   - **Owner feedback round 3 (2026-06-24) — checkboxes + pills restyled + more orange:**
     - **Custom checkboxes** — hid Dawn's plain `square.svg`+checkmark (`.facet-checkbox > svg, > .svg-wrapper{display:none}`),
       restyled the native input (`appearance:none`, rounded 6px, paper bg, line-2 border); **checked = orange fill + white check**
       (inline SVG data-URI). `align-items:flex-start` so the box lines up with 2-line labels.
     - **Active "bubbles"** — tighter pills (mint bg, green text, 1.18rem), **× icon orange** (`.active-facets__button .svg-wrapper`),
       hover → peach bg + orange border. **"Remove all"** reset pill hover → orange (was green).
     - Decision recorded: **Sort stays as the top toolbar** (not in sidebar) + **filter stays sticky** — both are the recommended UX
       (owner asked, agreed to leave as-is). Original site had sort in the sidebar; can move it there later if owner changes mind.
   - **Owner feedback round 4 (2026-06-24):** owner liked the orange checkboxes; still disliked the bubbles + wanted bigger text.
     - **Bubbles:** rendered a 4-variant comparison mock (scratchpad `bubbles-compare.png`) for the owner to pick from; owner chose
       **variant D = soft mint tag · green text · bare orange × (no circle)**, hover bg→tint-sage, ×→accent-deep. (Tried solid-green
       first; owner wanted lighter.)
     - **Filter text more prominent** → group headers 1.44→**1.6rem**; checkbox option labels 1.36→**1.5rem, weight 600**.
     - **Black→green glitch (owner caught)** — unselected option labels were `--ink` (near-black), only turning green when active.
       Fixed: labels + `.facet-checkbox__text` are **always green**, active just bolder (weight 800). My base selector is 0,3,0 so it
       beats Dawn's `.facets__label:hover/.active{color:foreground}` (0,1,1 / 0,2,0). CDP-verified: all labels rgb(46,91,63) on+off.
   - **NOT committed to git** (owner approves commits).
2. ~~**Verify ⚠️ flagged content values**~~ — ✅ **VERIFIED 2026-06-24 against owner's label photos (in `SahhaDaily Docs/product-images-png/<NN>/gallery-*.png`).**
   `migration/content/*.md` all corrected. **Owner still needs to apply 3 edits in ADMIN:**
   - **Multivitamin** — KEY FINDING: WeightWorld's *own web table* is garbled; our content had copied it. Corrected 8 cells vs the
     physical label: Vit C %NRV 100→**150**, Potassium mcg→**mg**, Calcium %NRV 8→**1**, Folic Acid 0→**100**, Chromium 0→**100**,
     Boron `0mcg|0`→**25mcg|***, Choline `|0`→**|***, K2 8→**6** (+matched chemical forms). Owner must **re-paste the Nutrition metafield**.
   - **Vitamin D3+K2** — bottle is actually **365** tablets, NOT 240 (owner confirmed front-of-pack). Updated content + **renamed file
     to `vitamin-d3-k2-mk7-365-tablets.md`**. Owner must update in admin: **title 240→365**, Nutrition serving bar 240→365, benefit
     chip "240→365 tablets per pack" (handle still says 240 — optional). Doses (4000IU D3/125mcg K2, 2000%/166%) were correct.
   - **Kids gummies** — ingredients confirm **vegan** (pectin, no gelatin); added Key-features line `Vegan-friendly, pectin-based
     gummies (no gelatin)`. Owner adds that one line in admin.
   - **Glucosamine** — values already correct (label shows per-1-cap AND per-2-cap; we use 1-cap = official serving). Polished `.md`
     to amount-only + forms; admin re-paste is **optional**.
   - Collagen / Magnesium / Omega-3 / Women's-gummies serving math all consistent — treated as confirmed.
   - 💡 Gotcha: the `product-images-png` gallery assets are WeightWorld marketing images and **may not match the exact pack size**
     (the D3+K2 365-image was initially in a "240" folder). Worth a per-product glance when wiring PDP galleries.
3. ~~**Berberine wellness goal**~~ — ✅ **DONE 2026-06-24.** Added 7th `wellness_goal` metaobject entry: label `Heart, liver and metabolic` · short_label **`Heart`** · description `Berberine support for heart, liver, and metabolic wellness routines.` (Active). Tagged **Berberine only** via `custom.wellness_goals`. Verified live: PDP "Heart" chip + shop Wellness-goals filter value both show (Berberine = only product). No homepage tile (expected — categories section is collection-driven, not goal-driven). All ADMIN, zero code.
4. ~~**Motion pass**~~ — ✅ **DONE 2026-06-24 (subtle; homepage + PDP + catalog).**
   - Custom self-contained system (NOT Dawn's `animations_reveal_on_scroll`, to avoid the settings_data.json push + to scope it):
     `body.sahha-motion` hook (theme.liquid, on index + product + collection) + `snippets/sahha-motion.liquid` (IntersectionObserver
     flips `.is-in`) + reveal/grain CSS in `sahha-brand.css`. Each section after the first **fades + rises** on scroll-in; the first
     section (hero / PDP main / shop banner) stays visible.
   - **Paper-grain**: `.sahha-motion::after` fixed SVG fractal-noise overlay, opacity 0.045, multiply blend, pointer-events:none.
   - **Safety**: hidden state in `<head>` CSS (no FOUC); `<noscript>` + no-IntersectionObserver fallback reveal everything so content
     is never stuck invisible; `prefers-reduced-motion` disables it. **No `will-change`** (would create a containing block that
     breaks the catalog's sticky filter). CDP-verified on all 3 templates; catalog sticky sidebar still `top=100` post-reveal.
5. **Git commit** — NOTHING from the whole PDP + cleanup + content-files effort is committed yet (owner approves master commits). When ready: footer ©-strip + orphan deletions + `sahha-product.liquid` + `sahha-faq.liquid` + `templates/product.json` + `migration/content/*` + this status file.
5. **Small/optional:** delete orphaned `sections/sahha-routine-finder.liquid` + `sections/sahha-product-details.liquid` (+ `snippets/sahha-card-badge.liquid` already deleted locally); verify white footer logo on real theme. Gallery `02–09` images already uploaded to products (confirmed via storefront `.js`).

### 🛠️ Push/verify routine (every theme change)
`HOMEBREW_NO_AUTO_UPDATE=1 /opt/homebrew/Cellar/shopify-cli/4.1.0/bin/shopify theme push --store sahhadaily.myshopify.com --theme 192337019213 --only <file>` → then **pull it back to /tmp and diff** (push can silent-no-op). NEVER push `config/settings_data.json` or pull-first `templates/*.json` (clobbers customizer/logo). Theme check stays 0 errors / 12 pre-existing warnings.

### 🎯 Still-open owner colour feedback (apply per-section as we go)
- Body text tone on dark-green sections should be ivory `#F4F0E6` (some sections hardcode `--ink`).
- Routine finder background too dark — lighten it.
- Page bg should be `#F4F0E6` (was `#F6F2E9`) — owner fixes in customizer (can't push settings_data.json).

### 📱 Mobile pass (2026-06-24)
Owner asked for a comprehensive mobile-friendly pass. **Audit finding (CDP true-mobile emulation at 360/390/430/768px):** the
theme was ALREADY largely responsive — NO horizontal overflow on homepage / PDP / catalog at 390px or 768px; sections stack and
reflow correctly (the Phase-7 port's `@media` rules were doing the work). Real gaps found + fixed:
- **Mobile filter DRAWER was unstyled default Dawn** (black text) — branded it green to match the desktop panel: green headers/labels/
  back-button + the same orange custom checkbox (`.sahha-shop .mobile-facets__*` block in sahha-brand.css). Biggest "felt unfinished" gap.
- **PDP tabs wrapped to 2 rows** on narrow phones — now a single horizontal-scroll row (`.pdx-tabs .tabbar` nowrap/overflow-x at ≤600).
- **Experts modal close button** 42→44px (touch-target minimum); drawer option labels min-height 44px.
- Verified via CDP: drawer labels rgb(46,91,63) green, PDP tabs = 1 row, no overflow.
- ⚠️ NOT yet changed (judgment calls, left for owner feedback): the homepage **featured-collection is a swipe slider** on mobile
  (cards partially cut) — could switch to a 2-col grid; the catalog filter **panel card** styling (cream bg/sticky) is gated ≥990px
  so 750–989px tablet shows the sidebar without the card. Both functional; flagged for owner.

## 💡 Later ideas (owner-flagged)
- ~~**7th wellness goal for Berberine**~~ — ✅ **DONE 2026-06-24** (see STILL LEFT #3). 7 goals now: Energy,
  Immunity, Beauty, Calm, Joints, Family, **Heart**. Every product now in ≥1 goal.

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
