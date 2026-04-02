/**
 * Catalog Validator
 *
 * 카탈로그 데이터 및 이미지 매칭을 검증합니다.
 * 파이프라인의 최종 Phase에서 빌드 전 품질을 보장합니다.
 */

import type {
    CompanyProfile,
    CatalogConfig,
    ValidationResult,
    ValidationCheck,
    ScrapedData,
    ScrapedImage,
} from './types';

// ─── Validation Runner ───────────────────────────────────────────

export function validateCatalog(
    profile: CompanyProfile,
    config: CatalogConfig,
    scraped?: ScrapedData
): ValidationResult {
    const checks: ValidationCheck[] = [];

    // 1. 프로필 필수 필드 검증
    checks.push(...validateProfile(profile));

    // 2. 설정 검증
    checks.push(...validateConfig(config));

    // 3. 이미지 검증 (scraped data 있을 때)
    if (scraped) {
        checks.push(...validateImages(scraped.images, config.publicPath));
    }

    // 4. 색상 검증
    checks.push(...validateColors(profile.colors));

    // 5. 섹션 검증
    checks.push(...validateSections(profile.sections));

    const passed = checks.every(c => c.passed || c.severity !== 'error');
    const score = calculateScore(checks);

    return { passed, checks, score };
}

// ─── Profile Validation ─────────────────────────────────────────

function validateProfile(profile: CompanyProfile): ValidationCheck[] {
    const checks: ValidationCheck[] = [];

    checks.push({
        name: 'company-name',
        passed: !!profile.name && profile.name.length > 0,
        message: profile.name
            ? `회사명 확인: "${profile.name}"`
            : '회사명이 비어있습니다',
        severity: 'error',
    });

    checks.push({
        name: 'company-domain',
        passed: isValidUrl(profile.domain),
        message: isValidUrl(profile.domain)
            ? `도메인 확인: ${profile.domain}`
            : `유효하지 않은 도메인: "${profile.domain}"`,
        severity: 'error',
    });

    checks.push({
        name: 'company-logo',
        passed: !!profile.logo && profile.logo.length > 0,
        message: profile.logo
            ? `로고 경로 확인: ${profile.logo}`
            : '로고 이미지 경로가 비어있습니다',
        severity: 'warning',
    });

    checks.push({
        name: 'company-description',
        passed: !!profile.description && profile.description.length >= 20,
        message: profile.description && profile.description.length >= 20
            ? `설명 확인 (${profile.description.length}자)`
            : '회사 설명이 너무 짧거나 비어있습니다 (최소 20자)',
        severity: 'warning',
    });

    checks.push({
        name: 'company-contact-email',
        passed: !!profile.contact.email && isValidEmail(profile.contact.email),
        message: profile.contact.email
            ? `이메일 확인: ${profile.contact.email}`
            : '연락처 이메일이 없습니다',
        severity: 'info',
    });

    checks.push({
        name: 'company-contact-phone',
        passed: !!profile.contact.phone,
        message: profile.contact.phone
            ? `전화번호 확인: ${profile.contact.phone}`
            : '연락처 전화번호가 없습니다',
        severity: 'info',
    });

    return checks;
}

// ─── Config Validation ───────────────────────────────────────────

function validateConfig(config: CatalogConfig): ValidationCheck[] {
    const checks: ValidationCheck[] = [];

    checks.push({
        name: 'config-name',
        passed: !!config.name && config.name.length > 0,
        message: config.name
            ? `카탈로그명 확인: "${config.name}"`
            : '카탈로그 이름이 비어있습니다',
        severity: 'error',
    });

    checks.push({
        name: 'config-template',
        passed: ['company-multi-page', 'product-hierarchy', 'single-page-tabs'].includes(config.template),
        message: `템플릿 패턴: ${config.template}`,
        severity: 'error',
    });

    checks.push({
        name: 'config-languages',
        passed: config.languages.length > 0,
        message: `지원 언어: ${config.languages.join(', ')}`,
        severity: 'error',
    });

    checks.push({
        name: 'config-basepath',
        passed: !!config.basePath,
        message: `앱 경로: ${config.basePath}`,
        severity: 'error',
    });

    checks.push({
        name: 'config-publicpath',
        passed: !!config.publicPath,
        message: `정적 파일 경로: ${config.publicPath}`,
        severity: 'error',
    });

    return checks;
}

// ─── Image Validation ────────────────────────────────────────────

function validateImages(
    images: ScrapedImage[],
    publicPath: string
): ValidationCheck[] {
    const checks: ValidationCheck[] = [];

    // 이미지 개수 확인
    checks.push({
        name: 'images-count',
        passed: images.length > 0,
        message: images.length > 0
            ? `추출된 이미지: ${images.length}개`
            : '추출된 이미지가 없습니다',
        severity: 'warning',
    });

    // 로컬 다운로드 상태 확인
    const downloaded = images.filter(img => img.localPath);
    checks.push({
        name: 'images-downloaded',
        passed: downloaded.length === images.length,
        message: `이미지 다운로드: ${downloaded.length}/${images.length}`,
        severity: downloaded.length >= images.length * 0.8 ? 'info' : 'warning',
    });

    // alt 텍스트 유무 확인
    const withAlt = images.filter(img => img.alt && img.alt.trim().length > 0);
    checks.push({
        name: 'images-alt-text',
        passed: withAlt.length >= images.length * 0.8,
        message: `alt 텍스트 포함: ${withAlt.length}/${images.length} (${Math.round(withAlt.length / Math.max(images.length, 1) * 100)}%)`,
        severity: 'info',
    });

    // 이미지 크기 확인 (너무 작은 이미지 경고)
    const tooSmall = images.filter(img =>
        img.width && img.height && (img.width < 50 || img.height < 50)
    );
    if (tooSmall.length > 0) {
        checks.push({
            name: 'images-size-warning',
            passed: false,
            message: `너무 작은 이미지 ${tooSmall.length}개 감지 (50x50 미만)`,
            severity: 'info',
        });
    }

    return checks;
}

// ─── Color Validation ────────────────────────────────────────────

function validateColors(colors: CompanyProfile['colors']): ValidationCheck[] {
    const checks: ValidationCheck[] = [];

    checks.push({
        name: 'color-primary',
        passed: isValidHexColor(colors.primary),
        message: isValidHexColor(colors.primary)
            ? `브랜드 기본색: ${colors.primary}`
            : `유효하지 않은 기본색: "${colors.primary}"`,
        severity: 'warning',
    });

    // 다크모드 텍스트 대비 검증 (WCAG AA: 4.5:1)
    const darkContrast = getContrastRatio(colors.text.dark, colors.background.dark);
    checks.push({
        name: 'color-dark-contrast',
        passed: darkContrast >= 4.5,
        message: `다크모드 대비율: ${darkContrast.toFixed(1)}:1 (최소 4.5:1)`,
        severity: darkContrast >= 4.5 ? 'info' : 'warning',
    });

    // 라이트모드 텍스트 대비 검증
    const lightContrast = getContrastRatio(colors.text.light, colors.background.light);
    checks.push({
        name: 'color-light-contrast',
        passed: lightContrast >= 4.5,
        message: `라이트모드 대비율: ${lightContrast.toFixed(1)}:1 (최소 4.5:1)`,
        severity: lightContrast >= 4.5 ? 'info' : 'warning',
    });

    return checks;
}

// ─── Section Validation ──────────────────────────────────────────

function validateSections(sections: CompanyProfile['sections']): ValidationCheck[] {
    const checks: ValidationCheck[] = [];

    checks.push({
        name: 'sections-count',
        passed: sections.length >= 2,
        message: sections.length >= 2
            ? `섹션 수: ${sections.length}개`
            : `섹션이 너무 적습니다 (${sections.length}개, 최소 2개)`,
        severity: sections.length >= 2 ? 'info' : 'warning',
    });

    // 필수 섹션 확인
    const hasIntro = sections.some(s => s.type === 'intro');
    checks.push({
        name: 'sections-intro',
        passed: hasIntro,
        message: hasIntro ? '인트로 섹션 확인' : '인트로 섹션이 없습니다',
        severity: 'warning',
    });

    return checks;
}

// ─── Utility Functions ───────────────────────────────────────────

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function isValidEmail(email: string): boolean {
    return /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(email);
}

function isValidHexColor(color: string): boolean {
    return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color);
}

/** hex 색상 → 상대 휘도 계산 */
function getLuminance(hex: string): number {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 대비율 계산 */
function getContrastRatio(color1: string, color2: string): number {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const clean = hex.replace('#', '');
    if (clean.length === 3) {
        return {
            r: parseInt(clean[0] + clean[0], 16),
            g: parseInt(clean[1] + clean[1], 16),
            b: parseInt(clean[2] + clean[2], 16),
        };
    }
    if (clean.length === 6) {
        return {
            r: parseInt(clean.substring(0, 2), 16),
            g: parseInt(clean.substring(2, 4), 16),
            b: parseInt(clean.substring(4, 6), 16),
        };
    }
    return null;
}

// ─── Score Calculator ────────────────────────────────────────────

function calculateScore(checks: ValidationCheck[]): number {
    if (checks.length === 0) return 0;

    const weights: Record<string, number> = {
        error: 3,
        warning: 2,
        info: 1,
    };

    let totalWeight = 0;
    let passedWeight = 0;

    for (const check of checks) {
        const w = weights[check.severity] || 1;
        totalWeight += w;
        if (check.passed) passedWeight += w;
    }

    return Math.round((passedWeight / totalWeight) * 100);
}

// ─── Report Generator ────────────────────────────────────────────

/** 검증 결과를 읽기 쉬운 문자열로 변환 */
export function formatValidationReport(result: ValidationResult): string {
    const lines: string[] = [];

    lines.push(`## 카탈로그 검증 결과`);
    lines.push(`- 상태: ${result.passed ? '✅ 통과' : '❌ 실패'}`);
    lines.push(`- 점수: ${result.score}/100`);
    lines.push('');

    const grouped: Record<string, ValidationCheck[]> = {
        error: [],
        warning: [],
        info: [],
    };

    for (const check of result.checks) {
        grouped[check.severity].push(check);
    }

    if (grouped.error.length > 0) {
        lines.push('### 오류 (수정 필수)');
        for (const c of grouped.error) {
            lines.push(`- ${c.passed ? '✅' : '❌'} ${c.message}`);
        }
        lines.push('');
    }

    if (grouped.warning.length > 0) {
        lines.push('### 경고 (권장 수정)');
        for (const c of grouped.warning) {
            lines.push(`- ${c.passed ? '✅' : '⚠️'} ${c.message}`);
        }
        lines.push('');
    }

    if (grouped.info.length > 0) {
        lines.push('### 정보');
        for (const c of grouped.info) {
            lines.push(`- ${c.passed ? '✅' : 'ℹ️'} ${c.message}`);
        }
    }

    return lines.join('\n');
}
