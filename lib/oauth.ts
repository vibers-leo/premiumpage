const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://premiumpage.kr'

// ── Google ──
export function getGoogleAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${SITE_URL}/api/portal/auth/callback/google`,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}

export async function exchangeGoogleCode(code: string) {
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${SITE_URL}/api/portal/auth/callback/google`,
        grant_type: 'authorization_code',
      }),
    })
    const t = await tokenRes.json()
    if (!t.access_token) return null

    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${t.access_token}` },
    })
    const u = await userRes.json()
    return { email: u.email, name: u.name, picture: u.picture, sub: u.sub, provider: 'google' as const }
  } catch { return null }
}

// ── Naver ──
export function getNaverAuthUrl() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NAVER_CLIENT_ID!,
    redirect_uri: `${SITE_URL}/api/portal/auth/callback/naver`,
    state: Math.random().toString(36).slice(2),
  })
  return `https://nid.naver.com/oauth2.0/authorize?${params}`
}

export async function exchangeNaverCode(code: string, state: string) {
  try {
    const tokenRes = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NAVER_CLIENT_ID!,
        client_secret: process.env.NAVER_CLIENT_SECRET!,
        redirect_uri: `${SITE_URL}/api/portal/auth/callback/naver`,
        code,
        state,
      }),
    })
    const t = await tokenRes.json()
    if (!t.access_token) return null

    const userRes = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${t.access_token}` },
    })
    const r = (await userRes.json()).response
    if (!r) return null
    return { email: r.email, name: r.name, picture: r.profile_image, sub: `naver_${r.id}`, provider: 'naver' as const }
  } catch { return null }
}

// ── Kakao ──
export function getKakaoAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri: `${SITE_URL}/api/portal/auth/callback/kakao`,
    response_type: 'code',
  })
  return `https://kauth.kakao.com/oauth/authorize?${params}`
}

export async function exchangeKakaoCode(code: string) {
  try {
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID!,
        client_secret: process.env.KAKAO_CLIENT_SECRET ?? '',
        redirect_uri: `${SITE_URL}/api/portal/auth/callback/kakao`,
        code,
      }),
    })
    const t = await tokenRes.json()
    if (!t.access_token) return null

    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${t.access_token}` },
    })
    const u = await userRes.json()
    const profile = u.kakao_account?.profile
    const email = u.kakao_account?.email ?? `kakao_${u.id}@kakao.local`
    return {
      email,
      name: profile?.nickname ?? '카카오 사용자',
      picture: profile?.profile_image_url ?? '',
      sub: `kakao_${u.id}`,
      provider: 'kakao' as const,
    }
  } catch { return null }
}
