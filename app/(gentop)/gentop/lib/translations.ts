
export const translations = {
    en: {
        hero: {
            title: "Total Solution Provider",
            subtitle: "Construction & Facilities Management Industry Leader.",
            description: "GENTOP believes that technology can make people's lives wiser and be filled with smiles. Through challenges and leaps, GENTOP will be a business that offers happiness to your lives with technology that precedes always.",
            cta_company: "Company Info",
            cta_business: "Our Business",
            scroll_hint: "Scroll down to continue",
            scroll_ready: "Scroll again to next page"
        },
        business: {
            badge: "Business Scope",
            title: "Our Business Areas",
            subtitle: "Providing optimized solutions for customer safety and convenience.",
            description: "GENTOP believes that technology can make people’s lives wiser and be filled with smiles. Through challenges and leaps, GENTOP will be a business that offers happiness to your lives with technology that precedes always."
        },
        portfolio: {
            title: "PORTFOLIO",
            subtitle: "Going forward, and benefiting society as well. The philosophy of our company is to respect human dignity.",
            more: "More View"
        },
        footer: {
            address: "(51233) 7F, 59, Gwangnyeocheonnam-ro, Naeseo-eup, Masanhoewon-gu, Changwon-si, Gyeongsangnam-do, Korea",
            tel: "+82-55-231-9152",
            email: "ceo@gentop.co.kr",
            ceo: "Hong Dae, Park",
            regNo: "608-81-56200",
            copy: "© 2026 GENTOP Co., Ltd. All rights reserved."
        }
    },
    ko: {
        hero: {
            title: "토탈 솔루션 프로바이더",
            subtitle: "공사 및 시설관리 산업의 선두주자.",
            description: "젠탑은 기술이 사람들의 삶을 더욱 현명하고 미소 짓게 한다고 믿습니다. 끊임없는 도전과 도약을 통해 항상 앞서가는 기술로 여러분의 삶에 행복을 드리는 기업이 되겠습니다.",
            cta_company: "회사소개",
            cta_business: "사업분야",
            scroll_hint: "아래로 스크롤하여 계속",
            scroll_ready: "다시 스크롤하여 다음 페이지로"
        },
        business: {
            badge: "사업영역",
            title: "주요 사업 분야",
            subtitle: "고객의 안전과 편의를 위해 최적화된 솔루션을 제공합니다.",
            description: "젠탑은 기술이 사람들의 삶을 더욱 현명하고 미소 짓게 한다고 믿습니다. 끊임없는 도전과 도약을 통해 항상 앞서가는 기술로 여러분의 삶에 행복을 드리는 기업이 되겠습니다."
        },
        portfolio: {
            title: "주요 실적",
            subtitle: "앞서가는 기술로 사회에 공헌하며 인간존중의 기업이념을 실현합니다.",
            more: "더 보기"
        },
        footer: {
            address: "(51233) 경남 창원시 마산회원구 내서읍 광려천남로 59 (재)경남로봇랜드재단 715~717호",
            tel: "055-231-9152",
            email: "ceo@gentop.co.kr",
            ceo: "박홍대",
            regNo: "608-81-56200",
            copy: "© 2026 GENTOP Co., Ltd. 모든 권리 보유."
        }
    }
};

export type Lang = keyof typeof translations;

export const getTranslation = (lang: string) => {
    return translations[lang as Lang] || translations.en;
};
