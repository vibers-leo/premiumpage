import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const { id } = params;
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: '로그인이 필요합니다.' },
                { status: 401 }
            )
        }



        // 프로젝트 존재 및 소유권 확인
        const project = await prisma.project.findUnique({
            where: { id }
        })

        if (!project) {
            return NextResponse.json(
                { error: '프로젝트를 찾을 수 없습니다.' },
                { status: 404 }
            )
        }

        if (project.userId !== session.user.id) {
            return NextResponse.json(
                { error: '삭제 권한이 없습니다.' },
                { status: 403 }
            )
        }

        // 파일 삭제 (선택 사항 리스크가 있을 수 있으므로 신중히)
        try {
            const components = JSON.parse(project.components)
            if (components.fileUrl) {
                // Only join with public/uploads to avoid tracing the entire public directory
                const relativePath = components.fileUrl.startsWith('/uploads/')
                    ? components.fileUrl.replace('/uploads/', '')
                    : components.fileUrl;
                const filePath = join(process.cwd(), 'public', 'uploads', relativePath)
                await unlink(filePath).catch(e => console.warn('File deletion failed:', e))
            }
        } catch (e) {
            console.warn('Could not parse components for file deletion:', e)
        }

        // DB 레코드 삭제
        await prisma.project.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to delete project:', error)
        return NextResponse.json(
            { error: '프로젝트를 삭제하는 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
