import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { sendQuoteConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email'
import { templates } from '@/lib/data'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        const templateId = formData.get('templateId') as string
        const developmentPlanId = formData.get('developmentPlanId') as string
        const maintenancePlanId = formData.get('maintenancePlanId') as string
        const companyName = formData.get('companyName') as string
        const contactName = formData.get('contactName') as string
        const contactEmail = formData.get('contactEmail') as string
        const contactPhone = formData.get('contactPhone') as string
        const projectDetails = (formData.get('projectDetails') as string) || '상세 내용 없음'

        // 필수 필드 검증 (상세 내용은 선택 항목으로 변경)
        if (!templateId || !developmentPlanId || !maintenancePlanId ||
            !contactName || !contactEmail || !contactPhone) {
            return NextResponse.json(
                { error: '모든 필수 항목을 입력해주세요.' },
                { status: 400 }
            )
        }

        // 파일 처리
        const files: string[] = []
        // Only join with public/uploads to avoid tracing the entire public directory
        const uploadDir = join(process.cwd(), 'public/uploads/quotes')

        // 업로드 디렉토리 생성
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // 파일 저장
        for (let i = 0; i < 10; i++) {
            const file = formData.get(`file${i}`) as File | null
            if (file) {
                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)

                // 고유한 파일명 생성
                const timestamp = Date.now()
                const randomStr = Math.random().toString(36).substring(7)
                const ext = file.name.split('.').pop()
                const filename = `${timestamp}-${randomStr}.${ext}`
                const filepath = join(uploadDir, filename)

                await writeFile(filepath, buffer)
                files.push(`/uploads/quotes/${filename}`)
            }
        }

        // 견적 요청 저장
        const quoteRequest = await prisma.quoteRequest.create({
            data: {
                templateId,
                developmentPlanId,
                maintenancePlanId,
                companyName: companyName || null,
                contactName,
                contactEmail,
                contactPhone,
                projectDetails,
                attachments: files.length > 0 ? JSON.stringify(files) : null,
                status: 'pending'
            }
        })

        // 템플릿 정보 가져오기
        const template = templates.find(t => t.id === templateId)

        // 이메일 발송 (비동기, 실패해도 견적 요청은 성공)
        try {
            await Promise.all([
                sendQuoteConfirmationEmail({
                    email: contactEmail,
                    name: contactName,
                    quoteId: quoteRequest.id,
                    templateName: template?.name
                }),
                sendAdminNotificationEmail({
                    quoteId: quoteRequest.id,
                    customerName: contactName,
                    customerEmail: contactEmail,
                    templateName: template?.name
                })
            ])
        } catch (emailError) {
            console.error('Email send error (non-critical):', emailError)
            // 이메일 실패는 무시하고 계속 진행
        }

        return NextResponse.json({
            success: true,
            message: '견적 요청이 성공적으로 제출되었습니다!',
            quoteId: quoteRequest.id
        })

    } catch (error) {
        console.error('Quote request error:', error)
        return NextResponse.json(
            { error: '견적 요청 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}


// GET: 모든 견적 요청 조회 (관리자용)
export async function GET() {
    try {
        const session = await auth()
        if (!session?.user || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const quotes = await prisma.quoteRequest.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(quotes)
    } catch (error) {
        console.error('Get quotes error:', error)
        return NextResponse.json(
            { error: '견적 목록 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}

// PATCH: 견적 상태 업데이트
export async function PATCH(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const { id, status } = await request.json()

        const updated = await prisma.quoteRequest.update({
            where: { id },
            data: { status }
        })

        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: '상태 업데이트 실패' }, { status: 500 })
    }
}
