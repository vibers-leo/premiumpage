import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

// 내 주문 목록
export async function GET() {
  try {
    const session = await requireSession()
    const orders = await prisma.pmOrder.findMany({
      where: { userId: session.id },
      include: { product: true, _count: { select: { comments: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// 새 주문 생성
export async function POST(req: Request) {
  try {
    const session = await requireSession()
    const body = await req.json()
    const { productId, title, description, referenceUrl, attachments } = body

    if (!title) {
      return NextResponse.json({ error: '프로젝트 제목을 입력해주세요.' }, { status: 400 })
    }

    const orderNumber = `PP-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`

    let amount = 0
    if (productId) {
      const product = await prisma.pmProduct.findUnique({ where: { id: productId } })
      if (product?.price) amount = product.price
    }

    const order = await prisma.pmOrder.create({
      data: {
        orderNumber,
        userId: session.id,
        productId: productId || undefined,
        title,
        description,
        amount,
        referenceUrl,
        attachments,
      },
      include: { product: true },
    })

    return NextResponse.json({ order }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || '주문 생성 실패' }, { status: e.message === 'Unauthorized' ? 401 : 500 })
  }
}
