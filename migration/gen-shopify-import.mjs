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

// CSV column order. Metafield headers carry their type in [brackets] per Shopify spec.
const cols = [
  'Handle', 'Title', 'Vendor', 'Type', 'Tags', 'Published',
  'Option1 Name', 'Option1 Value', 'Variant SKU',
  'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Inventory Policy',
  'Variant Fulfillment Service', 'Variant Price', 'Variant Requires Shipping',
  'Variant Taxable', 'Variant Weight Unit', 'Status', 'Image Src',
  'Body (HTML)',
  'Metafield: custom.format [single_line_text_field]',
  'Metafield: custom.badge [single_line_text_field]',
  'Metafield: custom.rating [number_decimal]',
  'Metafield: custom.review_count [number_integer]',
  'Metafield: custom.featured [boolean]',
  'Metafield: custom.key_features [list.single_line_text_field]',
  'Metafield: custom.benefits [list.single_line_text_field]',
  'Metafield: custom.why_use [list.single_line_text_field]',
  'Metafield: custom.nutrition [list.single_line_text_field]',
  'Metafield: custom.ingredients [multi_line_text_field]',
  'Metafield: custom.how_to_use [multi_line_text_field]',
  'Metafield: custom.safety [multi_line_text_field]',
  'Metafield: custom.notes [multi_line_text_field]',
];

const esc = (v) => {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const list = (arr) => JSON.stringify(arr || []); // Shopify list metafields take a JSON array string

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
  'Variant Price': '',                    // owner sets price (was "TBA")
  'Variant Requires Shipping': 'TRUE',
  'Variant Taxable': 'TRUE',
  'Variant Weight Unit': 'g',
  'Status': 'active',
  'Image Src': '',                        // upload immersive packshot in admin, or host + paste URL
  'Body (HTML)': `<p>${p.description}</p>`,
  'Metafield: custom.format [single_line_text_field]': p.format,
  'Metafield: custom.badge [single_line_text_field]': BADGE[p.label] || '',
  'Metafield: custom.rating [number_decimal]': p.rating,
  'Metafield: custom.review_count [number_integer]': p.reviewCount,
  'Metafield: custom.featured [boolean]': p.featured ? 'true' : 'false',
  'Metafield: custom.key_features [list.single_line_text_field]': list(p.keyFeatures),
  'Metafield: custom.benefits [list.single_line_text_field]': list(p.benefits),
  'Metafield: custom.why_use [list.single_line_text_field]': list(p.whyUse),
  'Metafield: custom.nutrition [list.single_line_text_field]': list(p.nutritionalInfo),
  'Metafield: custom.ingredients [multi_line_text_field]': p.ingredients,
  'Metafield: custom.how_to_use [multi_line_text_field]': p.howToUse,
  'Metafield: custom.safety [multi_line_text_field]': p.safety,
  'Metafield: custom.notes [multi_line_text_field]': p.notes,
}));

const out = [cols.join(',')].concat(rows.map((r) => cols.map((c) => esc(r[c])).join(','))).join('\n');
process.stdout.write(out + '\n');
process.stderr.write(`Generated ${rows.length} product rows.\n`);
