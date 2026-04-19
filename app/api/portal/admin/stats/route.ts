import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAdmin()

    const [totalClients, totalOrders, ordersByStatus, recentOrders] = await Promise.all([
      prisma.pmUser.count({ where: { role: 'client' } }),
      prisma.pmOrder.count(),
      prisma.pmOrder.groupBy({ by: ['status'], _count: true }),
      prisma.pmOrder.findMany({
        include: {
          user: { select: { name: true, companyName: true } },
          product: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ])

    return NextResponse.json({
      totalClients,
      totalOrders,
      ordersByStatus: Object.fromEntries(ordersByStatus.map(g => [g.status, g._count])),
      recentOrders,
    })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}
