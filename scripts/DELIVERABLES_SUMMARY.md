# HS-TECH Gallery Image Collection - Complete Package

## 📦 What You've Received

I've created a comprehensive package to help you collect gallery images for the top 50 HS-TECH products from their imweb pages. Since the imweb site uses client-side rendering (CSR), automated scraping tools cannot access the dynamic content. Therefore, this package provides manual scraping tools and guides.

---

## 🎯 Project Scope

**Objective:** Collect ALL gallery images (product variants, technical diagrams, installation photos) for 50 priority HS-TECH products

**Current State:**
- Each product has only 1 image in `data.ts`
- Gallery arrays are minimal: `gallery: ["/templates/hs-tech/images/products/hmt330_v1.png"]`

**Target State:**
- Each product has 3-10+ images
- Comprehensive galleries: main image + variants + diagrams + installations
- Total: 300+ images across all 50 products

**Why Manual Scraping:**
- imweb.me uses client-side rendering (JavaScript loads images dynamically)
- WebFetch and automated tools only see CSS, not actual image URLs
- Manual browsing is required to access rendered content

---

## 📁 Files Created (7 Total)

### 1. **hstech-gallery-mapping.json** (Master Mapping)
**Location:** `/Users/admin/Desktop/jcatalog/scripts/hstech-gallery-mapping.json`

**Purpose:** Complete mapping of all 50 products with:
- Product IDs and names
- imweb URLs (primary + alternates)
- Current image paths
- Space to fill in `newGalleryImages` array
- Priority ranking
- Product categories

**Example Entry:**
```json
{
  "productId": "hmt330",
  "productName": "HMT330",
  "category": "humidity",
  "priority": 1,
  "imwebUrl": "https://hs-tech-en.imweb.me/hmt330",
  "currentImage": "/templates/hs-tech/images/products/hmt330_v1.png",
  "currentGallery": ["/templates/hs-tech/images/products/hmt330_v1.png"],
  "newGalleryImages": [],  // ← Fill this in after scraping
  "notes": "Check for HMT331, HMT333, HMT334, HMT335, HMT337, HMT338 variant images"
}
```

---

### 2. **GALLERY_SCRAPING_GUIDE.md** (Complete Guide)
**Location:** `/Users/admin/Desktop/jcatalog/scripts/GALLERY_SCRAPING_GUIDE.md`

**Purpose:** Comprehensive step-by-step guide covering:
- Setup instructions
- Detailed scraping process (per product)
- Priority order (which products to do first)
- Image naming conventions
- Browser DevTools tips
- Advanced scraping techniques
- Quality checks
- Common issues & solutions
- Progress tracking template
- Estimated time breakdown
- Final steps (updating data.ts)

**Length:** ~350 lines, extremely detailed

**Key Sections:**
- Quick Start Checklist
- 6 Priority Tiers (Tier 1 = VAISALA Humidity, most important)
- Image naming examples for different product types
- Browser console JavaScript for extracting all images
- Troubleshooting common problems
- Deliverable requirements

---

### 3. **SCRAPING_CHECKLIST.md** (Quick Reference)
**Location:** `/Users/admin/Desktop/jcatalog/scripts/SCRAPING_CHECKLIST.md`

**Purpose:** Printable/quick reference checklist with:
- All 50 products in tables by tier
- Direct URLs for each product
- Checkboxes to mark completion
- Space to write image count
- Progress tracking by tier
- Daily target suggestions
- Quick process summary
- Pro tips (console script, what to look for)

**Format:** Markdown tables, easy to print or view on second monitor

**Use Case:** Open this alongside your browser while scraping

---

### 4. **EXAMPLE_FILLED_MAPPING.json** (Reference Example)
**Location:** `/Users/admin/Desktop/jcatalog/scripts/EXAMPLE_FILLED_MAPPING.json`

**Purpose:** Shows what a completed entry looks like:
- Example `newGalleryImages` array filled out
- Sample image naming (main, variants, diagrams)
- Instructions for how to update data.ts
- Quality checklist
- Expected results summary

**Example:**
```json
"newGalleryImages": [
  "/templates/hs-tech/images/products/gallery/hmt330_main_v1.png",
  "/templates/hs-tech/images/products/gallery/hmt330_variant_hmt331_v1.png",
  "/templates/hs-tech/images/products/gallery/hmt330_variant_hmt333_v1.png",
  "/templates/hs-tech/images/products/gallery/hmt330_diagram_dimensions_v1.png",
  "/templates/hs-tech/images/products/gallery/hmt330_diagram_wiring_v1.png",
  "/templates/hs-tech/images/products/gallery/hmt330_installation_wall_v1.png"
]
```

---

### 5. **browser-console-scraper.js** (Automation Script)
**Location:** `/Users/admin/Desktop/jcatalog/scripts/browser-console-scraper.js`

**Purpose:** JavaScript to run in Chrome DevTools Console that:
- Automatically finds all `<img>` tags on the page
- Filters for imweb CDN URLs
- Removes duplicates
- Attempts to get high-quality versions (increases width/quality params)
- Suggests file names based on product slug
- Generates JSON output to paste into mapping file
- Prints download instructions
- Copies URLs to clipboard

**How to Use:**
1. Visit product page (e.g., https://hs-tech-en.imweb.me/hmt330)
2. Press F12 to open DevTools
3. Click "Console" tab
4. Copy entire contents of this file
5. Paste into console and press Enter
6. Follow the output instructions

**Output Example:**
```
🚀 HS-TECH Image Scraper Starting...

📍 Current URL: https://hs-tech-en.imweb.me/hmt330
📦 Product Slug: hmt330

🖼️  Total <img> tags found: 47
☁️  CDN images found: 9

📋 IMAGE LIST:
1. main.png
   Original:     https://cdn.imweb.me/upload/.../main.png?w=800
   High Quality: https://cdn.imweb.me/upload/.../main.png?w=2400&q=100

2. variant1.png
   ...

📝 SUGGESTED FILE NAMES:
1. hmt330_main_v1.png
2. hmt330_variant1_v1.png
...

✅ High-quality image URLs copied to clipboard!
```

---

### 6. **progress-tracker.txt** (Progress Log)
**Location:** `/Users/admin/Desktop/jcatalog/scripts/progress-tracker.txt`

**Purpose:** Text file with:
- All 50 products listed with checkboxes
- Space to write image count per product
- Progress percentage calculations
- Session log (date, time, products completed)
- Quality metrics tracking
- Issues/notes section
- Final checklist

**Format:** Plain text, easy to edit in any text editor

**Use Case:** Track your daily progress, calculate completion percentage

---

### 7. **README_GALLERY_SCRAPING.md** (Project Overview)
**Location:** `/Users/admin/Desktop/jcatalog/scripts/README_GALLERY_SCRAPING.md`

**Purpose:** High-level project overview with:
- Quick start instructions (Option A: Manual, Option B: Semi-automated)
- File directory
- Top 50 products breakdown
- Process workflow diagram
- Tips for success
- Expected results (image counts by tier)
- Image types to collect
- File naming convention
- Troubleshooting
- Quality checklist
- After completion steps
- Progress tracking templates
- Success criteria

**Length:** ~500 lines, extremely comprehensive

---

## 🎯 Top 50 Products Breakdown

### Priority Ranking:

| Tier | Category | Count | Priority | Why Important |
|------|----------|-------|----------|---------------|
| 1 | VAISALA Humidity | 15 | **HIGHEST** | Best-selling products, most variants |
| 2 | VAISALA Dewpoint | 10 | High | Technical products, need diagrams |
| 3 | VAISALA CO2 | 6 | Medium-High | HVAC applications, popular |
| 4 | VAISALA Oil | 5 | Medium | Specialized, transformer monitoring |
| 5 | Barometer + H2O2 | 5 | Medium | Meteorology + biodecontamination |
| 6 | SETRA Pressure | 9 | Medium | Different brand, cleanroom apps |

### Complete Product List:

**Tier 1 - VAISALA Humidity (15):**
HMT330, HMT310, HMT120, HMT370EX, HMT360, HMD60, HMW90, HMDW110, HMDW80, Indigo80+HMP80, HM70, HM40, SHM40, HMK15, HMP155

**Tier 2 - VAISALA Dewpoint (10):**
DMT340, DMT345/346, DM70, DMT143, DMT143L, DMT152, DMT132, Indigo80+DMP80, DPT146, DPT145

**Tier 3 - VAISALA CO2 (6):**
GMW90, GMD110, GMP343, GMP251, GMP252, GMW80

**Tier 4 - VAISALA Oil (5):**
MHT410, MMT330, MMT310, MM70, MMT162

**Tier 5 - Barometer + H2O2 (5):**
PTB330, PTB210, PTB110, PTU300, HPP271/272

**Tier 6 - SETRA Pressure (9):**
Setra Lite, Setra Flex, Model MRC, Model MRG, Model 264, PDT101, PDT102, Model AXD, Model 206

---

## 🚀 How to Use This Package

### Quick Start (3 Steps):

#### Step 1: Read the Overview
```bash
open /Users/admin/Desktop/jcatalog/scripts/README_GALLERY_SCRAPING.md
```
This gives you the big picture.

#### Step 2: Open the Checklist
```bash
open /Users/admin/Desktop/jcatalog/scripts/SCRAPING_CHECKLIST.md
```
This is your working document.

#### Step 3: Start Scraping
1. Visit first product: https://hs-tech-en.imweb.me/hmt330
2. Open DevTools (F12) → Console
3. Paste contents of `browser-console-scraper.js`
4. Follow the output instructions
5. Download images
6. Update JSON mapping
7. Check box in checklist
8. Move to next product

---

## 📊 Expected Results

### Image Counts:

| Metric | Minimum | Target | Optimistic |
|--------|---------|--------|------------|
| **Per Product** | 3 images | 6 images | 10 images |
| **Total (50)** | 150 images | 300 images | 500 images |
| **File Size** | 50 MB | 150 MB | 250 MB |

### Time Estimates:

| Activity | Time per Product | Total Time (50) |
|----------|-----------------|-----------------|
| Visit page | 30 sec | 25 min |
| Extract URLs | 1-2 min | 1-2 hours |
| Download images | 2-3 min | 2-3 hours |
| Update JSON | 1 min | 1 hour |
| **TOTAL** | **5-7 min** | **4-6 hours** |

### Recommended Schedule:

**Day 1 (2 hours):**
- Complete Tier 1 (15 humidity products)
- ~90-120 images

**Day 2 (2 hours):**
- Complete Tier 2 + 3 (16 products)
- ~90-100 images

**Day 3 (2 hours):**
- Complete Tier 4 + 5 + 6 (19 products)
- ~90-100 images

---

## 🎨 Image Types to Collect

### Must Have (Every Product):
✅ **Main product photo** - Hero shot, professional product image
✅ **2-3 variant images OR diagrams** - Different models, technical drawings

### Should Have:
📐 **Dimensional drawings** - Physical dimensions, mounting specs
🔌 **Wiring diagrams** - Electrical connections, pinouts
🏗️ **Installation examples** - Wall-mount, duct-mount, field installation

### Nice to Have:
🔍 **Detail shots** - Close-ups of display, connectors, mounting hardware
📸 **Application photos** - Product in actual use
🔄 **Different angles** - Front, side, back views

---

## 📝 File Naming Convention

**Strict Format:**
```
{productId}_{type}_{descriptor}_v1.{ext}
```

**Types:**
- `main` - Main hero image
- `variant` - Product variant (e.g., variant_hmt331)
- `diagram` - Technical diagram (e.g., diagram_dimensions, diagram_wiring)
- `installation` - Installation photo (e.g., installation_wall)
- `detail` - Detail shot (e.g., detail_display)

**Examples:**

**For HMT330 (6 variants):**
```
hmt330_main_v1.png
hmt330_variant_hmt331_v1.png          (Wall-mount)
hmt330_variant_hmt333_v1.png          (Duct)
hmt330_variant_hmt334_v1.png          (High pressure)
hmt330_variant_hmt335_v1.png          (High temp)
hmt330_variant_hmt337_v1.png          (High humidity)
hmt330_variant_hmt338_v1.png          (Pipeline)
hmt330_diagram_dimensions_v1.png
hmt330_diagram_wiring_v1.png
hmt330_installation_wall_v1.png
hmt330_installation_duct_v1.png
```

**For Setra Lite:**
```
setra_lite_main_v1.png
setra_lite_detail_display_v1.png
setra_lite_diagram_mounting_v1.png
setra_lite_installation_v1.png
```

---

## ✅ Quality Checklist

Before marking a product as complete:

- [ ] **Minimum 3 images** (main + 2 variants/diagrams)
- [ ] **High resolution** (800px+ width, preferably 1200px+)
- [ ] **All variants covered** (check data.ts specs for model numbers like HMT331, HMT333)
- [ ] **Technical diagrams included** (dimensions, wiring, installation)
- [ ] **Proper naming** (follows convention exactly)
- [ ] **No duplicates**
- [ ] **JSON mapping updated**
- [ ] **Files saved** to `/public/templates/hs-tech/images/products/gallery/`
- [ ] **Checkbox marked** in progress tracker

---

## 🔧 Common Issues & Solutions

### Issue: "The imweb page loads but I don't see any images"
**Solution:**
- Wait 10 seconds for lazy loading
- Scroll down the page to trigger image loads
- Disable browser extensions (ad blockers)
- Try Chrome (recommended)

### Issue: "Right-click is disabled, can't save image"
**Solution:**
- Use DevTools → Network tab → Filter by "Img"
- Use the browser console script (`browser-console-scraper.js`)
- Last resort: Screenshot and crop

### Issue: "Image URL shows 'blob:https://...' instead of CDN"
**Solution:**
- This is a temporary blob URL
- Check DevTools Network tab for actual CDN URL
- Use console script - it filters for CDN URLs only

### Issue: "Product page not found (404 error)"
**Solution:**
- Try alternate URLs from JSON mapping
- Manually search the site navigation
- Some products share pages (e.g., DMT345/346)
- Document in progress tracker notes

### Issue: "Images are low resolution"
**Solution:**
- Look for URL parameters: `?w=800`
- Change to: `?w=2400` or `?w=3000`
- Replace `/thumbnail/` with `/upload/` in URL
- Try removing all parameters to get original
- The console script does this automatically

---

## 📈 After Completion

Once all 50 products are scraped:

### 1. Verify File Count
```bash
cd /Users/admin/Desktop/jcatalog
ls -1 public/templates/hs-tech/images/products/gallery/ | wc -l
# Should show 150-300+ images
```

### 2. Create Gallery Folder (If Not Exists)
```bash
mkdir -p public/templates/hs-tech/images/products/gallery/
```

### 3. Update data.ts
Open `/Users/admin/Desktop/jcatalog/app/templates/hs-tech/data.ts`

Find each product and update the `gallery` array:

**Before:**
```typescript
{
  id: 'hmt330',
  gallery: ["/templates/hs-tech/images/products/hmt330_v1.png"],
}
```

**After:**
```typescript
{
  id: 'hmt330',
  gallery: [
    "/templates/hs-tech/images/products/gallery/hmt330_main_v1.png",
    "/templates/hs-tech/images/products/gallery/hmt330_variant_hmt331_v1.png",
    "/templates/hs-tech/images/products/gallery/hmt330_variant_hmt333_v1.png",
    "/templates/hs-tech/images/products/gallery/hmt330_variant_hmt334_v1.png",
    "/templates/hs-tech/images/products/gallery/hmt330_diagram_dimensions_v1.png",
    "/templates/hs-tech/images/products/gallery/hmt330_diagram_wiring_v1.png",
  ],
}
```

Copy the arrays from `hstech-gallery-mapping.json` `newGalleryImages` field.

### 4. Test Build
```bash
npm run build
# Should complete without errors
```

### 5. Test in Browser
```bash
npm run dev
# Visit: http://localhost:3000/templates/hs-tech/en/
# Navigate to product pages
# Verify all gallery images load correctly
```

### 6. Commit to Git
```bash
git add .
git commit -m "feat(hs-tech): add comprehensive gallery images for top 50 products

- Added 300+ product images from imweb scraping
- Updated gallery arrays in data.ts for 50 priority products
- Includes product variants, technical diagrams, and installation examples
- Covers VAISALA (Humidity, Dewpoint, CO2, Oil, Barometer, H2O2) and SETRA"

git push
```

---

## 🏆 Success Criteria

This project is complete when:

✅ All 50 products have gallery images
✅ Minimum 150 images total (avg 3+ per product)
✅ Target 300+ images total (avg 6+ per product)
✅ All images in `/gallery/` folder
✅ All images properly named
✅ JSON mapping fully populated
✅ `data.ts` updated with new galleries
✅ Build passes (`npm run build`)
✅ Images display in browser
✅ Changes committed to git

---

## 📞 Support

If you get stuck:

1. **Check the full guide:** `GALLERY_SCRAPING_GUIDE.md` (350+ lines, very detailed)
2. **Try the browser script:** `browser-console-scraper.js` (automates extraction)
3. **Reference the example:** `EXAMPLE_FILLED_MAPPING.json` (shows expected output)
4. **Use the checklist:** `SCRAPING_CHECKLIST.md` (track progress)
5. **Update the tracker:** `progress-tracker.txt` (log sessions)

---

## 📦 Files at a Glance

| File | Size | Purpose | Must Read? |
|------|------|---------|-----------|
| **README_GALLERY_SCRAPING.md** | ~500 lines | Project overview | ✅ Yes |
| **GALLERY_SCRAPING_GUIDE.md** | ~350 lines | Step-by-step guide | ✅ Yes |
| **SCRAPING_CHECKLIST.md** | ~200 lines | Quick reference | ✅ Yes |
| **hstech-gallery-mapping.json** | ~500 lines | Master mapping | 📝 Fill In |
| **browser-console-scraper.js** | ~150 lines | Automation script | 🔧 Use Often |
| **EXAMPLE_FILLED_MAPPING.json** | ~100 lines | Reference example | 👀 Reference |
| **progress-tracker.txt** | ~150 lines | Progress log | 📊 Track Daily |

---

## 🎉 Final Notes

This comprehensive package gives you everything needed to successfully collect 300+ gallery images for the HS-TECH catalog. The manual scraping process is necessary due to imweb's dynamic rendering, but the tools provided will make it as efficient as possible.

**Estimated Total Time: 4-6 hours over 3 days**

**Expected Result: World-class product catalog with rich visual galleries**

Take your time, be thorough, and the final result will significantly enhance the user experience of the HS-TECH electronic catalog.

Good luck! 🚀

---

**Package Created:** 2024-02-19
**For:** HS-TECH Electronic Catalog Gallery Enhancement
**Products:** Top 50 (VAISALA Humidity, Dewpoint, CO2, Oil, Barometer, H2O2 + SETRA Pressure)
**Target Images:** 300+
**Tools Provided:** 7 comprehensive files
**Support:** Full documentation, examples, automation scripts
