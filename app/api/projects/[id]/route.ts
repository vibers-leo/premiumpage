import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { deleteObject, extractKeyFromUrl } from '@/lib/ncp-storage'

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

        // NCP Object Storage 파일 삭제
        try {
            const components = JSON.parse(project.components)
            if (components.fileUrl) {
                const key = extractKeyFromUrl(components.fileUrl)
                if (key) await deleteObject(key).catch(e => console.warn('NCP delete failed:', e))
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
