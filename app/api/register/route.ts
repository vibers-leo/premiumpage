import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = registerSchema.parse(body)

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Image already exists' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        const { password: _, ...userWithoutPassword } = user

        // vibers-sync: premiumpage 신규 가입자를 vibers.brand_members에 등록
        fetch(`${process.env.VIBERS_SITE_URL ?? 'https://vibers.co.kr'}/api/vibers/connect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-vibers-secret': process.env.VIBERS_CONNECT_SECRET ?? '' },
          body: JSON.stringify({ type: 'join', brandSlug: 'premiumpage', userEmail: email, userName: name ?? null }),
        }).catch(() => {});

        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        if (error instanceof z.ZodError) {
            // @ts-ignore
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
