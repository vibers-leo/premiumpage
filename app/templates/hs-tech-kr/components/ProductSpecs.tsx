'use client'
import React, { useEffect, useState } from 'react'

export default function ProductSpecs({ product }: { product: any }) {
    const [specHtml, setSpecHtml] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product?.image) {
            setLoading(true)
            try {
                const parts = product.image.split('/hstech/')
                if (parts.length > 1) {
                    const folder = parts[1].split('/')[0]
                    const fname = folder.replace('_files', '') + '.html'

                    fetch(`/hstech/specs/${fname}`)
                        .then(res => res.ok ? res.text() : '')
                        .then(html => {
                            setSpecHtml(html)
                            setLoading(false)
                        })
                        .catch(() => setLoading(false))
                } else {
                    setLoading(false)
                }
            } catch (e) {
                setLoading(false)
            }
        }
    }, [product])

    if (loading) return <div className="animate-pulse flex space-y-4 flex-col">
        <div className="h-4 bg-white/5 rounded w-3/4"></div>
        <div className="h-4 bg-white/5 rounded"></div>
        <div className="h-4 bg-white/5 rounded w-5/6"></div>
    </div>

    // Fallback: If no HTML file, show specs from data.ts
    if (!specHtml) {
        if (!product?.specs || product.specs.length === 0) return null;

        return (
            <div className="w-full border-t border-neutral-800 mt-8">
                {product.specs.map((spec: any, index: number) => (
                    <div key={index} className="flex flex-col md:flex-row border-b border-neutral-800 min-h-[60px]">
                        <div className="w-full md:w-[180px] p-4 font-bold flex items-center bg-neutral-900/50 text-cyan-500 uppercase tracking-wider text-xs border-b md:border-b-0 md:border-r border-neutral-800 shrink-0">
                            {spec.label}
                        </div>
                        <div className="flex-grow p-4 text-neutral-300 whitespace-pre-line leading-relaxed flex items-center text-sm md:text-base">
                            {spec.value}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="prose prose-invert max-w-none 
                        prose-p:text-neutral-300 prose-p:leading-relaxed
                        prose-headings:text-white prose-headings:font-bold
                        prose-strong:text-cyan-400
                        prose-ul:text-neutral-300 prose-li:marker:text-cyan-500
                        
                        /* Table Styles for Dark Mode */
                        [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:text-sm md:[&_table]:text-base
                        [&_th]:bg-neutral-800 [&_th]:text-white [&_th]:font-semibold [&_th]:p-4 [&_th]:text-left [&_th]:border-b [&_th]:border-cyan-500/30
                        [&_td]:p-4 [&_td]:border-b [&_td]:border-neutral-800 [&_td]:text-neutral-300
                        [&_tr:hover_td]:bg-white/5 [&_tr:hover_td]:text-white transition-colors
                        
                        /* Image handling */
                        [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:bg-white/5 [&_img]:p-2
                        
                        /* Clean up layout */
                        [&_div]:bg-transparent
                        "
            dangerouslySetInnerHTML={{ __html: specHtml }}
        />
    )
}
