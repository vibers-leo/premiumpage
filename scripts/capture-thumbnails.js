/**
 * 전자카탈로그 썸네일 캡처 스크립트
 * 각 카탈로그의 첫 번째 페이지(커버)를 스크린샷으로 저장
 *
 * 사용법:
 *   node scripts/capture-thumbnails.js
 */

const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const OUTPUT_DIR = path.join(__dirname, '../public/portfolio/thumbnails')

const CATALOGS = [
    {
        id: 'emt',
        label: 'EMT GLOBAL',
        url: 'https://emt.premiumpage.kr',
        waitFor: 2000,
        colorScheme: 'dark',
    },
    {
        id: 'hstech',
        label: 'HS-TECH',
        url: 'https://hstech.premiumpage.kr/templates/hs-tech?tab=cover',
        waitFor: 3000,
        colorScheme: 'dark',
    },
    {
        id: 'genwish',
        label: 'GENWISH',
        url: 'https://hstechco.premiumpage.kr',
        waitFor: 3000,
        colorScheme: 'light',
    },
    {
        id: 'gentop',
        label: 'GENTOP',
        url: 'https://gentop.premiumpage.kr',
        waitFor: 3000,
        colorScheme: 'dark',
    },
    {
        id: 'hangseong',
        label: '항성산업사',
        url: 'https://hangseong.premiumpage.kr',
        waitFor: 3000,
        colorScheme: 'light',
    },
]

async function captureThumbnails() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    }

    const browser = await chromium.launch({ headless: true })

    for (const catalog of CATALOGS) {
        console.log(`\n📸 캡처 중: ${catalog.label}`)
        console.log(`   URL: ${catalog.url}`)

        const context = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            colorScheme: catalog.colorScheme,
        })
        const page = await context.newPage()

        try {
            await page.goto(catalog.url, { waitUntil: 'networkidle', timeout: 30000 })
            await page.waitForTimeout(catalog.waitFor)

            const outputPath = path.join(OUTPUT_DIR, `${catalog.id}.jpg`)
            await page.screenshot({
                path: outputPath,
                type: 'jpeg',
                quality: 90,
                clip: { x: 0, y: 0, width: 1440, height: 900 },
            })

            const size = (fs.statSync(outputPath).size / 1024).toFixed(1)
            console.log(`   ✅ 저장 완료: ${outputPath} (${size}KB)`)
        } catch (err) {
            console.error(`   ❌ 실패: ${catalog.label} — ${err.message}`)
        }

        await context.close()
    }

    await browser.close()
    console.log('\n✨ 모든 썸네일 캡처 완료!')
    console.log(`📁 저장 위치: ${OUTPUT_DIR}`)
}

captureThumbnails().catch(console.error)
