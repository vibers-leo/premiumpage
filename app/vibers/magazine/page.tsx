import Link from 'next/link'
import { CURRENT_ISSUE, ARTICLES, CATEGORY_LABELS, getDBPosts } from './lib/data'
import type { Article } from './lib/types'

// ─── Category Badge ───────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
    return (
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400">
            {CATEGORY_LABELS[category] ?? category}
        </span>
    )
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, featured = false }: {
    article: Article
    featured?: boolean
}) {
    return (
        <Link
            href={`/vibers/magazine/${article.slug}`}
            className={`group block ${featured ? 'md:col-span-2' : ''}`}
        >
            {/* Thumbnail */}
            <div className={`bg-stone-100 overflow-hidden mb-4 ${featured ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}>
                {article.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-end p-5">
                        <span className="text-stone-300 text-xs font-mono">
                            {CURRENT_ISSUE.label}
                        </span>
                    </div>
                )}
            </div>

            {/* Meta */}
            <CategoryBadge category={article.category} />

            {/* Title */}
            <h2 className={`font-black leading-tight mt-1 mb-2 group-hover:underline decoration-1 ${
                featured ? 'text-3xl md:text-4xl' : 'text-xl'
            }`}>
                {article.title}
            </h2>

            {article.subtitle && (
                <p className="text-stone-500 text-sm mb-3">{article.subtitle}</p>
            )}

            <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>

            <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                <span>{article.author.name}</span>
                <span>·</span>
                <span>{article.readTime}분</span>
            </div>
        </Link>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function MagazinePage() {
    const dbPosts = await getDBPosts()
    const allArticles = [...ARTICLES, ...dbPosts]
    const [featured, ...rest] = allArticles

    return (
        <div className="min-h-screen bg-[#F9F8F5] text-stone-900" style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}>

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 bg-[#F9F8F5]/90 backdrop-blur-sm border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-3">
                        <Link href="/vibers/magazine">
                            <h1 className="text-xl font-black tracking-tight">계발자들</h1>
                        </Link>
                        <span className="text-xs text-stone-400 hidden sm:block">
                            {CURRENT_ISSUE.label}
                        </span>
                    </div>
                    <nav className="flex items-center gap-6 text-sm text-stone-500">
                        <Link href="/vibers/magazine" className="hover:text-stone-900 transition-colors">
                            최신호
                        </Link>
                        {/* TODO: 아카이브 페이지 */}
                        <span className="text-stone-300 cursor-default">아카이브</span>
                    </nav>
                </div>
            </header>

            {/* ── Issue Hero ── */}
            <section className="border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-3">
                                {CURRENT_ISSUE.label}
                            </p>
                            <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
                                {CURRENT_ISSUE.theme ?? ''}
                            </h2>
                        </div>
                        <p className="text-stone-500 text-sm max-w-xs leading-relaxed md:text-right">
                            계발자들이 이번 달 만들고, 탐구하고, 발견한 것들.
                            <br />
                            <span className="text-stone-400">{allArticles.length}개의 아티클</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Articles ── */}
            <main className="max-w-6xl mx-auto px-6 py-16">
                {/* Featured */}
                {featured && (
                    <div className="mb-16 pb-16 border-b border-stone-200">
                        <ArticleCard article={featured} featured />
                    </div>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-10">
                        {rest.map(article => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                )}
            </main>

            {/* ── Footer ── */}
            <footer className="border-t border-stone-200 py-12 px-6 mt-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
                    <div className="font-black text-stone-900 text-base">계발자들</div>
                    <div>© 2026 계발자들 · log.vibers.co.kr</div>
                </div>
            </footer>
        </div>
    )
}
