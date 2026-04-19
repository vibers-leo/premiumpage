import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'premiumpage-portal-secret-key'
)
const COOKIE_NAME = 'pp_session'
const TOKEN_EXPIRY = '7d'

export interface SessionUser {
  id: string
  email: string
  name: string | null
  role: string
  companyName: string | null
  avatarUrl: string | null
}

// ── JWT 생성/검증 ──

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(TOKEN_EXPIRY)
    .setIssuedAt()
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return token
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return (payload as any).user as SessionUser
  } catch {
    return null
  }
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireSession()
  if (session.role !== 'admin') throw new Error('Forbidden')
  return session
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

// ── 이메일 로그인 ──

export async function loginWithEmail(email: string, password: string): Promise<SessionUser | null> {
  const user = await prisma.pmUser.findUnique({ where: { email } })
  if (!user || !user.passwordHash || !user.isActive) return null

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return null

  await prisma.pmUser.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  })

  return toSessionUser(user)
}

// ── 회원가입 ──

export async function registerWithEmail(
  email: string,
  password: string,
  name: string,
  companyName?: string,
  phone?: string,
): Promise<SessionUser> {
  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.pmUser.create({
    data: {
      email,
      passwordHash: hash,
      name,
      companyName,
      phone,
    },
  })
  return toSessionUser(user)
}

// ── 소셜 로그인 (upsert) ──

export async function loginWithSocial(
  provider: string,
  providerId: string,
  email: string,
  name: string | null,
  avatarUrl: string | null,
): Promise<SessionUser> {
  // 1. social_accounts에서 기존 연동 확인
  const existing = await prisma.pmSocialAccount.findUnique({
    where: { provider_providerId: { provider, providerId } },
    include: { user: true },
  })

  if (existing) {
    // 기존 유저 → 로그인 처리
    await prisma.pmUser.update({
      where: { id: existing.userId },
      data: {
        lastLogin: new Date(),
        ...(avatarUrl && !existing.user.avatarUrl ? { avatarUrl } : {}),
      },
    })
    return toSessionUser(existing.user)
  }

  // 2. 이메일로 기존 유저 확인 → 소셜 계정 연동
  let user = await prisma.pmUser.findUnique({ where: { email } })

  if (user) {
    await prisma.pmSocialAccount.create({
      data: { userId: user.id, provider, providerId },
    })
    await prisma.pmUser.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        ...(avatarUrl && !user.avatarUrl ? { avatarUrl } : {}),
        ...(!user.name && name ? { name } : {}),
      },
    })
  } else {
    // 3. 완전 신규 → 유저 + 소셜 계정 생성
    user = await prisma.pmUser.create({
      data: {
        email,
        name,
        avatarUrl,
        lastLogin: new Date(),
        socialAccounts: {
          create: { provider, providerId },
        },
      },
    })
  }

  return toSessionUser(user)
}

// ── 헬퍼 ──

function toSessionUser(user: any): SessionUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    companyName: user.companyName,
    avatarUrl: user.avatarUrl,
  }
}
