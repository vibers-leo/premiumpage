---
name: catalog-utils
description: 전자 카탈로그 공통 유틸리티. 데이터 추출, 레이아웃 생성, 디자인 시스템 적용 등 모든 기업 에이전트가 공유하는 핵심 기능.
---

# Catalog Utilities

모든 전자 카탈로그 프로젝트에서 공통으로 사용하는 유틸리티 모음입니다.

## 1. 데이터 추출 (Data Extraction)

### 기능
- 웹사이트 스크래핑 및 파싱
- 이미지 다운로드 및 최적화
- 데이터 정규화 및 구조화
- TypeScript 인터페이스 자동 생성

### 추출 대상
- 제품 정보 (이름, 설명, 사양)
- 이미지 및 갤러리
- 카테고리 및 하위 메뉴
- 회사 정보 (주소, 연락처)

### 출력 형식
```typescript
export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  gallery?: string[];
  desc: string;
  specs: Array<{ label: string; value: string }>;
  datasheet?: string;
}
```

## 2. 레이아웃 빌더 (Layout Builder)

### 기능
- Next.js App Router 페이지 생성
- 컴포넌트 구조 자동 생성
- 반응형 레이아웃 적용
- 라우팅 설정

### 생성 컴포넌트
- Header (로고, 네비게이션, 언어/테마 토글)
- Footer (회사 정보, 연락처)
- Product Card (제품 카드 그리드)
- Detail Page (제품 상세 페이지)
- Category Navigation (카테고리 메뉴)

### 레이아웃 패턴
```
layout.tsx (Root)
├── header.tsx
├── page.tsx (Home)
│   ├── hero-section
│   ├── category-grid
│   └── featured-products
├── [category]/
│   └── page.tsx (Category)
└── footer.tsx
```

## 3. 디자인 시스템 (Design System)

### 테마 시스템
- **다크모드**: `defaultTheme="dark"`
- **라이트모드**: `defaultTheme="light"`
- **시스템 연동**: `enableSystem={true}`

### Tailwind CSS 설정
```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: 'var(--brand-primary)',
        secondary: 'var(--brand-secondary)',
      }
    }
  }
}
```

### 공통 스타일 패턴
- **카드**: `rounded-lg shadow-md hover:shadow-xl transition-shadow`
- **버튼**: `px-4 py-2 rounded-md bg-brand-primary text-white hover:bg-brand-secondary`
- **네비게이션**: `fixed top-0 w-full z-50 backdrop-blur-md`

## 4. 다국어 지원 (i18n)

### 번역 구조
```typescript
export const translations = {
  en: {
    hero: { title: "...", subtitle: "..." },
    footer: { address: "...", tel: "...", email: "..." }
  },
  ko: {
    hero: { title: "...", subtitle: "..." },
    footer: { address: "...", tel: "...", email: "..." }
  }
}
```

### 기본 언어 설정
- URL 경로 기반: `/en/`, `/ko/`
- 폴백 언어: English (`"en"`)

## 5. 이미지 최적화

### 처리 과정
1. 원본 이미지 다운로드
2. WebP 변환 (필요시)
3. 반응형 크기 생성 (썸네일, 미디엄, 풀사이즈)
4. `/public/[company]/images/` 저장

### Next.js Image 최적화
```tsx
<Image
  src={product.image}
  alt={product.title}
  width={800}
  height={600}
  className="object-cover"
  priority={isAboveTheFold}
/>
```

## 워크플로우

### 전체 카탈로그 생성
```
1. 데이터 추출 (원본 사이트)
   ↓
2. 데이터 구조화 (TypeScript interfaces)
   ↓
3. 컴포넌트 생성 (React/Next.js)
   ↓
4. 스타일 적용 (Tailwind + Theme)
   ↓
5. 번역 추가 (en/ko)
   ↓
6. 빌드 및 테스트
```

### 부분 업데이트
```
1. 타겟 파일 확인
   ↓
2. 변경사항 적용
   ↓
3. 관련 파일 업데이트
   ↓
4. 테스트
```

## 사용 예시

### 새 기업 카탈로그 생성
```
/catalog-utils "새 기업 'ABC Corp' 카탈로그를 생성.
원본 사이트: https://example.com,
옵션: 다크모드 기본, 영문 우선, 네비게이션 있음"
```

### 공통 컴포넌트 업데이트
```
/catalog-utils "모든 카탈로그의 푸터에 SNS 링크 추가"
```

### 이미지 일괄 최적화
```
/catalog-utils "모든 제품 이미지를 WebP로 변환하고 최적화"
```

## 적용 대상
- GENTOP (`/app/(gentop)/gentop/`)
- HS-TECH (`/app/templates/hs-tech/`)
- Hangseong (`/app/templates/hangseong/`)
- 기타 모든 카탈로그 템플릿

## 기술 스택
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Theme**: next-themes
- **Images**: next/image
- **TypeScript**: 엄격 모드

## 주의사항
- 항상 기존 프로젝트 구조 확인 후 작업
- 컴포넌트는 재사용 가능하게 설계
- 이미지는 항상 최적화 후 커밋
- 번역 키는 일관성 유지
- 다크모드 컬러 대비 확인 (WCAG AA 이상)
