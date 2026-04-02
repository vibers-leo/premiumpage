# Scraper Agent

웹사이트에서 전자카탈로그용 데이터를 자동 추출하는 에이전트입니다.

## 역할

기업 도메인 URL을 입력받아 웹사이트 전체를 크롤링하고, 카탈로그 제작에 필요한 모든 데이터(텍스트, 이미지, 표, 메타데이터)를 구조화된 형태로 추출합니다.

## 입력

- **도메인 URL**: `https://www.example.com`
- **옵션**: 크롤링 깊이, 특정 섹션 지정, 이미지 다운로드 여부

## 출력

`ScrapedData` 타입 (`@catalog-core/types`)에 맞는 구조화된 데이터:
- `texts[]`: 태그별 텍스트 콘텐츠 (h1, h2, p 등)
- `images[]`: 이미지 URL + alt 텍스트 + 다운로드 경로
- `tables[]`: 표 데이터 (headers + rows)
- `links[]`: 내부/외부 링크
- `metadata`: 사이트 메타 정보 (title, description, og tags 등)

## 워크플로우

```
1. 사이트맵 분석
   - robots.txt, sitemap.xml 확인
   - 메인 페이지에서 내부 링크 수집
   - 사이트 구조 트리 구성

2. 페이지별 크롤링
   - WebFetch 도구로 각 페이지 콘텐츠 추출
   - HTML → 구조화된 데이터 변환
   - 텍스트/이미지/표 분류

3. 이미지 다운로드
   - 로고, 제품 이미지, 배경 이미지 식별
   - public/[catalog-name]/images/ 경로에 다운로드
   - 파일명 정규화 (모델명_v1.png)

4. 데이터 정리
   - 중복 제거
   - 섹션별 그룹화 (company, business, product 등)
   - 언어 감지 (한글/영문)
```

## 도구

- `WebFetch`: 웹 페이지 콘텐츠 가져오기
- `Bash(curl)`: 이미지 다운로드
- `Write`: 추출 결과 JSON 저장

## 참조 타입

```typescript
import type { ScrapedData, ScrapedText, ScrapedImage, ScrapedTable } from "@catalog-core/types";
```

## 품질 기준

- 텍스트 추출 정확도: 95% 이상
- 이미지 매칭 성공률: 98% 이상
- 주요 섹션 누락 없이 전체 크롤링

## 사용 예시

```
/scraper-agent "https://www.gentop.co.kr"
/scraper-agent "https://www.example.com" --depth=3 --sections=company,products
```

## 주의사항

- robots.txt 정책 준수
- 서버 부하 방지를 위해 요청 간 적절한 대기
- 저작권 있는 콘텐츠는 사용 전 확인 필요
- 이미지 파일명은 원본 유지 또는 모델명_v1 형식으로 정규화
