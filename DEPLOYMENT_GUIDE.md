# Vercel 수동 배포 가이드

## 방법 1: Dashboard에서 Redeploy

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard

2. **premiumpage 프로젝트 선택**

3. **Deployments 탭으로 이동**

4. **최신 배포 찾기**
   - 가장 최근 배포 (commit: 23ec182)

5. **세 점 메뉴 클릭 → "Redeploy" 선택**
   - "Use existing Build Cache" 체크 해제 ← 중요!

6. **배포 시작**

## 방법 2: GitHub에서 자동 배포 트리거 확인

1. **GitHub Settings 확인**
   - https://github.com/juuuno-coder/premiumpage/settings/hooks

2. **Vercel Webhook 확인**
   - Vercel webhook이 있는지 확인
   - 없으면 Vercel에서 GitHub 연동 재설정 필요

3. **Vercel 프로젝트 Settings**
   - https://vercel.com → premiumpage → Settings → Git
   - "Production Branch"가 "main"으로 설정되어 있는지 확인
   - "Automatically Deploy" 활성화 확인

## 방법 3: Vercel CLI 설치 후 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 프로젝트 연결
vercel link

# 프로덕션 배포
vercel --prod
```

## 확인 사항

배포 후 다음 URL에서 이미지 확인:
- https://gentop.premiumpage.kr
- https://gentop.premiumpage.kr/en/company/greeting
- https://gentop.premiumpage.kr/en/company/global_network
