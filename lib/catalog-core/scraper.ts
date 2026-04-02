/**
 * Scraper Utilities
 *
 * 웹사이트에서 카탈로그 데이터를 추출하는 유틸리티 함수.
 * Claude Code의 WebFetch 도구와 함께 사용됩니다.
 *
 * 이 모듈은 Node.js 런타임이 아닌 Claude Code 에이전트가 사용하는
 * 데이터 파싱/정규화 유틸리티를 제공합니다.
 */

import type {
    ScrapedData,
    ScrapedText,
    ScrapedImage,
    ScrapedTable,
    ScrapedLink,
} from './types';

// ─── HTML Parsing Utilities ──────────────────────────────────────

/**
 * WebFetch에서 반환된 마크다운 콘텐츠를 ScrapedData로 파싱.
 * WebFetch는 HTML을 마크다운으로 변환하므로, 마크다운을 파싱합니다.
 */
export function parseMarkdownContent(
    url: string,
    markdown: string,
    pageTitle?: string
): ScrapedData {
    const texts = extractTextsFromMarkdown(markdown);
    const images = extractImagesFromMarkdown(markdown, url);
    const tables = extractTablesFromMarkdown(markdown);
    const links = extractLinksFromMarkdown(markdown, url);
    const metadata = extractMetadataFromMarkdown(markdown);

    return {
        url,
        title: pageTitle || metadata['title'] || extractTitleFromMarkdown(markdown),
        texts,
        images,
        tables,
        links,
        metadata,
    };
}

// ─── Text Extraction ─────────────────────────────────────────────

function extractTextsFromMarkdown(markdown: string): ScrapedText[] {
    const texts: ScrapedText[] = [];
    const lines = markdown.split('\n');
    let order = 0;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Headings
        const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            texts.push({
                tag: `h${level}`,
                content: headingMatch[2].replace(/\*\*/g, '').trim(),
                order: order++,
            });
            continue;
        }

        // 일반 텍스트 (마크다운 링크/이미지 제외)
        if (!trimmed.startsWith('![') && !trimmed.startsWith('|') && trimmed.length > 10) {
            texts.push({
                tag: 'p',
                content: cleanMarkdownText(trimmed),
                order: order++,
            });
        }
    }

    return texts;
}

function cleanMarkdownText(text: string): string {
    return text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) → text
        .replace(/\*\*([^*]+)\*\*/g, '$1')         // **bold** → bold
        .replace(/\*([^*]+)\*/g, '$1')             // *italic* → italic
        .replace(/`([^`]+)`/g, '$1')               // `code` → code
        .replace(/^[-*+]\s+/g, '')                  // list markers
        .trim();
}

// ─── Image Extraction ────────────────────────────────────────────

function extractImagesFromMarkdown(markdown: string, baseUrl: string): ScrapedImage[] {
    const images: ScrapedImage[] = [];
    // ![alt](src) 패턴
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;

    while ((match = imgRegex.exec(markdown)) !== null) {
        const alt = match[1];
        const src = resolveUrl(match[2], baseUrl);

        // 데이터 URI나 아이콘 제외
        if (src.startsWith('data:') || src.includes('favicon') || src.includes('icon')) {
            continue;
        }

        images.push({
            src,
            alt: alt || '',
            order: images.length,
        });
    }

    return images;
}

// ─── Table Extraction ────────────────────────────────────────────

function extractTablesFromMarkdown(markdown: string): ScrapedTable[] {
    const tables: ScrapedTable[] = [];
    const lines = markdown.split('\n');

    let inTable = false;
    let headers: string[] = [];
    let rows: string[][] = [];

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            const cells = trimmed
                .split('|')
                .slice(1, -1) // 앞뒤 빈 요소 제거
                .map(c => c.trim());

            // 구분선 건너뛰기 (|---|---|)
            if (cells.every(c => /^[-:]+$/.test(c))) {
                continue;
            }

            if (!inTable) {
                // 첫 행 = 헤더
                headers = cells;
                inTable = true;
            } else {
                rows.push(cells);
            }
        } else if (inTable) {
            // 테이블 종료
            if (headers.length > 0) {
                tables.push({ headers, rows });
            }
            headers = [];
            rows = [];
            inTable = false;
        }
    }

    // 마지막 테이블 처리
    if (inTable && headers.length > 0) {
        tables.push({ headers, rows });
    }

    return tables;
}

// ─── Link Extraction ─────────────────────────────────────────────

function extractLinksFromMarkdown(markdown: string, baseUrl: string): ScrapedLink[] {
    const links: ScrapedLink[] = [];
    // [text](url) 패턴 (이미지 제외)
    const linkRegex = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    const baseDomain = getDomain(baseUrl);

    while ((match = linkRegex.exec(markdown)) !== null) {
        const text = match[1];
        const href = resolveUrl(match[2], baseUrl);

        // 앵커 링크 제외
        if (href.startsWith('#')) continue;

        const linkDomain = getDomain(href);
        links.push({
            href,
            text: text.trim(),
            isInternal: linkDomain === baseDomain || href.startsWith('/'),
        });
    }

    return links;
}

// ─── Metadata Extraction ─────────────────────────────────────────

function extractMetadataFromMarkdown(markdown: string): Record<string, string> {
    const metadata: Record<string, string> = {};

    // 첫 h1을 title로
    const h1Match = markdown.match(/^#\s+(.+)/m);
    if (h1Match) {
        metadata['title'] = h1Match[1].trim();
    }

    return metadata;
}

function extractTitleFromMarkdown(markdown: string): string {
    const h1Match = markdown.match(/^#\s+(.+)/m);
    if (h1Match) return h1Match[1].trim();

    const h2Match = markdown.match(/^##\s+(.+)/m);
    if (h2Match) return h2Match[1].trim();

    return 'Untitled';
}

// ─── URL Utilities ───────────────────────────────────────────────

function resolveUrl(href: string, baseUrl: string): string {
    if (href.startsWith('http://') || href.startsWith('https://')) {
        return href;
    }
    try {
        return new URL(href, baseUrl).toString();
    } catch {
        return href;
    }
}

function getDomain(url: string): string {
    try {
        return new URL(url).hostname;
    } catch {
        return '';
    }
}

// ─── Merge & Deduplicate ─────────────────────────────────────────

/** 여러 페이지에서 추출한 데이터를 하나로 병합 */
export function mergeScrapedData(pages: ScrapedData[]): ScrapedData {
    if (pages.length === 0) {
        return {
            url: '',
            title: '',
            texts: [],
            images: [],
            tables: [],
            links: [],
            metadata: {},
        };
    }

    const primary = pages[0];
    const allTexts: ScrapedText[] = [];
    const allImages: ScrapedImage[] = [];
    const allTables: ScrapedTable[] = [];
    const allLinks: ScrapedLink[] = [];
    const allMetadata: Record<string, string> = {};

    const seenImages = new Set<string>();
    const seenLinks = new Set<string>();

    for (const page of pages) {
        // 텍스트 병합 (섹션 표시)
        for (const text of page.texts) {
            allTexts.push({
                ...text,
                section: text.section || guessSectionFromUrl(page.url),
                order: allTexts.length,
            });
        }

        // 이미지 중복 제거
        for (const img of page.images) {
            if (!seenImages.has(img.src)) {
                seenImages.add(img.src);
                allImages.push({
                    ...img,
                    section: img.section || guessSectionFromUrl(page.url),
                });
            }
        }

        // 테이블 병합
        allTables.push(...page.tables.map(t => ({
            ...t,
            section: t.section || guessSectionFromUrl(page.url),
        })));

        // 링크 중복 제거
        for (const link of page.links) {
            if (!seenLinks.has(link.href)) {
                seenLinks.add(link.href);
                allLinks.push(link);
            }
        }

        // 메타데이터 병합
        Object.assign(allMetadata, page.metadata);
    }

    return {
        url: primary.url,
        title: primary.title,
        texts: allTexts,
        images: allImages,
        tables: allTables,
        links: allLinks,
        metadata: allMetadata,
    };
}

function guessSectionFromUrl(url: string): string {
    try {
        const pathname = new URL(url).pathname.toLowerCase();
        if (pathname === '/' || pathname === '') return 'intro';
        if (pathname.includes('company') || pathname.includes('about')) return 'company';
        if (pathname.includes('business') || pathname.includes('service')) return 'business';
        if (pathname.includes('product') || pathname.includes('catalog')) return 'product';
        if (pathname.includes('portfolio') || pathname.includes('project')) return 'portfolio';
        if (pathname.includes('contact') || pathname.includes('inquiry')) return 'contact';
        return pathname.split('/').filter(Boolean)[0] || 'other';
    } catch {
        return 'other';
    }
}

// ─── Image Filename Normalizer ───────────────────────────────────

/** 이미지 파일명을 카탈로그 표준 형식으로 정규화 */
export function normalizeImageFilename(
    originalUrl: string,
    section: string,
    index: number
): string {
    // 원본 확장자 추출
    const ext = getFileExtension(originalUrl) || 'png';

    // 파일명 정규화
    const safeName = originalUrl
        .split('/')
        .pop()
        ?.replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_+/g, '_')
        .replace(/\.[^.]+$/, '') // 확장자 제거
        || `${section}_${index}`;

    return `${safeName}_v1.${ext}`;
}

function getFileExtension(url: string): string {
    const match = url.match(/\.(\w{3,4})(?:\?|$)/);
    if (match) {
        const ext = match[1].toLowerCase();
        if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return ext;
        }
    }
    return 'png';
}
