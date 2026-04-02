import { NextResponse } from 'next/server'

export async function GET() {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/

Sitemap: https://premiumpage.com/sitemap.xml`

    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}
