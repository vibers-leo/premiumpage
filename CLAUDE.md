# 전자카탈로그 프로젝트 개발 가이드

이 문서는 전자카탈로그 프로젝트의 개발 지침을 담고 있습니다. **모든 AI 어시스턴트는 이 문서를 반드시 준수해야 합니다.**

> **💡 프로젝트 메모리:** `.claude/memory/MEMORY.md` 파일에 프로젝트 컨텍스트, 최근 작업 내역, 사용자 선호사항이 저장되어 있습니다. 새 환경에서 시작할 때 반드시 읽으세요.

---

## 📋 목차

1. [핵심 원칙](#핵심-원칙)
2. [용어 정의 및 사용 규칙](#용어-정의-및-사용-규칙)
3. [프로젝트 아키텍처](#프로젝트-아키텍처)
4. [AI 에이전트 시스템](#ai-에이전트-시스템)
5. [개발 워크플로우](#개발-워크플로우)
6. [전자카탈로그 특화 지침](#전자카탈로그-특화-지침)
7. [코딩 스타일 및 컨벤션](#코딩-스타일-및-컨벤션)
8. [OKR 및 성과 관리](#okr-및-성과-관리)
9. [금지 사항](#금지-사항)
10. [주의사항](#주의사항)

---

## 🎯 핵심 원칙

1. **용어 구분 엄격히**: "전체적으로" vs "모든 기업을 대상으로" 명확히 구분
2. **에이전트 시스템 활용**: 기업별 전문 에이전트 + 공통 유틸리티
3. **병렬 처리**: 여러 카탈로그 동시 작업으로 효율 향상
4. **상위 폴더 Git 관리**: 충돌 방지를 위해 상위 폴더에서만 Git 작업
5. **영문/다크모드 기본**: 전자카탈로그 표준 설정
6. **이미지 매칭 필수**: 배포 후 반드시 확인
7. **한글로 친절하게**: 모든 진행사항 한국어로 설명
8. **OKR 중심 개발**: 모든 작업은 OKR.md의 목표와 연계하여 진행

---

## 📖 용어 정의 및 사용 규칙

### ⚠️ 매우 중요: "전체적으로" vs "모든 기업을 대상으로"

이 두 용어의 구분이 **프로젝트의 성패를 좌우합니다.**

#### "전체적으로" = 특정 기업 내부만 수정

```
예시: "GENTOP 전체적으로 디자인 수정해줘"
→ GENTOP 카탈로그만 수정
→ gentop-agent 스킬만 사용
→ 다른 카탈로그는 영향 없음
```

**사용할 스킬:**
- `hstech-agent` (HS-TECH만)
- `gentop-agent` (GENTOP만)
- `emt-agent` (EMT만)
- `hangseong-agent` (항성산업사만)

#### "모든 기업을 대상으로" = 전체 카탈로그 일괄 수정

```
예시: "모든 기업을 대상으로 폰트를 Pretendard로 변경해줘"
→ HS-TECH, GENTOP, EMT, 항성산업사 모두 수정
→ apply-all 스킬 사용
→ 모든 카탈로그가 동시에 변경됨
```

**사용할 스킬:**
- `apply-all` (오케스트레이터)

#### 🚨 애매한 경우 반드시 되물기!

```
❌ 잘못된 응답:
사용자: "전체적으로 푸터 수정해줘"
AI: [apply-all 사용하여 모든 카탈로그 수정] ← 잘못됨!

✅ 올바른 응답:
사용자: "전체적으로 푸터 수정해줘"
AI: "어느 카탈로그를 수정하시겠습니까?
     1) HS-TECH만
     2) GENTOP만
     3) 모든 카탈로그"
```

**잘못된 추측의 결과:**
- 모든 카탈로그가 의도치 않게 변경됨
- 복구가 매우 어려움
- 클라이언트에게 보여줘야 하는 상황에서 치명적

**원칙: 의심스러우면 무조건 재확인!**

---

## 🏗️ 프로젝트 아키텍처

### 디렉토리 구조

```
premiumpage/
├── app/
│   ├── (gentop)/gentop/          # GENTOP 카탈로그
│   └── templates/
│       ├── hs-tech/              # HS-TECH 카탈로그 (영문)
│       ├── hs-tech-kr/           # HS-TECH 카탈로그 (한글)
│       ├── hangseong/            # 항성산업사 카탈로그
│       └── emt/                  # EMT 카탈로그
├── public/
│   ├── gentop/                   # GENTOP 이미지 및 정적 파일
│   └── templates/
│       ├── hs-tech/              # HS-TECH 이미지
│       ├── hangseong/            # 항성산업사 이미지
│       └── emt/                  # EMT 이미지
└── .claude/skills/               # AI 에이전트 시스템
    ├── hstech-agent/             # HS-TECH 전문 에이전트
    ├── gentop-agent/             # GENTOP 전문 에이전트
    ├── emt-agent/                # EMT 전문 에이전트
    ├── hangseong-agent/          # 항성산업사 전문 에이전트
    ├── catalog-utils/            # 공통 유틸리티
    └── apply-all/                # 오케스트레이터
```

### 멀티 카탈로그 시스템

각 카탈로그는 독립적으로 관리되며, 다음과 같은 특성을 가집니다:

- **독립적인 데이터 소스**: 각 기업의 웹사이트
- **독립적인 디자인**: 기업별 브랜드 컬러, 스타일
- **공통 기반 기술**: Next.js, TypeScript, Tailwind CSS
- **공통 유틸리티**: `catalog-utils`를 통한 코드 재사용

---

## 🤖 AI 에이전트 시스템

### 기업별 전문 에이전트

각 카탈로그는 전담 에이전트가 관리합니다:

| 에이전트 | 담당 카탈로그 | 특징 |
|---------|-------------|------|
| `hstech-agent` | HS-TECH | VAISALA, SETRA, JUMO, KNICK 등 산업용 센서 |
| `gentop-agent` | GENTOP | 다크모드 기본, 영문 카탈로그 |
| `emt-agent` | EMT | 스마트 센서, 미래 모빌리티 산업 |
| `hangseong-agent` | 항성산업사 | 기업 특화 카탈로그 |

### 공통 기능 에이전트

| 에이전트 | 역할 | 사용 시점 |
|---------|-----|----------|
| `catalog-utils` | 데이터 추출, 레이아웃 생성, 디자인 시스템 | 모든 에이전트가 공유 |
| `apply-all` | 모든 카탈로그 일괄 적용 오케스트레이터 | "모든 기업을 대상으로" 요청 시 |

### 자동화 파이프라인 에이전트

도메인 URL 하나로 카탈로그 초안을 자동 생성하는 5-Phase 파이프라인:

| 에이전트 | 역할 | Phase |
|---------|------|-------|
| `catalog-factory` | 원클릭 진입점 - `/catalog-factory "URL"` | 전체 조율 |
| `scraper-agent` | 웹사이트 크롤링, 텍스트/이미지/표 추출 | Phase 1 |
| `layout-agent` | 템플릿 선택 + Next.js 페이지 구조 자동 생성 | Phase 3 |
| `design-agent` | 브랜드 색상, 애니메이션, 톤앤매너 적용 | Phase 4 |
| `orchestrator-agent` | 파이프라인 전체 순차 실행 + 검증 | Phase 1-5 |

**파이프라인 흐름:**

```
INPUT: 기업 도메인 URL
  ↓
[Phase 1] scraper-agent → 데이터 추출 (WebFetch + parseMarkdownContent)
  ↓
[Phase 2] catalog-utils → 데이터 구조화 (buildCompanyProfile + translations)
  ↓
[Phase 3] layout-agent → 레이아웃 생성 (템플릿 선택 + 페이지 컴포넌트)
  ↓
[Phase 4] design-agent → 디자인 적용 (색상 + 애니메이션 + 다크모드)
  ↓
[Phase 5] 검증 → npm run build + 이미지 매칭 + 품질 점수
  ↓
OUTPUT: 완성된 카탈로그 초안
```

### 공유 인프라

#### 핵심 타입 시스템 (`lib/catalog-core/types.ts`)

모든 에이전트가 공유하는 40+ 표준 데이터 타입:
- `CompanyProfile`, `Product`, `CatalogConfig`, `BrandColorScheme`
- `ScrapedData`, `PipelineStatus`, `ValidationResult`
- Path alias: `@catalog-core/*`

#### 공통 컴포넌트 (`components/catalog/`)

```
components/catalog/
├── CatalogNavigator.tsx    # 통합 페이지 네비게이터
├── CatalogLayout.tsx       # 통합 레이아웃 래퍼
├── CatalogHero.tsx         # 4가지 변형 히어로 (fullscreen/split/video/minimal)
├── CatalogFooter.tsx       # 2가지 변형 푸터 (hover-reveal/inline-grid)
├── PageTransition.tsx      # 페이지 전환 (휠+키보드+스와이프)
└── ui/                     # Aceternity UI 통합 소스
```

Path alias: `@catalog/*`

#### 템플릿 블루프린트 (`templates/`)

| 패턴 | 기반 | 적합한 경우 |
|------|------|-----------|
| `company-multi-page` | GENTOP | 10+ 섹션, 회사/사업/연락처 구분 |
| `product-hierarchy` | HS-TECH | 브랜드/카테고리 계층, 50+ 제품 |
| `single-page-tabs` | 항성산업사 | 소규모 사이트, 10페이지 미만 |

### 3단계 워크플로우 (기업별 에이전트)

각 기업별 에이전트는 다음 워크플로우를 따릅니다:

```
1. 데이터 추출 (Data Extraction)
   ↓
   원본 웹사이트에서 콘텐츠 스크래핑
   제품 정보, 이미지, 사양 등 수집

2. 레이아웃 배치 (Layout Generation)
   ↓
   Next.js 컴포넌트 생성
   반응형 레이아웃 구성
   페이지 네비게이션 구조 설정

3. 디자인 적용 (Design Application)
   ↓
   다크/라이트 모드 스타일링
   Tailwind CSS 적용
   브랜드 컬러 및 타이포그래피
```

### 병렬 실행 가능

여러 에이전트를 동시에 실행할 수 있습니다:

```bash
# 예시: HS-TECH와 GENTOP 동시 작업
hstech-agent: 이미지 매칭 체크  ──┐
                                ├──→ 동시 실행
gentop-agent: 배포 버전 확인  ────┘
```

**장점:**
- 토큰 사용량 효율적
- 작업 시간 단축
- 클라이언트 대응 신속

**주의사항:**
- 느린 작업 기준으로 대기
- 중간에 끊기지 않도록 주의
- Git 작업은 상위 폴더에서 한 번에

---

## 🔄 개발 워크플로우

### Git 및 배포 관리

#### ⚠️ 핵심 규칙: 상위 폴더에서만 Git 관리

```bash
✅ 올바른 방법:
cd /Users/admin/Desktop/premiumpage    # 상위 폴더
git add .
git commit -m "..."
git push

❌ 잘못된 방법:
cd /Users/admin/Desktop/premiumpage/app/templates/hs-tech
git add .    # 하위 폴더에서 Git 작업 금지!
```

**이유:**
- 여러 에이전트가 동시 작업 시 충돌 발생
- 각 에이전트가 개별 커밋하면 히스토리가 꼬임
- 상위 폴더에서 한 번에 처리해야 안전

#### 프로세스

```
1. 여러 에이전트가 각자 작업 진행
   (Git 작업 없이, 파일 수정만)
   ↓
2. 모든 작업 완료 확인
   - 빌드 성공 여부
   - 이미지 경로 매칭
   - TypeScript 에러 없음
   ↓
3. 상위 폴더에서 한 번에 커밋/푸시
   git add .
   git commit -m "feat: 여러 카탈로그 업데이트"
   git push
   ↓
4. Vercel 자동 배포
   - 빌드 로그 확인
   - 배포 성공 여부
   - 도메인 접속 테스트
```

### 배포 환경

**GitHub 저장소:**
- `vibers-leo/premiumpage`

**Vercel 빌드:**
- 리전: Washington D.C. (iad1)
- 자동 배포: `main` 브랜치 푸시 시

**도메인:**
- HS-TECH: `hstech.premiumpage.kr`
- GENTOP: `gentop.premiumpage.kr`
- 항성산업사: `hangseong.premiumpage.kr`
- EMT: `emt.premiumpage.kr`

### 병렬 작업 처리

여러 카탈로그를 동시에 작업할 수 있습니다:

```
시나리오: "HS-TECH와 GENTOP 이미지 매칭 확인"

┌─────────────────────────────┐
│ hstech-agent                │  ←─┐
│ - 이미지 경로 체크          │     ├─→ 동시 실행
│ - public 폴더 확인          │     │
│ - 매칭 여부 리포트          │  ←─┘
└─────────────────────────────┘

┌─────────────────────────────┐
│ gentop-agent                │  ←─┐
│ - 이미지 경로 체크          │     ├─→ 동시 실행
│ - public 폴더 확인          │     │
│ - 매칭 여부 리포트          │  ←─┘
└─────────────────────────────┘

→ 결과를 종합하여 한 번에 보고
```

**장점:**
- 작업 시간 단축 (순차 대비 50% 이상)
- 토큰 사용량 절약
- 클라이언트 대응 신속

**주의사항:**
- 느린 작업 기준 대기
- Git 작업은 모든 에이전트 완료 후
- 리소스 사용량 모니터링

### 응답 및 커뮤니케이션

**원칙:**
- 모든 진행사항을 한글로 작성
- 친절하고 상세하게 설명
- 기술 용어도 한글로 풀어서 설명

**예시:**

```
❌ 나쁜 응답:
"Updating TypeScript interfaces..."

✅ 좋은 응답:
"TypeScript 타입 정의를 업데이트하고 있습니다.
제품 데이터 구조에 새로운 필드를 추가하는 중입니다."
```

---

## 📱 전자카탈로그 특화 지침

### 기본 설정 (Default)

모든 카탈로그는 다음 설정을 기본으로 합니다:

```typescript
// 기본 설정
const DEFAULT_CONFIG = {
  language: 'en',              // 영문 기본
  theme: 'dark',               // 다크모드 기본
  footer: {
    language: 'en',            // 푸터도 영문
    visible: true              // 기본적으로 표시
  },
  languageToggle: {
    visible: false             // 언어 토글 숨김
  },
  pageNavigator: {
    startFromFirstPage: true   // 첫 페이지부터 표시
  }
}
```

**이유:**
- 전자카탈로그는 국제 고객 대상
- 다크모드가 기술 문서에 적합
- 언어 토글은 혼란 방지를 위해 숨김

### 언어 및 다국어

#### URL 경로 기반

```
영문: https://hstech.premiumpage.kr/en/
한글: https://hstech.premiumpage.kr/ko/
```

#### 언어 전환 규칙

```typescript
// 올바른 예시
if (pathname.startsWith('/ko/')) {
  // 한글 버전
  footer = <FooterKorean />
  content = translations.ko
} else {
  // 영문 버전 (기본)
  footer = <FooterEnglish />
  content = translations.en
}
```

#### 언어 토글 버튼

**기본적으로 숨김 처리:**

```typescript
// 언어 토글 버튼 숨김
<LanguageToggle className="hidden" />
```

**이유:**
- 영문 버전이 기본이므로
- 토글 버튼이 혼란을 줄 수 있음
- URL 직접 접근으로 언어 전환 가능

#### 번역 파일 관리

```typescript
// translations.ts
export const translations = {
  en: {
    title: "Product Catalog",
    description: "Industrial Sensors"
  },
  ko: {
    title: "제품 카탈로그",
    description: "산업용 센서"
  }
}
```

### UI 요소 제어

#### 숨김 처리 항목

```typescript
// 1. 언어 토글 버튼
<LanguageToggle className="hidden" />

// 2. 푸터 (특정 페이지)
{!isIntroPage && <Footer />}

// 3. 불필요한 네비게이션
{!isMobile && <SideNavigation />}
```

#### 모바일 최적화

```css
/* 인트로 페이지 제목 */
@media (max-width: 768px) {
  .intro-title {
    font-size: 1.5rem;  /* 더 작게 */
  }
}

/* 페이지 네비게이터 */
@media (max-width: 768px) {
  .page-navigator {
    font-size: 0.75rem;  /* 더 작게 */
    bottom: 1rem;        /* 아래로 배치 */
  }
}
```

### 이미지 관리

#### 이미지 경로 구조

```
public/
├── gentop/
│   └── images/
│       ├── logo.png
│       ├── product1_v1.png
│       └── product2_v1.png
└── templates/
    └── hs-tech/
        └── images/
            ├── vaisala/
            │   ├── HMT330_v1.png
            │   └── DMT340_v1.png
            └── setra/
                └── SRH_v1.png
```

#### 이미지 매칭 필수 확인

**배포 전 체크리스트:**

```markdown
- [ ] 모든 이미지 파일이 public 폴더에 존재하는가?
- [ ] 이미지 파일명이 코드와 정확히 일치하는가?
- [ ] 이미지 경로가 올바른가? (/gentop/images/ vs /templates/hs-tech/images/)
- [ ] 로고 파일이 존재하는가?
- [ ] 제품 이미지가 모두 로딩되는가?
```

#### 이미지 파일명 규칙

```
형식: 모델명_v버전.png

예시:
✅ HMT330_v1.png
✅ DMT340_v1.png
✅ SRH_v1.png

❌ hmt330.png         (대소문자 틀림)
❌ HMT-330_v1.png     (하이픈 추가)
❌ HMT330.png         (버전 누락)
```

**주의사항:**
- 제품명/모델명은 정확히 표기 (대소문자, 하이픈 유지)
- 공식 데이터시트 기준으로 작성
- 버전 번호 필수 (_v1, _v2 등)

### 브랜드별 특성

#### HS-TECH

**특징:**
- VAISALA, SETRA, JUMO, KNICK 등 산업용 센서
- 4단계 계층 구조
- 기술 문서 스타일 디자인
- 80+ 페이지 → 24페이지 네비게이션 표시

**계층 구조:**

```
1. 브랜드 (VAISALA, SETRA, JUMO, KNICK)
   ↓
2. 카테고리 (Temperature, Humidity, Pressure 등)
   ↓
3. 서브카테고리 (Industrial, Laboratory 등)
   ↓
4. 제품 (HMT330, DMT340, SRH 등)
```

**페이지 네비게이터:**
- 실제 페이지: 80+ 페이지
- 표시 페이지: 24페이지
- 세부 시리즈는 카운팅에서 제외

**코드 예시:**

```typescript
// 24페이지 네비게이터 설정
const mainPages = [
  "intro",
  "vaisala-overview",
  "vaisala-temperature",
  "vaisala-humidity",
  // ... 총 24개
];

// 세부 시리즈는 네비게이터에서 제외
const detailPages = [
  "vaisala-temperature-hmt330",
  "vaisala-temperature-dmt340",
  // 이 페이지들은 카운팅 안 함
];
```

#### GENTOP

**특징:**
- 다크모드 기본
- 영문 전자카탈로그
- 깔끔한 디자인

**푸터 설정:**

```typescript
// 주소를 한 줄로 깔끔하게
<Footer
  address="123 Business St, City, Country"
  singleLine={true}
/>
```

#### 에어 HS-TECH (GENWISH)

**특징:**
- DC 엔진오프 에어컨 전문 (크레인, 캠핑카, 선박)
- 라이트모드 기본 (다크모드 백업 버전도 유지)
- 영문 전자카탈로그, 25페이지
- 도메인: `hstechco.premiumpage.kr` → `/templates/air-hstech-light`
- 브랜드명: GENWISH (Genius + Wish의 합성어)

**다크/라이트 이중 버전 운영:**
```
app/templates/air-hstech/       ← 다크 (백업, 개발용)
app/templates/air-hstech-light/ ← 라이트 (실제 서빙)
app/templates/air-hstech/page-structure.ts  ← 두 버전이 공유
app/templates/air-hstech/data.ts            ← 두 버전이 공유
```

**25페이지 구조:**
```
01. COVER       → 02. ABOUT US  → 03. CEO GREETING → 04. HISTORY
05. BRAND       → 06. CERTIFICATIONS → 07. PROCESS
08. PRODUCTS    → 09. SPEC COMPARISON
10~16. 제품 상세 (HSD-180D ~ HS-220H)
17. CONTROLLERS → 18. OUTDOOR UNIT
19. DC TECHNOLOGY → 20. NON-OPERATING
21. CRANE → 22. CAMPING CAR → 23. SHIP
24. LOCATION → 25. CONTACT
```

**클라이언트 콘텐츠 확보 방법 — 핵심 노하우:**

> **SSL 자체 서명 등 크롤링 차단 사이트는 클라이언트가 직접 HTML 저장**

```
방법: Chrome에서 각 페이지 Ctrl+S → "웹페이지, 완전" 선택
저장 위치: legacy/assets/{브랜드명}/
```

- 저장된 HTML 파일에는 텍스트 + 이미지가 함께 저장됨
- AI가 파싱하기 훨씬 용이 → 크롤링보다 정확도 높음
- 클라이언트 입장에서도 "내 사이트 그대로 반영"이라는 신뢰감

#### EMT

**특징:**
- 스마트 센서, 미래 모빌리티 산업
- 모던한 디자인
- **정적 HTML 방식** (Next.js 아님) — middleware로 직접 서빙

**EMT 정적 HTML 구조:**
```
public/emt/index.html  ← 실제 서빙 파일 (영문, 3400+ 라인)
```

**두 도메인이 같은 파일을 서빙할 때 언어 분기:**
```javascript
// 도메인 감지로 한글/영문 포맷 자동 전환
(function() {
    var isKo = window.location.hostname.includes('emt-ko');
    if (isKo) {
        document.getElementById('emt-phone').textContent = '055-339-6661';
    }
})();
```

**middleware.ts에서 정적 HTML 서빙 패턴:**
```typescript
if (hostname.includes('emt.premiumpage.kr')) {
    if (url.pathname === '/') {
        return NextResponse.rewrite(new URL('/emt/index.html', request.url))
    }
}
```

#### 항성산업사

**특징:**
- 기업 특화 카탈로그
- 한국 시장 중심

---

## 💻 코딩 스타일 및 컨벤션

### TypeScript

**엄격 모드 사용:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**타입 정의:**

```typescript
// 제품 데이터 타입
interface Product {
  id: string;
  name: string;
  model: string;
  specifications: {
    range: string;
    accuracy: string;
    unit: string;  // °C, %RH, ppm 등 국제 표준
  };
  images: {
    main: string;
    detail?: string;
  };
}
```

### 폰트 및 타이포그래피

**한글 폰트:**

```css
/* Pretendard 사용 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**다크모드 가독성:**
- WCAG AA 이상 색상 대비
- 기술 문서 가독성 우선
- 텍스트: #E5E7EB (밝은 회색)
- 배경: #1F2937 (어두운 회색)

### 측정 단위

**국제 표준 사용:**

```typescript
// 올바른 예시
const units = {
  temperature: '°C',
  humidity: '%RH',
  pressure: 'bar',
  concentration: 'ppm'
};

// 잘못된 예시
const units = {
  temperature: 'degrees',  // ❌
  humidity: 'percent',     // ❌
};
```

### 파일 및 이미지 네이밍

```
이미지: 모델명_v버전.png
컴포넌트: PascalCase.tsx
유틸리티: camelCase.ts
페이지: kebab-case/
```

**예시:**

```
✅ public/templates/hs-tech/images/VAISALA_HMT330_v1.png
✅ components/ProductCard.tsx
✅ utils/extractProductData.ts
✅ app/templates/hs-tech/temperature-sensors/
```

### 기술 사양

**공식 데이터시트 기준:**

```typescript
// 올바른 예시 (데이터시트 기준)
const specification = {
  range: '-40...+80 °C',
  accuracy: '±0.2 °C',
  resolution: '0.01 °C'
};

// 잘못된 예시 (추측)
const specification = {
  range: '-40 to 80 degrees',  // ❌
  accuracy: 'very accurate'     // ❌
};
```

---

## 📊 OKR 및 성과 관리

### OKR이란?

OKR(Objectives and Key Results)은 **목표(Objective)**와 **핵심 결과(Key Results)**로 구성된 성과 관리 체계입니다.

- **Objective**: 우리가 도달하고 싶은 원대한 꿈 (가슴 뛰는 목표)
- **Key Results**: 그 꿈에 다가갔음을 증명하는 결과적 수치 (측정 가능한 지표)
- **Initiatives**: 이를 위해 우리가 실제로 실행하는 행동 (할 일 목록)

### OKR 참조 필수

**모든 작업은 반드시 [OKR.md](OKR.md) 파일을 참조하여 진행해야 합니다.**

```markdown
작업 시작 전 체크리스트:
- [ ] OKR.md 파일 확인
- [ ] 현재 작업이 어떤 Objective와 연결되는지 파악
- [ ] 어떤 Key Result에 기여하는지 확인
- [ ] Initiative 리스트에 있는 작업인지 검증
```

### 현재 OKR 요약

**Objective 1: 모든 산업 엔지니어가 신뢰하고 찾는 글로벌 No.1 전자카탈로그 플랫폼을 구축한다**

핵심 KR:
- 사용자 체류 시간 200% 증가
- 페이지 이탈률 50% 감소
- 기술 사양 정확도 100% 달성
- 모바일 사용자 만족도 4.5/5.0 이상

**Objective 2: AI 에이전트 시스템으로 카탈로그 생성 시간을 10배 단축하고 품질을 2배 향상시킨다**

핵심 KR:
- 카탈로그 생성 시간 90% 단축
- 데이터 추출 정확도 98% 이상
- 에이전트 병렬 실행으로 처리량 3배 증가
- 코드 재사용률 80% 달성

**Objective 3: 완벽한 코드 품질과 배포 프로세스로 다운타임 0%를 달성한다**

핵심 KR:
- 프로덕션 버그 발생률 0.1% 이하
- 배포 성공률 99.9% 달성
- 코드 리뷰 커버리지 100%
- 자동화된 테스트 커버리지 80% 이상

### OKR 중심 개발 원칙

#### 1. Output이 아닌 Outcome에 집중

**잘못된 사고방식 (Output 중심):**
```
"이미지 100개를 추가했으니 끝!"
"페이지 10개를 만들었으니 성공!"
"코드 1000줄을 작성했으니 생산적!"
```

**올바른 사고방식 (Outcome 중심):**
```
"이미지 추가로 사용자 만족도가 4.5/5.0로 향상되었나?"
"페이지 추가로 사용자 체류 시간이 200% 증가했나?"
"코드 작성으로 버그 발생률이 0.1% 이하로 떨어졌나?"
```

#### 2. 작업 전 OKR 연계 확인

모든 작업을 시작하기 전에 다음을 자문하세요:

```markdown
1. 이 작업이 어떤 Objective에 기여하는가?
   → Objective 1: 사용자 경험 향상

2. 어떤 Key Result가 개선되는가?
   → KR 3: 기술 사양 정확도 100% 달성

3. 측정 가능한 개선이 있는가?
   → 현재 85% → 목표 100% (15%p 향상)

4. Initiative 리스트에 있는 작업인가?
   → ✅ "이미지 매칭 자동 검증 시스템 구축"
```

#### 3. 작업 완료 후 OKR 측정

작업을 완료한 후 반드시 KR 지표를 측정하고 보고하세요:

```markdown
## 작업 완료 보고서

### 작업 내용
- 이미지 매칭 자동 검증 시스템 구축

### OKR 연계
- Objective 1, KR 3: 기술 사양 정확도 100% 달성

### 측정 결과
- 작업 전: 85% (이미지 누락 15개)
- 작업 후: 98% (이미지 누락 2개)
- 개선: +13%p

### KR 달성률
- 목표: 100%
- 현재: 98%
- 진행률: 98% (목표 대비)

### 다음 단계
- 누락된 이미지 2개 추가 작업 필요
```

#### 4. 주간 OKR 체크인

매주 월요일, OKR 진행 상황을 체크하세요:

```markdown
## Week [N] OKR 체크인 (2024-02-[DD])

### Objective 1 진행률
- KR 1 (체류 시간): 120초 → 180초 (목표: 270초) = 66%
- KR 2 (이탈률): 65% → 50% (목표: 32.5%) = 46%
- KR 3 (정확도): 85% → 98% (목표: 100%) = 98%
- KR 4 (만족도): 측정 중

### 이번 주 핵심 Initiative
- [x] 이미지 매칭 자동 검증 시스템 구축
- [ ] 다크모드 가독성 최적화

### 장애물
- 일부 제품 이미지 원본 해상도 낮음
- 해결: 공급업체에 고해상도 이미지 요청

### 다음 주 계획
- 페이지 네비게이션 UX 개선
- 검색 기능 프로토타입 개발
```

### OKR 작성 가이드라인

#### ✅ Good OKR 예시

```
Objective: 모든 엔지니어가 신뢰하는 카탈로그 플랫폼
→ 가슴 뛰고 영감을 줌
→ 사용자 가치 중심
→ 방향성이 명확

KR 1: 사용자 체류 시간 200% 증가 (90초 → 270초)
→ 수치로 측정 가능
→ 도전적 (70% 달성도 성공)
→ Outcome 중심 (결과)

Initiative: 이미지 매칭 자동 검증 시스템 구축
→ 구체적인 실행 방안
→ KR 달성에 기여
```

#### ❌ Bad OKR 예시

```
Objective: 웹사이트 기능 개선
→ 영감 없음
→ 너무 모호함
→ 가치가 불명확

KR 1: 새로운 페이지 10개 추가
→ Output 중심 (할 일)
→ 비즈니스 가치 불명확
→ 도전적이지 않음
```

### Output vs Outcome 구분

| Output (할 일) | Outcome (결과) | 비고 |
|--------------|--------------|------|
| 디자인 시안 3개 제작 | 구매 전환율 30% 증가 | KR은 Outcome |
| 개발자 2명 채용 | 개발 속도 2배 향상 | KR은 Outcome |
| 테스트 코드 작성 | 버그 발생률 50% 감소 | KR은 Outcome |
| 이미지 100개 추가 | 사용자 만족도 4.5/5.0 | KR은 Outcome |
| 페이지 10개 생성 | 사용자 체류 시간 200% 증가 | KR은 Outcome |

**핵심 원칙: Key Results는 항상 Outcome으로 작성!**

### OKR 준수 체크리스트

작업을 시작하기 전에 다음을 확인하세요:

```markdown
## OKR 준수 체크리스트

### 작업 전
- [ ] OKR.md 파일을 읽었는가?
- [ ] 이 작업이 어떤 Objective와 연결되는가?
- [ ] 어떤 Key Result에 기여하는가?
- [ ] Initiative 리스트에 있는 작업인가?
- [ ] Output이 아닌 Outcome을 목표로 하는가?

### 작업 중
- [ ] KR 지표를 염두에 두고 개발하는가?
- [ ] 측정 가능한 방식으로 구현하는가?
- [ ] 사용자 가치에 집중하는가?

### 작업 후
- [ ] KR 지표를 측정했는가?
- [ ] 목표 대비 얼마나 달성했는가?
- [ ] 다음 단계가 명확한가?
- [ ] OKR 체크인 문서를 업데이트했는가?
```

### OKR 측정 도구

#### 1. Google Analytics

```javascript
// 체류 시간 추적 (KR 1)
gtag('event', 'timing_complete', {
  name: 'page_view_duration',
  value: duration,
  event_category: 'engagement'
});

// 이탈률 추적 (KR 2)
gtag('event', 'bounce', {
  event_category: 'engagement',
  event_label: 'bounce_rate'
});
```

#### 2. 자동화된 검증 스크립트

```bash
#!/bin/bash
# okr-metrics.sh

echo "=== OKR 1 KR 3: 이미지 매칭 검증 ==="
npm run check:images
RESULT=$(cat image-validation-result.txt)
echo "결과: $RESULT"
echo "목표: 100%, 현재: $RESULT"

echo "=== OKR 1 KR 3: 사양 정확도 검증 ==="
npm run check:specifications
RESULT=$(cat spec-validation-result.txt)
echo "결과: $RESULT"
echo "목표: 100%, 현재: $RESULT"
```

#### 3. 성능 모니터링

```typescript
// performance-monitor.ts
export function trackCoreWebVitals() {
  // LCP (Largest Contentful Paint)
  // FID (First Input Delay)
  // CLS (Cumulative Layout Shift)

  // Vercel Analytics로 자동 전송
  // OKR 1 KR 1 (체류 시간)과 연계
}
```

### OKR 보고 템플릿

작업 완료 시 다음 템플릿을 사용하세요:

```markdown
## [작업명] OKR 보고서

### OKR 연계
- Objective: [해당 Objective]
- Key Result: [해당 KR]
- Initiative: [해당 Initiative]

### 작업 내용
- [구체적인 작업 설명]

### 측정 결과
- 작업 전: [수치]
- 작업 후: [수치]
- 개선: [+/- 수치]

### KR 달성률
- 목표: [목표 수치]
- 현재: [현재 수치]
- 진행률: [%]

### 사용자 가치
- [이 작업이 사용자에게 제공하는 가치]

### 다음 단계
- [추가로 필요한 작업]

### 스크린샷 / 증거
- [결과를 보여주는 스크린샷, 로그, 그래프 등]
```

### OKR 성공 팁

#### 1. 70% 달성을 목표로

- 100% 달성 = 목표가 너무 쉬웠음
- 70-80% 달성 = 이상적
- 50% 이하 = 목표가 너무 높았거나 방향 재조정 필요

#### 2. 실패를 두려워하지 말기

- OKR은 도전적이어야 함
- 실패한 OKR에서 더 많이 배움
- 다음 분기에 반영

#### 3. 주간 체크인 절대 생략 금지

- 분기말에 확인하는 게 아님
- 매주 진행 상황 점검
- 빠른 조정과 학습

#### 4. 데이터 기반 의사결정

- 감이 아닌 측정 데이터
- 객관적인 수치
- 투명한 공유

### OKR 리뷰 일정

```markdown
## OKR 운영 일정

### 주간 체크인
- 일시: 매주 월요일 10:00
- 참석: 전체 팀
- 내용: KR 진행률, 장애물, 다음 주 계획

### 월간 리뷰
- 일시: 매월 마지막 금요일 15:00
- 참석: 전체 팀 + 스테이크홀더
- 내용: 전체 OKR 달성률, 회고, 조정

### 분기 평가
- 일시: 분기 마지막 주
- 참석: 전체 팀 + 경영진
- 내용: 최종 달성률, 차기 분기 OKR 수립
```

---

## 🚫 금지 사항

### 1. "전체적으로" 애매하게 해석 금지

```
❌ 잘못된 해석:
사용자: "전체적으로 폰트를 Pretendard로 변경해줘"
AI: [apply-all 사용하여 모든 카탈로그 변경]

✅ 올바른 응답:
AI: "어느 카탈로그를 수정하시겠습니까?
     1) HS-TECH만
     2) GENTOP만
     3) EMT만
     4) 항성산업사만
     5) 모든 카탈로그"
```

**중요성:**
- 잘못 해석하면 모든 카탈로그가 변경됨
- 복구가 매우 어려움
- 클라이언트에게 보여줘야 하는 상황에서 치명적

### 2. 하위 폴더에서 Git 작업 금지

```bash
❌ 금지:
cd app/templates/hs-tech
git add .
git commit -m "..."

✅ 허용:
cd /Users/admin/Desktop/premiumpage  # 상위 폴더만
git add .
git commit -m "..."
```

**이유:**
- 여러 에이전트가 동시 작업 시 충돌
- Git 히스토리가 꼬임
- 상위 폴더에서만 안전

### 3. 영문 버전에서 한글로 자동 전환 금지

```typescript
❌ 금지:
// 영문 URL인데 한글 콘텐츠 표시
if (someCondition) {
  return <KoreanContent />  // 잘못됨!
}

✅ 허용:
// URL 경로 기반으로만 결정
if (pathname.startsWith('/ko/')) {
  return <KoreanContent />
} else {
  return <EnglishContent />  // 기본
}
```

**원칙:**
- 기본이 영문이면 푸터도 영문
- 언어 토글 버튼 숨김 처리
- 한글 URL 접근하지 않는 한 영문 유지

### 4. 작업 중 임의로 Git Push 금지

```
❌ 금지:
에이전트가 작업 완료 후 자동으로 push

✅ 허용:
사용자가 명시적으로 요청: "커밋하고 푸시해줘"
```

**원칙:**
- 사용자가 명시적으로 요청할 때만
- 상위 폴더 에이전트가 한 번에 처리
- 모든 에이전트 작업 완료 후

### 5. 추측으로 기술 사양 작성 금지

```typescript
❌ 금지:
const spec = {
  range: 'wide range',      // 추측
  accuracy: 'very accurate'  // 추측
};

✅ 허용:
// 공식 데이터시트 기준
const spec = {
  range: '-40...+80 °C',
  accuracy: '±0.2 °C'
};
```

**원칙:**
- 공식 데이터시트만 참고
- 추측 금지
- 확실하지 않으면 사용자에게 확인

### 6. Output 중심 작업 금지 (OKR 원칙)

```markdown
❌ 금지:
"페이지 10개를 만들었으니 작업 완료!"
"이미지 100개를 추가했으니 성공!"
"코드 1000줄을 작성했으니 생산적!"

✅ 허용:
"페이지 추가로 사용자 체류 시간이 200% 증가했나?" (Outcome 확인)
"이미지 추가로 사용자 만족도가 4.5/5.0에 도달했나?" (Outcome 확인)
"코드 작성으로 버그 발생률이 0.1% 이하로 감소했나?" (Outcome 확인)
```

**원칙:**
- 무엇을 했는가(Output)가 아닌 어떤 결과가 나타났는가(Outcome)에 집중
- 모든 작업은 OKR.md의 Key Results와 연계
- 작업 완료 후 반드시 KR 지표 측정 및 보고
- Output만 달성하고 Outcome을 달성하지 못하면 실패로 간주

---

## ⚠️ 주의사항

### 1. 이미지 경로 매칭

**배포 후 반드시 확인:**

```bash
# 이미지 로딩 확인 스크립트
check-images.sh

배포 URL: https://hstech.premiumpage.kr
확인 항목:
- [ ] 로고 이미지 로딩
- [ ] 제품 이미지 로딩
- [ ] 브랜드 이미지 로딩
```

**체크리스트:**
- public 폴더 구조와 코드 경로 일치
- 이미지 파일명 대소문자 정확
- 버전 번호 (_v1) 포함

### 2. 빌드 실패 점검

**Vercel 배포 로그 확인:**

```bash
# 빌드 로그 확인
vercel logs

체크 항목:
- [ ] TypeScript 에러 없음
- [ ] 이미지 경로 유효성
- [ ] 환경 변수 설정
- [ ] 빌드 성공 (200)
```

**사전 체크:**
- 로컬에서 `npm run build` 성공
- TypeScript 에러 해결
- 이미지 경로 검증

### 3. 다크모드 가독성

**색상 대비 검증:**

```css
/* WCAG AA 이상 */
.text-primary {
  color: #E5E7EB;  /* 밝은 회색 */
}

.bg-primary {
  background: #1F2937;  /* 어두운 회색 */
}

/* 대비율: 4.5:1 이상 */
```

**우선순위:**
- 기술 문서 가독성 최우선
- 전문가 사용자 고려
- 장시간 읽기 편안함

### 4. 병렬 작업 시 리소스 관리

**토큰 사용량 모니터링:**

```
작업 1: hstech-agent (예상 토큰: 5000)
작업 2: gentop-agent (예상 토큰: 5000)
---
총 예상: 10000 토큰
```

**대기 시간:**
- 느린 작업 기준
- 모든 작업 완료 확인
- 중간에 끊기지 않도록

### 5. 배포 버전 확인

**Git Push 후 확인:**

```bash
# 1. GitHub 커밋 확인
https://github.com/vibers-leo/premiumpage/commits/main

# 2. Vercel 배포 확인
https://vercel.com/dashboard

# 3. 실제 도메인 접속
https://hstech.premiumpage.kr
https://gentop.premiumpage.kr
```

**불일치 점검:**
- 로컬과 배포 버전 비교
- 이미지 로딩 확인
- 기능 동작 테스트

### 6. 클라이언트 대응

**빠른 병렬 처리:**

```
시나리오: "동시에 클라이언트한테 보여줘야 해서"

→ 여러 에이전트를 병렬 실행
→ 작업 속도가 비슷한 경우 한 번에 처리
→ 꼬일 가능성 있으면 사전 확인
```

**우선순위:**
- 클라이언트 일정 최우선
- 품질 > 속도 (하지만 둘 다 중요)
- 사전 테스트 철저히

---

## 📝 템플릿 관리

### 공통 템플릿

`catalog-utils`로 공통 템플릿 관리:

```typescript
// catalog-utils/templates/BaseLayout.tsx
export function BaseLayout({
  language = 'en',
  theme = 'dark',
  showFooter = true,
  showLanguageToggle = false,
  showPageNavigator = true,
  children
}: LayoutProps) {
  return (
    <ThemeProvider defaultTheme={theme}>
      <div className="catalog-layout">
        {children}
        {showFooter && <Footer language={language} />}
        {showPageNavigator && <PageNavigator />}
        {showLanguageToggle && <LanguageToggle />}
      </div>
    </ThemeProvider>
  );
}
```

### 옵션 조합

```typescript
// 영문 + 다크모드 + 푸터 표시 (기본)
<BaseLayout />

// 한글 + 라이트모드 + 푸터 숨김
<BaseLayout
  language="ko"
  theme="light"
  showFooter={false}
/>

// 영문 + 다크모드 + 언어 토글 표시
<BaseLayout
  showLanguageToggle={true}
/>
```

### 자동 반영

템플릿 업데이트 시 자동으로 모든 카탈로그에 반영:

```bash
# catalog-utils 템플릿 수정
vi catalog-utils/templates/BaseLayout.tsx

# apply-all로 일괄 적용
apply-all --template=BaseLayout
```

---

## 🐛 알려진 버그 패턴 및 해결책

### 1. 모달 z-index가 PageNavigator를 가리는 문제

**증상:** 제품 상세 모달 열린 상태에서 다음/이전 버튼을 누르면 페이지가 A→B→A→B로 무한 반복

**원인:**
```
모달 backdrop: z-[100]
PageNavigator: z-50
→ 클릭이 backdrop.onClick(onClose)에 먼저 잡힘
→ onClose() → navigate('products') → 원래 페이지로 복귀
```

**해결책:** 제품 상세를 모달이 아닌 **풀 페이지**로 처리. 이미지 확대만 라이트박스(z-[200])로.
```tsx
// ❌ 잘못된 패턴
<ProductModal onClose={() => navigate('products')} />  // backdrop이 navigator 가림

// ✅ 올바른 패턴
case 'hsd-180d': return <ProductDetailPage productId={currentTab} />  // 풀 페이지
// 이미지 클릭 시 ImageLightbox (z-[200]) 사용
```

### 2. PDF 생성 시 Vercel 배포 미완료 문제

**증상:** 코드 변경 후 즉시 PDF 생성하면 이전 버전이 캡처됨

**규칙:** `git push` 후 **15초 이상 대기** 후 PDF 생성
```bash
sleep 15 && node scripts/generate-pdf.js air-hstech
```

### 3. PDF 파일은 .gitignore 대상

`public/report/*.pdf`는 `.gitignore`에 포함되어 git 추적 안 됨. 로컬에만 저장.
→ 클라이언트 전달 시 직접 파일 전달 또는 다운로드 링크 제공

---

## 📋 신규 카탈로그 제작 프로세스 (검증된 방법)

### 핵심: 클라이언트가 HTML 직접 저장

크롤링 차단(SSL 인증, 봇 차단 등)을 우회하는 **가장 확실한 방법**:

```
1. 클라이언트가 Chrome에서 각 페이지 열기
2. Ctrl+S → "웹페이지, 완전" 선택
3. legacy/assets/{브랜드명}/ 폴더에 저장
   (저장 시 _files/ 폴더에 이미지도 함께 저장됨)
```

**장점:**
- 텍스트 + 이미지 + CSS 구조가 완벽하게 보존
- 파싱 정확도 거의 100%
- 클라이언트 입장: 내 사이트 내용 그대로 반영 → 신뢰감

### 새 카탈로그 빠른 제작 체크리스트

```markdown
- [ ] 1. 기존 카탈로그 page.tsx 복사 (가장 가까운 스타일 선택)
- [ ] 2. data.ts 작성 (HTML 파싱 → 제품/회사 데이터 추출)
- [ ] 3. page-structure.ts 작성 (페이지 순서/탭명 정의)
- [ ] 4. 색상 토큰 변경 (accent color, bg color)
- [ ] 5. 이미지 public/templates/{브랜드}/ 복사
- [ ] 6. middleware.ts 도메인 추가
- [ ] 7. layout.tsx OG 태그 설정
- [ ] 8. npm run build 확인
- [ ] 9. git push → Vercel 배포 확인
- [ ] 10. node scripts/generate-pdf.js {브랜드} → PDF 저장
```

### PDF 생성 스크립트 패턴

```javascript
// scripts/generate-pdf.js에 추가할 패턴
const NEW_CATALOG_BASE = 'https://{domain}.premiumpage.kr/templates/{name}'
const NEW_CATALOG_PAGES = [
    { tab: 'cover',   label: '01 · COVER' },
    // ...
]

async function generateNewCatalogPDF(timestamp) {
    await page.emulateMedia({ colorScheme: 'light' })  // 라이트모드
    // 또는: colorScheme: 'dark'  // 다크모드
}
```

---

## ✅ 확인 및 검증 프로세스

### 작업 완료 후 체크리스트

```markdown
## 로컬 테스트
- [ ] `npm run build` 성공
- [ ] TypeScript 에러 없음
- [ ] 이미지 경로 유효성
- [ ] 다크/라이트 모드 정상 작동
- [ ] 모바일 반응형 확인

## Git 작업
- [ ] 상위 폴더에서 커밋
- [ ] 커밋 메시지 명확
- [ ] Push 전 Pull 먼저

## 배포 확인
- [ ] GitHub 커밋 확인
- [ ] Vercel 빌드 성공
- [ ] 도메인 접속 테스트
- [ ] 이미지 로딩 확인
- [ ] 기능 동작 테스트

## 사용자 보고
- [ ] 변경 사항 요약
- [ ] 배포 URL 제공
- [ ] 추가 작업 필요 여부
```

### 이미지 매칭 검증

```bash
#!/bin/bash
# check-images.sh

echo "이미지 매칭 검증 시작..."

# 1. public 폴더 이미지 목록
find public -name "*.png" -o -name "*.jpg" > images-public.txt

# 2. 코드에서 참조하는 이미지 목록
grep -r "src=\"" app/ | grep -o "/.*\.(png|jpg)" > images-code.txt

# 3. 매칭 여부 확인
comm -23 images-code.txt images-public.txt > missing-images.txt

if [ -s missing-images.txt ]; then
  echo "❌ 누락된 이미지 발견:"
  cat missing-images.txt
else
  echo "✅ 모든 이미지 매칭 완료"
fi
```

### 경로 유효성 검증

```typescript
// utils/validatePaths.ts
export function validateImagePaths() {
  const images = getAllImageReferences();
  const missing: string[] = [];

  images.forEach(imagePath => {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    if (!fs.existsSync(fullPath)) {
      missing.push(imagePath);
    }
  });

  if (missing.length > 0) {
    console.error('❌ 누락된 이미지:', missing);
    process.exit(1);
  }

  console.log('✅ 모든 이미지 경로 유효');
}
```

---

## 🎓 학습 및 개선

### 세션 로그 분석

이 문서는 다음 세션 로그를 분석하여 작성되었습니다:

- `6f466ed3-e112-46b6-8d30-dd23af052c23.jsonl` (현재 세션)
- `d02c9717-d8f1-48d9-9bb3-7cfcb5d31981.jsonl` (최근 세션)
- `87d18c20-8316-4a28-a573-82078e243047.jsonl` (큰 세션)
- `b4d00046-f2b9-4fd2-8e68-a91a6305852d.jsonl` (가장 큰 세션)

총 61개 사용자 메시지를 분석하여 주요 패턴을 추출했습니다.

### 지속적인 개선

이 문서는 계속 업데이트됩니다:

```markdown
## 업데이트 히스토리

### 2026-02-26
- 에어 HS-TECH (GENWISH) 섹션 추가
- EMT 정적 HTML 패턴 문서화
- 모달 z-index 버그 패턴 추가
- 신규 카탈로그 제작 프로세스 정립
- 클라이언트 HTML 직접 저장 방식 공식화
- PDF 생성 Vercel 배포 대기 규칙 추가

### 2024-02-14
- 초기 버전 작성
- 세션 로그 분석 기반
- 핵심 원칙 정립

### 향후 계획
- 더 많은 세션 로그 분석
- 새로운 패턴 발견 시 추가
- 사용자 피드백 반영
```

---

## 📞 연락 및 지원

문제가 발생하거나 질문이 있으면:

1. 먼저 이 문서를 확인
2. 세션 로그 분석
3. 사용자에게 명확히 질문

**원칙: 추측하지 말고, 확인하세요!**

---

## 📚 참고 자료

### 공식 문서

- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

### 기술 사양

- VAISALA: https://www.vaisala.com
- SETRA: https://www.setra.com
- JUMO: https://www.jumo.net
- KNICK: https://www.knick.de

### 디자인 시스템

- Pretendard 폰트: https://github.com/orioncactus/pretendard
- WCAG 접근성: https://www.w3.org/WAI/WCAG21/quickref/

---

## 🔄 버전 관리

**문서 버전: 1.0.0**
**작성일: 2024-02-14**
**분석 기반: 4개 세션 로그, 61개 사용자 메시지**

---

**이 문서를 준수하여 일관성 있고 품질 높은 전자카탈로그를 개발합시다!** 🚀
