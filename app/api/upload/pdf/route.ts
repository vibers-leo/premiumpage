import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'PDF 파일이 필요합니다.' },
                { status: 400 }
            )
        }

        // PDF 파일인지 확인
        if (!file.type.includes('pdf')) {
            return NextResponse.json(
                { error: 'PDF 파일만 업로드 가능합니다.' },
                { status: 400 }
            )
        }

        // 파일 크기 제한 (10MB)
        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: '파일 크기는 10MB 이하여야 합니다.' },
                { status: 400 }
            )
        }

        // 업로드 디렉토리 생성
        // Only join with public/uploads to avoid tracing the entire public directory
        const uploadDir = join(process.cwd(), 'public/uploads/pdfs')
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // 파일명 생성 (타임스탬프 + 원본 파일명)
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `${timestamp}_${originalName}`
        const filePath = join(uploadDir, fileName)

        // 파일 저장
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filePath, buffer)

        // 공개 URL 생성
        const fileUrl = `/uploads/pdfs/${fileName}`

        // 데이터베이스 저장 (로그인한 경우)
        const { auth } = await import('@/lib/auth')
        const { prisma } = await import('@/lib/prisma')
        const session = await auth()

        let projectId = null
        if (session?.user?.id) {
            const project = await prisma.project.create({
                data: {
                    name: file.name.replace('.pdf', ''),
                    description: 'PDF 변환 프로젝트',
                    userId: session.user.id,
                    components: JSON.stringify({
                        type: 'pdf',
                        fileUrl: fileUrl,
                        fileName: file.name,
                        fileSize: file.size
                    }),
                    thumbnail: null // 추후 첫 페이지 썸네일 생성 로직 추가 가능
                }
            })
            projectId = project.id
        }

        return NextResponse.json({
            success: true,
            fileUrl,
            fileName: file.name,
            fileSize: file.size,
            uploadedAt: new Date().toISOString(),
            projectId,
            savedToDb: !!projectId
        })
    } catch (error) {
        console.error('PDF 업로드 오류:', error)
        return NextResponse.json(
            { error: 'PDF 업로드 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
