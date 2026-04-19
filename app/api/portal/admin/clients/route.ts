import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAdmin()

    const clients = await prisma.pmUser.findMany({
      where: { role: 'client' },
      include: { _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ clients })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}
