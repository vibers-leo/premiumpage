import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const links = await prisma.pmPaymentLink.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(links)
  } catch {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { amount, orderName, customerName, customerEmail, memo, expiresAt } = await req.json()

    if (!amount || !orderName) {
      return NextResponse.json({ error: '금액과 주문명은 필수입니다.' }, { status: 400 })
    }

    const link = await prisma.pmPaymentLink.create({
      data: {
        amount: Number(amount),
        orderName,
        customerName: customerName || null,
        customerEmail: customerEmail || null,
        memo: memo || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })

    return NextResponse.json(link)
  } catch {
    return NextResponse.json({ error: '생성 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
