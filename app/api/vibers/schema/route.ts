import { NextResponse } from 'next/server'

// 모든 프로젝트가 답해야 하는 공통 질문
export const COMMON_QUESTIONS = [
    {
        id: 'whatIsIt',
        label: '이 프로젝트는 무엇인가요?',
        hint: '한두 문장으로 핵심을 설명해 주세요.',
        required: true,
    },
    {
        id: 'whyBuilt',
        label: '왜 만들게 됐나요?',
        hint: '계기, 불편함, 혹은 호기심 — 무엇이 이걸 만들게 했나요?',
        required: true,
    },
    {
        id: 'keyFeature',
        label: '핵심 기능 또는 가장 큰 장점은?',
        hint: '이 프로젝트만의 특별한 점을 알려주세요.',
        required: true,
    },
    {
        id: 'techStack',
        label: '어떤 기술로 만들었나요?',
        hint: '프레임워크, 언어, 주요 라이브러리 등을 알려주세요.',
        required: true,
    },
    {
        id: 'proudOf',
        label: '가장 자랑하고 싶은 부분은?',
        hint: '기술적이든, 경험적이든, 디자인이든 자유롭게.',
        required: true,
    },
    {
        id: 'challenge',
        label: '만들면서 어려웠던 점은?',
        hint: '해결한 문제나 배운 점을 공유해 주세요.',
        required: false,
    },
]

export async function GET() {
    return NextResponse.json({
        version: '1.0',
        magazine: '계발자들',
        description: '바이브코딩 프로젝트들의 자기소개 매거진',
        questions: COMMON_QUESTIONS,
        categories: [
            { id: 'dev',       label: 'Dev'       },
            { id: 'design',    label: 'Design'    },
            { id: 'essay',     label: 'Essay'     },
            { id: 'interview', label: 'Interview' },
            { id: 'log',       label: 'Log'       },
        ],
        submitUrl: '/api/vibers/submit',
        submitMethod: 'POST',
        authHeader: 'Authorization: Bearer {VIBERS_SUBMIT_KEY}',
        exampleBody: {
            projectName: '내 프로젝트 이름',
            tagline: '한 줄 소개 (50자 이내)',
            projectUrl: 'https://...',
            category: 'dev',
            coverImage: 'https://... (선택사항)',
            answers: {
                whatIsIt:   '프로젝트 설명',
                whyBuilt:   '만든 이유',
                keyFeature: '핵심 기능',
                techStack:  '기술 스택',
                proudOf:    '자랑하고 싶은 부분',
                challenge:  '어려웠던 점 (선택사항)',
            },
        },
    })
}
