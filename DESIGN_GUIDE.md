# Premiumpage 디자인 가이드

## 색상 시스템

### 라이트 모드 (기본)
| 토큰 | HSL 값 | 용도 |
|------|---------|------|
| `--background` | `0 0% 100%` | 배경 |
| `--foreground` | `0 0% 3.9%` | 텍스트 |
| `--card` | `0 0% 100%` | 카드 배경 |
| `--primary` | `0 0% 9%` | 주요 액션 |
| `--secondary` | `0 0% 96.1%` | 보조 요소 |
| `--muted` | `0 0% 96.1%` | 비활성/보조 텍스트 |
| `--accent` | `0 0% 96.1%` | 강조 배경 |
| `--border` | `0 0% 89.8%` | 테두리 |
| `--destructive` | `0 84.2% 60.2%` | 삭제/경고 |

### 다크 모드
| 토큰 | HSL 값 | 용도 |
|------|---------|------|
| `--background` | `0 0% 0%` | 배경 |
| `--foreground` | `0 0% 100%` | 텍스트 |
| `--card` | `0 0% 3.9%` | 카드 배경 |
| `--primary` | `0 0% 98%` | 주요 액션 |
| `--secondary` | `0 0% 14.9%` | 보조 요소 |
| `--muted` | `0 0% 14.9%` | 비활성 영역 |
| `--border` | `0 0% 14.9%` | 테두리 |

### 브랜드 색상
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-primary-500` | `#a855f7` | 기본 보라 |
| `--color-primary-600` | `#9333ea` | 호버 보라 |
| `--color-primary-700` | `#7e22ce` | 액티브 보라 |
| 그라디언트 | `#a855f7 → #ec4899 → #06b6d4` | 텍스트 그라디언트 |

## 타이포그래피

### 폰트 패밀리
- **기본 (sans):** Inter, Pretendard, system-ui, -apple-system, sans-serif
- **tailwind 설정:** `fontFamily.sans` = `-apple-system, BlinkMacSystemFont, Segoe UI, Noto Sans KR, sans-serif`

### 레거시 유틸리티
| 클래스 | 크기 | 굵기 | 용도 |
|--------|------|------|------|
| `.imweb-heading-1` | 3.5rem | 900 | 메인 히어로 제목 |
| `.imweb-body-lg` | 1.25rem | - | 본문 큰 글씨 |

## 레이아웃

### 컨테이너
- `.imweb-container`: max-width 1200px, 좌우 패딩 1rem, 자동 가운데 정렬

### Border Radius
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--radius` | `0.5rem` | 기본값 |
| `lg` | `var(--radius)` | 큰 라운딩 |
| `md` | `calc(var(--radius) - 2px)` | 중간 |
| `sm` | `calc(var(--radius) - 4px)` | 작은 |

## 유틸리티 클래스

### 커스텀 유틸리티
| 클래스 | 효과 |
|--------|------|
| `.gradient-text` | 보라-핑크-시안 그라디언트 텍스트 |
| `.glass-card` | 글래스모피즘 카드 (blur 24px, 반투명 배경) |
| `.neon-border` | 보라색 네온 테두리 + 그림자 |
| `.scrollbar-hide` | 스크롤바 숨김 (전 브라우저 대응) |

### 버튼 스타일
| 클래스 | 스타일 |
|--------|--------|
| `.imweb-btn` | 기본 버튼 (pill 형태, 패딩 1rem 2.5rem) |
| `.imweb-btn-primary` | 전경색 배경 + 배경색 텍스트 |

### 인풋 스타일
- `.imweb-input`: 배경색 배경, 테두리 1px, 라운딩 0.5rem
- 다크모드에서 반투명 흰색 배경
- 포커스 시 보라색 테두리 + 그림자

## 애니메이션
| 이름 | 설정 | 용도 |
|------|------|------|
| `aurora` | 60초 linear infinite | 배경 오로라 효과 |

## 다크모드 전환
- `darkMode: "class"` (tailwind 설정)
- `@variant dark` 사용
- body 전환 애니메이션: `transition: 0.3s ease`
