# Premium Page - 프리미엄 웹사이트 제작 플랫폼

프리미엄 웹사이트 제작을 위한 최신 Next.js 기반 플랫폼입니다.

## 🚀 주요 기능

- ✅ **23개의 전문 템플릿** - Artist, Small Business, SME 카테고리
- ✅ **다단계 견적 요청 시스템** - 파일 업로드, 자동 저장 지원
- ✅ **라이브 프리뷰** - 반응형 템플릿 미리보기
- ✅ **템플릿 비교** - 최대 3개 템플릿 동시 비교
- ✅ **포트폴리오 갤러리** - 성공 사례 쇼케이스
- ✅ **고객 후기** - 실제 고객 리뷰
- ✅ **FAQ 시스템** - 검색 가능한 자주 묻는 질문
- ✅ **이메일 알림** - 견적 확인 및 관리자 알림
- ✅ **결제 시스템** - Stripe/토스페이먼츠 준비

## 🛠 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **UI Components**: Radix UI, Lucide React
- **Backend**: Prisma, SQLite
- **Email**: Nodemailer
- **Payment**: Stripe (준비)

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🔧 환경 설정

`.env.example` 파일을 `.env.local`로 복사하고 필요한 환경 변수를 설정하세요:

```bash
# 데이터베이스
DATABASE_URL="file:./dev.db"

# SMTP 이메일 (선택사항)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# 결제 (선택사항)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## 📁 프로젝트 구조

```
frontend/
├── app/                    # Next.js 앱 라우터
│   ├── api/               # API 라우트
│   ├── quote/             # 견적 요청 페이지
│   ├── templates/         # 템플릿 상세 페이지
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   ├── ui/               # UI 기본 컴포넌트
│   ├── AnimatedSection.tsx
│   ├── FAQ.tsx
│   ├── FileUpload.tsx
│   ├── MobileNav.tsx
│   ├── Portfolio.tsx
│   ├── RelatedTemplates.tsx
│   ├── TemplateComparison.tsx
│   ├── TemplatePreview.tsx
│   └── Testimonials.tsx
├── lib/                   # 유틸리티 함수
│   ├── data.ts           # 목 데이터
│   ├── email.ts          # 이메일 서비스
│   ├── payment.ts        # 결제 유틸리티
│   ├── prisma.ts         # Prisma 클라이언트
│   └── seo.ts            # SEO 설정
├── hooks/                 # Custom Hooks
│   └── useScrollAnimation.ts
├── prisma/               # Prisma 스키마
│   └── schema.prisma
└── public/               # 정적 파일
    └── images/           # 이미지 파일
```

## 🎨 디자인 시스템

- **글래스모피즘**: 반투명 배경과 블러 효과
- **네온 글로우**: 생동감 있는 발광 효과
- **그라디언트**: Purple → Pink → Cyan 컬러 시스템
- **3D 효과**: 입체감 있는 카드 호버 효과
- **애니메이션**: Framer Motion 기반 부드러운 전환

## 📱 반응형 디자인

- **모바일**: 375px 이상
- **태블릿**: 768px 이상
- **데스크톱**: 1024px 이상
- **와이드**: 1920px 이상

## 🔐 보안

- HTTPS 강제
- XSS 방지
- CSRF 토큰
- SQL Injection 방지 (Prisma)
- 파일 업로드 검증

## 📈 성능 최적화

- 이미지 최적화 (WebP, AVIF)
- 코드 스플리팅
- 동적 import
- 캐싱 전략
- SEO 최적화

## 🚀 배포

```bash
# Vercel 배포
vercel

# 또는 Docker
docker build -t premium-page .
docker run -p 3000:3000 premium-page
```

## 📄 라이선스

MIT License

## 👥 팀

Premium Page Development Team

## 📞 문의

- Email: info@premiumpage.com
- Phone: 02-1234-5678
- Website: https://premiumpage.com
# Force rebuild Mon Feb 23 08:36:38 KST 2026
