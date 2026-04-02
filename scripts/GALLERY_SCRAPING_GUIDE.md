# HS-TECH Gallery Image Scraping Guide

## Overview
This guide will help you manually scrape gallery images for the top 50 priority HS-TECH products from their imweb pages.

## Why Manual Scraping?
The hs-tech-en.imweb.me website uses client-side rendering (CSR), which means automated tools like WebFetch cannot access the dynamic image content. You'll need to visit each page manually in a browser.

## Quick Start Checklist

### Phase 1: Setup (5 minutes)
- [ ] Open `hstech-gallery-mapping.json` in your code editor
- [ ] Create directory: `/Users/admin/Desktop/jcatalog/public/templates/hs-tech/images/products/gallery/`
- [ ] Open a browser (Chrome recommended for DevTools)
- [ ] Create a text file to track progress: `scraping-progress.txt`

### Phase 2: Scraping Process (Per Product)

#### For each product in the mapping file:

1. **Visit the imwebUrl**
   - Copy the URL from `imwebUrl` field
   - Paste into browser and load the page
   - Wait for all images to fully load

2. **Identify ALL Images**
   Look for:
   - [ ] Main product hero image
   - [ ] Product variant images (different models, e.g., HMT331, HMT333, etc.)
   - [ ] Detail/close-up shots
   - [ ] Technical diagrams
   - [ ] Installation examples
   - [ ] Dimensional drawings
   - [ ] Wiring diagrams
   - [ ] Application photos

3. **Extract Image URLs**
   - Right-click on each image → "Inspect" or "Inspect Element"
   - Find the `<img>` tag in DevTools
   - Copy the `src` attribute (should look like: `https://cdn.imweb.me/upload/...`)
   - Add to a list for this product

4. **Download Images**
   - Right-click each image → "Save Image As..."
   - Save to: `/Users/admin/Desktop/jcatalog/public/templates/hs-tech/images/products/gallery/`
   - Name: `{productId}_{description}_v1.png`
   - Example: `hmt330_variant1_v1.png`, `hmt330_diagram_v1.png`

5. **Update JSON Mapping**
   - In `hstech-gallery-mapping.json`, find the product
   - Add all downloaded image paths to `newGalleryImages` array
   - Example:
   ```json
   "newGalleryImages": [
     "/templates/hs-tech/images/products/gallery/hmt330_main_v1.png",
     "/templates/hs-tech/images/products/gallery/hmt330_variant1_v1.png",
     "/templates/hs-tech/images/products/gallery/hmt330_variant2_v1.png",
     "/templates/hs-tech/images/products/gallery/hmt330_diagram_v1.png"
   ]
   ```

6. **Mark Complete**
   - Add checkmark in `scraping-progress.txt`
   - Move to next product

## Priority Order

### Tier 1: VAISALA Humidity (15 products) - DO THESE FIRST
1. HMT330 - https://hs-tech-en.imweb.me/hmt330 ⭐⭐⭐
2. HMT310 - https://hs-tech-en.imweb.me/hmt310 ⭐⭐⭐
3. HMT120 - https://hs-tech-en.imweb.me/hmt120 ⭐⭐⭐
4. HMT370EX - https://hs-tech-en.imweb.me/hmt370ex
5. HMT360 - https://hs-tech-en.imweb.me/hmt360
6. HMD60 - https://hs-tech-en.imweb.me/hmd60
7. HMW90 - https://hs-tech-en.imweb.me/hmw90
8. HMDW110 - https://hs-tech-en.imweb.me/hmdw110
9. HMDW80 - https://hs-tech-en.imweb.me/hmdw80
10. Indigo80+HMP80 - https://hs-tech-en.imweb.me/indigo80
11. HM70 - https://hs-tech-en.imweb.me/hm70
12. HM40 - https://hs-tech-en.imweb.me/hm40
13. SHM40 - https://hs-tech-en.imweb.me/shm40
14. HMK15 - https://hs-tech-en.imweb.me/hmk15
15. HMP155 - https://hs-tech-en.imweb.me/hmp155

### Tier 2: VAISALA Dewpoint (10 products)
16. DMT340 - https://hs-tech-en.imweb.me/dmt340 ⭐⭐
17. DMT345/346 - https://hs-tech-en.imweb.me/dmt345 ⭐⭐
18. DM70 - https://hs-tech-en.imweb.me/dm70 ⭐⭐
19. DMT143 - https://hs-tech-en.imweb.me/dmt143
20. DMT143L - https://hs-tech-en.imweb.me/dmt143l
21. DMT152 - https://hs-tech-en.imweb.me/dmt152
22. DMT132 - https://hs-tech-en.imweb.me/dmt132
23. Indigo80+DMP80 - https://hs-tech-en.imweb.me/indigo80
24. DPT146 - https://hs-tech-en.imweb.me/dpt146
25. DPT145 - https://hs-tech-en.imweb.me/dpt145

### Tier 3: VAISALA CO2 (6 products)
26. GMW90 - https://hs-tech-en.imweb.me/gmw90 ⭐
27. GMD110 - https://hs-tech-en.imweb.me/gmd110 ⭐
28. GMP343 - https://hs-tech-en.imweb.me/gmp343
29. GMP251 - https://hs-tech-en.imweb.me/gmp251
30. GMP252 - https://hs-tech-en.imweb.me/gmp252
31. GMW80 - https://hs-tech-en.imweb.me/gmw80

### Tier 4: VAISALA Oil (5 products)
32. MHT410 - https://hs-tech-en.imweb.me/mht410 ⭐
33. MMT330 - https://hs-tech-en.imweb.me/mmt330
34. MMT310 - https://hs-tech-en.imweb.me/mmt310
35. MM70 - https://hs-tech-en.imweb.me/mm70
36. MMT162 - https://hs-tech-en.imweb.me/mmt162

### Tier 5: VAISALA Barometer + H2O2 (5 products)
37. PTB330 - https://hs-tech-en.imweb.me/ptb330
38. PTB210 - https://hs-tech-en.imweb.me/ptb210
39. PTB110 - https://hs-tech-en.imweb.me/ptb110
40. PTU300 - https://hs-tech-en.imweb.me/ptu300
41. HPP271/272 - https://hs-tech-en.imweb.me/hpp271

### Tier 6: SETRA (9 products)
42. Setra Lite - https://hs-tech-en.imweb.me/setra-lite
43. Setra Flex - https://hs-tech-en.imweb.me/setra-flex
44. Model MRC - https://hs-tech-en.imweb.me/model-mrc
45. Model MRG - https://hs-tech-en.imweb.me/model-mrg
46. Model 264 - https://hs-tech-en.imweb.me/model-264
47. PDT101 - https://hs-tech-en.imweb.me/pdt101
48. PDT102 - https://hs-tech-en.imweb.me/pdt102
49. Model AXD - https://hs-tech-en.imweb.me/model-axd
50. Model 206 - https://hs-tech-en.imweb.me/model-206

## Image Naming Convention

Follow this strict naming convention:

```
{productId}_{variant|diagram|detail|installation}_{number}_v1.png
```

### Examples:

#### For HMT330 (multiple variants):
- `hmt330_main_v1.png` - Main hero image
- `hmt330_variant_hmt331_v1.png` - Wall-mount model
- `hmt330_variant_hmt333_v1.png` - Duct model
- `hmt330_variant_hmt334_v1.png` - High pressure model
- `hmt330_diagram_dimensions_v1.png` - Dimensional drawing
- `hmt330_diagram_wiring_v1.png` - Wiring diagram
- `hmt330_installation_v1.png` - Installation example

#### For Setra Lite:
- `setra_lite_main_v1.png` - Product front view
- `setra_lite_detail_display_v1.png` - Display close-up
- `setra_lite_diagram_mounting_v1.png` - Mounting diagram

## Browser DevTools Tips

### Chrome DevTools (F12):
1. Open DevTools (F12 or Right-click → Inspect)
2. Click "Network" tab
3. Filter by "Img" (images only)
4. Reload the page
5. Click on any image in the Network tab to see full URL
6. Copy URL from "Request URL" field

### Finding Hidden Images:
Some images may be in carousels or hidden tabs:
- Look for image gallery navigation arrows (← →)
- Click through all tabs/sections on the page
- Scroll down to load lazy-loaded images
- Check for "Gallery", "Photos", "Images" tabs

## Advanced Scraping Tips

### 1. Use Browser Console to Extract All Images
Open Chrome DevTools Console (F12 → Console tab) and run:

```javascript
// Extract all image URLs on the page
const images = Array.from(document.querySelectorAll('img'))
  .map(img => img.src)
  .filter(src => src.includes('cdn.imweb.me'))
  .filter((src, index, self) => self.indexOf(src) === index); // Remove duplicates

console.log('Found images:', images.length);
images.forEach((url, i) => console.log(`${i+1}. ${url}`));

// Copy to clipboard
copy(images.join('\n'));
```

This will:
- Find ALL `<img>` tags on the page
- Filter for imweb CDN URLs
- Remove duplicates
- Print the list to console
- Copy all URLs to clipboard (paste into a text file)

### 2. Bulk Download with Browser Extension
Install a bulk image downloader extension:
- **Image Downloader** (Chrome/Edge)
- **Download All Images** (Firefox)

These can save 10+ images at once from a single page.

### 3. Check for High-Resolution Versions
Some CDN URLs have quality parameters:
- Look for `?w=800` or `?q=85` in URLs
- Try increasing width: `?w=1920` or `?w=2400`
- Try max quality: `?q=100`
- Remove parameters entirely to get original: `https://cdn.imweb.me/upload/.../image.png`

## Quality Checks

Before marking a product as complete, verify:

- [ ] At least 3 images per product (main + variants/diagrams)
- [ ] Images are high resolution (preferably 800px+ width)
- [ ] All variants are captured (check specs in data.ts for model numbers)
- [ ] Technical diagrams included (dimensions, wiring, installation)
- [ ] Images are properly named with convention
- [ ] No duplicate images
- [ ] All images saved to `/gallery/` folder
- [ ] JSON mapping updated with all paths

## Common Issues & Solutions

### Issue: Page loads but no images appear
**Solution:** Wait 5-10 seconds, images may be lazy-loading. Scroll down to trigger load.

### Issue: Right-click is disabled
**Solution:** Use DevTools Network tab or Console script above.

### Issue: URL shows "blob:https://..." instead of CDN
**Solution:** This is a local blob URL. Look in Network tab for actual CDN URL.

### Issue: Can't find the product page (404 error)
**Solution:** Try alternate URLs from the JSON mapping, or search the site navigation.

### Issue: Multiple sizes of same image
**Solution:** Download the largest version. Check URL parameters for width/quality.

## Progress Tracking Template

Create a file `scraping-progress.txt` with:

```
HS-TECH Gallery Scraping Progress
Started: [DATE]

TIER 1 - VAISALA HUMIDITY (15/15)
[ ] 1. HMT330 - ___ images
[ ] 2. HMT310 - ___ images
[ ] 3. HMT120 - ___ images
... (continue for all 50)

Total Products: 0/50
Total Images: 0
Estimated Time Remaining: 50 products × 5 min = 4 hours
```

Update this file after completing each product.

## Estimated Time

- Per product: 3-7 minutes (depending on number of images)
- Total for 50 products: **3-6 hours**
- Recommended: Do in batches of 10-15 products per session

## Batch Processing Strategy

### Session 1 (1.5 hours): Top 15 Humidity Products
Focus on VAISALA humidity transmitters - these are the most important.

### Session 2 (1 hour): Dewpoint Products
Complete all 10 dewpoint products.

### Session 3 (45 min): CO2 + Oil Products
Complete 11 products total.

### Session 4 (45 min): Barometer + H2O2 + SETRA
Complete remaining 14 products.

## Final Steps

After completing all 50 products:

1. **Verify JSON file**
   - All 50 products have `newGalleryImages` populated
   - All paths use correct convention
   - No typos in file names

2. **Verify images downloaded**
   - Count files in `/gallery/` folder
   - Should have 150-300+ images total
   - All files properly named

3. **Update data.ts**
   - Copy `newGalleryImages` arrays to data.ts `gallery` fields
   - Test build: `npm run build`
   - Verify no broken image paths

4. **Test in browser**
   - Start dev server: `npm run dev`
   - Navigate to each product page
   - Verify all gallery images load correctly
   - Test image carousel/lightbox functionality

## Support

If you encounter issues:
- Check alternate URLs in JSON mapping
- Search the imweb site manually for the product
- Some products may not have dedicated pages (use category pages)
- Document any missing products in `scraping-progress.txt`

## Deliverable

When complete, you should have:
- [x] `hstech-gallery-mapping.json` fully populated with all image URLs
- [x] 150-300+ images in `/public/templates/hs-tech/images/products/gallery/`
- [x] `scraping-progress.txt` showing 50/50 complete
- [x] Updated `data.ts` with new gallery arrays (ready to implement)

---

**Good luck! Take breaks every 10-15 products to avoid fatigue.** 🚀
