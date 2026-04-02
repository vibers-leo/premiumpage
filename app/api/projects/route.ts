import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: '로그인이 필요합니다.' },
                { status: 401 }
            )
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        return NextResponse.json(
            { error: '프로젝트를 가져오는 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
