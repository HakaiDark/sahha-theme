/* Generate an enriched Shopify product-import CSV from ./data/products.ts.
   Body HTML = short description; every long-form field becomes a custom.* metafield.
   Run (from migration/): node gen-shopify-import.mjs > shopify-products-import.v2.csv
   (metaobject refs — wellness_goals — are set AFTER import; see PHASE1 doc.) */
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('./data/products.ts', import.meta.url), 'utf8');

// Pull the standardSafety constant, then the products array literal, and eval as JS.
const safety = src.match(/const standardSafety = "([^"]*)"/)[1];
const arrText = src.slice(src.indexOf('export const products'));
const literal = arrText
  .slice(arrText.indexOf('['), arrText.indexOf('];') + 1)
  .replace(/standardSafety/g, JSON.stringify(safety));
const products = new Function(`return ${literal}`)();

const BADGE = { bestSeller: 'Best seller', new: 'New', popular: 'Popular', lowStock: 'Low stock' };

// CSV column order. Metafield headers use Shopify's current importer format:
// "<Definition name> (product.metafields.<namespace>.<key>)" — matches what the admin
// Export produces and re-imports. The type comes from the metafield DEFINITION (must
// exist first), so no [type] tag here. The older "Metafield: ns.key [type]" syntax is
// silently ignored by this store's importer.
const cols = [
  'Handle', 'Title', 'Vendor', 'Type', 'Tags', 'Published',
  'Option1 Name', 'Option1 Value', 'Variant SKU',
  'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Inventory Policy',
  'Variant Fulfillment Service', 'Variant Price', 'Variant Requires Shipping',
  'Variant Taxable', 'Variant Weight Unit', 'Status', 'Image Src',
  'Body (HTML)',
  'Format (product.metafields.custom.format)',
  'Badge (product.metafields.custom.badge)',
  'Rating (product.metafields.custom.rating)',
  'Review count (product.metafields.custom.review_count)',
  'Featured (product.metafields.custom.featured)',
  'Key features (product.metafields.custom.key_features)',
  'Benefits (product.metafields.custom.benefits)',
  'Why use (product.metafields.custom.why_use)',
  'Nutrition (product.metafields.custom.nutrition)',
  'Ingredients (product.metafields.custom.ingredients)',
  'How to use (product.metafields.custom.how_to_use)',
  'Safety (product.metafields.custom.safety)',
  'Notes (product.metafields.custom.notes)',
];

const esc = (v) => {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
// Shopify's importer takes list metafields as newline-separated values in the cell
// (one item per line; esc() wraps the multi-line cell in quotes). A JSON array string
// is NOT parsed — it gets stored as a single item. Verified against an admin export.
const list = (arr) => (arr || []).join('\n');

const rows = products.map((p) => ({
  'Handle': p.slug,
  'Title': p.name,
  'Vendor': 'Sahha Daily',
  'Type': p.category,
  'Tags': [p.category, p.format, BADGE[p.label]].filter(Boolean).join(', '),
  'Published': 'TRUE',
  'Option1 Name': 'Title',
  'Option1 Value': 'Default Title',
  'Variant SKU': p.sku,
  'Variant Inventory Tracker': 'shopify',
  'Variant Inventory Qty': '',            // owner sets real stock
  'Variant Inventory Policy': 'deny',
  'Variant Fulfillment Service': 'manual',
  'Variant Price': '0.00',                // placeholder so import validates; owner sets real price in admin (Step 1.4). Not orderable: stock is 0 + policy 'deny'.
  'Variant Requires Shipping': 'TRUE',
  'Variant Taxable': 'TRUE',
  'Variant Weight Unit': 'g',
  'Status': 'active',
  'Image Src': '',                        // upload immersive packshot in admin, or host + paste URL
  'Body (HTML)': `<p>${p.description}</p>`,
  'Format (product.metafields.custom.format)': p.format,
  'Badge (product.metafields.custom.badge)': BADGE[p.label] || '',
  'Rating (product.metafields.custom.rating)': p.rating,
  'Review count (product.metafields.custom.review_count)': p.reviewCount,
  'Featured (product.metafields.custom.featured)': p.featured ? 'true' : 'false',
  'Key features (product.metafields.custom.key_features)': list(p.keyFeatures),
  'Benefits (product.metafields.custom.benefits)': list(p.benefits),
  'Why use (product.metafields.custom.why_use)': list(p.whyUse),
  'Nutrition (product.metafields.custom.nutrition)': list(p.nutritionalInfo),
  'Ingredients (product.metafields.custom.ingredients)': p.ingredients,
  'How to use (product.metafields.custom.how_to_use)': p.howToUse,
  'Safety (product.metafields.custom.safety)': p.safety,
  'Notes (product.metafields.custom.notes)': p.notes,
}));

const out = [cols.join(',')].concat(rows.map((r) => cols.map((c) => esc(r[c])).join(','))).join('\n');
process.stdout.write(out + '\n');
process.stderr.write(`Generated ${rows.length} product rows.\n`);
