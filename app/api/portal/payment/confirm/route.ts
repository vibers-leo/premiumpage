import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

const TOSS_SECRET = process.env.TOSS_SECRET_KEY!

export async function POST(req: Request) {
  try {
    const session = await requireSession()
    const { paymentKey, orderId, amount } = await req.json()

    // Toss 결제 승인
    const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${TOSS_SECRET}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })

    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    // 주문 결제 완료 처리
    const order = await prisma.pmOrder.findFirst({
      where: { tossOrderId: orderId, userId: session.id },
    })

    if (order) {
      await prisma.pmOrder.update({
        where: { id: order.id },
        data: {
          tossPaymentKey: paymentKey,
          paidAt: new Date(),
          status: order.status === 'pending' ? 'accepted' : order.status,
        },
      })
    }

    return NextResponse.json({ success: true, orderId: order?.id })
  } catch {
    return NextResponse.json({ error: '결제 확인 실패' }, { status: 500 })
  }
}
