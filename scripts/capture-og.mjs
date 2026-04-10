import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public', 'og')

const sites = [
  { name: 'emt', url: 'https://emt.premiumpage.kr' },
  { name: 'emt-ko', url: 'https://emt-ko.premiumpage.kr' },
  { name: 'hstech', url: 'https://hstech.premiumpage.kr' },
  { name: 'hstech-kr', url: 'https://hstech-kr.premiumpage.kr' },
  { name: 'gentop', url: 'https://gentop.premiumpage.kr' },
  { name: 'genwish', url: 'https://hstechco.premiumpage.kr' },
]

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  })

  for (const site of sites) {
    const page = await context.newPage()
    try {
      console.log(`Capturing ${site.name} (${site.url})...`)
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(2000) // 애니메이션 완료 대기

      const outPath = path.join(publicDir, `${site.name}.png`)
      await page.screenshot({ path: outPath, type: 'png' })
      console.log(`  → saved: ${outPath}`)
    } catch (err) {
      console.error(`  ✗ ${site.name} failed: ${err.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('\nDone!')
}

main()
