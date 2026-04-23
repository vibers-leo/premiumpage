import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

// 주문에 대한 Toss 결제 준비
export async function POST(req: Request) {
  try {
    const session = await requireSession()
    const { orderId } = await req.json()

    const order = await prisma.pmOrder.findFirst({
      where: { id: orderId, userId: session.id },
      include: { product: true },
    })

    if (!order) {
      return NextResponse.json({ error: '주문을 찾을 수 없습니다.' }, { status: 404 })
    }
    if (order.amount <= 0) {
      return NextResponse.json({ error: '결제 금액이 설정되지 않았습니다.' }, { status: 400 })
    }
    if (order.paidAt) {
      return NextResponse.json({ error: '이미 결제된 주문입니다.' }, { status: 400 })
    }

    const tossOrderId = `pp_${Date.now()}_${randomUUID().slice(0, 8)}`

    await prisma.pmOrder.update({
      where: { id: orderId },
      data: { tossOrderId },
    })

    return NextResponse.json({
      orderId: tossOrderId,
      amount: order.amount,
      orderName: order.title,
      customerName: session.name || session.companyName || session.email,
      customerEmail: session.email,
    })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
