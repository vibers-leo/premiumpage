import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

// 주문 상세 (+ 코멘트)
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireSession()
    const { id } = await params

    const order = await prisma.pmOrder.findFirst({
      where: { id, userId: session.id },
      include: {
        product: true,
        comments: {
          where: session.role === 'admin' ? {} : { isInternal: false },
          include: { user: { select: { id: true, name: true, avatarUrl: true, role: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: '주문을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
