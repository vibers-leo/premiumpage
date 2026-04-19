import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    await requireAdmin()
    const url = new URL(req.url)
    const status = url.searchParams.get('status')

    const orders = await prisma.pmOrder.findMany({
      where: status && status !== 'all' ? { status } : {},
      include: {
        user: { select: { id: true, name: true, email: true, companyName: true } },
        product: { select: { name: true, category: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}
