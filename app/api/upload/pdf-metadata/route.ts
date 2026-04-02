import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        const { fileUrl, fileName, fileSize } = await request.json()

        if (!session?.user?.id) {
            // 로그인하지 않은 경우에도 뷰어는 보여줄 수 있으므로 성공으로 반환하되 DB 저장은 안 함
            return NextResponse.json({ success: true, savedToDb: false })
        }

        const project = await prisma.project.create({
            data: {
                name: fileName.replace('.pdf', ''),
                description: 'Firebase 저장 PDF 프로젝트',
                userId: session.user.id,
                components: JSON.stringify({
                    type: 'pdf',
                    fileUrl: fileUrl,
                    fileName: fileName,
                    fileSize: fileSize,
                    provider: 'firebase'
                }),
                thumbnail: null
            }
        })

        return NextResponse.json({
            success: true,
            projectId: project.id,
            savedToDb: true
        })
    } catch (error) {
        console.error('Metadata 저장 오류:', error)
        return NextResponse.json(
            { error: '데이터베이스 저장 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
