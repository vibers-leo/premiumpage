# Catalog Factory

도메인 URL 하나로 전자카탈로그 초안을 자동 생성하는 원클릭 진입점입니다.

## 역할

사용자가 기업 도메인 URL만 입력하면, 전체 파이프라인을 자동으로 실행하여 전자카탈로그 초안을 완성합니다. `orchestrator-agent`를 호출하여 전체 프로세스를 관리합니다.

## 사용법

```
/catalog-factory "https://www.example.com"
/catalog-factory "https://www.example.com" --name="example" --template=product-hierarchy
```

## 매개변수

| 매개변수 | 필수 | 설명 | 기본값 |
|---------|------|------|--------|
| URL | Yes | 기업 웹사이트 도메인 | - |
| --name | No | 카탈로그 내부 이름 (kebab-case) | 도메인에서 추출 |
| --template | No | 템플릿 패턴 강제 지정 | 자동 감지 |
| --lang | No | 지원 언어 | en,ko |
| --theme | No | 기본 테마 | dark |
| --skip-images | No | 이미지 다운로드 생략 | false |

## 실행 흐름 (Step-by-Step)

### Step 1: 입력 파싱 및 검증

```
1. URL에서 도메인 이름 추출
   - "https://www.gentop.co.kr" → catalogName = "gentop"
   - --name 지정 시 해당 값 사용

2. kebab-case 이름 정규화
   - 공백/특수문자 → 하이픈
   - 소문자만 사용

3. 기존 카탈로그와 충돌 확인
   - app/ 하위에 동일 이름 폴더 존재 여부
   - 충돌 시 사용자에게 확인
```

### Step 2: 디렉토리 구조 사전 생성

```bash
# 필요한 폴더 먼저 생성
mkdir -p app/(${catalogName})/${catalogName}/[lang]
mkdir -p app/(${catalogName})/${catalogName}/components/ui
mkdir -p app/(${catalogName})/${catalogName}/lib
mkdir -p public/${catalogName}/images
```

### Step 3: 파이프라인 실행

다음 순서로 각 Phase를 실행합니다:

#### Phase 1: 데이터 추출 (scraper-agent 로직)

```
1. WebFetch로 메인 페이지 크롤링
   - URL → 마크다운 변환
   - parseMarkdownContent()로 구조화

2. 내부 링크 탐색 (최대 depth 3)
   - /about, /company, /products 등 주요 섹션
   - 각 페이지별 WebFetch + parseMarkdownContent

3. 이미지 추출 및 다운로드
   - 로고 이미지 우선 탐색
   - 제품/배경 이미지 다운로드 (curl)
   - public/${catalogName}/images/ 에 저장
   - normalizeImageFilename()으로 파일명 정규화

4. 여러 페이지 데이터 병합
   - mergeScrapedData()로 중복 제거
   - 최종 ScrapedData 객체 완성
```

#### Phase 2: 데이터 구조화 (catalog-utils 로직)

```typescript
import {
    buildCompanyProfile,
    buildTranslations,
    buildNavigation,
    generateDataFile,
    generateTranslationsFile,
    generateCatalogPagesFile,
} from "@catalog-core";

// 1. CompanyProfile 빌드
const profile = buildCompanyProfile(scrapedData, catalogName);

// 2. 번역 데이터 생성
const translations = buildTranslations(profile);

// 3. 네비게이션 구조 생성
const navigation = buildNavigation(profile);

// 4. 파일 내용 생성
const dataContent = generateDataFile(profile);
const translationsContent = generateTranslationsFile(translations);
const catalogPagesContent = generateCatalogPagesFile(navigation.catalogPages);
```

생성 파일:
- `app/(${catalogName})/${catalogName}/lib/data.ts`
- `app/(${catalogName})/${catalogName}/lib/translations.ts`
- `app/(${catalogName})/${catalogName}/lib/catalog-pages.ts`
- `app/(${catalogName})/${catalogName}/lib/nav-data.ts`

#### Phase 3: 템플릿 선택 + 레이아웃 생성 (layout-agent 로직)

```
템플릿 자동 선택 알고리즘:
- 섹션 수 ≥ 10 + 회사/사업/연락처 구분 → company-multi-page
- 제품 수 ≥ 50 + 브랜드/카테고리 계층 → product-hierarchy
- 섹션 수 < 10 → single-page-tabs
- --template 지정 시 해당 값 사용
```

각 템플릿별 생성 파일:

**company-multi-page:**
```
[lang]/page.tsx           # 인트로 (CatalogHero fullscreen-image)
[lang]/company/page.tsx   # 회사소개 (TracingBeam)
[lang]/business/page.tsx  # 사업영역 (BentoGrid)
[lang]/contact/page.tsx   # 연락처
```

**product-hierarchy:**
```
[lang]/page.tsx                  # 인트로
[lang]/brands/page.tsx           # 브랜드 목록
brand/[brandId]/page.tsx         # 브랜드 상세
category/[categoryId]/page.tsx   # 카테고리
product/[productId]/page.tsx     # 제품 상세
```

**single-page-tabs:**
```
[lang]/page.tsx  # 탭 기반 단일 페이지 (모든 섹션 포함)
```

공통 생성 파일:
```
layout.tsx   # CatalogLayout 기반, ThemeProvider 포함
```

#### Phase 4: 디자인 적용 (design-agent 로직)

```typescript
import { generateColorScheme, generateCSSVariables } from "@catalog-core";

// 1. 브랜드 색상 추출 (추출된 이미지/CSS에서)
const scheme = generateColorScheme(primaryColor);

// 2. CSS 변수 생성
const cssVars = generateCSSVariables(scheme);

// 3. globals.css 생성
// - CSS 변수 주입
// - 다크/라이트 모드 설정
// - Pretendard 폰트 적용

// 4. 히어로 변형 선택
// - 이미지가 있으면 fullscreen-image 또는 split-layout
// - 이미지가 없으면 minimal
// - 동영상이 있으면 video-background

// 5. 애니메이션 적용
// - CatalogHero에 Framer Motion fadeUp
// - 섹션별 TracingBeam 또는 ParallaxScroll
// - CatalogFooter 변형 선택
// - PageTransition 추가
```

#### Phase 5: 검증

```bash
# 1. TypeScript 검증
npx tsc --noEmit

# 2. 빌드 검증
npm run build

# 3. 이미지 매칭 검증
# - 코드에서 참조하는 이미지가 public 폴더에 존재하는지
# - validateCatalog() 실행

# 4. 품질 점수 산출
# - formatValidationReport() 실행
```

### Step 4: middleware.ts 도메인 라우팅 추가

```typescript
// middleware.ts에 새 도메인 라우팅 블록 추가
// addCatalogRoute() 헬퍼 함수 사용
```

### Step 5: 결과 보고

```markdown
## 카탈로그 생성 완료!

### 기본 정보
- 기업명: [자동 추출]
- 도메인: [입력 URL]
- 템플릿: [선택된 패턴]
- 생성된 페이지: [N]개

### 파이프라인 결과
| Phase | 상태 | 비고 |
|-------|------|------|
| 데이터 추출 | ... | N개 섹션, M개 이미지 |
| 구조화 | ... | 영문/한글 번역 포함 |
| 레이아웃 | ... | N개 페이지 생성 |
| 디자인 | ... | 다크모드 기본 |
| 빌드 검증 | ... | npm run build |

### 생성된 파일 목록
(파일 트리 출력)

### 다음 단계
1. `npm run dev`로 로컬 확인
2. 이미지 매칭 검토
3. 콘텐츠 정확도 검토
4. 커밋 & 배포
```

## 자동 생성되는 파일들

```
app/(catalog-name)/
├── layout.tsx              # 레이아웃 + 테마
├── globals.css             # 카탈로그별 커스텀 CSS
├── catalog-name/
│   ├── [lang]/
│   │   ├── page.tsx            # 인트로 페이지
│   │   ├── company/
│   │   │   └── page.tsx        # 회사 소개
│   │   ├── business/
│   │   │   └── page.tsx        # 사업 영역
│   │   └── contact/
│   │       └── page.tsx        # 연락처
│   ├── components/
│   │   └── ui/                 # 카탈로그 고유 컴포넌트 (필요 시)
│   └── lib/
│       ├── data.ts             # 카탈로그 데이터
│       ├── translations.ts     # 다국어 번역
│       ├── catalog-pages.ts    # 페이지 순서
│       └── nav-data.ts         # 네비게이션 메뉴

public/(catalog-name)/
└── images/                 # 다운로드된 이미지
    ├── logo.png
    └── ...
```

## 참조 타입

```typescript
import type { CatalogConfig, CompanyProfile } from "@catalog-core/types";
import { buildCompanyProfile, validateCatalog } from "@catalog-core";
import { CatalogHero, CatalogFooter, PageTransition } from "@catalog";
```

## 주의사항

- 자동 생성된 초안은 반드시 사람이 검토해야 합니다
- 이미지 저작권 확인은 사용자 책임
- 기술 사양은 공식 데이터시트 기준으로 교차 검증 필요
- 생성 후 바로 배포하지 말고, 반드시 로컬 테스트 진행
- Git 작업은 모든 Phase 완료 후 상위 폴더에서 한 번에
