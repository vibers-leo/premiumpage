# OAuth 리다이렉트 URI 등록 가이드

## Google
1. https://console.cloud.google.com → 프로젝트 선택 (vibers-home과 동일)
2. APIs & Services → Credentials → OAuth 2.0 Client IDs 클릭
3. **승인된 리다이렉트 URI** 에 추가:
   ```
   https://premiumpage.kr/api/portal/auth/callback/google
   ```

## Naver
1. https://developers.naver.com/apps → 앱 선택
2. API 설정 → **Callback URL** 에 추가:
   ```
   https://premiumpage.kr/api/portal/auth/callback/naver
   ```

## Kakao
1. https://developers.kakao.com → 앱 선택
2. 카카오 로그인 → **Redirect URI** 에 추가:
   ```
   https://premiumpage.kr/api/portal/auth/callback/kakao
   ```
3. 동의항목에서 **이메일** 필수 동의 설정

## 확인 방법
등록 후 https://premiumpage.kr/portal/login 에서 각 소셜 버튼 클릭 → 정상 로그인 확인
