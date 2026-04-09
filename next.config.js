/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.premiumpage.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    // 성능 최적화
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // 압축 활성화
    compress: true,

    // 출력 파일 추적 제외
    outputFileTracingExcludes: {
        '*': [
            'public/emt/**/*',
            'public/assets/2026/**/*',
            'public/templates/hangseong/**/*',
            'public/assets/hs-tech/**/*',
            'public/images/EMT_files/**/*',
            'public/images/Contact_files/**/*',
            'public/downloads/hs-tech/**/*',
            'public/images/HS-TECH_files/**/*',
            'public/images/information_files/**/*'
        ]
    },

    // 서버 외부 패키지 (네이티브 모듈 및 Turbopack 번들링 제외)
    serverExternalPackages: [
        '@libsql/client',
        'libsql',
        '@libsql/isomorphic-fetch',
        '@libsql/isomorphic-ws',
        '@libsql/hrana-client',
        '@prisma/adapter-libsql',
        '@prisma/client'
    ],

    // 실험적 기능
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },

    // 헤더 설정
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-store, must-revalidate'
                    }
                ]
            },
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
