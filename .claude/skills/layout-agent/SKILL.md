# Layout Agent

추출된 데이터를 기반으로 Next.js 페이지 구조를 자동 생성하는 에이전트입니다.

## 역할

`scraper-agent`가 추출한 데이터와 `CompanyProfile`을 분석하여 적합한 템플릿 패턴을 선택하고, Next.js App Router 기반의 페이지 구조를 자동 생성합니다.

## 입력

- 구조화된 `CompanyProfile` 데이터
- 추출된 `ScrapedData`
- 카탈로그 설정 (`CatalogConfig`)

## 출력

- Next.js 페이지 컴포넌트 파일들 (`.tsx`)
- 라우팅 구조 (`[lang]/section/page.tsx`)
- `catalog-pages.ts` (페이지 순서 배열)
- `nav-data.ts` (네비게이션 메뉴 데이터)

## 템플릿 패턴 선택

### 1. `company-multi-page` (GENTOP 기반)
- **적합**: 10+ 섹션, 회사/사업/연락처 구분 명확
- **구조**: `[lang]/company/`, `[lang]/business/`, `[lang]/contact/`
- **특징**: 섹션별 독립 페이지, 순차 네비게이션

### 2. `product-hierarchy` (HS-TECH 기반)
- **적합**: 브랜드/카테고리 계층, 50+ 제품
- **구조**: 쿼리 파라미터 기반 (`?brand=&category=&product=`)
- **특징**: 4단계 계층, 제품 상세 페이지

### 3. `single-page-tabs` (항성산업사 기반)
- **적합**: 소규모 사이트, 10페이지 미만
- **구조**: 탭 기반 단일 페이지 (`?tab=about`)
- **특징**: 간결, 빠른 로딩

## 워크플로우

```
1. 데이터 분석
   - 섹션 수, 제품 수, 계층 깊이 파악
   - 템플릿 패턴 자동 선택 (또는 사용자 지정)

2. 디렉토리 구조 생성
   - app/(catalog-name)/[lang]/ 하위 폴더 구성
   - layout.tsx, page.tsx 기본 파일 생성

3. 페이지 컴포넌트 생성
   - 각 섹션별 page.tsx 생성
   - 공통 컴포넌트 import (@catalog/*)
   - 데이터 바인딩

4. 네비게이션 구성
   - catalog-pages.ts 배열 생성 (페이지 순서)
   - nav-data.ts 메뉴 데이터 생성
   - 이전/다음 페이지 연결
```

## 참조 타입

```typescript
import type {
    CatalogConfig,
    TemplatePattern,
    CompanyProfile,
    PageLayout,
    CatalogNavigation
} from "@catalog-core/types";
```

## 공통 컴포넌트 활용

```typescript
import { CatalogNavigator } from "@catalog/CatalogNavigator";
import { CatalogLayout } from "@catalog/CatalogLayout";
import { TracingBeam } from "@catalog/ui/tracing-beam";
import { BentoGrid } from "@catalog/ui/bento-grid";
```

## 사용 예시

```
/layout-agent --data=./scraped-data.json --template=company-multi-page
/layout-agent --profile=./company-profile.json --auto
```

## 주의사항

- `generateStaticParams()`에 `en`, `ko` 반드시 포함
- 모든 페이지는 `catalog-pages.ts`에 등록
- 이미지 경로는 public 폴더 기준으로 설정
- 반응형 레이아웃 필수 (모바일 우선)
