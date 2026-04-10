import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  try {
    const link = await prisma.pmPaymentLink.findUnique({ where: { token } })

    if (!link) {
      return NextResponse.json({ error: '유효하지 않은 결제 링크입니다.' }, { status: 404 })
    }

    if (link.expiresAt && link.expiresAt < new Date()) {
      return NextResponse.json({ error: '만료된 결제 링크입니다.' }, { status: 410 })
    }

    return NextResponse.json({
      id: link.id,
      token: link.token,
      amount: link.amount,
      orderName: link.orderName,
      customerName: link.customerName,
      customerEmail: link.customerEmail,
      status: link.status,
      expiresAt: link.expiresAt,
    })
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
