import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl
    const hostname = request.headers.get('host') || ''

    // 1. 항성산업사 (Hangseong) 도메인 처리
    if (hostname.includes('hangseong.premiumpage.kr') || hostname.includes('hangseong.vercel.app')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/templates/hangseong', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 2. HS-TECH (영문) 도메인 처리
    if (hostname.includes('hstech.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/templates/hs-tech', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 3. HS-TECH (국문) 도메인 처리
    if (hostname.includes('hstech-kr.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/templates/hs-tech-kr', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 4. GENTOP 도메인 처리
    if (hostname.includes('gentop.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/gentop/en', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
        if (!url.pathname.startsWith('/gentop')) {
            const response = NextResponse.rewrite(new URL(`/gentop${url.pathname}`, request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 5. 에어 HS-TECH (hstechco) 도메인 처리 - 라이트모드 기본
    if (hostname.includes('hstechco.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/templates/air-hstech-light', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 6. 계발자들 매거진 (magazine.vibers.co.kr / vibers.premiumpage.kr)
    if (hostname.includes('magazine.vibers.co.kr') || hostname.includes('vibers.premiumpage.kr') || hostname.includes('vibers.vercel.app')) {
        if (url.pathname === '/' || url.pathname === '') {
            const response = NextResponse.rewrite(new URL('/vibers/magazine', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
        if (!url.pathname.startsWith('/vibers')) {
            const response = NextResponse.rewrite(new URL(`/vibers${url.pathname}`, request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 7. EMT (영문) 도메인 처리 - 정적 HTML 서빙
    if (hostname.includes('emt.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/emt/index.html', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 8. EMT (국문) 도메인 처리 - 정적 HTML 서빙 (fix: index-ko.html)
    if (hostname.includes('emt-ko.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/emt/index-ko.html', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|downloads|assets|emt|gentop/gentop-next).*)',
    ],
}
