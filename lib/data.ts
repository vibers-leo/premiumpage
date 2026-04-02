// Mock data for development

// Type definitions
export type Category = {
    id: string
    name: string
    slug: string
    description: string
}

export type Template = {
    id: string
    name: string
    slug: string
    description: string
    categoryId: string
    category: string
    imageUrl: string
    features: string[]
    demoUrl: string
    popular?: boolean
}

export type DevelopmentPlan = {
    id: string
    name: string
    type: string
    price: number
    features: string[]
    popular?: boolean
}

export type MaintenancePlan = {
    id: string
    name: string
    type: string
    price: number
    features: string[]
    popular?: boolean
}

export const categories: Category[] = [
    {
        id: '1',
        name: 'Basic Viewer',
        slug: 'basic-viewer',
        description: 'PDF 리플렛을 웹뷰어로 즉시 변환 (페이지 넘김 효과)'
    },
    {
        id: '2',
        name: 'Standard Interactive',
        slug: 'interactive',
        description: '반응형 디자인과 애니메이션이 결합된 전문 전자 카탈로그'
    },
    {
        id: '3',
        name: 'Masterpiece 3D',
        slug: 'masterpiece',
        description: 'Three.js 기술이 집약된 압도적 비주얼의 3D 전자 카탈로그'
    }
]

export const templates: Template[] = [
    // Basic Viewer templates
    {
        id: '1',
        name: 'Classic Flyer Viewer',
        slug: 'classic-viewer',
        description: '심플하고 빠른 로딩의 PDF 변환 뷰어입니다.',
        categoryId: '1',
        category: 'Basic Viewer',
        imageUrl: '/templates/viewer-basic.png',
        features: ['PDF Upload', 'Flip Effect', 'Mobile Optimized', 'Link Sharing'],
        demoUrl: '#'
    },
    // Standard Interactive templates
    {
        id: '2',
        name: 'Global Export Standard',
        slug: 'export-standard',
        description: '해외 수출 기업을 위한 다국어 지원 및 세련된 레이아웃의 카탈로그입니다.',
        categoryId: '2',
        category: 'Standard Interactive',
        imageUrl: '/templates/interactive-standard.png',
        features: ['Multilingual Support', 'Interactive UI', 'Product Search', 'Inquiry Form'],
        demoUrl: '#'
    },
    // Masterpiece templates
    {
        id: '3',
        name: 'EMT Tech Masterpiece',
        slug: 'emt-masterpiece',
        description: '압도적인 3D 비주얼과 인터랙티브 경험을 제공하는 최고급 카탈로그입니다.',
        categoryId: '3',
        category: 'Masterpiece 3D',
        imageUrl: '/templates/emt-style.png',
        features: ['Three.js 3D Models', 'Scroll Animation', 'Dark/Light Theme', 'Premium UX'],
        demoUrl: '#',
        popular: true
    }
]

export const developmentPlans: DevelopmentPlan[] = [
    {
        id: '1',
        name: 'Lite (PDF 변환)',
        type: 'Lite',
        price: 500000,
        features: [
            '기존 PDF 1건 웹 변환',
            '페이지 넘김(Flip) 효과 적용',
            '모바일 최적화 뷰어',
            '전용 QR 코드 제공',
            '1개월 무료 유지보수'
        ]
    },
    {
        id: '2',
        name: 'Standard (전문 제작)',
        type: 'Pro',
        price: 3000000,
        features: [
            '맞춤형 인터랙티브 디자인',
            '다국어 지원 (최대 3개국어)',
            '제품 검색 및 필터링 기능',
            '문의하기 폼 연동',
            'SEO 검색 엔진 최적화',
            'SNS 공유 기능 최적화'
        ],
        popular: true
    },
    {
        id: '3',
        name: 'Master (3D 하이엔드)',
        type: 'Master',
        price: 15000000,
        features: [
            'EMT 스타일 3D 모델링 지원',
            '스크롤 기반 인터랙티브 UX',
            '다국어 무제한 지원',
            '실시간 제품 시뮬레이션',
            '고급 애니메이션 효과',
            '글로벌 전용 CDN 배포'
        ]
    }
]

export const maintenancePlans: MaintenancePlan[] = [
    {
        id: '1',
        name: 'Basic',
        type: 'Basic',
        price: 30000,
        features: [
            '안정적인 호스팅 제공',
            '월 1회 스펙 정보 수정',
            '기본 접속 통계 제공',
            '이메일 고객 지원'
        ]
    },
    {
        id: '2',
        name: 'Premium',
        type: 'Premium',
        price: 100000,
        features: [
            '고속 글로벌 CDN 적용',
            '월 5회 상세 정보 수정',
            '상세 유입 경로 분석 보고서',
            '실시간 기술 지원',
            '멀티 도메인 지원'
        ],
        popular: true
    }
]
