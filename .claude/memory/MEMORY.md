# premiumpage 프로젝트 메모리

## 프로젝트 개요
- **경로:** 프로젝트 루트 (맥북: `/Users/admin/Desktop/premiumpage`, 맥미니: 이동 후 경로)
- **스택:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion
- **배포:** Vercel (`vibers-leo/premiumpage` GitHub repo)
- **GitHub:** `https://github.com/vibers-leo/premiumpage`

## 카탈로그 목록 및 도메인

| 카탈로그 | 도메인 | 경로 | 비고 |
|---------|--------|------|------|
| HS-TECH (영문) | hstech.premiumpage.kr | /templates/hs-tech | |
| HS-TECH (한글) | hstech-kr.premiumpage.kr | /templates/hs-tech-kr | |
| 에어 HS-TECH | hstechco.premiumpage.kr | /templates/air-hstech-light | 라이트모드 기본 |
| GENTOP | gentop.premiumpage.kr | /gentop/en | |
| 항성산업사 | hangseong.premiumpage.kr | /templates/hangseong | |
| EMT (영문) | emt.premiumpage.kr | /emt/index.html (정적) | |
| EMT (한글) | emt-ko.premiumpage.kr | /emt/index.html (정적) | JS 도메인 감지 |

## 에어 HS-TECH (GENWISH) 현황
- **다크:** `app/templates/air-hstech/` (백업용)
- **라이트:** `app/templates/air-hstech-light/` (실서빙)
- **공유 파일:** `air-hstech/data.ts`, `air-hstech/page-structure.ts`
- **페이지 수:** 25페이지
- **PDF:** `node scripts/generate-pdf.js air-hstech` (라이트모드)

## 핵심 파일 경로
- `middleware.ts` — 도메인별 라우팅
- `scripts/generate-pdf.js` — PDF 생성 (playwright + pdf-lib)
- `public/report/` — PDF 저장 위치 (.gitignore)
- `public/templates/air-hstech/images/` — 에어 HS-TECH 이미지
- `public/emt/index.html` — EMT 정적 HTML 카탈로그 (영문/한글 공용)
- `public/emt/new/` — EMT 원본 제품 HTML 파일들

## 검증된 프로세스

### 신규 카탈로그 제작 시 콘텐츠 확보
- 크롤링 차단 사이트 → 클라이언트가 직접 Chrome에서 Ctrl+S 저장
- 저장 위치: `legacy/assets/{브랜드명}/`
- HTML + _files/ 폴더 함께 저장 필수

### PDF 생성 주의사항
- git push 후 **15초 이상** 대기 → Vercel 배포 완료 후 생성
- PDF는 .gitignore 대상 → 로컬 전달

## 알려진 버그 패턴
- **모달 z-index 충돌:** 모달 backdrop(z-[100])이 PageNavigator(z-50)를 가림 → 제품 상세는 풀페이지로, 이미지만 Lightbox(z-[200])로
- **이미지 경로:** `/templates/air-hstech/images/` (라이트/다크 공유)

## 사용자 선호사항
- 모든 진행사항 한글로 설명
- 중간 확인보다 빠른 작업 완료 선호
- 페이지 내용 추가 시 기존 홈페이지 원본 데이터 활용
- 비교 작업 시 1개씩 보여주며 컨펌받는 방식 선호

## 최근 완료 작업 (2026-03-24)
- EMT `public/emt/index.html` 전체 31개 제품 원본 HTML과 대조 완전 일치 검수 완료
- 수정된 항목들:
  - Speed Sensor, Steering Angle Sensor desc/details 복원
  - 온도 표기 전면 정리 (em dash `−40` 방식으로 통일)
  - Transfer Case Sensor, 4WD Electronic Shift Control Sensor, Water Temperature Sensor, Crankshaft Position Sensor 등 다수 세부 수정
  - TCU: `32-bit` → `32 bit` 수정
- 프로젝트명 `jcatalog-premium` → `premiumpage` 통일 (package.json, CLAUDE.md 등)
- GitHub remote `juuuno-coder` → `vibers-leo` 업데이트
