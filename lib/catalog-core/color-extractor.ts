/**
 * Color Extractor
 *
 * 웹사이트/이미지에서 브랜드 색상을 자동 추출하고,
 * 다크/라이트 모드에 맞는 색상 체계를 생성합니다.
 */

import type { BrandColorScheme } from './types';

// ─── Color Utilities ─────────────────────────────────────────────

interface RGB { r: number; g: number; b: number; }
interface HSL { h: number; s: number; l: number; }

export function hexToRgb(hex: string): RGB | null {
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

export function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(c =>
        Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')
    ).join('');
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360; s /= 100; l /= 100;
    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// ─── Color Scheme Generator ──────────────────────────────────────

/**
 * 단일 브랜드 색상(hex)에서 완전한 BrandColorScheme을 자동 생성.
 * 입력된 색상을 기반으로 밝은/어두운 변형, 강조색, 배경/텍스트 색상을 계산합니다.
 */
export function generateColorScheme(primaryHex: string): BrandColorScheme {
    const rgb = hexToRgb(primaryHex);
    if (!rgb) {
        return {
            primary: primaryHex,
            primaryLight: primaryHex,
            primaryDark: primaryHex,
            accent: '#2979FF',
            background: { dark: '#0A0A0A', light: '#FFFFFF' },
            text: { dark: '#E5E7EB', light: '#1F2937' },
        };
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Light variant: 밝기 +20, 채도 -10
    const lightHsl = { h: hsl.h, s: Math.max(0, hsl.s - 10), l: Math.min(90, hsl.l + 20) };
    const lightRgb = hslToRgb(lightHsl.h, lightHsl.s, lightHsl.l);

    // Dark variant: 밝기 -20, 채도 +10
    const darkHsl = { h: hsl.h, s: Math.min(100, hsl.s + 10), l: Math.max(15, hsl.l - 20) };
    const darkRgb = hslToRgb(darkHsl.h, darkHsl.s, darkHsl.l);

    // Accent: 보색 방향으로 120도 회전
    const accentHsl = { h: (hsl.h + 120) % 360, s: Math.min(100, hsl.s + 5), l: 50 };
    const accentRgb = hslToRgb(accentHsl.h, accentHsl.s, accentHsl.l);

    return {
        primary: primaryHex,
        primaryLight: rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b),
        primaryDark: rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b),
        accent: rgbToHex(accentRgb.r, accentRgb.g, accentRgb.b),
        background: {
            dark: '#0A0A0A',
            light: '#FFFFFF',
        },
        text: {
            dark: '#E5E7EB',
            light: '#1F2937',
        },
    };
}

// ─── CSS Variable Generator ──────────────────────────────────────

/** BrandColorScheme을 CSS 변수 문자열로 변환 */
export function generateCSSVariables(scheme: BrandColorScheme): string {
    return `:root {
    --catalog-primary: ${scheme.primary};
    --catalog-primary-light: ${scheme.primaryLight};
    --catalog-primary-dark: ${scheme.primaryDark};
    --catalog-accent: ${scheme.accent};
    --catalog-bg-dark: ${scheme.background.dark};
    --catalog-bg-light: ${scheme.background.light};
    --catalog-text-dark: ${scheme.text.dark};
    --catalog-text-light: ${scheme.text.light};
}`;
}

/** BrandColorScheme을 Tailwind extend 설정 객체로 변환 */
export function generateTailwindColors(scheme: BrandColorScheme): Record<string, string> {
    return {
        'catalog-primary': scheme.primary,
        'catalog-primary-light': scheme.primaryLight,
        'catalog-primary-dark': scheme.primaryDark,
        'catalog-accent': scheme.accent,
    };
}

// ─── Color Extraction from HTML/CSS ──────────────────────────────

/** HTML/CSS 텍스트에서 색상 값을 추출 */
export function extractColorsFromCSS(cssText: string): string[] {
    const colors = new Set<string>();

    // hex 색상
    const hexMatches = cssText.match(/#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\b/g);
    if (hexMatches) {
        hexMatches.forEach(c => {
            // 흑백/회색 제외
            const rgb = hexToRgb(c);
            if (rgb && !isGrayscale(rgb)) {
                colors.add(c.toLowerCase());
            }
        });
    }

    // rgb() 색상
    const rgbMatches = cssText.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g);
    if (rgbMatches) {
        rgbMatches.forEach(match => {
            const nums = match.match(/\d+/g);
            if (nums && nums.length >= 3) {
                const r = parseInt(nums[0]), g = parseInt(nums[1]), b = parseInt(nums[2]);
                if (!isGrayscale({ r, g, b })) {
                    colors.add(rgbToHex(r, g, b));
                }
            }
        });
    }

    return Array.from(colors);
}

function isGrayscale(rgb: RGB): boolean {
    const diff = Math.max(
        Math.abs(rgb.r - rgb.g),
        Math.abs(rgb.g - rgb.b),
        Math.abs(rgb.r - rgb.b)
    );
    return diff < 15;
}

/** 추출된 색상 중 가장 "브랜드스러운" 색상을 선택 */
export function pickBrandColor(colors: string[]): string {
    if (colors.length === 0) return '#00C853';

    // 채도와 밝기가 적당한 색상 우선
    const scored = colors.map(hex => {
        const rgb = hexToRgb(hex);
        if (!rgb) return { hex, score: 0 };
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

        let score = 0;
        // 채도 40-90 선호
        if (hsl.s >= 40 && hsl.s <= 90) score += 30;
        // 밝기 30-70 선호
        if (hsl.l >= 30 && hsl.l <= 70) score += 30;
        // 너무 어둡거나 밝으면 감점
        if (hsl.l < 20 || hsl.l > 85) score -= 20;

        return { hex, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0].hex;
}
