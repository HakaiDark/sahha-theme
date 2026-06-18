# Phase 1 — Catalog data into Shopify (field map + checklist)

**For:** this Dawn theme (`sahha-theme/`). Do these in the Shopify **admin** (most can't be done from the CLI). The theme code that reads this data (**Phase 4** — product page, shop-card badges, routine finder, routine bundles) is **already built**, so each step below makes a part of the storefront light up automatically.

Two ready-made artifacts (in this repo):
- **`shopify-products-import.v2.csv`** — all 14 products with Body HTML + every long-form field as `custom.*` metafields, ready to import.
- **`gen-shopify-import.mjs`** — regenerates that CSV from `data/products.ts` if the catalog changes (from inside `migration/`: `node gen-shopify-import.mjs > shopify-products-import.v2.csv`).

---

## A. Field → Shopify destination map

| `products.ts` field | Shopify destination | Notes |
|---|---|---|
| `name` | Product **Title** | in CSV |
| `slug` | **Handle** | matches old Netlify URLs → clean redirects |
| `sku` | **Variant SKU** | the join key; keep stable |
| `category` | **Type** + a **Collection** | see §C |
| `format` | metafield `custom.format` | also a **Tag** → enables a format filter |
| `price` | **Variant Price** | ⚠️ blank in CSV — **you set real prices** (was "TBA") |
| `quantity` | **Variant Inventory Qty** | ⚠️ blank in CSV — **you set real stock** |
| `image` | Product image | upload the `migration/product-images/*.webp` packshot per product — files are named `NN-<sku>-<slug>.webp` (CSV `Image Src` is blank — Shopify can't read local paths) |
| `description` | **Body (HTML)** | short intro paragraph |
| `keyFeatures[]` | `custom.key_features` (list.single_line) | |
| `benefits[]` | `custom.benefits` (list.single_line) | |
| `whyUse[]` | `custom.why_use` (list.single_line) | |
| `nutritionalInfo[]` | `custom.nutrition` (list.single_line) | renders the nutrition rows |
| `ingredients` | `custom.ingredients` (multi_line) | |
| `howToUse` | `custom.how_to_use` (multi_line) | |
| `safety` | `custom.safety` (multi_line) | |
| `notes` | `custom.notes` (multi_line) | |
| `rating` | `custom.rating` (number_decimal) | static; swap for a reviews app later if you want real reviews |
| `reviewCount` | `custom.review_count` (number_integer) | static |
| `label` | `custom.badge` (single_line) + **Tag** | Best seller / New / Popular / Low stock |
| `featured` | `custom.featured` (boolean) | drives the homepage "Featured" set |
| `(wellness goals)` | `custom.wellness_goals` (list.metaobject_reference → `wellness_goal`) | **set after import** — see §D. Powers the shop goal filter + PDP "fits these routines" |
| `number`, `sourceUrl` | — | internal only; skip |

All `custom.*` metafields are auto-created on first import **except** define them first if you want them pinned/typed exactly — Settings → Custom data → Products → *Add definition* using the names/types above. The CSV's `[type]` headers also create them on import.

---

## B. Import the products

1. Admin → **Products → Import** → upload `shopify-products-import.v2.csv` → *Overwrite existing products with same handle*.
2. After import, open each product and **upload its packshot** from `migration/product-images/` (filenames are `NN-<sku>-<slug>.webp`).
3. Set **Price** and **Inventory** on each (or do a bulk edit). Until priced, keep WhatsApp as the buy path.
4. Spot-check one product's **Metafields** section shows the lists/benefits/nutrition.

### ⚠️ Import gotchas (learned the hard way 2026-06-15 — the v2 CSV now handles all three)
Shopify's **current** product importer is pickier than the legacy docs suggest. All three were silently breaking the import until fixed in `gen-shopify-import.mjs`:
1. **Price cannot be blank.** A blank `Variant Price` makes Shopify reject the **entire row** ("Validation failed: Price can't be blank") — including its metafields. The generator now writes a **`0.00` placeholder** (products stay non-orderable: stock 0 + policy `deny`). ➜ **Setting real prices in Step 1.4 is now mandatory before launch.**
2. **Metafield column headers must be the parenthesized format** `Display name (product.metafields.custom.key)` — the exact form an admin **Export** produces. The legacy `Metafield: custom.key [type]` syntax is **silently ignored** (no error, just no data). Type comes from the **definition**, so the definitions must exist first (see §A — we can no longer skip Step 1.1).
3. **List metafields = newline-separated values** in the cell (one item per line), **not** a JSON array. A JSON array gets stored as a single blob. Verified by hand-entering a list and re-exporting.

**To rediscover the right format for any field:** create the definition, enter one value by hand in admin, **Export all products**, and read how Shopify wrote that cell — then match it in the generator.

**Definitions are NOT auto-created on import** on this store — create all 13 by hand first (Settings → Custom data → Products), matching the names/keys/types in §A. The 4 list fields (key_features, benefits, why_use, nutrition) must be **"List of values"**, not "One value".

---

## C. Collections (categories → zero-code shop filters)

Create one **manual** (or smart, by Type) collection per category. Smart rule: `Product type` = the category.

| Collection title | Type value | # products |
|---|---|---|
| Health and Wellness | `Health and Wellness` | 4 |
| Vitamins and Minerals | `Vitamins and Minerals` | 3 |
| Bones and Joints | `Bones and Joints` | 2 |
| Beauty, Hair and Skin | `Beauty, Hair and Skin` | 1 |
| Immunity | `Immunity` | 1 |
| Heart and Liver | `Heart and Liver` | 1 |
| Women's Wellness | `Women's Wellness` | 1 |
| Kids | `Kids` | 1 |

Also create an **all-products** collection (or use the built-in `all`) — the hero + Featured section link to it.

---

## D. Metaobjects (wellness goals + routine bundles)

Admin → **Settings → Custom data → Metaobjects → Add definition**. CSV import can't create these, so add the entries by hand (only 6 + 3).

### Definition 1 — `wellness_goal`
Fields:
| Field name | Key | Type |
|---|---|---|
| Label | `label` | Single line text |
| Short label | `short_label` | Single line text |
| Description | `description` | Multi-line text |

Entries (handle = the id):
| handle | label | short_label |
|---|---|---|
| `daily-energy` | Daily energy and foundations | Energy |
| `immunity` | Immune support | Immunity |
| `beauty` | Beauty, hair and skin | Beauty |
| `stress-sleep` | Calm, focus and evening reset | Calm |
| `bones-joints` | Bones, joints and active living | Joints |
| `family` | Family gummies | Family |

(descriptions are in `data/merchandising.ts`.)

### Definition 2 — `routine_bundle`
Fields:
| Field name | Key | Type |
|---|---|---|
| Title | `title` | Single line text |
| Eyebrow | `eyebrow` | Single line text |
| Description | `description` | Multi-line text |
| Products | `products` | **Product** list (references) |

Entries:
| handle | title | eyebrow | products (SKUs) |
|---|---|---|---|
| `daily-core` | Daily Core Stack | Most universal | CC0410, CC0394, CC0350 |
| `beauty-glow` | Beauty Glow Routine | Hair · skin · nails | CC0224, CC0349, CC0544 |
| `active-mobility` | Active Mobility Pack | Bones and joints | CC0288, CC0009, CC0394, CC0350 |

### Link products → wellness goals
On the `wellness_goals` product metafield (list of `wellness_goal` references), assign each product its goals. Easiest via the bulk editor (Products → select all → Add `custom.wellness_goals` column). Mapping:

| SKU | Product | Wellness goals |
|---|---|---|
| CC0224 | Pure Marine Collagen | beauty |
| CC0460 | Ashwagandha KSM-66 | stress-sleep |
| CC0533 | Magnesium Glycinate | daily-energy, stress-sleep |
| CC0350 | Omega-3 Fish Oil | bones-joints |
| CC0410 | Multivitamins w/ Minerals | daily-energy, immunity |
| CC0394 | Vitamin D3+K2 MK7 | daily-energy, immunity, bones-joints |
| CC0009 | Calcium Mag Zinc D3 | bones-joints |
| CC0349 | Biotin 12000mcg | beauty |
| CC0544 | Women's Multivitamin Gummies | beauty, family |
| CC0513 | Kids Iron+Vit C Gummies | immunity, family |
| CC0505 | Vitamin C & Zinc | immunity |
| CC0530 | Berberine 500mg | *(none)* |
| CC0288 | Glucosamine & Chondroitin | bones-joints |
| CC0409 | Vitamin B Complex | daily-energy, stress-sleep |

---

## E. Enable filtering (required for the routine finder)
Install the free **Search & Discovery** app → add filters from `custom.wellness_goals` and `custom.format` (+ price, availability). This replaces the old client-side `ShopFilters` with zero code. **This is not optional for the routine experience:** the homepage Routine Finder cards and the product-page "fits these routines" chips link to `/collections/all?filter.p.m.custom.wellness_goals=…`, which only actually filters once this app's `custom.wellness_goals` filter exists.

## F. What lights up as you finish each step (Phase 4 is already built)
The theme code is done and waiting — no further build step from me is required. Each data step above turns on a part of the storefront automatically:
- **Products imported + metafields filled** → the "Sahha Product Details" section renders key features, benefits, why-use, how-to-use, nutrition, ingredients, safety, notes, and rating stars.
- **`custom.badge` set** → the marketing badge ("Best seller" etc.) shows on shop/collection cards.
- **`wellness_goal` metaobjects created + Search & Discovery filter installed (§D, §E)** → the homepage **Routine Finder** and the PDP "fits these routines" chips work.
- **`routine_bundle` metaobjects created (§D)** → the homepage **Routine Bundles** section appears; its "add all to cart" button shows once every product in a bundle is priced + in stock.
- **Collections created** → the homepage Featured/Categories sections populate.

Until then, every one of these sections stays hidden (safe to ship). If you want a visual tweak after seeing it live, that's the only thing left for me.
