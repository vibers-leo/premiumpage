# Premium Page - 환경 설정 가이드

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
cd /Users/admin/Desktop/premium-page/frontend
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```bash
# 데이터베이스
DATABASE_URL="file:./dev.db"

# 애플리케이션 URL
NEXT_PUBLIC_APP_URL="http://localhost:3001"

# SMTP 이메일 설정 (선택사항)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@premiumpage.com"

# Stripe 결제 (선택사항)
# STRIPE_SECRET_KEY="sk_test_..."
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# 토스페이먼츠 (선택사항)
# TOSS_CLIENT_KEY="test_ck_..."
# TOSS_SECRET_KEY="test_sk_..."
```

### 3. 데이터베이스 초기화
```bash
npx prisma generate
npx prisma db push
```

### 4. 개발 서버 실행
```bash
npm run dev
```

서버가 http://localhost:3001 에서 실행됩니다.

---

## 📧 Gmail SMTP 설정 방법

1. **Gmail 계정 설정**
   - Gmail 계정 → 설정 → 보안

2. **2단계 인증 활성화**
   - 보안 → 2단계 인증 → 사용 설정

3. **앱 비밀번호 생성**
   - 보안 → 앱 비밀번호
   - "메일" 선택 → "기타" 선택
   - 이름 입력 (예: Premium Page)
   - 생성된 16자리 비밀번호 복사

4. **.env.local에 추가**
   ```bash
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="생성된 16자리 비밀번호"
   ```

---

## 💳 Stripe 설정 방법

1. **Stripe 계정 생성**
   - https://stripe.com 가입
   - 대시보드 접속

2. **API 키 발급**
   - 개발자 → API 키
   - 테스트 모드 확인
   - "비밀 키" 복사 (sk_test_로 시작)
   - "공개 가능 키" 복사 (pk_test_로 시작)

3. **.env.local에 추가**
   ```bash
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

---

## 🏦 토스페이먼츠 설정 방법

1. **토스페이먼츠 가입**
   - https://www.tosspayments.com 가입
   - 개발자센터 접속

2. **API 키 발급**
   - 개발자센터 → API 키 관리
   - 테스트 키 발급
   - 클라이언트 키 복사
   - 시크릿 키 복사

3. **.env.local에 추가**
   ```bash
   TOSS_CLIENT_KEY="test_ck_..."
   TOSS_SECRET_KEY="test_sk_..."
   ```

---

## 🔧 프로덕션 배포

### Vercel 배포 (권장)

1. **Vercel 계정 생성**
   - https://vercel.com 가입

2. **프로젝트 연결**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **환경 변수 설정**
   - Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
   - .env.local의 모든 변수 추가

4. **배포**
   ```bash
   vercel --prod
   ```

### Docker 배포

1. **Dockerfile 생성** (이미 있음)

2. **이미지 빌드**
   ```bash
   docker build -t premium-page .
   ```

3. **컨테이너 실행**
   ```bash
   docker run -p 3000:3000 --env-file .env.local premium-page
   ```

---

## 📊 데이터베이스 마이그레이션

### SQLite (개발)
```bash
npx prisma db push
```

### PostgreSQL (프로덕션)
1. **.env.local 수정**
   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   ```

2. **마이그레이션 실행**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

---

## 🐛 문제 해결

### 포트 충돌
```bash
# 다른 포트로 실행
PORT=3002 npm run dev
```

### 캐시 문제
```bash
# Next.js 캐시 삭제
rm -rf .next
npm run dev
```

### 패키지 문제
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 지원

문제가 발생하면:
- 📧 Email: info@premiumpage.com
- 📱 Phone: 02-1234-5678
- 📚 Documentation: README.md
