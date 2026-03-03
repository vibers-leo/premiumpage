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
        // Root path: redirect to /gentop/en
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/gentop/en', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }

        // If path doesn't start with /gentop, prepend it
        if (!url.pathname.startsWith('/gentop')) {
            const response = NextResponse.rewrite(new URL(`/gentop${url.pathname}`, request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 5. 에어 HS-TECH (GENWISH / hstechco) 도메인 처리 - 라이트모드 기본
    if (hostname.includes('hstechco.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/templates/air-hstech-light', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 6. 계발자들 매거진 (magazine.viber.co.kr)
    if (hostname.includes('magazine.viber.co.kr') || hostname.includes('vibers.vercel.app')) {
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

    // 7. EMT (영문) 도메인 처리 - 원본 정적 HTML 서빙
    if (hostname.includes('emt.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/emt/index.html', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    // 6. EMT (국문) 도메인 처리 - 원본 정적 HTML 서빙
    if (hostname.includes('emt-ko.premiumpage.kr')) {
        if (url.pathname === '/') {
            const response = NextResponse.rewrite(new URL('/emt/index.html', request.url))
            response.headers.set('x-template-page', 'true')
            return response
        }
    }

    return NextResponse.next()
}

// 미들웨어가 적용될 경로 설정
export const config = {
    matcher: [
        /*
         * 다음으로 시작하는 경로를 제외한 모든 요청 경로와 일치:
         * - api (API 라우트)
         * - _next/static (정적 파일)
         * - _next/image (이미지 최적화 파일)
         * - favicon.ico (파비콘 파일)
         * - images (정적 이미지 파일)
         * - downloads (정적 다운로드 파일)
         * - assets (정적 에셋 파일)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images|downloads|assets|emt|gentop/gentop-next).*)',
    ],
}
