import { NextRequest, NextResponse } from 'next/server'
import { uploadBuffer } from '@/lib/ncp-storage'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'PDF 파일이 필요합니다.' }, { status: 400 })
        }

        if (!file.type.includes('pdf')) {
            return NextResponse.json({ error: 'PDF 파일만 업로드 가능합니다.' }, { status: 400 })
        }

        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            return NextResponse.json({ error: '파일 크기는 10MB 이하여야 합니다.' }, { status: 400 })
        }

        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(2, 8)
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const key = `premiumpage/pdfs/${timestamp}-${randomStr}_${originalName}`

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const fileUrl = await uploadBuffer(buffer, key, 'application/pdf')

        // DB 저장 (로그인한 경우)
        let projectId = null
        try {
            const { auth } = await import('@/lib/auth')
            const { prisma } = await import('@/lib/prisma')
            const session = await auth()

            if (session?.user?.id) {
                const project = await prisma.project.create({
                    data: {
                        name: file.name.replace('.pdf', ''),
                        description: 'PDF 변환 프로젝트',
                        userId: session.user.id,
                        components: JSON.stringify({
                            type: 'pdf',
                            fileUrl,
                            fileName: file.name,
                            fileSize: file.size
                        }),
                        thumbnail: null
                    }
                })
                projectId = project.id
            }
        } catch {
            // 비로그인 상태에서도 업로드는 허용
        }

        return NextResponse.json({
            success: true,
            fileUrl,
            fileName: file.name,
            fileSize: file.size,
            uploadedAt: new Date().toISOString(),
            projectId,
        })
    } catch (error) {
        console.error('PDF 업로드 오류:', error)
        return NextResponse.json({ error: 'PDF 업로드 중 오류가 발생했습니다.' }, { status: 500 })
    }
}
