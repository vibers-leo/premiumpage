---
title: EMT E-Catalog 한글화 및 모바일 최적화
date: 2026-01-15
description: EMT E-Catalog 웹사이트의 한국어 버전 생성, 모바일 레이아웃 수정(회색 박스 제거), 그리고 언어 전환 기능(KR/EN) 구현 작업 로그
---

# 작업 요약

## 1. 한국어 버전 (`ko/index.html`) 생성 및 최적화

- **완전한 한글화**: `index.html`을 기반으로 `ko/index.html`을 생성하고, 제품 데이터, 기업 정보, UI 요소를 모두 한국어로 번역했습니다.
- **공식 홈페이지 스타일 반영**:
  - HERO 섹션의 메인 타이틀은 영어("Smart Mobility Control Innovator")로 유지하되, 설명 문구는 한국어로 작성하여 공식 홈페이지(`EMT.html`)의 톤앤매너를 맞췄습니다.
  - HERO 섹션의 불필요한 CTA 버튼("회사소개", "제품보기")을 제거하여 깔끔하게 정리했습니다.
- **모바일 메뉴 한글화**: 모바일 메뉴의 헤더는 영어(About us, Mobility Products 등)로, 서브 메뉴는 한국어로 구성하여 통일감을 주었습니다.

## 2. 모바일 레이아웃 버그 수정 (회색 박스 제거)

- **문제**: 모바일 화면에서 Contact/Directions 섹션 위에 의도치 않은 큰 회색 영역 발생.
- **해결**:
  - `ko/index.html` 및 `index.html` (영어 버전) 모두에 CSS 오버라이드를 적용했습니다.
  - `directions-container`와 `slide`의 불필요한 `padding`, `margin`, `min-height`를 모바일 화면(`max-width: 1024px`)에서 초기화(`0` 또는 `auto`)하여 회색 영역을 완전히 제거했습니다.

## 3. 언어 전환 기능 (KR | EN) 구현

- **브라우저 번역 의존 탈피**: 사용자가 직접 언어를 선택할 수 있도록 사이트 내에 언어 전환 토글을 추가했습니다.
- **UI 위치**:
  - **데스크톱**: 상단 GNB 메뉴 우측에 `KR | EN` 버튼 배치.
  - **모바일**: 햄버거 메뉴(☰) 하단에 `KR | EN` 선택 영역 배치.
- **라우팅**:
  - `KR` 클릭 시 -> `/ko` (한국어 버전)
  - `EN` 클릭 시 -> `/` (영어 버전)
- **Vercel 설정**: `vercel.json`을 수정하여 `/ko` 경로가 `ko/index.html`을 정확히 가리키도록 설정했습니다.

## 4. 최종 배포 상태

- **도메인**: 단일 도메인(예: `jcatalog.vercel.app` 또는 `emt.vercel.app`) 하나로 두 언어 버전을 모두 제공합니다.
- **접속 경로**:
  - `도메인/`: 영어 버전 (기본)
  - `도메인/ko`: 한국어 버전

## 5. 검증 (Verification)

- **Language Switcher Check**:
  - 데스크톱 화면에서 `KR | EN` 버튼이 정상적으로 렌더링됨을 확인했습니다.
  - 모바일 뷰포트(375x812)에서도 헤더와 메뉴가 정상 동작함을 확인했습니다.

- **Mobile Layout Fix Verification**:
  - `ko/index.html`의 '오시는 길' (Contact) 섹션을 모바일 해상도에서 확인했습니다.
  - 이전에 보고된 '회색 박스' 문제가 해결되었으며, 배경과 텍스트가 깔끔하게 렌더링됨을 스크린샷으로 검증했습니다.

## 2026-01-19: 제품 상세 정보 동기화 및 다이어그램 좌표 수정

**작업 목표:**
영문 및 국문 E-Catalog의 제품 상세 설명과 스펙을 사용자 요청 데이터와 100% 일치시키고, UI 레이아웃 및 다이어그램 불일치 문제를 해결한다.

**주요 변경 사항:**

1.  **제품 상세 정보 업데이트 (영문/국문 동기화)**
    - **국문 (`ko/index.html`)**:
      - 'Flush Door Handle Control Unit', 'Transmission Control Unit' 상세 정보 및 스펙 수정.
      - 'Smart Electronic Proximity Sensor', 'Smart Keyless Entry', 'HVAC System' 상세 정보 및 스펙 수정.
    - **영문 (`index.html`)**:
      - 액추에이터 4종 ('Digital-Electric Shift', 'AC Motor', 'Fan Clutch', '4WD Geared') 상세 정보 및 스펙 수정.
      - 컨트롤러 5종 상세 정보 및 스펙 수정.

2.  **UI 레이아웃 및 표시 수정**
    - **영문**: 'Hidden Door Handle Actuator' 카드를 숨김 처리하여(`display:none`) 그리드 레이아웃(1줄 5개) 유지.
    - **국문**: 컨트롤러 섹션에 잘못 배치된 'Hidden Door Handle'을 제거하고, 누락되었던 'Flush Door Handle Control Unit' 복구.

3.  **다이어그램 좌표 동기화**
    - 국문 페이지의 'Mobility Products' 다이어그램 내 흰 점 좌표(`diagramConfig`)를 영문 페이지와 동일하게 수정하여 시각적 정렬 맞춤.

**결과:**
모든 제품 설명이 최신 사양으로 업데이트되었으며, 다국어 페이지 간의 레이아웃 및 디자인 요소가 통일됨.
