import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

// 주문 상세 (어드민)
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params

    const order = await prisma.pmOrder.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, companyName: true, phone: true } },
        product: true,
        comments: {
          include: { user: { select: { id: true, name: true, avatarUrl: true, role: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ order })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}

// 주문 상태/정보 변경
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireAdmin()
    const { id } = await params
    const body = await req.json()

    const updateData: any = {}
    if (body.status) updateData.status = body.status
    if (body.startedAt) updateData.startedAt = new Date(body.startedAt)
    if (body.completedAt) updateData.completedAt = new Date(body.completedAt)
    if (body.deadline) updateData.deadline = new Date(body.deadline)
    if (body.adminNote !== undefined) updateData.adminNote = body.adminNote
    if (body.amount !== undefined) updateData.amount = body.amount

    // 상태 변경 시 자동 날짜 설정
    if (body.status === 'in_progress' && !body.startedAt) {
      updateData.startedAt = new Date()
    }
    if (body.status === 'completed' && !body.completedAt) {
      updateData.completedAt = new Date()
    }

    const order = await prisma.pmOrder.update({
      where: { id },
      data: updateData,
    })

    // 상태 변경 시 내부 코멘트 자동 추가
    if (body.status) {
      await prisma.pmOrderComment.create({
        data: {
          orderId: id,
          userId: admin.id,
          content: `상태가 "${statusLabel(body.status)}"(으)로 변경되었습니다.`,
          isInternal: false,
        },
      })
    }

    return NextResponse.json({ order })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    pending: '대기중', accepted: '수락됨', in_progress: '진행중',
    review: '검토중', revision: '수정요청', completed: '완료', cancelled: '취소',
  }
  return map[s] || s
}
