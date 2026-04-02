# HS-TECH Gallery Image Collection Project

## 📋 Project Overview

**Goal:** Collect ALL gallery images for the top 50 priority HS-TECH products by scraping their imweb pages.

**Why:** The HS-TECH catalog currently has only 1 image per product. We need comprehensive image galleries (3-10 images per product) showing:
- Product variants (HMT331, HMT333, etc.)
- Technical diagrams (dimensions, wiring)
- Installation examples
- Detail shots

**Expected Outcome:**
- 300+ high-quality product images
- Complete `gallery` arrays in data.ts
- Rich visual catalog for customers

---

## 🎯 Quick Start

### Option A: Manual Scraping (Recommended for thoroughness)

1. **Open the checklist:**
   ```
   /Users/admin/Desktop/jcatalog/scripts/SCRAPING_CHECKLIST.md
   ```

2. **For each product:**
   - Visit the imwebUrl in browser
   - Download all product images
   - Update JSON mapping

3. **Read the full guide:**
   ```
   /Users/admin/Desktop/jcatalog/scripts/GALLERY_SCRAPING_GUIDE.md
   ```

### Option B: Semi-Automated (Faster but requires validation)

1. **Visit a product page:**
   ```
   https://hs-tech-en.imweb.me/hmt330
   ```

2. **Open DevTools Console (F12)**

3. **Run the scraper script:**
   - Copy contents of `browser-console-scraper.js`
   - Paste into Console
   - Press Enter

4. **Follow the output instructions**

---

## 📁 Files Created

| File | Purpose | Location |
|------|---------|----------|
| **hstech-gallery-mapping.json** | Master mapping of all 50 products with URLs | `/scripts/` |
| **GALLERY_SCRAPING_GUIDE.md** | Complete step-by-step guide | `/scripts/` |
| **SCRAPING_CHECKLIST.md** | Quick reference checklist | `/scripts/` |
| **EXAMPLE_FILLED_MAPPING.json** | Example of completed entry | `/scripts/` |
| **browser-console-scraper.js** | Automated browser script | `/scripts/` |
| **README_GALLERY_SCRAPING.md** | This file | `/scripts/` |

---

## 🎯 Top 50 Priority Products

### By Category:
- **VAISALA Humidity:** 15 products (HMT330, HMT310, HMT120, etc.)
- **VAISALA Dewpoint:** 10 products (DMT340, DMT345, DM70, etc.)
- **VAISALA CO2:** 6 products (GMW90, GMD110, GMP343, etc.)
- **VAISALA Oil:** 5 products (MHT410, MMT330, MM70, etc.)
- **VAISALA Barometer:** 4 products (PTB330, PTB210, PTB110, PTU300)
- **VAISALA H2O2:** 1 product (HPP271/272)
- **SETRA Pressure:** 9 products (Setra Lite, Setra Flex, Model MRC, etc.)

### Top Priority (Do First):
1. **HMT330** - Industrial humidity transmitter (6 variants)
2. **HMT310** - Compact humidity transmitter (6 variants)
3. **HMT120** - HVAC humidity transmitter
4. **DMT340** - Industrial dewpoint transmitter
5. **GMW90** - Wall-mount CO2 transmitter
6. **MHT410** - Transformer moisture monitor

---

## 🚀 Process Workflow

### Per Product (5-7 minutes):

```
1. VISIT imweb URL
   ↓
2. WAIT for page to load (images may be lazy-loaded)
   ↓
3. IDENTIFY all images (main, variants, diagrams, installation)
   ↓
4. EXTRACT URLs (use browser script or manual right-click)
   ↓
5. DOWNLOAD images
   Save to: /public/templates/hs-tech/images/products/gallery/
   Name as: {productId}_{variant}_v1.png
   ↓
6. UPDATE JSON
   Add paths to newGalleryImages array in mapping file
   ↓
7. CHECK OFF in checklist
```

### Total Time Estimate:
- **Per product:** 5-7 minutes
- **Total (50 products):** 4-6 hours
- **Recommended:** Do in 3-4 sessions of 10-15 products each

---

## 💡 Tips for Success

### 1. Use the Browser Console Script
The `browser-console-scraper.js` script automates most of the tedious work:
- Automatically finds all images on page
- Suggests file names
- Generates JSON output
- Copies URLs to clipboard

### 2. Batch by Category
Work through one category at a time:
- Day 1: All 15 humidity products
- Day 2: All 10 dewpoint + 6 CO2 products
- Day 3: Remaining products

### 3. Look for Hidden Images
- Click gallery navigation arrows (← →)
- Check all tabs/sections on page
- Scroll to bottom to load lazy images
- Look for "Gallery", "Photos", "Images" sections

### 4. Prioritize Quality
- Download highest resolution available
- Look for URLs with `?w=` parameter and increase: `?w=2400`
- Prefer original uploads over thumbnails
- Minimum 800px width

### 5. Track Progress
Use the checklist to track:
- Which products completed
- How many images per product
- Total images collected
- Estimated time remaining

---

## 📊 Expected Results

### Image Count by Tier:

| Tier | Products | Avg Images/Product | Expected Total |
|------|----------|-------------------|----------------|
| 1 - Humidity | 15 | 6-8 | ~100 images |
| 2 - Dewpoint | 10 | 5-7 | ~60 images |
| 3 - CO2 | 6 | 4-6 | ~30 images |
| 4 - Oil | 5 | 5-7 | ~30 images |
| 5 - Barometer/H2O2 | 5 | 4-6 | ~25 images |
| 6 - Setra | 9 | 4-6 | ~45 images |
| **TOTAL** | **50** | **5-7** | **~300 images** |

### File Size:
- Average per image: 200-500 KB
- Total estimated: 100-300 MB

---

## 🎨 Image Types to Collect

### Must Have (Every Product):
- ✅ Main product photo (hero shot)
- ✅ At least 2-3 variant images OR technical diagrams

### Should Have:
- 📐 Dimensional drawings
- 🔌 Wiring diagrams
- 🏗️ Installation examples

### Nice to Have:
- 🔍 Detail shots (display, connectors, mounting)
- 📸 Application photos (product in use)
- 🔄 Different angles/perspectives

---

## 📝 File Naming Convention

**Format:**
```
{productId}_{type}_{descriptor}_v1.{ext}
```

**Examples:**

### For HMT330 (has 6 variants):
```
hmt330_main_v1.png                    ← Main hero image
hmt330_variant_hmt331_v1.png          ← Wall-mount model
hmt330_variant_hmt333_v1.png          ← Duct model
hmt330_variant_hmt334_v1.png          ← High pressure model
hmt330_variant_hmt335_v1.png          ← High temp model
hmt330_variant_hmt337_v1.png          ← High humidity model
hmt330_variant_hmt338_v1.png          ← Pipeline model
hmt330_diagram_dimensions_v1.png      ← Dimensional drawing
hmt330_diagram_wiring_v1.png          ← Wiring diagram
hmt330_installation_wall_v1.png       ← Wall installation
hmt330_installation_duct_v1.png       ← Duct installation
```

### For DMT340 (fewer variants):
```
dmt340_main_v1.png
dmt340_diagram_dimensions_v1.png
dmt340_diagram_wiring_v1.png
dmt340_installation_v1.png
dmt340_detail_display_v1.png
```

### For Setra Lite (visual indicator):
```
setra_lite_main_v1.png
setra_lite_detail_display_v1.png
setra_lite_diagram_mounting_v1.png
setra_lite_installation_v1.png
```

---

## 🔧 Troubleshooting

### Problem: Page loads but images don't appear
**Solution:**
- Wait 10 seconds for lazy loading
- Scroll down to trigger load
- Disable ad blockers
- Try different browser (Chrome recommended)

### Problem: Can't right-click to save image
**Solution:**
- Use DevTools Network tab to find image URL
- Use browser console script
- Screenshot and crop (last resort)

### Problem: Image URL shows "blob:https://..."
**Solution:**
- This is a temporary URL
- Check DevTools Network tab for actual CDN URL
- Use console script to extract real URLs

### Problem: Product page not found (404)
**Solution:**
- Try alternate URLs from JSON mapping
- Search site manually for product
- Check if product name has changed
- Some products may share pages (e.g., DMT345/346)

### Problem: Low resolution images only
**Solution:**
- Look for URL parameters: `?w=800` → change to `?w=2400`
- Replace `/thumbnail/` with `/upload/` in URL
- Try removing all URL parameters to get original

---

## ✅ Quality Checklist

Before marking a product as complete:

- [ ] **Minimum 3 images** collected (main + 2 variants/diagrams)
- [ ] **Images are high resolution** (800px+ width, preferably 1200px+)
- [ ] **All variants covered** (check data.ts specs for model numbers)
- [ ] **Technical diagrams included** (dimensions, wiring, installation)
- [ ] **Images properly named** following convention
- [ ] **No duplicate images**
- [ ] **JSON mapping updated** with all paths
- [ ] **Files saved to correct folder** (`/gallery/`)
- [ ] **Checked box in checklist**

---

## 🎯 After Completion

Once all 50 products are scraped:

### 1. Verify JSON File
```bash
# Check that all products have newGalleryImages populated
cat /Users/admin/Desktop/jcatalog/scripts/hstech-gallery-mapping.json | grep "newGalleryImages"
```

### 2. Count Images
```bash
# Should have 150-300+ images
ls -1 /Users/admin/Desktop/jcatalog/public/templates/hs-tech/images/products/gallery/ | wc -l
```

### 3. Update data.ts
- Copy `newGalleryImages` arrays from JSON mapping
- Update corresponding `gallery` fields in data.ts
- Example:
```typescript
{
  id: 'hmt330',
  gallery: [
    "/templates/hs-tech/images/products/gallery/hmt330_main_v1.png",
    "/templates/hs-tech/images/products/gallery/hmt330_variant_hmt331_v1.png",
    // ... all images from newGalleryImages
  ]
}
```

### 4. Test Build
```bash
cd /Users/admin/Desktop/jcatalog
npm run build
```

### 5. Test in Browser
```bash
npm run dev
# Visit: http://localhost:3000/templates/hs-tech/en/
# Check each product page
# Verify all gallery images load
```

### 6. Commit Changes
```bash
git add .
git commit -m "feat(hs-tech): add comprehensive gallery images for top 50 products

- Added 300+ product images scraped from imweb pages
- Updated gallery arrays in data.ts
- Includes product variants, technical diagrams, and installation examples"
git push
```

---

## 📈 Progress Tracking

### Session Log Template:
```
Date: ___________
Session: ___/___
Products: ___ to ___
Completed: ___
Images: ___
Time: ___ hours
Notes: ___________
```

### Daily Goals:
- **Day 1:** Complete Tier 1 (15 humidity products) = ~100 images
- **Day 2:** Complete Tier 2 + 3 (16 products) = ~90 images
- **Day 3:** Complete Tier 4 + 5 + 6 (19 products) = ~110 images

---

## 🏆 Success Criteria

This project is complete when:

✅ All 50 products have gallery images collected
✅ Minimum 150 images total (average 3+ per product)
✅ Target 300+ images total (average 6+ per product)
✅ JSON mapping file fully populated
✅ All images saved to gallery folder
✅ data.ts updated with new gallery arrays
✅ Build passes without errors
✅ All images display correctly in browser
✅ Changes committed to git

---

## 📞 Support

If you need help:

1. **Check the full guide:** `GALLERY_SCRAPING_GUIDE.md`
2. **Try the browser script:** `browser-console-scraper.js`
3. **Reference the example:** `EXAMPLE_FILLED_MAPPING.json`
4. **Use the checklist:** `SCRAPING_CHECKLIST.md`

---

## 🎉 Final Notes

This is a significant upgrade to the HS-TECH catalog. The comprehensive image galleries will:

- **Improve user experience** - Customers can see product variants and details
- **Increase engagement** - More visual content = longer session times
- **Build trust** - Professional galleries show product expertise
- **Aid decision-making** - Technical diagrams help engineers select right products
- **Reduce support inquiries** - Visual info answers common questions

**Take your time, be thorough, and the result will be worth it!**

Good luck! 🚀

---

**Created:** 2024-02-19
**For:** HS-TECH Electronic Catalog
**Products:** Top 50 priority (VAISALA + SETRA)
**Expected Images:** 300+
**Estimated Time:** 4-6 hours
