/**
 * 계발자들 Magazine — Content Data
 * ⚠️  브랜딩 자료 전달 전 플레이스홀더입니다.
 *     실제 크리에이터 정보 / 아티클 내용으로 교체 예정.
 */

import type { Creator, Article, Issue } from './types'
import type { VibersPost } from '@prisma/client'

// ─── Creators ────────────────────────────────────────────────────────────────
// TODO: 계발자들 멤버 정보로 교체
export const CREATORS: Creator[] = [
    {
        id: 'gyebaljadul',
        name: '계발자들',
        role: 'Collective',
        bio: '만들고, 탐구하고, 발견하는 사람들.',
    },
]

// ─── Issues ──────────────────────────────────────────────────────────────────
export const ISSUES: Issue[] = [
    {
        id: '2026-03',
        vol: 1,
        label: 'Vol.01 · March 2026',
        theme: '시작',        // TODO: 실제 이달 테마로 교체
        publishedAt: '2026-03-01',
    },
]

export const CURRENT_ISSUE = ISSUES[0]

// ─── Articles ────────────────────────────────────────────────────────────────
// TODO: 실제 아티클로 교체
export const ARTICLES: Article[] = [
    {
        slug: 'welcome',
        issueId: '2026-03',
        title: '계발자들을 시작합니다',
        subtitle: '매달, 만드는 사람들의 이야기',
        author: CREATORS[0],
        category: 'essay',
        tags: ['시작', '크리에이터', '매거진'],
        readTime: 3,
        publishedAt: '2026-03-01',
        excerpt:
            '계발자들은 무언가를 만들고, 탐구하고, 발견하는 사람들의 이야기를 매달 전합니다. ' +
            '월간 윤종신처럼, 우리도 꾸준히 뭔가를 내놓기로 했습니다.',
        body: `# 계발자들을 시작합니다\n\n콘텐츠 준비 중입니다.`,
    },
    {
        slug: 'what-we-make',
        issueId: '2026-03',
        title: '우리가 만드는 것들',
        subtitle: '코드, 디자인, 그리고 그 사이 어딘가',
        author: CREATORS[0],
        category: 'dev',
        tags: ['개발', '창작', '프로세스'],
        readTime: 5,
        publishedAt: '2026-03-01',
        excerpt:
            '개발자는 코드를 짜고, 디자이너는 픽셀을 배치한다. ' +
            '그 경계가 흐릿해질 때 가장 흥미로운 일이 생긴다.',
        body: `# 우리가 만드는 것들\n\n콘텐츠 준비 중입니다.`,
    },
    {
        slug: 'monthly-log',
        issueId: '2026-03',
        title: 'March Log',
        subtitle: '3월의 기록',
        author: CREATORS[0],
        category: 'log',
        tags: ['로그', '월간기록'],
        readTime: 2,
        publishedAt: '2026-03-01',
        excerpt: '3월에 만든 것, 읽은 것, 들은 것. 간단하게 기록합니다.',
        body: `# March Log\n\n콘텐츠 준비 중입니다.`,
    },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const CATEGORY_LABELS: Record<string, string> = {
    dev:       'Dev',
    design:    'Design',
    essay:     'Essay',
    interview: 'Interview',
    log:       'Log',
}

export function getArticlesByIssue(issueId: string) {
    return ARTICLES.filter(a => a.issueId === issueId)
}

export function getArticleBySlug(slug: string) {
    return ARTICLES.find(a => a.slug === slug)
}

// ─── DB 연동 (VibersPost → Article 변환) ──────────────────────────────────────
// 서버 컴포넌트 전용 (prisma는 서버에서만 사용 가능)

function vibersPostToArticle(post: VibersPost): Article {
    const readTime = Math.ceil(
        (post.whatIsIt + post.whyBuilt + post.keyFeature + post.techStack + post.proudOf + (post.challenge ?? '')).length / 400
    )
    return {
        slug:       post.slug,
        issueId:    post.issueId,
        title:      post.projectName,
        subtitle:   post.tagline,
        author: {
            id:   'vibe-project',
            name: post.projectName,
            role: 'Vibe Project',
        },
        category:    post.category as Article['category'],
        tags:        [post.category, '바이브코딩'],
        coverImage:  post.coverImage ?? undefined,
        readTime,
        publishedAt: post.publishedAt.toISOString().slice(0, 10),
        excerpt:     post.whatIsIt.slice(0, 120),
        body: [
            `# ${post.projectName}`,
            `## 이 프로젝트는 무엇인가요?\n\n${post.whatIsIt}`,
            `## 왜 만들게 됐나요?\n\n${post.whyBuilt}`,
            `## 핵심 기능 / 가장 큰 장점\n\n${post.keyFeature}`,
            `## 기술 스택\n\n${post.techStack}`,
            `## 가장 자랑하고 싶은 부분\n\n${post.proudOf}`,
            post.challenge ? `## 만들면서 어려웠던 점\n\n${post.challenge}` : '',
        ].filter(Boolean).join('\n\n---\n\n'),
    }
}

export async function getDBPosts(): Promise<Article[]> {
    const { prisma } = await import('@/lib/prisma')
    const posts = await prisma.vibersPost.findMany({
        orderBy: { publishedAt: 'desc' },
    })
    return posts.map(vibersPostToArticle)
}

export async function getDBPostBySlug(slug: string): Promise<Article | null> {
    const { prisma } = await import('@/lib/prisma')
    const post = await prisma.vibersPost.findUnique({ where: { slug } })
    return post ? vibersPostToArticle(post) : null
}
