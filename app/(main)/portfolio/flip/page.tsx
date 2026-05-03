import Link from 'next/link'
import { ExternalLink, FileText, BookOpen } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

const FLIP_LINKS = [
    {
        id: 'hstech',
        name: 'HS-TECH',
        subtitle: 'Industrial Measurement Sensors',
        pages: 26,
        tag: 'Industrial',
        viewerUrl: '/viewer?k=premiumpage%2Fpdfs%2F1777767071710-y04tqy.pdf&title=HS-TECH+Catalog',
    },
    {
        id: 'gentop',
        name: 'GENTOP',
        subtitle: 'Smart Building & ICT Solutions',
        pages: 28,
        tag: 'Smart Building',
        viewerUrl: '/viewer?k=premiumpage%2Fpdfs%2F1777767336063-85ql2g.pdf&title=GENTOP+Catalog',
    },
    {
        id: 'air-hstech',
        name: 'Air HS-TECH',
        subtitle: 'DC Engine-off Air Conditioner · GENWISH',
        pages: 25,
        tag: 'Air Conditioning',
        viewerUrl: '/viewer?k=premiumpage%2Fpdfs%2F1777767338063-24q5pg.pdf&title=Air+HS-TECH+Catalog',
    },
    {
        id: 'hangseong',
        name: '항성산업사',
        subtitle: 'Automotive Motor Press Parts',
        pages: 25,
        tag: 'Automotive',
        viewerUrl: '/viewer?k=premiumpage%2Fpdfs%2F1777767339827-fb5lb5.pdf&title=%ED%95%AD%EC%84%B1%EC%82%B0%EC%97%85%EC%82%AC+Catalog',
    },
    {
        id: 'emt',
        name: 'EMT',
        subtitle: 'Smart Sensors & Future Mobility',
        pages: 22,
        tag: 'Smart Sensor',
        viewerUrl: '/viewer?k=premiumpage%2Fpdfs%2F1777767341734-x72hs1.pdf&title=EMT+Catalog',
    },
]

export const metadata = {
    title: '포트폴리오 플립 뷰어 | Premium Page',
    description: '전자카탈로그 포트폴리오를 인터랙티브 플립 뷰어로 확인하세요.',
}

export default function PortfolioFlipPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="pt-12 pb-8 md:pt-16">
                <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
                    <SectionHeader
                        label="Portfolio · Flip Viewer"
                        title="전자카탈로그 플립 뷰어"
                        description="제작된 전자카탈로그를 책 넘김 효과의 인터랙티브 뷰어로 체험해보세요."
                    />
                </div>
            </section>

            <section className="pb-20">
                <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 max-w-5xl">
                        {FLIP_LINKS.map((item) => (
                            <div key={item.id} className="bg-white p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-5 h-5 text-neutral-400" />
                                    </div>
                                    <span className="text-[10px] font-bold tracking-wider uppercase border border-neutral-200 px-2 py-0.5 text-neutral-400">
                                        {item.tag}
                                    </span>
                                </div>

                                <h3 className="text-xl font-extrabold tracking-tight mb-1">{item.name}</h3>
                                <p className="text-neutral-500 text-sm mb-6 leading-relaxed">{item.subtitle}</p>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                                        <FileText className="w-3.5 h-3.5" />
                                        <span className="font-bold">{item.pages}페이지</span>
                                    </div>
                                </div>

                                <Link
                                    href={item.viewerUrl}
                                    className="w-full h-10 flex items-center justify-center gap-2 bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-700 transition-all"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    플립 뷰어로 보기
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 max-w-5xl border border-neutral-200 p-6">
                        <div className="flex items-start gap-4">
                            <BookOpen className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold mb-1">플립 뷰어 기능 안내</p>
                                <ul className="text-xs text-neutral-500 space-y-1">
                                    <li>• 페이지를 클릭하거나 드래그하면 책처럼 넘어갑니다</li>
                                    <li>• 키보드 방향키(←→)로 페이지를 이동할 수 있습니다</li>
                                    <li>• <strong>HTML 저장</strong> 버튼으로 오프라인에서도 볼 수 있는 파일을 다운로드할 수 있습니다</li>
                                    <li>• 공유 버튼으로 링크를 복사해 바이어에게 전달하세요</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 max-w-4xl">
                        <Link
                            href="/pdf-converter"
                            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 border-b border-neutral-300 hover:text-neutral-900 hover:border-neutral-900 transition-colors pb-0.5"
                        >
                            내 PDF도 플립 뷰어로 변환하기 →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
