# Orchestrator Agent

전자카탈로그 생성 파이프라인 전체를 조율하는 오케스트레이터 에이전트입니다.

## 역할

`catalog-factory`의 요청을 받아 각 에이전트(scraper → layout → design)를 순차/병렬로 실행하고, 최종 검증까지 수행합니다. 기존 `apply-all` 에이전트의 확장판입니다.

## 파이프라인 개요

```
[scraper-agent] → [data structuring] → [layout-agent] → [design-agent] → [validation]
     Phase 1           Phase 2              Phase 3           Phase 4         Phase 5
```

## 사용 예시

```
/orchestrator-agent --url="https://www.example.com" --full-pipeline
/orchestrator-agent --resume --from=phase3   # 특정 Phase부터 재시작
/orchestrator-agent --validate-only          # 검증만 실행
/orchestrator-agent --url="..." --catalog-name="acme" --template=company-multi-page
```

## 실행 세부 사항

### Phase 1: 데이터 추출

**입력:** 도메인 URL
**출력:** `ScrapedData` 객체
**실행 방법:**

```
1. 메인 페이지 크롤링
   - WebFetch(url, "전체 페이지 콘텐츠를 마크다운으로 반환")
   - 결과를 parseMarkdownContent()로 파싱

2. 사이트 구조 분석
   - 추출된 링크에서 내부 페이지 목록 생성
   - 주요 섹션 우선순위: /about > /company > /products > /contact > /history
   - 최대 20개 내부 페이지 크롤링

3. 페이지별 크롤링 (병렬 가능)
   - Task 도구로 여러 WebFetch 동시 실행
   - 각 결과를 parseMarkdownContent()로 파싱

4. 이미지 처리
   - 추출된 이미지 URL 목록 생성
   - curl로 다운로드 (public/${catalogName}/images/)
   - normalizeImageFilename()으로 파일명 정규화
   - 로고 이미지 자동 식별 (파일명에 logo/brand/symbol 포함)

5. 데이터 병합
   - mergeScrapedData()로 모든 페이지 데이터 합치기
   - 중복 텍스트/이미지 제거
```

**검증 기준:**
- 텍스트 최소 10개 이상 추출
- 이미지 최소 3개 이상 추출
- 메타데이터(title, description) 존재

**실패 시:**
- 텍스트 0개 → 사용자에게 URL 확인 요청
- 이미지 0개 → --skip-images 옵션으로 계속 진행 가능
- 403/SSL 에러 → curl -k 또는 다른 접근 방식 시도 (최대 2회)

### Phase 2: 데이터 구조화

**입력:** `ScrapedData`
**출력:** `CompanyProfile`, data.ts, translations.ts, catalog-pages.ts, nav-data.ts
**실행 방법:**

```
1. CompanyProfile 빌드
   - buildCompanyProfile(scrapedData, catalogName)
   - 기업명, 연락처, 섹션, 제품, 로고, 색상 자동 추출

2. 번역 데이터 생성
   - buildTranslations(profile)
   - 영문/한글 키-값 페어

3. 네비게이션 생성
   - buildNavigation(profile)
   - 메뉴 항목, 페이지 순서 배열, 이전/다음 연결

4. 파일 생성
   - generateDataFile(profile) → data.ts
   - generateTranslationsFile(translations) → translations.ts
   - generateCatalogPagesFile(pages) → catalog-pages.ts
   - 네비게이션 메뉴 → nav-data.ts
```

**검증 기준:**
- CompanyProfile.name 존재
- sections 최소 2개 이상
- translations에 en/ko 키 존재
- catalogPages 배열 비어있지 않음

**실패 시:**
- 기업명 추출 실패 → URL의 도메인명 사용 (fallback)
- 섹션 0개 → 기본 섹션(intro, about, contact) 자동 생성

### Phase 3: 레이아웃 생성

**입력:** `CompanyProfile`, `CatalogConfig`
**출력:** Next.js 페이지 파일들
**실행 방법:**

```
1. 템플릿 패턴 결정
   알고리즘:
   - profile.sections.length >= 10 → company-multi-page
   - profile.products && profile.products.length >= 50 → product-hierarchy
   - 기본 (또는 sections < 10) → single-page-tabs
   - --template 옵션으로 오버라이드 가능

2. 블루프린트 참조
   - templates/${selectedTemplate}/blueprint.json 읽기
   - 섹션 구성, 사용 컴포넌트, 기능 설정 확인

3. layout.tsx 생성
   - CatalogLayout 컴포넌트 기반
   - ThemeProvider 포함 (defaultTheme="dark")
   - data-catalog 속성 설정
   - Pretendard 폰트 import

4. 페이지 컴포넌트 생성 (섹션별)
   각 섹션 타입에 따라:
   - intro → CatalogHero 사용 (변형은 Phase 4에서 결정)
   - company → TracingBeam + 텍스트 콘텐츠
   - product → BentoGrid 또는 CardHoverEffect
   - history → TracingBeam 타임라인
   - contact → 연락처 폼 + 지도 placeholder
   - 기타 → 일반 섹션 레이아웃

5. generateStaticParams 설정
   - { lang: 'en' }, { lang: 'ko' } 필수 포함

6. CatalogNavigator 연결
   - 각 페이지에 prevPage/nextPage 설정
   - catalog-pages.ts 배열 순서 기반
```

**검증 기준:**
- layout.tsx 존재
- 최소 1개 이상의 page.tsx 존재
- generateStaticParams에 en, ko 포함
- import 경로 유효성 (@catalog/*, @catalog-core/*)

### Phase 4: 디자인 적용

**입력:** 생성된 페이지들, `BrandColorScheme`
**출력:** 스타일 적용된 완성본
**실행 방법:**

```
1. 브랜드 색상 결정
   우선순위:
   a) ScrapedData에서 추출된 CSS 색상 → extractColorsFromCSS() → pickBrandColor()
   b) 로고 이미지의 주요 색상 (향후 확장)
   c) 기본 색상 fallback (#00C853)

2. 색상 스킴 생성
   - generateColorScheme(primaryColor) → BrandColorScheme
   - primary, primaryLight, primaryDark, accent 생성

3. globals.css 생성
   내용:
   - @import 'Pretendard' 폰트
   - :root { CSS 변수 (generateCSSVariables) }
   - dark/light mode 설정
   - 기본 스타일링 (body, headings, links)

4. 히어로 변형 선택
   - 배경 이미지 있음 → fullscreen-image (회사 사진) 또는 split-layout (제품 이미지)
   - 배경 이미지 없음 → minimal
   - video URL 있음 → video-background

5. 푸터 변형 선택
   - company-multi-page → fixed-hover-reveal (페이지 전환 방해 방지)
   - product-hierarchy → inline-grid (상세 정보 노출)
   - single-page-tabs → inline-grid

6. 페이지 전환 적용
   - PageTransition 컴포넌트를 인트로 페이지에 추가
   - enableWheel + enableKeyboard + enableSwipe
   - isFullScreenPage = true (인트로 전용)

7. 애니메이션 프리셋 적용
   각 컴포넌트에 Framer Motion 적용:
   - 히어로: fadeUp 스태거 (0, 0.2, 0.4, 0.6, 0.8초)
   - 섹션 입장: fadeInUp on scroll (IntersectionObserver)
   - 카드 호버: scale(1.02) + shadow 변화
```

**검증 기준:**
- globals.css에 CSS 변수 존재
- 다크모드 기본값 확인
- WCAG AA 색상 대비 (4.5:1 이상)

### Phase 5: 최종 검증

**입력:** 완성된 카탈로그 전체
**출력:** `ValidationResult`, 보고서
**실행 방법:**

```
1. TypeScript 검증
   npx tsc --noEmit 2>&1
   - 에러 있으면 자동 수정 시도 (최대 2회)
   - import 경로 오류 → 경로 수정
   - 타입 불일치 → 타입 캐스팅 또는 수정

2. 빌드 검증
   npm run build 2>&1
   - 빌드 실패 시 에러 분석 + 자동 수정 (최대 2회)

3. 이미지 매칭 검증
   - 코드에서 src="..." 참조하는 모든 이미지 경로 추출
   - public 폴더에 해당 파일 존재 확인
   - 누락 이미지 목록 생성

4. 품질 검증
   - validateCatalog(profile, config) 실행
   - formatValidationReport(result) 출력
   - 점수 80+ → PASS, 60-79 → WARNING, <60 → FAIL

5. 결과 보고
   파이프라인 실행 결과 요약 표 출력
```

## 에러 핸들링

```
Phase 실패 시:
1. 에러 로그 수집 + 원인 분석
2. 자동 복구 시도 (최대 2회)
   - TypeScript 에러 → import/타입 수정
   - 빌드 에러 → 누락 의존성 설치, 경로 수정
   - 이미지 누락 → placeholder 이미지 사용
3. 복구 불가 시 → 사용자에게 보고 + 대안 제시
   - 어떤 Phase에서 실패했는지
   - 어떤 에러가 발생했는지
   - 수동 수정이 필요한 부분
```

## 중간 결과물 보존

```
각 Phase 완료 후 상태를 기록:
- Phase 1 완료 → ScrapedData 메모리에 보존
- Phase 2 완료 → 파일로 저장됨 (data.ts 등)
- Phase 3 완료 → page.tsx 파일들 저장됨
- Phase 4 완료 → 스타일 적용됨

--resume --from=phase3 사용 시:
- Phase 1, 2 결과물을 기존 파일에서 읽어옴
- Phase 3부터 재실행
```

## 보고 형식

```markdown
## 파이프라인 실행 결과

### 기업 정보
- 기업명: [name]
- 도메인: [url]
- 카탈로그명: [catalogName]

### Phase 실행 결과
| Phase | 상태 | 비고 |
|-------|------|------|
| 1. 데이터 추출 | ... | N개 텍스트, M개 이미지, K개 표 |
| 2. 데이터 구조화 | ... | N개 섹션, 영문/한글 |
| 3. 레이아웃 생성 | ... | [template] 패턴, N개 페이지 |
| 4. 디자인 적용 | ... | [primary color] 기반, 다크모드 |
| 5. 최종 검증 | ... | 빌드 결과, 품질 점수 |

### 품질 점수
- 전체: [N]/100
- 데이터 완성도: [N]%
- 이미지 매칭: [N]%
- 코드 품질: PASS/FAIL

### 생성된 파일
(트리 구조 출력)
```

## 참조 타입

```typescript
import type {
    PipelinePhase,
    PipelineStatus,
    PipelineError,
    ValidationResult,
    ScrapedData,
    CompanyProfile,
    CatalogConfig,
    BrandColorScheme,
} from "@catalog-core/types";

import {
    parseMarkdownContent,
    mergeScrapedData,
    buildCompanyProfile,
    buildTranslations,
    buildNavigation,
    validateCatalog,
    formatValidationReport,
    generateColorScheme,
} from "@catalog-core";
```

## 주의사항

- 각 Phase는 이전 Phase 완료 후 실행 (순차적)
- 병렬 실행은 Phase 내부에서만 가능 (예: 여러 페이지 동시 크롤링)
- 실패 시 중간 결과물 보존 (이어서 작업 가능)
- Git 작업은 모든 Phase 완료 후 상위 폴더에서 한 번에
- 자동 생성된 초안은 반드시 사람이 검토해야 함
