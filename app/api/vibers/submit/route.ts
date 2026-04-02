import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// slug 자동 생성: "My Project" + 날짜 → "my-project-2026-03"
function generateSlug(projectName: string): string {
    const date = new Date()
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    return projectName
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        + '-' + yearMonth
}

// Q&A 답변 → 마크다운 본문 자동 생성
function buildMarkdownBody(projectName: string, answers: Record<string, string>): string {
    const sections = [
        { question: '이 프로젝트는 무엇인가요?', key: 'whatIsIt'   },
        { question: '왜 만들게 됐나요?',          key: 'whyBuilt'   },
        { question: '핵심 기능 / 가장 큰 장점',   key: 'keyFeature' },
        { question: '기술 스택',                  key: 'techStack'  },
        { question: '가장 자랑하고 싶은 부분',    key: 'proudOf'    },
        { question: '만들면서 어려웠던 점',        key: 'challenge'  },
    ]

    const body = sections
        .filter(s => answers[s.key])
        .map(s => `## ${s.question}\n\n${answers[s.key]}`)
        .join('\n\n---\n\n')

    return `# ${projectName}\n\n${body}`
}

export async function POST(request: NextRequest) {
    // API Key 인증
    const authHeader = request.headers.get('authorization') ?? ''
    const token = authHeader.replace('Bearer ', '').trim()
    const validKey = process.env.VIBERS_SUBMIT_KEY

    if (!validKey || token !== validKey) {
        return NextResponse.json({ error: '인증 실패: 유효하지 않은 API 키입니다.' }, { status: 401 })
    }

    let body: Record<string, unknown>
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: '요청 본문이 유효한 JSON이 아닙니다.' }, { status: 400 })
    }

    const { projectName, tagline, projectUrl, category, coverImage, answers } = body as {
        projectName: string
        tagline: string
        projectUrl?: string
        category?: string
        coverImage?: string
        answers: Record<string, string>
    }

    // 필수 필드 검증
    const missing: string[] = []
    if (!projectName) missing.push('projectName')
    if (!tagline)     missing.push('tagline')
    if (!answers?.whatIsIt)   missing.push('answers.whatIsIt')
    if (!answers?.whyBuilt)   missing.push('answers.whyBuilt')
    if (!answers?.keyFeature) missing.push('answers.keyFeature')
    if (!answers?.techStack)  missing.push('answers.techStack')
    if (!answers?.proudOf)    missing.push('answers.proudOf')

    if (missing.length > 0) {
        return NextResponse.json({ error: `필수 필드 누락: ${missing.join(', ')}` }, { status: 400 })
    }

    // 현재 이슈 ID (이달 기준)
    const now = new Date()
    const issueId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    // slug 중복 처리
    const baseSlug = generateSlug(projectName)
    let slug = baseSlug
    const existing = await prisma.vibersPost.findUnique({ where: { slug } })
    if (existing) {
        slug = `${baseSlug}-${Date.now()}`
    }

    const post = await prisma.vibersPost.create({
        data: {
            slug,
            projectName,
            tagline,
            projectUrl:  projectUrl  ?? null,
            category:    category    ?? 'dev',
            coverImage:  coverImage  ?? null,
            issueId,
            whatIsIt:   answers.whatIsIt,
            whyBuilt:   answers.whyBuilt,
            keyFeature: answers.keyFeature,
            techStack:  answers.techStack,
            proudOf:    answers.proudOf,
            challenge:  answers.challenge ?? null,
        },
    })

    // 마크다운 body 미리보기 (저장은 안 함, 렌더링 시 동적 생성)
    const markdownPreview = buildMarkdownBody(projectName, answers)

    return NextResponse.json({
        success:  true,
        slug:     post.slug,
        postUrl:  `/vibers/magazine/${post.slug}`,
        issueId:  post.issueId,
        preview:  markdownPreview.slice(0, 200) + '...',
    }, { status: 201 })
}
