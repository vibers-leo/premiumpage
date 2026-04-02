/**
 * Pipeline Integration Test
 *
 * 기존 GENTOP 데이터를 사용하여 파이프라인의 각 단계를 검증합니다.
 * 실행: npx tsx lib/catalog-core/test-pipeline.ts
 */

import type { ScrapedData, CatalogConfig } from './types';
import { buildCompanyProfile, buildTranslations, buildNavigation } from './data-transformer';
import { validateCatalog, formatValidationReport } from './validator';
import { parseMarkdownContent, mergeScrapedData } from './scraper';
import { createCatalogConfig } from '../../components/catalog/CatalogLayout';
import { generateColorScheme, extractColorsFromCSS, pickBrandColor, generateCSSVariables } from './color-extractor';
import { extractCatalogName, generateMiddlewareBlock, insertRouteIntoMiddleware } from './middleware-helper';
import type { CatalogRoute } from './middleware-helper';

// ─── Mock Scraped Data (GENTOP 기반) ─────────────────────────────

const mockGentopHomepage: ScrapedData = {
    url: 'https://www.gentop.co.kr',
    title: 'GENTOP | Total Solution Provider',
    texts: [
        { tag: 'h1', content: 'GENTOP', order: 0 },
        { tag: 'h2', content: 'Total Solution Provider', order: 1 },
        { tag: 'p', content: 'GENTOP believes that technology can make people\'s lives wiser and be filled with smiles. Through challenges and leaps, GENTOP will be a business that offers happiness to your lives with technology that precedes always.', order: 2 },
        { tag: 'p', content: '젠탑은 기술이 사람들의 삶을 더욱 현명하고 미소 짓게 한다고 믿습니다.', order: 3 },
        { tag: 'h2', content: 'Company Introduction', section: 'company', order: 4 },
        { tag: 'h2', content: 'Business Scope', section: 'business', order: 5 },
        { tag: 'h2', content: 'Portfolio', section: 'portfolio', order: 6 },
        { tag: 'p', content: 'TEL: 055-231-9152', order: 7 },
        { tag: 'p', content: 'FAX: 055-231-9153', order: 8 },
        { tag: 'p', content: 'Email: ceo@gentop.co.kr', order: 9 },
        { tag: 'p', content: '주소: (51233) 경남 창원시 마산회원구 내서읍 광려천남로 59', order: 10 },
    ],
    images: [
        { src: '/images/logo.png', alt: 'GENTOP Logo', order: 0 },
        { src: '/images/global_pic.jpg', alt: 'Global Network', order: 1 },
        { src: '/images/company_view.jpg', alt: 'Company View', section: 'company', order: 2 },
        { src: '/images/construction.jpg', alt: 'Construction', section: 'business', order: 3 },
        { src: '/images/facilities.jpg', alt: 'Facilities', section: 'business', order: 4 },
        { src: '/images/cctv.jpg', alt: 'CCTV System', section: 'business', order: 5 },
    ],
    tables: [
        {
            headers: ['Year', 'Event'],
            rows: [
                ['2004', 'Company Founded'],
                ['2010', 'ISO 9001 Certified'],
                ['2015', 'Cambodia Branch'],
                ['2020', 'Myanmar Branch'],
            ],
            section: 'history',
        },
    ],
    links: [
        { href: '/sub/sub01_01.html', text: 'Company Introduction', isInternal: true },
        { href: '/sub/sub01_02.html', text: 'Global Network', isInternal: true },
        { href: '/sub/sub01_03.html', text: 'CEO Greeting', isInternal: true },
        { href: '/sub/sub01_04.html', text: 'History', isInternal: true },
        { href: '/sub/sub02_01.html', text: 'Construction Infra', isInternal: true },
        { href: '/sub/sub02_02.html', text: 'Facilities Management', isInternal: true },
        { href: '/sub/sub02_03.html', text: 'Public Address', isInternal: true },
        { href: '/sub/sub02_04.html', text: 'Parking Control', isInternal: true },
        { href: '/sub/sub02_05.html', text: 'CCTV System', isInternal: true },
        { href: '/sub/sub03_01.html', text: 'Portfolio', isInternal: true },
        { href: '/sub/sub04_01.html', text: 'Contact', isInternal: true },
    ],
    metadata: {
        'description': 'GENTOP - Total Solution Provider for Construction & Facilities Management',
        'og:site_name': 'GENTOP',
    },
};

// ─── Test Execution ──────────────────────────────────────────────

function runTest() {
    console.log('=== 전자카탈로그 파이프라인 통합 테스트 ===\n');

    // Phase 1: 데이터 파싱 테스트
    console.log('--- Phase 1: 마크다운 파싱 테스트 ---');
    const testMarkdown = `# GENTOP
## Total Solution Provider

GENTOP believes that technology can make people's lives wiser.

![Logo](/images/logo.png)
![Company View](/images/company_view.jpg)

| Year | Event |
|------|-------|
| 2004 | Founded |
| 2010 | ISO 9001 |

[Company Info](/sub/sub01_01.html)
[Business](/sub/sub02_01.html)
`;

    const parsed = parseMarkdownContent('https://www.gentop.co.kr', testMarkdown, 'GENTOP');
    console.log(`  텍스트 추출: ${parsed.texts.length}개`);
    console.log(`  이미지 추출: ${parsed.images.length}개`);
    console.log(`  테이블 추출: ${parsed.tables.length}개`);
    console.log(`  링크 추출: ${parsed.links.length}개`);
    console.log('');

    // Phase 2: CompanyProfile 생성 테스트
    console.log('--- Phase 2: CompanyProfile 생성 ---');
    const profile = buildCompanyProfile({
        scraped: mockGentopHomepage,
        colors: {
            primary: '#ADE813', // GENTOP green
            primaryLight: '#C5F04B',
            primaryDark: '#8BC000',
        },
    });

    console.log(`  회사명: ${profile.name}`);
    console.log(`  도메인: ${profile.domain}`);
    console.log(`  로고: ${profile.logo}`);
    console.log(`  색상: ${profile.colors.primary}`);
    console.log(`  연락처: ${profile.contact.email}`);
    console.log(`  전화: ${profile.contact.phone}`);
    console.log(`  섹션 수: ${profile.sections.length}개`);
    profile.sections.forEach(s => {
        console.log(`    - ${s.id}: ${s.title} (${s.type})`);
    });
    console.log('');

    // Phase 3: 번역 데이터 생성 테스트
    console.log('--- Phase 3: 번역 데이터 생성 ---');
    const translations = buildTranslations(mockGentopHomepage, profile);
    console.log(`  영문 hero.title: ${(translations.en.hero as any)?.title}`);
    console.log(`  한글 hero.title: ${(translations.ko.hero as any)?.title}`);
    console.log(`  영문 footer.copy: ${(translations.en.footer as any)?.copy}`);
    console.log('');

    // Phase 4: 네비게이션 생성 테스트
    console.log('--- Phase 4: 네비게이션 생성 ---');
    const nav = buildNavigation(profile, 'en');
    console.log(`  메뉴 항목: ${nav.mainMenu.length}개`);
    console.log(`  카탈로그 페이지: ${nav.catalogPages.length}개`);
    nav.catalogPages.forEach((p, i) => {
        console.log(`    ${i + 1}. ${p}`);
    });
    console.log('');

    // Phase 5: 검증 테스트
    console.log('--- Phase 5: 카탈로그 검증 ---');
    const config = createCatalogConfig({
        name: 'gentop',
        displayName: 'GENTOP',
        template: 'company-multi-page',
        basePath: 'app/(gentop)/gentop',
        publicPath: 'public/gentop',
    });

    const validation = validateCatalog(profile, config, mockGentopHomepage);
    console.log(formatValidationReport(validation));
    console.log('');

    // Phase 6: 데이터 병합 테스트
    console.log('--- Phase 6: 데이터 병합 테스트 ---');
    const merged = mergeScrapedData([mockGentopHomepage, parsed]);
    console.log(`  병합 후 텍스트: ${merged.texts.length}개`);
    console.log(`  병합 후 이미지: ${merged.images.length}개 (중복 제거)`);
    console.log(`  병합 후 링크: ${merged.links.length}개 (중복 제거)`);
    console.log('');

    // Phase 7: 색상 추출 + 스킴 생성 테스트
    console.log('--- Phase 7: 색상 추출 및 스킴 생성 ---');
    const testCSS = `
        body { color: #333; background: #f5f5f5; }
        .brand { color: #ADE813; }
        .accent { color: #2979FF; }
        .header { background: rgb(173, 232, 19); }
    `;
    const extractedColors = extractColorsFromCSS(testCSS);
    console.log(`  CSS에서 추출된 색상: ${extractedColors.length}개`);
    extractedColors.forEach(c => console.log(`    - ${c}`));

    const brandColor = pickBrandColor(extractedColors);
    console.log(`  선택된 브랜드 색상: ${brandColor}`);

    const scheme = generateColorScheme(brandColor);
    console.log(`  색상 스킴:`);
    console.log(`    primary: ${scheme.primary}`);
    console.log(`    primaryLight: ${scheme.primaryLight}`);
    console.log(`    primaryDark: ${scheme.primaryDark}`);
    console.log(`    accent: ${scheme.accent}`);

    const cssVars = generateCSSVariables(scheme);
    console.log(`  CSS 변수 생성: ${cssVars.split('\n').length}줄`);
    console.log('');

    // Phase 8: Middleware 헬퍼 테스트
    console.log('--- Phase 8: Middleware 헬퍼 테스트 ---');

    // URL → 카탈로그 이름 추출
    const testUrls = [
        'https://www.gentop.co.kr',
        'https://www.acme-corp.com',
        'https://example.co.kr',
        'https://www.my-company.net',
    ];
    testUrls.forEach(url => {
        console.log(`  ${url} → "${extractCatalogName(url)}"`);
    });

    // 미들웨어 블록 생성
    const testRoute: CatalogRoute = {
        catalogName: 'acme-corp',
        subdomain: 'acme',
        appRoute: '/templates/acme-corp',
        routeType: 'template',
    };
    const middlewareBlock = generateMiddlewareBlock(testRoute);
    console.log(`  미들웨어 블록 생성:`);
    console.log(middlewareBlock.split('\n').map(l => `    ${l}`).join('\n'));

    // 미들웨어 삽입 테스트
    const mockMiddleware = `export function middleware(request) {
    const hostname = request.headers.get('host') || ''

    return NextResponse.next()
}`;
    const updated = insertRouteIntoMiddleware(mockMiddleware, testRoute);
    console.log(`  미들웨어 삽입 후 라인 수: ${updated.split('\n').length}줄`);
    console.log(`  삽입 성공: ${updated.includes('acme') ? '✅' : '❌'}`);
    console.log('');

    // 최종 결과
    console.log('=== 테스트 완료 ===');
    console.log(`전체 검증 점수: ${validation.score}/100`);
    console.log(`통과 여부: ${validation.passed ? '✅ PASS' : '❌ FAIL'}`);
}

runTest();
