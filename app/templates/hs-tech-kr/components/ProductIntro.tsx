import Image from 'next/image'

interface SpecItem {
    label: string
    value: string
}

interface ProductIntroProps {
    title: string
    subtitle: string
    image: string
    specs: SpecItem[]
    datasheet?: string
}

export default function ProductIntro({ title, subtitle, image, specs, datasheet }: ProductIntroProps) {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 bg-white dark:bg-neutral-900">
            {/* Image Section */}
            <div className="w-full mb-12 flex justify-center">
                <div className="relative w-full aspect-[16/10] md:aspect-[2.8/1] min-h-[250px] bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain p-2 md:p-4"
                        priority
                    />
                </div>
            </div>

            {/* Title & Subtitle Section */}
            <div className="mb-12 border-b border-neutral-200 dark:border-white/10 pb-8">
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 leading-tight tracking-tight uppercase">
                    {title}
                </h2>
                {subtitle && (
                    <div className="text-xl md:text-2xl text-cyan-600 dark:text-cyan-400 font-bold tracking-wide whitespace-pre-wrap">
                        {subtitle}
                    </div>
                )}
                {datasheet && (
                    <a href={datasheet} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-cyan-500 transition-colors border border-neutral-200 dark:border-white/10 px-4 py-2 rounded-lg">
                        <span>데이터시트 다운로드</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                )}
            </div>

            {/* Specs Table */}
            <div className="w-full border-t-2 border-neutral-900 dark:border-white/20">
                {specs && specs.length > 0 ? (
                    specs.map((spec, index) => (
                        <div key={index} className="flex flex-col md:flex-row border-b border-neutral-200 dark:border-neutral-800 min-h-[60px]">
                            {/* Label */}
                            <div className="w-full md:w-[200px] p-4 md:p-6 font-bold flex items-center justify-start md:justify-center text-left md:text-center text-neutral-800 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-800/30 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 shrink-0 uppercase tracking-wide text-sm">
                                {spec.label}
                            </div>
                            {/* Value */}
                            <div className="flex-grow p-4 md:p-6 text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed flex items-center text-base md:text-lg overflow-x-auto">
                                {spec.value}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-neutral-500 dark:text-neutral-400 italic font-medium">
                        기술 사양 정보를 불러오는 중입니다.
                    </div>
                )}
            </div>
        </div>
    )
}
