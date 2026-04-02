# Premium Page - 배포 가이드

## 🚀 Vercel 배포 (권장)

### 1단계: Vercel 계정 준비
1. https://vercel.com 가입
2. GitHub 계정 연결

### 2단계: 프로젝트 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 디렉토리에서 실행
cd /Users/admin/Desktop/premium-page/frontend
vercel
```

### 3단계: 환경 변수 설정
Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Environment Variables
3. 다음 변수들 추가:

```
DATABASE_URL=your-production-database-url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@premiumpage.com
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 4단계: 프로덕션 배포
```bash
vercel --prod
```

---

## 🐳 Docker 배포

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 빌드 및 실행
```bash
# 이미지 빌드
docker build -t premium-page .

# 컨테이너 실행
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e SMTP_HOST="smtp.gmail.com" \
  -e SMTP_USER="your-email@gmail.com" \
  -e SMTP_PASS="your-password" \
  premium-page
```

---

## ☁️ AWS 배포

### EC2 배포
```bash
# 1. EC2 인스턴스 생성 (Ubuntu 22.04)
# 2. SSH 접속
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Node.js 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. 프로젝트 클론
git clone your-repo-url
cd premium-page/frontend

# 5. 의존성 설치
npm install

# 6. 환경 변수 설정
nano .env.local
# 필요한 환경 변수 입력

# 7. 빌드
npm run build

# 8. PM2로 실행
npm install -g pm2
pm2 start npm --name "premium-page" -- start
pm2 save
pm2 startup
```

---

## 🌐 Netlify 배포

### 1단계: netlify.toml 생성
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2단계: 배포
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 배포
netlify deploy --prod
```

---

## 📊 데이터베이스 설정

### PostgreSQL (프로덕션 권장)

#### Supabase 사용
1. https://supabase.com 가입
2. 새 프로젝트 생성
3. Database URL 복사
4. 환경 변수에 추가:
```bash
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
```

#### Railway 사용
1. https://railway.app 가입
2. PostgreSQL 추가
3. Connection URL 복사
4. 환경 변수에 추가

---

## 🔒 보안 체크리스트

- [ ] 환경 변수 설정 완료
- [ ] HTTPS 인증서 설정
- [ ] CORS 설정 확인
- [ ] Rate limiting 설정
- [ ] 데이터베이스 백업 설정
- [ ] 에러 로깅 설정 (Sentry 등)
- [ ] 모니터링 설정 (Vercel Analytics 등)

---

## 📈 성능 최적화

### CDN 설정
- Vercel: 자동으로 CDN 제공
- Cloudflare: 추가 CDN 레이어

### 이미지 최적화
- Next.js Image 컴포넌트 사용 (이미 적용됨)
- WebP/AVIF 자동 변환 (이미 적용됨)

### 캐싱 전략
- Static 파일: 1년 캐시
- API 응답: 적절한 Cache-Control 헤더

---

## 🔍 모니터링

### Vercel Analytics
```bash
# package.json에 추가
npm install @vercel/analytics
```

### Sentry (에러 추적)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## 📞 배포 후 체크리스트

- [ ] 메인 페이지 로딩 확인
- [ ] 견적 요청 폼 작동 확인
- [ ] 이메일 발송 테스트
- [ ] 모바일 반응형 확인
- [ ] SEO 메타 태그 확인
- [ ] 성능 점수 확인 (Lighthouse)
- [ ] 보안 헤더 확인

---

**배포 완료 후 서비스 시작! 🎉**
