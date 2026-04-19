import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await requireSession()

    const [orders, recentOrders] = await Promise.all([
      prisma.pmOrder.groupBy({
        by: ['status'],
        where: { userId: session.id },
        _count: true,
      }),
      prisma.pmOrder.findMany({
        where: { userId: session.id },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ])

    const stats = {
      total: orders.reduce((sum, g) => sum + g._count, 0),
      active: orders.filter(g => ['accepted', 'in_progress', 'review', 'revision'].includes(g.status)).reduce((sum, g) => sum + g._count, 0),
      completed: orders.find(g => g.status === 'completed')?._count ?? 0,
      pending: orders.find(g => g.status === 'pending')?._count ?? 0,
    }

    return NextResponse.json({ stats, recentOrders })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
