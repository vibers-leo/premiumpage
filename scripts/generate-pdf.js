/**
 * 전자카탈로그 PDF 생성 스크립트
 *
 * 사용법:
 *   node scripts/generate-pdf.js hstech
 *   node scripts/generate-pdf.js hangseong
 *   node scripts/generate-pdf.js all
 */

const { chromium } = require('playwright')
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

// ──────────────────────────────────────
// 카탈로그별 페이지 정의
// ──────────────────────────────────────

const HS_TECH_BASE = 'https://hstech.premiumpage.kr/templates/hs-tech'
const HS_TECH_PAGES = [
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
]

const GENTOP_BASE = 'https://gentop.premiumpage.kr'
const GENTOP_PAGES = [
    { url: '/en',                                   label: '01 · HOME' },
    { url: '/en/company/introduction',              label: '02 · Company Introduction' },
    { url: '/en/company/greeting',                  label: '03 · CEO Greeting' },
    { url: '/en/company/history',                   label: '04 · History' },
    { url: '/en/company/philosophy',                label: '05 · Philosophy' },
    { url: '/en/company/organization',              label: '06 · Organization' },
    { url: '/en/company/business_scope',            label: '07 · Business Scope' },
    { url: '/en/company/global_network',            label: '08 · Global Network' },
    { url: '/en/company/company_view',              label: '09 · Company View' },
    { url: '/en/company/certification',             label: '10 · Certification' },
    { url: '/en/company/ci_bi',                     label: '11 · CI / BI' },
    { url: '/en/company/location',                  label: '12 · Location' },
    { url: '/en/business',                          label: '13 · Business Overview' },
    { url: '/en/business/construction',             label: '14 · Construction' },
    { url: '/en/business/construction.html_1',      label: '15 · Construction (2)' },
    { url: '/en/business/construction.html_2',      label: '16 · Construction (3)' },
    { url: '/en/business/facilities',               label: '17 · Facilities' },
    { url: '/en/business/public_address',           label: '18 · Public Address' },
    { url: '/en/business/access_parking',           label: '19 · Access & Parking' },
    { url: '/en/business/access_parking.html_1',    label: '20 · Access & Parking (2)' },
    { url: '/en/business/cctv',                     label: '21 · CCTV' },
    { url: '/en/business/cctv.html_1',              label: '22 · CCTV (2)' },
    { url: '/en/business/led_display',              label: '23 · LED Display' },
    { url: '/en/business/eco_friendly',             label: '24 · Eco-Friendly' },
    { url: '/en/business/eco_friendly.html_1',      label: '25 · Eco-Friendly (2)' },
    { url: '/en/business/eco_friendly.html_2',      label: '26 · Eco-Friendly (3)' },
    { url: '/en/business/eco_friendly.html_3',      label: '27 · Eco-Friendly (4)' },
    { url: '/en/contact',                           label: '28 · Contact' },
]

const AIR_HSTECH_BASE = 'https://hstechco.premiumpage.kr/templates/air-hstech-light'
const AIR_HSTECH_PAGES = [
    { tab: 'cover',         label: '01 · COVER' },
    { tab: 'about',         label: '02 · ABOUT US' },
    { tab: 'greeting',      label: '03 · CEO GREETING' },
    { tab: 'history',       label: '04 · HISTORY' },
    { tab: 'brand',         label: '05 · BRAND' },
    { tab: 'certifications',label: '06 · CERTIFICATIONS' },
    { tab: 'process',       label: '07 · PROCESS' },
    { tab: 'products',      label: '08 · PRODUCTS' },
    { tab: 'spec-compare',  label: '09 · SPEC COMPARISON' },
    { tab: 'hsd-180d',      label: '10 · HSD-180D' },
    { tab: 'hsh-260d',      label: '11 · HSH-260D' },
    { tab: 'hsp-180d',      label: '12 · HSP-180D' },
    { tab: 'hsv-260d',      label: '13 · HSV-260D' },
    { tab: 'hss-065s',      label: '14 · HSS-065S' },
    { tab: 'hs-024h',       label: '15 · HS-024H' },
    { tab: 'hs-220h',       label: '16 · HS-220H' },
    { tab: 'controllers',   label: '17 · CONTROLLERS' },
    { tab: 'outdoor-unit',  label: '18 · OUTDOOR UNIT' },
    { tab: 'dc-tech',       label: '19 · DC TECHNOLOGY' },
    { tab: 'non-operating', label: '20 · NON-OPERATING' },
    { tab: 'crane',         label: '21 · CRANE' },
    { tab: 'campingcar',    label: '22 · CAMPING CAR' },
    { tab: 'ship',          label: '23 · SHIP' },
    { tab: 'location',      label: '24 · LOCATION' },
    { tab: 'contact',       label: '25 · CONTACT' },
]

const HANGSEONG_BASE = 'https://hangseong.premiumpage.kr/templates/hangseong'
const HANGSEONG_PAGES = [
    { url: '?tab=cover',                                                    label: '01 · HOME' },
    { url: '?tab=menu',                                                     label: '02 · MENU' },
    { url: '?category=about&tab=greeting',                                  label: '03 · CEO Message' },
    { url: '?category=about&tab=history',                                   label: '04 · History' },
    { url: '?category=about&tab=summary',                                   label: '05 · Summary' },
    { url: '?category=about&tab=organization',                              label: '06 · Organization' },
    { url: '?category=about&tab=vision',                                    label: '07 · Vision' },
    { url: '?category=about&tab=location',                                  label: '08 · Directions' },
    { url: '?tab=products',                                                 label: '09 · Products Overview' },
    { url: '?category=products&tab=hvac',                                   label: '10 · HVAC Blower Motors' },
    { url: '?category=products&tab=hvac&product=hvac_case_01',              label: '11 · HVAC Motor Case' },
    { url: '?category=products&tab=hvac&product=hvac_cover_02',             label: '12 · HVAC Motor Cover' },
    { url: '?category=products&tab=hvac&product=hvac_bracket_03',           label: '13 · HVAC Bracket' },
    { url: '?category=products&tab=hvac&product=hvac_core_04',              label: '14 · HVAC Core' },
    { url: '?category=products&tab=all_in_one',                             label: '15 · All-in-one Motors' },
    { url: '?category=products&tab=all_in_one&product=cooling_case_01',     label: '16 · Cooling Case' },
    { url: '?category=products&tab=all_in_one&product=cooling_bracket_01',  label: '17 · Cooling Bracket' },
    { url: '?category=products&tab=other_press',                            label: '18 · Other Press Products' },
    { url: '?category=products&tab=other_press&product=mount_bracket_01',   label: '19 · Mount Bracket' },
    { url: '?category=products&tab=other_press&product=trunk_bonnet_01',    label: '20 · Trunk Bonnet' },
    { url: '?category=qm&tab=quality_mgmt',                                 label: '21 · Quality Management' },
    { url: '?category=equipment&tab=equipment_status',                      label: '22 · Equipment Status' },
    { url: '?category=reliability&tab=process_chart',                       label: '23 · Process Chart' },
    { url: '?category=reliability&tab=certification',                       label: '24 · Certification' },
    { url: '?category=support&tab=contact',                                 label: '25 · Contact Us' },
]

// ──────────────────────────────────────
// 핵심 함수
// ──────────────────────────────────────

async function captureScreenshot(page, url, label, { afterGoto } = {}) {
    console.log(`  📸 ${label}`)
    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
        await page.waitForTimeout(1500)
        if (afterGoto) await afterGoto(page)

        // 이미지 로드 대기
        await page.evaluate(() => {
            return Promise.all(
                Array.from(document.images)
                    .filter(img => !img.complete)
                    .map(img => new Promise(resolve => {
                        img.onload = img.onerror = resolve
                    }))
            )
        })
        await page.waitForTimeout(300)

        // ── Step 1: h-full / min-h-screen 강제 해제 후 자연 콘텐츠 높이 측정
        // (항성산업사처럼 overflow:hidden 레이아웃에서 뷰포트 연동 CSS 때문에
        //  viewport 확장 시 min-h-screen도 같이 늘어나는 악순환 방지)
        const naturalHeight = await page.evaluate(() => {
            const styleTag = document.createElement('style')
            styleTag.id = '__pdf_measure__'
            styleTag.textContent = [
                'main[class*="overflow-y-auto"]{height:auto!important;overflow:visible!important}',
                'main[class*="min-h-screen"]{min-height:0!important}',
            ].join('')
            document.head.appendChild(styleTag)
            document.body.getBoundingClientRect() // force reflow

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

        // ── Step 2: min-h-screen 고정 오버라이드 유지 (뷰포트 확장 시 팽창 방지)
        await page.evaluate(() => {
            const s = document.createElement('style')
            s.id = '__pdf_fix__'
            s.textContent = 'main[class*="min-h-screen"]{min-height:0!important}'
            document.head.appendChild(s)
            document.body.getBoundingClientRect()
        })

        // ── Step 3: viewport를 콘텐츠 높이 + 내비게이터 공간(100px)으로 설정
        const currentViewport = page.viewportSize()
        const targetHeight = Math.max(naturalHeight + 100, 700)
        await page.setViewportSize({ width: currentViewport.width, height: targetHeight })
        await page.waitForTimeout(300)

        // ── Step 4: main 스크롤 끝까지 내리기 → isAtBottom=true → 하단 내비게이터 표시
        await page.evaluate(() => {
            const el = document.querySelector('main[class*="overflow-y-auto"]')
                     || document.querySelector('main')
            if (el) el.scrollTop = el.scrollHeight
        })
        await page.waitForTimeout(700) // React 상태 반영 + Framer Motion 애니메이션 완료 대기

        const screenshot = await page.screenshot({ type: 'png', fullPage: true })

        // ── Step 5: 정리 (오버라이드 제거 + viewport 원복)
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

async function generateHSTechPDF(timestamp) {
    const outDir = path.join(__dirname, '..', 'public', 'report')
    fs.mkdirSync(outDir, { recursive: true })
    const outputPath = path.join(outDir, `HS-TECH_Catalog_${timestamp}.pdf`)

    console.log('\n🚀 HS-TECH 카탈로그 PDF 생성 시작')
    console.log(`   총 ${HS_TECH_PAGES.length}페이지 캡처 예정\n`)

    const browser = await chromium.launch({ headless: true, args: ['--disable-cache'] })
    const page = await browser.newPage()
    await page.setViewportSize({ width: 1440, height: 900 })

    // 다크모드 비활성화 (라이트 모드로 캡처)
    await page.emulateMedia({ colorScheme: 'light' })

    const screenshots = []
    for (const { tab, label } of HS_TECH_PAGES) {
        const url = `${HS_TECH_BASE}?tab=${tab}`
        const data = await captureScreenshot(page, url, label)
        screenshots.push({ data, label })
    }

    await browser.close()

    console.log('\n📄 PDF 생성 중...')
    const pageCount = await screenshotsToPDF(screenshots, outputPath)

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`✅ 완료: ${outputPath}`)
    console.log(`   ${pageCount}페이지 / ${sizeKB}KB\n`)
    return outputPath
}

async function generateGentopPDF(timestamp) {
    const outDir = path.join(__dirname, '..', 'public', 'report')
    fs.mkdirSync(outDir, { recursive: true })
    const outputPath = path.join(outDir, `GENTOP_Catalog_${timestamp}.pdf`)

    console.log('\n🚀 GENTOP 카탈로그 PDF 생성 시작')
    console.log(`   총 ${GENTOP_PAGES.length}페이지 캡처 예정\n`)

    const browser = await chromium.launch({ headless: true, args: ['--disable-cache'] })
    const page = await browser.newPage()
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ colorScheme: 'dark' })

    const screenshots = []
    for (const { url, label } of GENTOP_PAGES) {
        const fullUrl = `${GENTOP_BASE}${url}`
        const data = await captureScreenshot(page, fullUrl, label)
        screenshots.push({ data, label })
    }

    await browser.close()

    console.log('\n📄 PDF 생성 중...')
    const pageCount = await screenshotsToPDF(screenshots, outputPath)

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`✅ 완료: ${outputPath}`)
    console.log(`   ${pageCount}페이지 / ${sizeKB}KB\n`)
    return outputPath
}

async function generateAirHSTechPDF(timestamp) {
    const outDir = path.join(__dirname, '..', 'public', 'report')
    fs.mkdirSync(outDir, { recursive: true })
    const outputPath = path.join(outDir, `Air-HS-TECH_Catalog_${timestamp}.pdf`)

    console.log('\n🚀 에어 HS-TECH (GENWISH) 카탈로그 PDF 생성 시작')
    console.log(`   총 ${AIR_HSTECH_PAGES.length}페이지 캡처 예정\n`)

    const browser = await chromium.launch({ headless: true, args: ['--disable-cache'] })
    const page = await browser.newPage()
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ colorScheme: 'light' })

    const screenshots = []
    for (const { tab, label } of AIR_HSTECH_PAGES) {
        const url = `${AIR_HSTECH_BASE}?tab=${tab}`
        const data = await captureScreenshot(page, url, label)
        screenshots.push({ data, label })
    }

    await browser.close()

    console.log('\n📄 PDF 생성 중...')
    const pageCount = await screenshotsToPDF(screenshots, outputPath)

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`✅ 완료: ${outputPath}`)
    console.log(`   ${pageCount}페이지 / ${sizeKB}KB\n`)
    return outputPath
}

async function generateHangseongPDF(timestamp) {
    const outDir = path.join(__dirname, '..', 'public', 'report')
    fs.mkdirSync(outDir, { recursive: true })
    const outputPath = path.join(outDir, `Hangseong_Catalog_${timestamp}.pdf`)

    console.log('\n🚀 항성산업사 카탈로그 PDF 생성 시작')
    console.log(`   총 ${HANGSEONG_PAGES.length}페이지 캡처 예정\n`)

    const browser = await chromium.launch({ headless: true, args: ['--disable-cache'] })
    const page = await browser.newPage()
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ colorScheme: 'dark' })

    const screenshots = []
    for (const { url, label } of HANGSEONG_PAGES) {
        const fullUrl = `${HANGSEONG_BASE}${url}`
        // 제품 개별 페이지는 모달이 열리므로 ESC로 닫아서 리스트뷰(사이드바+내비게이터) 상태로 캡처
        const afterGoto = url.includes('product=')
            ? async (p) => { await p.keyboard.press('Escape'); await p.waitForTimeout(600) }
            : undefined
        const data = await captureScreenshot(page, fullUrl, label, { afterGoto })
        screenshots.push({ data, label })
    }

    await browser.close()

    console.log('\n📄 PDF 생성 중...')
    const pageCount = await screenshotsToPDF(screenshots, outputPath)

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`✅ 완료: ${outputPath}`)
    console.log(`   ${pageCount}페이지 / ${sizeKB}KB\n`)
    return outputPath
}

// ──────────────────────────────────────
// 실행
// ──────────────────────────────────────

async function main() {
    const target = process.argv[2] || 'all'

    if (!['hstech', 'hangseong', 'gentop', 'air-hstech', 'all'].includes(target)) {
        console.error('사용법: node scripts/generate-pdf.js [hstech|hangseong|gentop|air-hstech|all]')
        process.exit(1)
    }

    const start = Date.now()
    const now = new Date()
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`

    if (target === 'hstech' || target === 'all') {
        await generateHSTechPDF(timestamp)
    }
    if (target === 'hangseong' || target === 'all') {
        await generateHangseongPDF(timestamp)
    }
    if (target === 'gentop' || target === 'all') {
        await generateGentopPDF(timestamp)
    }
    if (target === 'air-hstech' || target === 'all') {
        await generateAirHSTechPDF(timestamp)
    }

    const elapsed = Math.round((Date.now() - start) / 1000)
    console.log(`\n⏱️  전체 소요 시간: ${elapsed}초`)
    console.log('📂 저장 위치: public/report/\n')
}

main().catch(err => {
    console.error('❌ 오류:', err)
    process.exit(1)
})
