import { NextResponse } from 'next/server'
import { registerWithEmail, createSession } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, password, name, companyName, phone } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: '비밀번호는 6자 이상이어야 합니다.' }, { status: 400 })
    }

    const existing = await prisma.pmUser.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 409 })
    }

    const user = await registerWithEmail(email, password, name, companyName, phone)
    await createSession(user)
    return NextResponse.json({ user }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: '회원가입 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
