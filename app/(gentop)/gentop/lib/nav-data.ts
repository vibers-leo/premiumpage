
export const getMenuItems = (lang: string) => [
    {
        title: lang === "ko" ? "회사소개" : "COMPANY",
        link: `/${lang}/company/introduction`,
        items: [
            { name: lang === "ko" ? "회사소개" : "Introduction", link: `/${lang}/company/introduction` },
            { name: lang === "ko" ? "인사말" : "Greeting", link: `/${lang}/company/greeting` },
            { name: lang === "ko" ? "연혁" : "History", link: `/${lang}/company/history` },
            { name: lang === "ko" ? "경영철학" : "Philosophy", link: `/${lang}/company/philosophy` },
            { name: lang === "ko" ? "조직도" : "Organization", link: `/${lang}/company/organization` },
            { name: lang === "ko" ? "사업영역" : "Business Scope", link: `/${lang}/company/business_scope` },
            { name: lang === "ko" ? "인증현황" : "Certification", link: `/${lang}/company/certification` },
            { name: lang === "ko" ? "CI/BI" : "CI/BI", link: `/${lang}/company/ci_bi` },
            { name: lang === "ko" ? "오시는 길" : "Location", link: `/${lang}/company/location` },
        ]
    },
    {
        title: lang === "ko" ? "사업분야" : "BUSINESS SCOPE",
        link: `/${lang}/business`,
        items: [
            { name: lang === "ko" ? "건설인프라" : "Construction", link: `/${lang}/business/construction` },
            { name: lang === "ko" ? "시설관리 솔루션" : "Facilities Management", link: `/${lang}/business/facilities` },
            { name: lang === "ko" ? "전관방송시스템" : "Public Address System", link: `/${lang}/business/public_address` },
            { name: lang === "ko" ? "출입·주차 관제시스템" : "Access, Parking", link: `/${lang}/business/access_parking` },
            { name: lang === "ko" ? "CCTV 시스템" : "CCTV System", link: `/${lang}/business/cctv` },
            { name: lang === "ko" ? "LED Display 솔루션" : "LED Display Solution", link: `/${lang}/business/led_display` },
            { name: lang === "ko" ? "친환경 에너지" : "Eco-Friendly", link: `/${lang}/business/eco_friendly` },
        ]
    },
    {
        title: lang === "ko" ? "문의하기" : "CONTACT",
        link: `/${lang}/contact`,
        items: []
    },
];
