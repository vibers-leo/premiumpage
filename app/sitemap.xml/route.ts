import { NextResponse } from 'next/server'
import { templates } from '@/lib/data'

export async function GET() {
    // 사이트맵 XML 생성
    const baseUrl = 'https://premiumpage.com' // 실제 도메인으로 변경 필요

    const staticPages = [
        '',
        '/quote',
        '/login',
    ]

    const templatePages = templates.map(t => `/templates/${t.slug}`)

    const allPages = [...staticPages, ...templatePages]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
