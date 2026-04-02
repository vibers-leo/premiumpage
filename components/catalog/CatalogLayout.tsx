import React from "react";
import type { CatalogConfig, SupportedLanguage, ThemeMode } from "@catalog-core/types";

interface CatalogLayoutProps {
    children: React.ReactNode;
    config: CatalogConfig;
    lang?: SupportedLanguage;
    className?: string;
}

/**
 * CatalogLayout - 모든 카탈로그의 공통 레이아웃 래퍼.
 *
 * 카탈로그별 Header, Footer, Theme 등을 설정에 따라 렌더링합니다.
 * 실제 Header/Footer 컴포넌트는 각 카탈로그가 주입합니다.
 *
 * @example
 * ```tsx
 * <CatalogLayout config={gentopConfig} lang="en">
 *   <PageContent />
 * </CatalogLayout>
 * ```
 */
export function CatalogLayout({
    children,
    config,
    lang,
    className,
}: CatalogLayoutProps) {
    const currentLang = lang || config.defaultLanguage;

    return (
        <div
            className={className}
            data-catalog={config.name}
            data-lang={currentLang}
        >
            {children}
        </div>
    );
}

/**
 * 카탈로그 설정 헬퍼 - 기본값과 병합하여 완전한 CatalogConfig 생성
 */
export function createCatalogConfig(
    partial: Partial<CatalogConfig> & Pick<CatalogConfig, 'name' | 'displayName' | 'template' | 'basePath' | 'publicPath'>
): CatalogConfig {
    return {
        languages: ['en', 'ko'],
        defaultLanguage: 'en',
        defaultTheme: 'dark',
        features: {
            showFooter: true,
            showLanguageToggle: false,
            showPageNavigator: true,
            wheelNavigation: true,
            swipeNavigation: true,
            keyboardNavigation: true,
            darkMode: true,
            lightMode: true,
        },
        ...partial,
    };
}
