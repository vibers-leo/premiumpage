import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

// 코멘트 추가
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireSession()
    const { id } = await params
    const { content, attachmentUrl } = await req.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: '내용을 입력해주세요.' }, { status: 400 })
    }

    // 주문 소유자 또는 어드민만 코멘트 가능
    const order = await prisma.pmOrder.findFirst({
      where: session.role === 'admin' ? { id } : { id, userId: session.id },
    })
    if (!order) {
      return NextResponse.json({ error: '주문을 찾을 수 없습니다.' }, { status: 404 })
    }

    const comment = await prisma.pmOrderComment.create({
      data: {
        orderId: id,
        userId: session.id,
        content: content.trim(),
        attachmentUrl,
        isInternal: false,
      },
      include: { user: { select: { id: true, name: true, avatarUrl: true, role: true } } },
    })

    return NextResponse.json({ comment }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
