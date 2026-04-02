/**
 * HS-TECH Gallery Image Scraper
 * Scrapes imweb pages to collect all product gallery images
 */

// Top 50 Priority Products (VAISALA priority)
const PRIORITY_PRODUCTS = [
  // VAISALA Humidity (15 products)
  { id: 'hmt330', name: 'HMT330', category: 'humidity' },
  { id: 'hmt310', name: 'HMT310', category: 'humidity' },
  { id: 'hmt120', name: 'HMT120', category: 'humidity' },
  { id: 'hmt370ex', name: 'HMT370EX', category: 'humidity' },
  { id: 'hmt360', name: 'HMT360', category: 'humidity' },
  { id: 'hmd60', name: 'HMD60', category: 'humidity' },
  { id: 'hmw90', name: 'HMW90', category: 'humidity' },
  { id: 'hmdw110', name: 'HMDW110', category: 'humidity' },
  { id: 'hmdw80', name: 'HMDW80', category: 'humidity' },
  { id: 'indigo80_hmp80', name: 'Indigo80-HMP80', category: 'humidity' },
  { id: 'hm70', name: 'HM70', category: 'humidity' },
  { id: 'hm40', name: 'HM40', category: 'humidity' },
  { id: 'shm40', name: 'SHM40', category: 'humidity' },
  { id: 'hmk15', name: 'HMK15', category: 'humidity' },
  { id: 'hmp155', name: 'HMP155', category: 'humidity' },

  // VAISALA Dewpoint (10 products)
  { id: 'dmt340', name: 'DMT340', category: 'dewpoint' },
  { id: 'dmt345', name: 'DMT345-346', category: 'dewpoint' },
  { id: 'dm70', name: 'DM70', category: 'dewpoint' },
  { id: 'dmt143', name: 'DMT143', category: 'dewpoint' },
  { id: 'dmt143l', name: 'DMT143L', category: 'dewpoint' },
  { id: 'dmt152', name: 'DMT152', category: 'dewpoint' },
  { id: 'dmt132', name: 'DMT132', category: 'dewpoint' },
  { id: 'indigo80_dmp80', name: 'Indigo80-DMP80', category: 'dewpoint' },
  { id: 'dpt146', name: 'DPT146', category: 'dewpoint' },
  { id: 'dpt145', name: 'DPT145', category: 'dewpoint' },

  // VAISALA CO2 (6 products)
  { id: 'gmw90', name: 'GMW90', category: 'co2' },
  { id: 'gmd110', name: 'GMD110', category: 'co2' },
  { id: 'gmp343', name: 'GMP343', category: 'co2' },
  { id: 'gmp251', name: 'GMP251', category: 'co2' },
  { id: 'gmp252', name: 'GMP252', category: 'co2' },
  { id: 'gmw80', name: 'GMW80', category: 'co2' },

  // VAISALA Oil (5 products)
  { id: 'mht410', name: 'MHT410', category: 'oil' },
  { id: 'mmt330', name: 'MMT330', category: 'oil' },
  { id: 'mmt310', name: 'MMT310', category: 'oil' },
  { id: 'mm70', name: 'MM70', category: 'oil' },
  { id: 'mmt162', name: 'MMT162', category: 'oil' },

  // VAISALA Barometer (4 products)
  { id: 'ptb330', name: 'PTB330', category: 'barometer' },
  { id: 'ptb210', name: 'PTB210', category: 'barometer' },
  { id: 'ptb110', name: 'PTB110', category: 'barometer' },
  { id: 'ptu300', name: 'PTU300', category: 'barometer' },

  // VAISALA H2O2 (1 product)
  { id: 'hpp271', name: 'HPP271-272', category: 'h2o2' },

  // SETRA (9 products)
  { id: 'setra_lite', name: 'Setra-Lite', category: 'setra' },
  { id: 'setra_flex', name: 'Setra-Flex', category: 'setra' },
  { id: 'model_mrc', name: 'Model-MRC', category: 'setra' },
  { id: 'model_mrg', name: 'Model-MRG', category: 'setra' },
  { id: 'model_264', name: 'Model-264', category: 'setra' },
  { id: 'pdt101', name: 'PDT101', category: 'setra' },
  { id: 'pdt102', name: 'PDT102', category: 'setra' },
  { id: 'model_axd', name: 'Model-AXD', category: 'setra' },
  { id: 'model_206', name: 'Model-206', category: 'setra' },
];

// Generate imweb URL mapping
function generateImwebMapping() {
  const baseUrl = 'https://hs-tech-en.imweb.me';

  return PRIORITY_PRODUCTS.map(product => {
    // Convert product ID to URL slug
    let urlSlug = product.name.toLowerCase()
      .replace(/\+/g, '-')
      .replace(/\//g, '-')
      .replace(/\s+/g, '-');

    return {
      productId: product.id,
      productName: product.name,
      category: product.category,
      imwebUrl: `${baseUrl}/${urlSlug}`,
      alternateUrls: [
        `${baseUrl}/${product.id}`,
        `${baseUrl}/product/${urlSlug}`,
        `${baseUrl}/product/${product.id}`,
      ]
    };
  });
}

// Output the mapping
const mapping = generateImwebMapping();

console.log('=== HS-TECH Product to Imweb URL Mapping ===\n');
console.log(JSON.stringify(mapping, null, 2));

console.log('\n\n=== Total Products: ' + mapping.length + ' ===');
console.log('\nBreakdown by category:');
const categoryCount = mapping.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});
console.log(categoryCount);

// Export for scraping
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRIORITY_PRODUCTS, generateImwebMapping };
}
