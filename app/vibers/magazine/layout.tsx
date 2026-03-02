import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '계발자들 — magazine.vibers.co.kr',
    description: '만들고, 탐구하고, 발견하는 사람들의 월간 매거진.',
    openGraph: {
        title: '계발자들',
        description: '만들고, 탐구하고, 발견하는 사람들의 월간 매거진.',
        siteName: '계발자들',
        // TODO: OG 이미지 추가 (브랜딩 자료 전달 후)
    },
}

export default function MagazineLayout({ children }: { children: React.ReactNode }) {
    return children
}
