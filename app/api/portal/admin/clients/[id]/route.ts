import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params

    const client = await prisma.pmUser.findUnique({
      where: { id },
      include: {
        orders: { include: { product: true }, orderBy: { createdAt: 'desc' } },
        socialAccounts: { select: { provider: true } },
      },
    })

    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ client })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params
    const body = await req.json()

    const updateData: any = {}
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.role) updateData.role = body.role
    if (body.companyName !== undefined) updateData.companyName = body.companyName

    const client = await prisma.pmUser.update({ where: { id }, data: updateData })
    return NextResponse.json({ client })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}
