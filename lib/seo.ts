import type { Metadata } from 'next'

export const siteConfig = {
    name: 'Premium Page',
    description: '프리미엄 웹사이트 제작 플랫폼 - 23개의 전문 템플릿으로 빠르고 쉽게 비즈니스 웹사이트를 만드세요',
    url: 'https://premiumpage.com',
    ogImage: '/og-image.png',
    keywords: [
        '웹사이트 제작',
        '홈페이지 제작',
        '반응형 웹',
        '프리미엄 템플릿',
        '비즈니스 웹사이트',
        '랜딩 페이지',
        '포트폴리오',
        '전자상거래',
        '웹 디자인',
        'Next.js'
    ],
    creator: 'Premium Page Team'
}

export const defaultMetadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@premiumpage'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    verification: {
        google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code'
    }
}

// 구조화된 데이터 (JSON-LD)
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-2-1234-5678',
        contactType: 'customer service',
        email: 'info@premiumpage.com',
        availableLanguage: ['Korean']
    },
    sameAs: [
        'https://www.facebook.com/premiumpage',
        'https://www.instagram.com/premiumpage',
        'https://twitter.com/premiumpage'
    ]
}

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
    }
}
