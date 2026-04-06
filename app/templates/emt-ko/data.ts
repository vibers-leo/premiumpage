export const EMT_MENU_KO = [
    {
        id: 'about',
        label: '소개',
        subs: [
            { id: 'overview', label: '기업 개요', slide: 1 },
            { id: 'vision', label: '비전 & 미션', slide: 2 },
            { id: 'partners', label: '파트너사', slide: 3 },
            { id: 'solutions', label: '모빌리티 제어', slide: 4 },
            { id: 'esg', label: 'ESG 경영', slide: 5 },
        ]
    },
    {
        id: 'products',
        label: '제품',
        subs: [
            { id: 'p_overview', label: '제품 개요', slide: 6 },
            { id: 'sensors', label: '센서', slide: 7 },
            { id: 'actuators', label: '액추에이터', slide: 11 },
            { id: 'controllers', label: '컨트롤러', slide: 12 },
        ]
    },
    {
        id: 'support',
        label: '고객지원',
        subs: [
            { id: 'directions', label: '오시는 길', slide: 13 },
        ]
    }
]

export const EMT_PRODUCTS_KO = [
    {
        id: 'ptc-heater',
        category: 'Sensors',
        title: 'PTC 히터',
        image: '/emt/assets/19.png',
        desc: '세라믹 반도체의 저항 특성을 이용하여 일정 온도 이상에서 자동으로 전류를 제한하는 자가 제어식 전기 히터'
    },
    // ... more products
]
