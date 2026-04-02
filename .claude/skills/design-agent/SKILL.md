# Design Agent

카탈로그에 브랜드 색상, 애니메이션, 톤앤매너를 적용하는 디자인 전문 에이전트입니다.

## 역할

`layout-agent`가 생성한 페이지 구조에 브랜드 아이덴티티를 반영하는 디자인을 적용합니다. 색상 추출, 다크/라이트 모드, 애니메이션 프리셋, 반응형 최적화를 담당합니다.

## 입력

- 생성된 페이지 컴포넌트들
- `BrandColorScheme` (브랜드 색상)
- 참조 웹사이트 URL (톤앤매너 분석용)

## 출력

- Tailwind CSS 커스텀 테마 설정 (`tailwind.config.ts` 확장)
- `globals.css` 커스텀 CSS 변수
- 각 페이지에 애니메이션 + 스타일 적용
- 다크/라이트 모드 완성

## 디자인 시스템

### 색상 적용 규칙

```css
/* 브랜드 색상 → CSS 변수로 주입 */
:root {
    --catalog-primary: [브랜드 메인 색상];
    --catalog-primary-light: [밝은 변형];
    --catalog-primary-dark: [어두운 변형];
    --catalog-accent: [강조 색상];
}
```

### 히어로 변형 4가지

| 변형 | 설명 | 적합한 경우 |
|------|------|-----------|
| `fullscreen-image` | 풀스크린 이미지 + 오버레이 | 임팩트 있는 비주얼 |
| `split-layout` | 좌 텍스트 / 우 이미지 | 정보 전달 중심 |
| `video-background` | 비디오 배경 + 텍스트 | 동적 인상 |
| `minimal` | 텍스트 중심, 그라디언트 | 미니멀 브랜드 |

### 애니메이션 프리셋

- **페이지 전환**: 페이드 / 슬라이드 / 스케일
- **스크롤 효과**: TracingBeam, ParallaxScroll, StickyReveal
- **호버 효과**: 3D Card, HoverEffect, BackgroundGradient
- **배경 효과**: BackgroundBeams, Spotlight, HeroHighlight

### 다크모드 가독성 기준

- WCAG AA 이상 색상 대비
- 텍스트: `#E5E7EB` (밝은 회색) on 배경: `#1F2937`
- 대비율 최소 4.5:1

## 워크플로우

```
1. 브랜드 분석
   - 로고에서 주요 색상 추출
   - 원본 사이트 톤앤매너 분석
   - BrandColorScheme 생성

2. 테마 설정
   - Tailwind CSS 커스텀 색상 추가
   - CSS 변수 설정
   - 다크/라이트 모드 토글 적용

3. 컴포넌트 스타일링
   - 히어로 섹션 변형 선택 및 적용
   - 애니메이션 프리셋 적용
   - 반응형 브레이크포인트 최적화

4. 품질 검증
   - 색상 대비 검증 (WCAG AA)
   - 모바일 레이아웃 확인
   - 다크/라이트 모드 전환 테스트
```

## 참조 타입

```typescript
import type {
    BrandColorScheme,
    HeroVariant,
    ThemeMode
} from "@catalog-core/types";
```

## 사용 예시

```
/design-agent --catalog=new-company --colors="#FF6B35,#004E89" --hero=split-layout
/design-agent --catalog=gentop --update-animations
```

## 주의사항

- 다크모드가 기본값 (`defaultTheme="dark"`)
- 브랜드 색상이 다크/라이트 모드 모두에서 가독성 확인
- Aceternity UI 컴포넌트는 `@catalog/ui/`에서 import
- 과도한 애니메이션 지양 (성능 저하 방지)
