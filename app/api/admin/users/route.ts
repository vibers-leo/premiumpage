import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const session = await auth()

        // Admin 권한 체크
        if (!session?.user || session.user.role !== 'admin') {
            return NextResponse.json(
                { error: '접근 권한이 없습니다.' },
                { status: 403 }
            )
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                _count: {
                    select: { projects: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(users)
    } catch (error) {
        console.error('Failed to fetch users:', error)
        return NextResponse.json(
            { error: '사용자 목록을 가져오는 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user || session.user.role !== 'admin') {
            return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
        }

        const body = await request.json()
        const { userId, role } = body

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.json({ error: '권한 변경 실패' }, { status: 500 })
    }
}
