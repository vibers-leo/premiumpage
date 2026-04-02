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
        <div className="w-full max-w-6xl mx-auto p-4 bg-white">
            {/* Image Section */}
            <div className="w-full mb-10 flex justify-center">
                <div className="relative w-full aspect-[16/10] md:aspect-[2.8/1] min-h-[250px] bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-contain p-2 md:p-4"
                            priority
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-neutral-300 font-black text-2xl tracking-widest uppercase">{title}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Title & Subtitle Section */}
            <div className="mb-10 border-b border-neutral-200 pb-6">
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-3 leading-tight tracking-tight uppercase">
                    {title}
                </h2>
                {subtitle && (
                    <div className="text-lg md:text-xl text-cyan-600 font-bold tracking-wide whitespace-pre-wrap">
                        {subtitle}
                    </div>
                )}
                {datasheet && (
                    <a href={datasheet} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-cyan-600 transition-colors border border-neutral-200 px-4 py-2 rounded-lg hover:border-cyan-500/40">
                        <span>Download Datasheet</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                )}
            </div>

            {/* Specs Table */}
            <div className="w-full border-t-2 border-neutral-900">
                {specs && specs.length > 0 ? (
                    specs.map((spec, index) => (
                        <div key={index} className="flex flex-col md:flex-row border-b border-neutral-200 min-h-[56px]">
                            {/* Label */}
                            <div className="w-full md:w-[200px] p-4 md:p-5 font-bold flex items-center justify-start md:justify-center text-left md:text-center text-neutral-700 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200 shrink-0 uppercase tracking-wide text-xs">
                                {spec.label}
                            </div>
                            {/* Value */}
                            <div className="flex-grow p-4 md:p-5 text-neutral-700 whitespace-pre-line leading-relaxed flex items-center text-sm md:text-base overflow-x-auto">
                                {spec.value}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-neutral-400 italic text-sm">
                        Technical specifications are being updated.
                    </div>
                )}
            </div>
        </div>
    )
}
