import { NextResponse } from 'next/server'
import { exchangeNaverCode } from '@/lib/oauth'
import { loginWithSocial, createSession } from '@/lib/portal-auth'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (!code || !state) return NextResponse.redirect(new URL('/portal/login?error=no_code', req.url))

  const profile = await exchangeNaverCode(code, state)
  if (!profile) return NextResponse.redirect(new URL('/portal/login?error=naver_failed', req.url))

  const user = await loginWithSocial('naver', profile.sub, profile.email, profile.name, profile.picture)
  await createSession(user)
  return NextResponse.redirect(new URL('/portal', req.url))
}
