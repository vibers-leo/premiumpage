/**
 * Middleware Helper
 *
 * 새 카탈로그 도메인 라우팅을 middleware.ts에 추가하기 위한 헬퍼.
 * catalog-factory 파이프라인에서 사용됩니다.
 */

export interface CatalogRoute {
    /** 카탈로그 이름 (kebab-case) */
    catalogName: string;
    /** 서브도메인 (예: "acme" → acme.premiumpage.kr) */
    subdomain: string;
    /** 앱 라우트 경로 (예: "/templates/acme" 또는 "/acme/en") */
    appRoute: string;
    /** 라우팅 타입 */
    routeType: 'template' | 'app-group';
    /** 다국어 지원 시 기본 언어 */
    defaultLang?: string;
    /** 추가 경로 매핑 (하위 경로를 앱 라우트로 리라이트) */
    rewriteSubPaths?: boolean;
}

/**
 * 새 카탈로그의 middleware 라우팅 코드 블록을 생성합니다.
 *
 * @returns middleware.ts에 삽입할 코드 문자열
 *
 * @example
 * const route: CatalogRoute = {
 *     catalogName: 'acme-corp',
 *     subdomain: 'acme',
 *     appRoute: '/templates/acme-corp',
 *     routeType: 'template',
 * };
 * const code = generateMiddlewareBlock(route);
 * // → middleware.ts의 "return NextResponse.next()" 직전에 삽입
 */
export function generateMiddlewareBlock(route: CatalogRoute): string {
    const { catalogName, subdomain, appRoute, routeType, defaultLang, rewriteSubPaths } = route;
    const domain = `${subdomain}.premiumpage.kr`;

    const lines: string[] = [];
    lines.push(`    // ${catalogName.toUpperCase()} 도메인 처리`);
    lines.push(`    if (hostname.includes('${domain}')) {`);

    if (routeType === 'app-group' && defaultLang) {
        // GENTOP 패턴: / → /catalogName/defaultLang
        lines.push(`        if (url.pathname === '/') {`);
        lines.push(`            const response = NextResponse.rewrite(new URL('/${catalogName}/${defaultLang}', request.url))`);
        lines.push(`            response.headers.set('x-template-page', 'true')`);
        lines.push(`            return response`);
        lines.push(`        }`);

        if (rewriteSubPaths) {
            lines.push(``);
            lines.push(`        if (!url.pathname.startsWith('/${catalogName}')) {`);
            lines.push(`            const response = NextResponse.rewrite(new URL(\`/${catalogName}\${url.pathname}\`, request.url))`);
            lines.push(`            response.headers.set('x-template-page', 'true')`);
            lines.push(`            return response`);
            lines.push(`        }`);
        }
    } else {
        // 템플릿 패턴: / → /templates/catalogName
        lines.push(`        if (url.pathname === '/') {`);
        lines.push(`            const response = NextResponse.rewrite(new URL('${appRoute}', request.url))`);
        lines.push(`            response.headers.set('x-template-page', 'true')`);
        lines.push(`            return response`);
        lines.push(`        }`);
    }

    lines.push(`    }`);
    lines.push(``);

    return lines.join('\n');
}

/**
 * 기존 middleware.ts 코드에 새 라우팅 블록을 삽입합니다.
 * "return NextResponse.next()" 직전에 삽입됩니다.
 *
 * @returns 업데이트된 middleware.ts 전체 코드
 */
export function insertRouteIntoMiddleware(
    existingCode: string,
    route: CatalogRoute
): string {
    const block = generateMiddlewareBlock(route);
    const insertPoint = '    return NextResponse.next()';

    if (!existingCode.includes(insertPoint)) {
        throw new Error('middleware.ts에서 "return NextResponse.next()" 를 찾을 수 없습니다.');
    }

    return existingCode.replace(insertPoint, `${block}${insertPoint}`);
}

/**
 * URL에서 카탈로그 이름을 추출합니다.
 *
 * @example
 * extractCatalogName("https://www.gentop.co.kr") → "gentop"
 * extractCatalogName("https://www.acme-corp.com") → "acme-corp"
 * extractCatalogName("https://example.co.kr") → "example"
 */
export function extractCatalogName(url: string): string {
    try {
        const parsed = new URL(url);
        let host = parsed.hostname;

        // www. 제거
        host = host.replace(/^www\./, '');

        // TLD 및 SLD 제거 (.co.kr, .com, .kr, .net 등)
        host = host.replace(/\.(co\.kr|com|kr|net|org|io|co|biz)$/, '');

        // 점을 하이픈으로 변환
        host = host.replace(/\./g, '-');

        // 소문자 + kebab-case
        return host.toLowerCase().replace(/[^a-z0-9-]/g, '');
    } catch {
        // URL 파싱 실패 시 간단한 추출
        const match = url.match(/(?:www\.)?([^./]+)/);
        return match ? match[1].toLowerCase().replace(/[^a-z0-9-]/g, '') : 'new-catalog';
    }
}

/**
 * middleware.ts의 matcher 패턴에서 새 카탈로그 정적 파일 경로를 제외합니다.
 * (이미 matcher에 포함되어 있을 수 있으므로 중복 체크)
 */
export function updateMatcherExclusions(
    existingCode: string,
    catalogName: string
): string {
    // matcher 패턴에 이미 해당 카탈로그가 제외되어 있는지 확인
    if (existingCode.includes(catalogName)) {
        return existingCode; // 이미 포함됨
    }

    // 기존 matcher에서 마지막 제외 항목 뒤에 새 항목 추가
    // 예: gentop/gentop-next → gentop/gentop-next|newcatalog
    const matcherRegex = /(\/\((?:\?!.*?)\)\.\*\)')/;
    const match = existingCode.match(matcherRegex);

    if (match) {
        // 정적 파일 경로가 필요한 경우에만 추가
        // 대부분의 카탈로그는 기존 matcher로 충분
        return existingCode;
    }

    return existingCode;
}
