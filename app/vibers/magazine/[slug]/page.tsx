import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticlesByIssue, getDBPostBySlug, getDBPosts, CATEGORY_LABELS, CURRENT_ISSUE } from '../lib/data'

export const dynamic = 'force-dynamic'

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = getArticleBySlug(slug) ?? await getDBPostBySlug(slug)
    if (!article) notFound()

    // 같은 이슈의 아티클 (static + DB 병합)
    const staticArticles = getArticlesByIssue(article.issueId)
    const dbPosts = await getDBPosts()
    const issueArticles = [...staticArticles, ...dbPosts.filter(p => p.issueId === article.issueId)]

    const currentIdx = issueArticles.findIndex(a => a.slug === slug)
    const prev = currentIdx > 0 ? issueArticles[currentIdx - 1] : null
    const next = currentIdx < issueArticles.length - 1 ? issueArticles[currentIdx + 1] : null

    // 마크다운 body를 간단한 HTML로 변환 (섹션 구분)
    const bodyHtml = article.body
        ? article.body
            .split('\n\n---\n\n')
            .map(section =>
                section
                    .replace(/^# (.+)$/m, '<h1 class="text-3xl font-black mb-6">$1</h1>')
                    .replace(/^## (.+)$/m, '<h2 class="text-lg font-bold mb-3 mt-8 text-stone-700">$1</h2>')
                    .replace(/\n/g, '<br />')
            )
            .join('<hr class="my-8 border-stone-200" />')
        : null

    return (
        <div className="min-h-screen bg-[#F9F8F5] text-stone-900" style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}>

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 bg-[#F9F8F5]/90 backdrop-blur-sm border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/vibers/magazine" className="text-xl font-black tracking-tight hover:opacity-70 transition-opacity">
                        계발자들
                    </Link>
                    <span className="text-xs text-stone-400">{CURRENT_ISSUE.label}</span>
                </div>
            </header>

            {/* ── Cover Image ── */}
            {article.coverImage && (
                <div className="w-full aspect-[21/9] bg-stone-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* ── Article Header ── */}
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-8">
                <div className="flex items-center gap-3 mb-6 text-xs text-stone-400 uppercase tracking-widest">
                    <span>{CATEGORY_LABELS[article.category] ?? article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}분 읽기</span>
                    <span>·</span>
                    <span>{article.publishedAt}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                    {article.title}
                </h1>

                {article.subtitle && (
                    <p className="text-xl text-stone-500 mb-6 leading-relaxed">{article.subtitle}</p>
                )}

                <div className="flex items-center gap-3 pt-6 border-t border-stone-200">
                    <div className="w-9 h-9 rounded-full bg-stone-200 overflow-hidden flex-shrink-0" />
                    <div>
                        <div className="text-sm font-bold">{article.author.name}</div>
                        <div className="text-xs text-stone-400">{article.author.role}</div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <article className="max-w-3xl mx-auto px-6 pb-16">
                {bodyHtml ? (
                    <div
                        className="prose prose-stone max-w-none text-stone-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: bodyHtml }}
                    />
                ) : (
                    <div className="prose prose-stone max-w-none">
                        <p className="text-stone-400 text-sm py-16 text-center border border-dashed border-stone-300 rounded-lg">
                            콘텐츠 준비 중 — 브랜딩 자료 전달 후 업데이트됩니다.
                        </p>
                    </div>
                )}
            </article>

            {/* ── Prev / Next ── */}
            <nav className="border-t border-stone-200">
                <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-2 gap-6">
                    <div>
                        {prev && (
                            <Link href={`/vibers/magazine/${prev.slug}`} className="group block">
                                <div className="text-xs text-stone-400 mb-2">← 이전 아티클</div>
                                <div className="font-bold group-hover:underline">{prev.title}</div>
                            </Link>
                        )}
                    </div>
                    <div className="text-right">
                        {next && (
                            <Link href={`/vibers/magazine/${next.slug}`} className="group block">
                                <div className="text-xs text-stone-400 mb-2">다음 아티클 →</div>
                                <div className="font-bold group-hover:underline">{next.title}</div>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* ── Footer ── */}
            <footer className="border-t border-stone-200 py-8 px-6">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-stone-400">
                    <Link href="/vibers/magazine" className="font-black text-stone-900 text-sm">
                        계발자들
                    </Link>
                    <div>© 2026 계발자들</div>
                </div>
            </footer>
        </div>
    )
}
