/**
 * 계발자들 Magazine — Type Definitions
 * magazine.vibers.co.kr
 */

export interface Creator {
    id: string
    name: string
    role: string        // "Developer" | "Designer" | "Writer" | ...
    avatar?: string     // /vibers/magazine/avatars/{id}.jpg
    bio?: string
    links?: {
        github?: string
        instagram?: string
        website?: string
    }
}

export type ArticleCategory = 'dev' | 'design' | 'essay' | 'interview' | 'log'

export interface Article {
    slug: string
    title: string
    subtitle?: string
    author: Creator
    category: ArticleCategory
    tags: string[]
    coverImage?: string     // /vibers/magazine/covers/{slug}.jpg
    readTime: number        // minutes
    publishedAt: string     // "2026-03-01"
    issueId: string         // "2026-03"
    excerpt: string
    body?: string           // markdown (placeholder, will be replaced)
}

export interface Issue {
    id: string              // "2026-03"
    vol: number             // 1, 2, 3 ...
    label: string           // "Vol.01 · March 2026"
    theme?: string          // 이달의 테마
    coverImage?: string     // /vibers/magazine/covers/issue-{id}.jpg
    publishedAt: string
}
