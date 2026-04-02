---
name: apply-all
description: 모든 전자카탈로그에 변경사항을 일괄 적용하는 오케스트레이터. 여러 에이전트를 병렬 실행하여 동시 업데이트.
---

# Apply All - Multi-Agent Orchestrator

모든 전자 카탈로그에 동일한 변경사항을 일괄 적용하는 오케스트레이션 스킬입니다.

---

## ⚠️ 최우선 지침: 용어 구분 (매우 중요!)

### 🔴 "전체적으로" vs "모든 기업을 대상으로"

**반드시 구분해야 하는 용어:**

1. **"전체적으로"** = **단일 기업 내부**에서만 적용
   - 예: "GENTOP 전체적으로 디자인 수정"
   - 의미: GENTOP 카탈로그 내부의 모든 페이지/컴포넌트
   - 실행: `gentop-agent`만 사용
   - **다른 기업에는 영향 없음** ✅

2. **"모든 기업을 대상으로"** = **모든 카탈로그**에 일괄 적용
   - 예: "모든 기업을 대상으로 한글폰트를 Pretendard로 변경"
   - 의미: GENTOP, HS-TECH, EMT, Hangseong 등 **전부**
   - 실행: `apply-all` 스킬 사용
   - **모든 기업 카탈로그 변경됨** ⚠️

### 📋 명확한 예시

| 사용자 지시 | 해석 | 사용할 스킬 | 영향 범위 |
|------------|------|-----------|----------|
| "GENTOP 전체적으로 배경색 변경" | GENTOP 내부만 | `gentop-agent` | GENTOP만 |
| "HS-TECH 전체적으로 레이아웃 수정" | HS-TECH 내부만 | `hstech-agent` | HS-TECH만 |
| "전체적으로 다크모드로 변경" | **⚠️ 애매함!** | **재확인 필요** | **되물어야 함** |
| "모든 기업을 대상으로 폰트 변경" | 전체 카탈로그 | `apply-all` | 전부 |
| "모든 카탈로그에 새 기능 추가" | 전체 카탈로그 | `apply-all` | 전부 |

### 🚨 중요 규칙

**"전체적으로"라는 단어가 나오면:**
1. **기업명이 명시되어 있는가?**
   - 있음 → 해당 기업 에이전트만 사용
   - 없음 → **사용자에게 되물어야 함!**

2. **애매한 경우 항상 확인:**
   ```
   "전체적으로"라는 표현이 사용되었습니다.
   - 특정 기업(예: GENTOP)만 수정할까요?
   - 아니면 모든 기업 카탈로그를 수정할까요?
   ```

3. **절대 추측하지 말 것!**
   - 잘못된 추측으로 모든 기업 카탈로그가 변경되면 복구 어려움
   - 의심스러우면 **무조건 재확인**

### ✅ 올바른 사용 패턴

```bash
# ❌ 잘못됨 - 애매한 지시
/apply-all "전체적으로 다크모드 적용"

# ✅ 올바름 - 명확한 지시
/apply-all "모든 기업을 대상으로 다크모드 기본값 적용"

# ✅ 올바름 - 단일 기업
/gentop-agent "GENTOP 전체적으로 다크모드 적용"

# ✅ 올바름 - 특정 기업만
/apply-all --targets=gentop,hstech "GENTOP과 HS-TECH만 폰트 변경"
```

---

## 주요 기능

### 1. 병렬 실행 (Parallel Execution)
여러 기업 에이전트를 동시에 실행하여 작업 속도 향상

```
gentop-agent ──┐
hstech-agent ──┤──→ 동시 실행 ──→ 완료
hangseong-agent ┘
```

### 2. 순차 실행 (Sequential Execution)
의존성이 있는 작업을 단계별로 실행

```
Step 1: 모든 카탈로그 데이터 백업
   ↓
Step 2: 공통 컴포넌트 업데이트
   ↓
Step 3: 개별 카탈로그 적용
   ↓
Step 4: 테스트 및 검증
```

### 3. 선택적 적용
특정 카탈로그만 선택하여 적용

```
apply-all --targets=gentop,hstech "다크모드 기본값 적용"
```

## 사용 시나리오

### 전역 테마 변경
```
/apply-all "모든 카탈로그를 다크모드 기본값으로 변경"
```
**실행 순서**:
1. `catalog-utils`로 공통 테마 설정 업데이트
2. 병렬 실행:
   - `gentop-agent` → 테마 적용
   - `hstech-agent` → 테마 적용
   - `hangseong-agent` → 테마 적용
3. 각 카탈로그 빌드 테스트

### 공통 컴포넌트 업데이트
```
/apply-all "모든 푸터에 개인정보처리방침 링크 추가"
```
**실행 순서**:
1. 순차 실행:
   - `catalog-utils`로 Footer 템플릿 생성
   - 각 에이전트에 적용
2. 번역 파일 업데이트 (en/ko)
3. 검증

### 새 기능 일괄 배포
```
/apply-all "모든 카탈로그에 검색 기능 추가"
```
**실행 순서**:
1. `catalog-utils`로 Search 컴포넌트 생성
2. 병렬 실행:
   - 각 에이전트에 컴포넌트 통합
   - 데이터 인덱싱
3. 통합 테스트

### 이미지 최적화
```
/apply-all "모든 제품 이미지를 WebP로 변환하고 최적화"
```
**실행 순서**:
1. 병렬 실행:
   - 각 카탈로그의 이미지 수집
   - WebP 변환 및 압축
   - 경로 업데이트
2. 빌드 크기 확인

## 옵션 시스템

### 타겟 선택
```bash
--targets=gentop,hstech     # 특정 카탈로그만
--exclude=hangseong         # 특정 카탈로그 제외
--all                       # 모든 카탈로그 (기본값)
```

### 실행 모드
```bash
--mode=parallel    # 병렬 실행 (기본값)
--mode=sequential  # 순차 실행
--mode=staged      # 단계별 실행 (테스트 → 적용)
```

### 옵션 전달
```bash
--theme=dark           # 테마 옵션
--lang=en              # 언어 옵션
--nav=true             # 네비게이션 옵션
```

## 워크플로우 패턴

### Pattern 1: 전역 설정 변경
```
1. catalog-utils: 공통 설정 업데이트
2. 병렬: 모든 에이전트에 적용
3. 통합 빌드 및 테스트
```

### Pattern 2: 단계별 마이그레이션
```
1. 순차: 백업 생성
2. 순차: 데이터 마이그레이션
3. 병렬: 각 카탈로그 업데이트
4. 순차: 검증 및 롤백 준비
```

### Pattern 3: 점진적 배포
```
1. gentop-agent: 테스트 배포
2. 검증 완료 후
3. 병렬: hstech-agent, hangseong-agent
```

## 대상 카탈로그

### 현재 지원
- **GENTOP**: `/app/(gentop)/gentop/`
- **HS-TECH**: `/app/templates/hs-tech/`
- **Hangseong**: `/app/templates/hangseong/`

### 향후 추가 예정
- **HS-TECH-KR**: `/app/templates/hs-tech-kr/`
- 기타 신규 카탈로그

## 사용 예시

### 예시 1: 다크모드 일괄 적용
```
/apply-all "모든 카탈로그를 다크모드 기본값으로 설정"
```
**실행**:
- ✅ gentop-agent: `defaultTheme="dark"` 적용
- ✅ hstech-agent: `defaultTheme="dark"` 적용
- ✅ hangseong-agent: `defaultTheme="dark"` 적용

### 예시 2: 영문 우선 언어 설정
```
/apply-all "모든 푸터 기본 언어를 영문으로 변경"
```
**실행**:
- ✅ gentop-agent: `lang = "en"` 설정
- ✅ hstech-agent: `lang = "en"` 설정
- ✅ hangseong-agent: `lang = "en"` 설정

### 예시 3: 네비게이션 추가
```
/apply-all --targets=gentop,hstech "상단 네비게이션 메뉴 추가"
```
**실행**:
- ✅ gentop-agent: 네비게이션 컴포넌트 추가
- ✅ hstech-agent: 네비게이션 컴포넌트 추가
- ⏭️ hangseong-agent: 제외됨

## 에러 처리

### 부분 실패 처리
- 한 에이전트 실패 시 나머지는 계속 실행
- 실패한 에이전트만 재시도 옵션
- 상세 로그 제공

### 롤백 메커니즘
```
/apply-all --rollback   # 마지막 변경사항 되돌리기
```

## 검증 및 테스트

### 자동 검증
1. TypeScript 타입 체크
2. ESLint 검사
3. 빌드 성공 여부
4. 이미지 경로 유효성

### 수동 검증 체크리스트
- [ ] 각 카탈로그 로컬 빌드 성공
- [ ] 다크/라이트 모드 전환 정상 작동
- [ ] 다국어 전환 정상 작동
- [ ] 이미지 로딩 정상
- [ ] 반응형 레이아웃 확인

## 주의사항
- 대규모 변경 전 반드시 백업
- 병렬 실행 시 리소스 사용량 확인
- Git 커밋은 카탈로그별 분리 권장
- 프로덕션 배포 전 스테이징 테스트

## 관련 스킬
- `catalog-utils` - 공통 유틸리티
- `gentop-agent` - GENTOP 카탈로그
- `hstech-agent` - HS-TECH 카탈로그
- `hangseong-agent` - Hangseong 카탈로그

## 성능 최적화
- 병렬 실행으로 3배 속도 향상 (3개 카탈로그 기준)
- 공통 작업은 한 번만 실행
- 캐시 활용으로 중복 작업 방지
