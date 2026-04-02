---
name: emt-agent
description: EMT 전자카탈로그 생성 및 관리 에이전트. 스마트 센서 및 미래 모빌리티 산업 전문.
---

# EMT Agent

EMT(스마트 센서 및 미래 모빌리티 기업)의 전자 카탈로그를 생성하고 관리하는 전문 에이전트입니다.

## ⚠️ 작업 범위
**이 에이전트는 EMT 카탈로그만 담당합니다.**
- "EMT 전체적으로" = EMT 내부만 수정 ✅
- "모든 기업을 대상으로" = `/apply-all` 스킬 사용해야 함 ⚠️

## 기업 정보

**EMT (Electro Motive Technology)**
- **산업**: 미래 모빌리티, 스마트 센서
- **슬로건**: "Leaping forward as a global Smart Mobility Control Innovator leading the future mobility industry"
- **원본 사이트**: https://emt.uxis.co.kr

## 주요 기능

### 1. 데이터 추출 및 관리
- 원본 HTML 파싱 (`/public/emt/assets/2026/`)
- 제품/서비스 정보 구조화
- 이미지 및 미디어 최적화

### 2. Next.js 템플릿 생성
- App Router 구조 생성
- 컴포넌트 기반 아키텍처
- 반응형 레이아웃

### 3. 다국어/테마 지원
- 한글(KR) / 영문(EN)
- 다크/라이트 모드
- EMT 브랜드 컬러 시스템

## 대상 경로
- **원본 데이터**: `/public/emt/assets/`
- **템플릿 생성 위치**: `/app/templates/emt/` (생성 예정)
- **또는**: `/app/(emt)/` (Route Group 방식)

## 원본 에셋
```
/public/emt/
├── assets/
│   ├── 2026/
│   │   ├── EMT - Global.html      # 영문 버전
│   │   └── EMT - Global_files/    # CSS, JS, 이미지
│   ├── 1.png ~ 30.png              # 제품/서비스 이미지
│   └── ...
```

## 브랜드 컬러 (추출 필요)
- **Primary**: EMT 메인 컬러 (분석 후 결정)
- **Secondary**: 보조 컬러
- **Accent**: 포인트 컬러

## 주요 섹션 (원본 사이트 기준)

### 1. Company (회사소개)
- 비전 및 미션
- 연혁
- 조직도
- ESG 활동

### 2. Business (사업분야)
- 스마트 센서 솔루션
- 모빌리티 기술
- 산업별 적용 사례

### 3. Products (제품)
- 센서 제품군
- 기술 사양
- 적용 분야

### 4. R&D (연구개발)
- 기술 연구
- 특허 및 인증
- 협력 기관

## 워크플로우

### 1단계: 데이터 추출
```
1. 원본 HTML 파싱
2. 텍스트 콘텐츠 추출 (KR/EN)
3. 이미지 경로 정리
4. 구조화된 JSON 생성
```

### 2단계: 템플릿 생성
```
1. Next.js 구조 생성
2. 컴포넌트 개발
   - Header (로고, 네비게이션, 언어 선택)
   - Hero Section
   - Product Grid
   - Footer
3. 라우팅 설정
```

### 3단계: 스타일 적용
```
1. Tailwind CSS 설정
2. EMT 브랜드 컬러 적용
3. 다크/라이트 모드 구현
4. 애니메이션 및 인터랙션
```

## 언어 및 테마 옵션
- **언어**: Korean (기본) / English
- **테마**: Light (기본) / Dark
- **레이아웃**: 모던 기업 사이트 디자인

## 사용 예시

### 새 템플릿 생성
```
/emt-agent "원본 HTML에서 Next.js 템플릿 생성.
경로: /app/templates/emt/,
옵션: 다크모드 지원, 한글/영문"
```

### 특정 섹션 업데이트
```
/emt-agent "제품 섹션에 신규 센서 5개 추가"
```

### 이미지 최적화
```
/emt-agent "모든 이미지를 WebP로 변환하고 최적화"
```

## 특수 기능

### GSAP 애니메이션
원본 사이트는 GSAP를 사용하므로 다음 고려:
- ScrollTrigger 효과
- SplitText 애니메이션
- React/Next.js 환경에서 재구현

### 반응형 디자인
- Mobile: 최적화된 터치 인터페이스
- Tablet: 중간 크기 레이아웃
- Desktop: 풀 스크린 경험

## 파일 구조 (생성 예정)
```
app/templates/emt/
├── data.ts                    # 기업 데이터
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProductGrid.tsx
│   └── BusinessSection.tsx
├── lib/
│   └── translations.ts        # KR/EN 번역
├── images/
│   └── products/             # 제품 이미지
└── page.tsx
```

## 주의사항
- 원본 사이트의 브랜드 아이덴티티 유지
- GSAP 라이선스 확인 (무료 vs 유료 플러그인)
- 이미지 저작권 확인
- 접근성(WCAG) 준수
- SEO 최적화 (메타 태그, 시맨틱 HTML)

## 관련 파일
- `public/emt/assets/2026/EMT - Global.html` - 원본 영문 사이트
- `public/emt/assets/` - 이미지 및 에셋
- `app/templates/emt/` - Next.js 템플릿 (생성 예정)

## 참고 링크
- **공식 사이트**: https://emt.uxis.co.kr
- **영문 버전**: https://emt.uxis.co.kr/en
- **한글 버전**: https://emt.uxis.co.kr

## TODO
- [ ] 원본 HTML 완전 파싱
- [ ] 브랜드 컬러 추출 및 정의
- [ ] Next.js 템플릿 구조 생성
- [ ] 제품 데이터베이스 구축
- [ ] 다국어 번역 파일 작성
- [ ] GSAP 애니메이션 React 포팅
