import { NextResponse } from 'next/server'
import { exchangeGoogleCode } from '@/lib/oauth'
import { loginWithSocial, createSession } from '@/lib/portal-auth'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) return NextResponse.redirect(new URL('/portal/login?error=no_code', req.url))

  const profile = await exchangeGoogleCode(code)
  if (!profile) return NextResponse.redirect(new URL('/portal/login?error=google_failed', req.url))

  const user = await loginWithSocial('google', profile.sub, profile.email, profile.name, profile.picture)
  await createSession(user)
  return NextResponse.redirect(new URL('/portal', req.url))
}
