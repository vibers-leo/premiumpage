import { NextResponse } from 'next/server'
import { loginWithEmail, createSession } from '@/lib/portal-auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 })
    }

    const user = await loginWithEmail(email, password)
    if (!user) {
      return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 })
    }

    await createSession(user)
    return NextResponse.json({ user })
  } catch (e: any) {
    return NextResponse.json({ error: '로그인 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
