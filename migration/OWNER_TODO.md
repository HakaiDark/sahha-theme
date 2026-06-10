# Sahha Daily — Owner TODO (what only you can do)

These steps need an interactive Shopify login / admin access, so they can't be automated. Everything else (theme code) is being built for you. Work top to bottom.

> Full detail for the data steps lives in **`PHASE1_DATA_IMPORT.md`** (same folder). This is the short checklist.

---

## ✅ Already done (by Claude, in code)
- Dawn theme branded to Sahha Daily (colors, Cairo/Tajawal fonts, two-tone wordmark, WhatsApp bubble).
- Custom homepage sections built: Hero, Experts panel (+ bio modal), Who We Are.
- Phase 1 import file + guide generated (see below).

---

## ▢ Phase 0 — Store + local preview
- [ ] Have a Shopify store (a free **development store** is fine to build on).
- [ ] In `sahha-theme/`, run `shopify theme dev` → log in, pick the store → preview at `http://127.0.0.1:9292`.
- [ ] In admin: set currency **USD**, **Lebanon** market, **Cash on Delivery / manual** payment, **Lebanon** shipping zone.

## ▢ Phase 1 — Get the catalog into Shopify
- [ ] **(optional) Define metafields** under Settings → Custom data → Products (namespace `custom.*`) — or let the import auto-create them.
- [ ] **Import products:** Admin → Products → Import → `migration/shopify-products-import.v2.csv` → *Overwrite existing products with same handle*.
- [ ] **Upload images:** for each product, upload its packshot from `migration/product-images/` (filenames are `NN-<sku>-<slug>.webp`).
- [ ] **Set Price + Inventory** on every product (the CSV leaves these blank — prices were "TBA").
- [ ] **Create collections:** one per category (8 of them — list in PHASE1 doc), smart rule `Product type = <category>`. Plus an all-products collection.
- [ ] **Create metaobjects:** 6 `wellness_goal` + 3 `routine_bundle` entries (handles/values in PHASE1 doc).
- [ ] **Tag products with goals:** set each product's `custom.wellness_goals` (bulk editor) using the SKU→goals table in PHASE1 doc.
- [ ] **Install Search & Discovery** (free) → add filters from `custom.wellness_goals` and `custom.format`.

## ▢ Phase 5 — Bilingual (later)
- [ ] Install **Translate & Adapt** (free), add **Arabic** locale. (Claude wires the RTL theme behavior + two-tone صحة/دايلي wordmark.)

## ▢ Phase 6 — Launch (later)
- [ ] Test a Cash-on-Delivery order end to end.
- [ ] Point the **domain** at Shopify; keep the old Netlify site up until DNS propagates, then decommission.
- [ ] (Optional) Install a free **reviews app** if you want real star ratings instead of the static ones imported now.

---

## 👉 When you finish Phase 0 + Phase 1, tell Claude
Then Claude builds **Phase 4** (product + shop/collection templates that read these metafields) and the **routine finder + routine bundles** homepage sections (that read the metaobjects). The homepage Featured/Categories sections populate automatically once products + collections exist.

## Notes
- `migration/` is git-tracked but excluded from theme pushes via `.shopifyignore` — it never goes to the live store.
- To regenerate the import CSV after editing `migration/data/products.ts`: `cd migration && node gen-shopify-import.mjs > shopify-products-import.v2.csv`.
