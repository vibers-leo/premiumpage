/**
 * HS-TECH Image Scraper - Browser Console Script
 *
 * HOW TO USE:
 * 1. Visit an HS-TECH product page (e.g., https://hs-tech-en.imweb.me/hmt330)
 * 2. Open Chrome DevTools (F12 or Right-click → Inspect)
 * 3. Click "Console" tab
 * 4. Copy and paste this ENTIRE script
 * 5. Press Enter to run
 * 6. The script will:
 *    - Find all images on the page
 *    - Filter for high-quality CDN images
 *    - Print a formatted list
 *    - Copy URLs to clipboard
 */

(function() {
  console.log('🚀 HS-TECH Image Scraper Starting...\n');

  // Get current product from URL
  const url = window.location.href;
  const productMatch = url.match(/imweb\.me\/([^/?]+)/);
  const productSlug = productMatch ? productMatch[1] : 'unknown';

  console.log('📍 Current URL:', url);
  console.log('📦 Product Slug:', productSlug);
  console.log('\n---\n');

  // Find all images
  const allImages = Array.from(document.querySelectorAll('img'));
  console.log('🖼️  Total <img> tags found:', allImages.length);

  // Filter for CDN images only
  const cdnImages = allImages
    .map(img => img.src)
    .filter(src => src && src.includes('cdn.imweb.me'))
    .filter((src, index, self) => self.indexOf(src) === index); // Remove duplicates

  console.log('☁️  CDN images found:', cdnImages.length);
  console.log('\n---\n');

  if (cdnImages.length === 0) {
    console.warn('⚠️  No CDN images found on this page!');
    console.log('💡 Tips:');
    console.log('  - Make sure the page is fully loaded');
    console.log('  - Scroll down to load lazy-loaded images');
    console.log('  - Click through gallery/carousel arrows');
    console.log('  - Check different tabs if available');
    return;
  }

  // Clean up URLs and get high-quality versions
  const cleanedImages = cdnImages.map((url, index) => {
    // Try to get highest quality by removing size parameters or increasing them
    let highQualUrl = url
      .replace(/\?w=\d+/g, '?w=2400')  // Increase width to max
      .replace(/\?q=\d+/g, '?q=100')   // Set quality to max
      .replace(/\/thumbnail\//g, '/upload/'); // Get original instead of thumbnail

    // If no parameters, try adding high-quality ones
    if (!highQualUrl.includes('?')) {
      highQualUrl = highQualUrl + '?w=2400&q=100';
    }

    return {
      index: index + 1,
      original: url,
      highQuality: highQualUrl,
      filename: url.split('/').pop().split('?')[0]
    };
  });

  // Print formatted list
  console.log('📋 IMAGE LIST:\n');
  cleanedImages.forEach(img => {
    console.log(`${img.index}. ${img.filename}`);
    console.log(`   Original:     ${img.original}`);
    console.log(`   High Quality: ${img.highQuality}`);
    console.log('');
  });

  console.log('\n---\n');

  // Generate file naming suggestions
  console.log('📝 SUGGESTED FILE NAMES:\n');
  const namingSuggestions = cleanedImages.map((img, i) => {
    let suffix = i === 0 ? 'main' : `variant${i}`;

    // Detect image type from filename or URL
    const filename = img.filename.toLowerCase();
    if (filename.includes('diagram') || filename.includes('dimension')) {
      suffix = 'diagram_dimensions';
    } else if (filename.includes('wiring') || filename.includes('circuit')) {
      suffix = 'diagram_wiring';
    } else if (filename.includes('install')) {
      suffix = 'installation';
    } else if (filename.includes('detail')) {
      suffix = 'detail';
    }

    const extension = img.filename.split('.').pop().toLowerCase();
    const suggestedName = `${productSlug}_${suffix}_v1.${extension}`;

    return {
      url: img.highQuality,
      suggestedName: suggestedName
    };
  });

  namingSuggestions.forEach((item, i) => {
    console.log(`${i + 1}. ${item.suggestedName}`);
  });

  console.log('\n---\n');

  // Generate JSON output for mapping file
  const jsonOutput = {
    productId: productSlug,
    scrapedAt: new Date().toISOString(),
    pageUrl: url,
    imageCount: cleanedImages.length,
    newGalleryImages: namingSuggestions.map(item =>
      `/templates/hs-tech/images/products/gallery/${item.suggestedName}`
    ),
    downloadUrls: namingSuggestions.map(item => ({
      url: item.url,
      saveAs: item.suggestedName
    }))
  };

  console.log('📦 JSON OUTPUT (Copy this to hstech-gallery-mapping.json):\n');
  console.log(JSON.stringify(jsonOutput, null, 2));

  console.log('\n---\n');

  // Generate download commands (for manual downloading)
  console.log('💾 DOWNLOAD INSTRUCTIONS:\n');
  console.log('For each image, right-click and "Save Image As..."');
  console.log('Save to: /Users/admin/Desktop/jcatalog/public/templates/hs-tech/images/products/gallery/\n');

  namingSuggestions.forEach((item, i) => {
    console.log(`${i + 1}. Open: ${item.url}`);
    console.log(`   Save as: ${item.suggestedName}\n`);
  });

  console.log('\n---\n');

  // Copy high-quality URLs to clipboard
  const urlList = namingSuggestions.map(item => item.url).join('\n');

  // Try to copy to clipboard (may not work in all browsers)
  if (typeof copy === 'function') {
    copy(urlList);
    console.log('✅ High-quality image URLs copied to clipboard!');
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(urlList)
      .then(() => console.log('✅ High-quality image URLs copied to clipboard!'))
      .catch(() => console.log('⚠️  Could not copy to clipboard automatically'));
  } else {
    console.log('⚠️  Automatic clipboard copy not available');
    console.log('📋 Copy URLs manually from the list above');
  }

  console.log('\n---\n');

  // Summary
  console.log('📊 SUMMARY:');
  console.log(`   Product: ${productSlug}`);
  console.log(`   Images Found: ${cleanedImages.length}`);
  console.log(`   Next Steps:`);
  console.log(`   1. Download all images using URLs above`);
  console.log(`   2. Save with suggested filenames`);
  console.log(`   3. Update hstech-gallery-mapping.json with JSON output`);
  console.log(`   4. Move to next product\n`);

  console.log('✨ Scraping complete!\n');

  // Return data for programmatic access
  return jsonOutput;
})();
