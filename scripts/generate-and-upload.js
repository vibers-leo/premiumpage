/**
 * 전자카탈로그 PDF 생성 + NCP 업로드 + 뷰어 링크 생성
 *
 * 사용법: node scripts/generate-and-upload.js
 *
 * 결과: public/report/flip-links.json (뷰어 링크 목록)
 */

const { chromium } = require('playwright')
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const UPLOAD_API = 'https://premiumpage.kr/api/storage/upload'
const VIEWER_BASE = 'https://premiumpage.kr/viewer'

async function uploadPDFToNCP(filePath) {
    const buffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)

    const { FormData, Blob, fetch } = globalThis
    const form = new FormData()
    form.append('file', new Blob([buffer], { type: 'application/pdf' }), fileName)

    const res = await fetch(UPLOAD_API, { method: 'POST', body: form })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
    return json
}

// ──────────────────────────────────────
// 카탈로그 정의 (generate-pdf.js 동일)
// ──────────────────────────────────────

const CATALOGS = [
    {
        id: 'hstech',
        name: 'HS-TECH',
        subtitle: 'Industrial Measurement Sensors',
        base: 'https://hstech.premiumpage.kr/templates/hs-tech',
        colorScheme: 'light',
        pages: [
            { tab: 'cover',                       label: '01 · HOME' },
            { tab: 'about',                       label: '02 · ABOUT US' },
            { tab: 'business',                    label: '03 · BUSINESS' },
            { tab: 'products',                    label: '04 · BRANDS' },
            { tab: 'vaisala',                     label: '05 · VAISALA' },
            { tab: 'vaisala_applications',        label: '06 · VAISALA APPLICATIONS' },
            { tab: 'humidity',                    label: '07 · HUMIDITY' },
            { tab: 'dewpoint',                    label: '08 · DEWPOINT' },
            { tab: 'co2',                         label: '09 · CO₂' },
            { tab: 'oil',                         label: '10 · MOISTURE IN OIL' },
            { tab: 'barometer',                   label: '11 · BAROMETER' },
            { tab: 'weather',                     label: '12 · WEATHER' },
            { tab: 'h2o2',                        label: '13 · H₂O₂' },
            { tab: 'cms',                         label: '14 · CMS' },
            { tab: 'setra',                       label: '15 · SETRA' },
            { tab: 'setra_applications_sensor',   label: '16 · SETRA APP SENSOR' },
            { tab: 'setra_applications_solution', label: '17 · SETRA APP SOLUTION' },
            { tab: 'setra_visual',                label: '18 · DP VISUAL' },
            { tab: 'setra_sensor',                label: '19 · DP SENSOR' },
            { tab: 'setra_ind',                   label: '20 · IND PRESSURE' },
            { tab: 'jumo',                        label: '21 · JUMO' },
            { tab: 'jumo_applications',           label: '22 · JUMO APPLICATIONS' },
            { tab: 'jumo_temp',                   label: '23 · TEMPERATURE' },
            { tab: 'jumo_liquid',                 label: '24 · LIQUID ANALYSIS' },
            { tab: 'jumo_control',                label: '25 · CTRL & RECORDING' },
            { tab: 'contact',                     label: '26 · CONTACT' },
        ],
        buildUrl: (base, p) => `${base}?tab=${p.tab}`,
    },
    {
        id: 'air-hstech',
        name: 'Air HS-TECH',
        subtitle: 'DC Engine-off Air Conditioner (GENWISH)',
        base: 'https://hstechco.premiumpage.kr/templates/air-hstech-light',
        colorScheme: 'light',
        pages: [
            { tab: 'cover',          label: '01 · COVER' },
            { tab: 'about',          label: '02 · ABOUT US' },
            { tab: 'greeting',       label: '03 · CEO GREETING' },
            { tab: 'history',        label: '04 · HISTORY' },
            { tab: 'brand',          label: '05 · BRAND' },
            { tab: 'certifications', label: '06 · CERTIFICATIONS' },
            { tab: 'process',        label: '07 · PROCESS' },
            { tab: 'products',       label: '08 · PRODUCTS' },
            { tab: 'spec-compare',   label: '09 · SPEC COMPARISON' },
            { tab: 'hsd-180d',       label: '10 · HSD-180D' },
            { tab: 'hsh-260d',       label: '11 · HSH-260D' },
            { tab: 'hsp-180d',       label: '12 · HSP-180D' },
            { tab: 'hsv-260d',       label: '13 · HSV-260D' },
            { tab: 'hss-065s',       label: '14 · HSS-065S' },
            { tab: 'hs-024h',        label: '15 · HS-024H' },
            { tab: 'hs-220h',        label: '16 · HS-220H' },
            { tab: 'controllers',    label: '17 · CONTROLLERS' },
            { tab: 'outdoor-unit',   label: '18 · OUTDOOR UNIT' },
            { tab: 'dc-tech',        label: '19 · DC TECHNOLOGY' },
            { tab: 'non-operating',  label: '20 · NON-OPERATING' },
            { tab: 'crane',          label: '21 · CRANE' },
            { tab: 'campingcar',     label: '22 · CAMPING CAR' },
            { tab: 'ship',           label: '23 · SHIP' },
            { tab: 'location',       label: '24 · LOCATION' },
            { tab: 'contact',        label: '25 · CONTACT' },
        ],
        buildUrl: (base, p) => `${base}?tab=${p.tab}`,
    },
    {
        id: 'gentop',
        name: 'GENTOP',
        subtitle: 'Smart Building & ICT Solutions',
        base: 'https://gentop.premiumpage.kr',
        colorScheme: 'dark',
        pages: [
            { url: '/en',                                label: '01 · HOME' },
            { url: '/en/company/introduction',           label: '02 · Company Introduction' },
            { url: '/en/company/greeting',               label: '03 · CEO Greeting' },
            { url: '/en/company/history',                label: '04 · History' },
            { url: '/en/company/philosophy',             label: '05 · Philosophy' },
            { url: '/en/company/organization',           label: '06 · Organization' },
            { url: '/en/company/business_scope',         label: '07 · Business Scope' },
            { url: '/en/company/global_network',         label: '08 · Global Network' },
            { url: '/en/company/company_view',           label: '09 · Company View' },
            { url: '/en/company/certification',          label: '10 · Certification' },
            { url: '/en/company/ci_bi',                  label: '11 · CI / BI' },
            { url: '/en/company/location',               label: '12 · Location' },
            { url: '/en/business',                       label: '13 · Business Overview' },
            { url: '/en/business/construction',          label: '14 · Construction' },
            { url: '/en/business/facilities',            label: '15 · Facilities' },
            { url: '/en/business/public_address',        label: '16 · Public Address' },
            { url: '/en/business/access_parking',        label: '17 · Access & Parking' },
            { url: '/en/business/cctv',                  label: '18 · CCTV' },
            { url: '/en/business/led_display',           label: '19 · LED Display' },
            { url: '/en/business/eco_friendly',          label: '20 · Eco-Friendly' },
            { url: '/en/contact',                        label: '21 · Contact' },
        ],
        buildUrl: (base, p) => `${base}${p.url}`,
    },
    {
        id: 'hangseong',
        name: '항성산업사',
        subtitle: 'Automotive Motor Press Parts',
        base: 'https://hangseong.premiumpage.kr/templates/hangseong',
        colorScheme: 'dark',
        pages: [
            { url: '?tab=cover',                                               label: '01 · HOME' },
            { url: '?tab=menu',                                                label: '02 · MENU' },
            { url: '?category=about&tab=greeting',                             label: '03 · CEO Message' },
            { url: '?category=about&tab=history',                              label: '04 · History' },
            { url: '?category=about&tab=summary',                              label: '05 · Summary' },
            { url: '?category=about&tab=organization',                         label: '06 · Organization' },
            { url: '?category=about&tab=vision',                               label: '07 · Vision' },
            { url: '?category=about&tab=location',                             label: '08 · Directions' },
            { url: '?tab=products',                                            label: '09 · Products Overview' },
            { url: '?category=products&tab=hvac',                              label: '10 · HVAC Blower Motors' },
            { url: '?category=products&tab=all_in_one',                        label: '11 · All-in-one Motors' },
            { url: '?category=products&tab=other_press',                       label: '12 · Other Press Products' },
            { url: '?category=qm&tab=quality_mgmt',                            label: '13 · Quality Management' },
            { url: '?category=equipment&tab=equipment_status',                 label: '14 · Equipment Status' },
            { url: '?category=reliability&tab=process_chart',                  label: '15 · Process Chart' },
            { url: '?category=reliability&tab=certification',                  label: '16 · Certification' },
            { url: '?category=support&tab=contact',                            label: '17 · Contact Us' },
        ],
        buildUrl: (base, p) => `${base}${p.url}`,
    },
]

// ──────────────────────────────────────
// 스크린샷 캡처
// ──────────────────────────────────────

async function captureScreenshot(page, url, label) {
    console.log(`  📸 ${label}`)
    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
        await page.waitForTimeout(1500)

        await page.evaluate(() => {
            return Promise.all(
                Array.from(document.images)
                    .filter(img => !img.complete)
                    .map(img => new Promise(resolve => { img.onload = img.onerror = resolve }))
            )
        })
        await page.waitForTimeout(300)

        const naturalHeight = await page.evaluate(() => {
            const styleTag = document.createElement('style')
            styleTag.id = '__pdf_measure__'
            styleTag.textContent = [
                'main[class*="overflow-y-auto"]{height:auto!important;overflow:visible!important}',
                'main[class*="min-h-screen"]{min-height:0!important}',
            ].join('')
            document.head.appendChild(styleTag)
            document.body.getBoundingClientRect()
            const scrollable = document.querySelector('main[class*="overflow-y-auto"]')
            const h = scrollable
                ? scrollable.scrollHeight
                : Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    ...Array.from(document.querySelectorAll('main')).map(m => m.scrollHeight)
                )
            document.getElementById('__pdf_measure__')?.remove()
            return h
        })

        await page.evaluate(() => {
            const s = document.createElement('style')
            s.id = '__pdf_fix__'
            s.textContent = 'main[class*="min-h-screen"]{min-height:0!important}'
            document.head.appendChild(s)
            document.body.getBoundingClientRect()
        })

        const currentViewport = page.viewportSize()
        const targetHeight = Math.max(naturalHeight + 100, 700)
        await page.setViewportSize({ width: currentViewport.width, height: targetHeight })
        await page.waitForTimeout(300)

        await page.evaluate(() => {
            const el = document.querySelector('main[class*="overflow-y-auto"]') || document.querySelector('main')
            if (el) el.scrollTop = el.scrollHeight
        })
        await page.waitForTimeout(700)

        const screenshot = await page.screenshot({ type: 'png', fullPage: true })

        await page.evaluate(() => { document.getElementById('__pdf_fix__')?.remove() })
        await page.setViewportSize({ width: currentViewport.width, height: currentViewport.height })

        return screenshot
    } catch (err) {
        console.warn(`  ⚠️  실패: ${label} — ${err.message}`)
        return null
    }
}

async function screenshotsToPDF(screenshots, outputPath) {
    const pdfDoc = await PDFDocument.create()
    pdfDoc.setTitle(path.basename(outputPath, '.pdf'))
    pdfDoc.setCreator('PremiumPage Catalog Generator')

    let added = 0
    for (const { data, label } of screenshots) {
        if (!data) continue
        try {
            const pngImage = await pdfDoc.embedPng(data)
            const { width, height } = pngImage.size()
            const pdfPage = pdfDoc.addPage([width, height])
            pdfPage.drawImage(pngImage, { x: 0, y: 0, width, height })
            added++
        } catch (err) {
            console.warn(`  ⚠️  PDF 추가 실패: ${label}`)
        }
    }

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync(outputPath, pdfBytes)
    return added
}

// ──────────────────────────────────────
// 카탈로그별 생성 + 업로드
// ──────────────────────────────────────

async function processCatalog(catalog, timestamp) {
    const outDir = path.join(__dirname, '..', 'public', 'report')
    fs.mkdirSync(outDir, { recursive: true })

    const fileName = `${catalog.id}_${timestamp}.pdf`
    const outputPath = path.join(outDir, fileName)

    console.log(`\n🚀 ${catalog.name} 카탈로그 PDF 생성 시작 (${catalog.pages.length}페이지)`)

    const browser = await chromium.launch({ headless: true, args: ['--disable-cache'] })
    const page = await browser.newPage()
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ colorScheme: catalog.colorScheme })

    const screenshots = []
    for (const p of catalog.pages) {
        const url = catalog.buildUrl(catalog.base, p)
        const data = await captureScreenshot(page, url, p.label)
        screenshots.push({ data, label: p.label })
    }

    await browser.close()

    console.log(`\n📄 PDF 생성 중...`)
    const pageCount = await screenshotsToPDF(screenshots, outputPath)
    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`✅ PDF 완료: ${pageCount}페이지 / ${sizeKB}KB`)

    // NCP 업로드
    console.log(`☁️  NCP 업로드 중... (${sizeKB}KB)`)
    const uploadResult = await uploadPDFToNCP(outputPath)
    const ncpKey = uploadResult.key

    const viewerUrl = `${VIEWER_BASE}?k=${encodeURIComponent(ncpKey)}&title=${encodeURIComponent(catalog.name + ' Catalog')}`
    console.log(`🔗 뷰어 링크: ${viewerUrl}`)

    return {
        id: catalog.id,
        name: catalog.name,
        subtitle: catalog.subtitle,
        pages: pageCount,
        sizeKB,
        ncpKey,
        viewerUrl,
        generatedAt: new Date().toISOString(),
    }
}

// ──────────────────────────────────────
// 메인
// ──────────────────────────────────────

async function main() {
    const now = new Date()
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`

    console.log('='.repeat(60))
    console.log('  Premium Page — 포트폴리오 플립 PDF 생성')
    console.log('='.repeat(60))

    const results = []

    for (const catalog of CATALOGS) {
        try {
            const result = await processCatalog(catalog, timestamp)
            results.push(result)
        } catch (err) {
            console.error(`❌ ${catalog.name} 실패:`, err.message)
            results.push({ id: catalog.id, name: catalog.name, error: err.message })
        }
    }

    // 링크 목록 저장
    const linksPath = path.join(__dirname, '..', 'public', 'report', 'flip-links.json')
    fs.writeFileSync(linksPath, JSON.stringify(results, null, 2))

    console.log('\n' + '='.repeat(60))
    console.log('  완료! 뷰어 링크 목록:')
    console.log('='.repeat(60))
    for (const r of results) {
        if (r.error) {
            console.log(`❌ ${r.name}: ${r.error}`)
        } else {
            console.log(`✅ ${r.name} (${r.pages}p)`)
            console.log(`   ${r.viewerUrl}`)
        }
    }
    console.log(`\n📄 링크 파일: ${linksPath}`)
}

main().catch(err => {
    console.error('❌ 오류:', err)
    process.exit(1)
})
