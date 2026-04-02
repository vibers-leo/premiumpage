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
}

export default function ProductIntro({ title, subtitle, image, specs }: ProductIntroProps) {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 bg-white dark:bg-slate-900">
            {/* Image Section (Top as requested) */}
            <div className="w-full mb-12 flex justify-center">
                <div className="relative w-full aspect-[16/10] md:aspect-[2.8/1] min-h-[250px] bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain p-2 md:p-4"
                        priority
                    />
                </div>
            </div>

            {/* Title & Subtitle Section (Restored Premium Design) */}
            <div className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight tracking-tight uppercase">
                    {title}
                </h2>
                {subtitle && (
                    <div className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-bold tracking-wide whitespace-pre-wrap">
                        {subtitle}
                    </div>
                )}
            </div>

            {/* Specs Table (Clean & Readable) */}
            <div className="w-full border-t-2 border-slate-900 dark:border-white/20">
                {specs.map((spec, index) => (
                    <div key={index} className="flex flex-col md:flex-row border-b border-slate-200 dark:border-slate-700 min-h-[80px]">
                        {/* Label */}
                        <div className="w-full md:w-[200px] p-6 font-bold flex items-center justify-start md:justify-center text-left md:text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 shrink-0 uppercase tracking-wide text-sm">
                            {spec.label}
                        </div>
                        {/* Value */}
                        <div className="flex-grow p-6 text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed flex items-center text-base md:text-lg overflow-x-auto">
                            {spec.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
