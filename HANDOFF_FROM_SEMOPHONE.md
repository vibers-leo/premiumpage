# 네이버 플레이스 파싱 API 개발 요청

> 세모폰(semophone) 프로젝트에서 전달 — 2026-04-12

## 배경
세모폰 프로젝트에서 매장 상세 모달에 네이버 플레이스 정보를 표시하고 싶음.
현재 40개 매장의 네이버 플레이스 검색 링크가 있고, 이 데이터를 API로 제공받으려 함.

## 요청사항
모노페이지에 네이버 플레이스 URL을 입력하면 해당 매장 정보를 파싱하여 API로 제공하는 기능 개발.

### 입력
- 네이버 플레이스 URL (예: `https://map.naver.com/p/search/휴대폰성지 세모폰 광명6동점`)
- 또는 네이버 플레이스 ID (예: `1589313355`)

### 출력 (API 응답)
```json
{
  "name": "휴대폰성지 세모폰 광명6동점",
  "address": "경기도 광명시 광명로 824 1층",
  "phone": "031-XXX-XXXX",
  "category": "휴대폰판매",
  "businessHours": "10:00~21:00",
  "images": ["url1", "url2"],
  "rating": 4.5,
  "reviewCount": 23,
  "description": "...",
  "placeId": "1589313355",
  "placeUrl": "https://map.naver.com/p/entry/place/1589313355"
}
```

### 활용 계획
1. **모노페이지 자체**: 플레이스 URL → 바이오프로필(링크트리) 자동 생성
2. **세모폰**: API 호출 → 매장 상세 모달에 플레이스 스타일 UI 표시
3. **팬이지/야화**: 점포 소개에 동일 API 활용
4. **B2B SaaS**: 외부 고객에게 API 라이선스 판매

### 기술 요구사항
- NCP Docker에서 서빙 (Vercel Function 과금 회피)
- API Key 인증 (프로젝트별 키 발급)
- 향후 MCP 서버로도 제공 가능하도록 설계
- AI레시피 구독 API와 동일한 Provider-Consumer 패턴

### 아키텍처 참고
```
모노페이지 (Provider) — NCP Docker
  ├── REST API: /api/place?url=... or /api/place?id=...
  └── (향후) MCP 서버: 플레이스 데이터 도구

세모폰 (Consumer) — NCP Docker (같은 서버)
  └── 매장 상세 모달에서 172.17.0.1:{port}/api/place 호출

팬이지/야화 (Consumer)
  └── 점포 소개에 동일 API 활용
```

### 수익 모델
- 내부 프로젝트: 무료 (NCP 내부 통신)
- 외부 고객: API 라이선스 판매 (B2B SaaS)
- AI레시피 구독 서비스와 동일한 Provider-Consumer 패턴
