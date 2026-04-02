'use client'
import React from 'react'
import { CheckCircle2, Factory, AppWindow } from 'lucide-react'

export default function ProductSpecs({ product }: { product: any }) {
    if (!product) return null

    // Helper to split description into bullets if it contains periods
    const features = product.desc ? product.desc.split('. ').filter((s: string) => s.length > 5).map((s: string) => s.endsWith('.') ? s : s + '.') : []

    return (
        <div className="space-y-12">

            {/* 1. Features & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h4 className="text-xl font-bold dark:text-blue-400 text-blue-600 flex items-center gap-2">
                        <Factory className="w-5 h-5" /> Product Features
                    </h4>
                    <ul className="space-y-4">
                        {features.length > 0 ? features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="dark:text-slate-300 text-slate-700 leading-relaxed">{feature}</span>
                            </li>
                        )) : (
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="dark:text-slate-300 text-slate-700 leading-relaxed">{product.desc}</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-xl font-bold dark:text-blue-400 text-blue-600 flex items-center gap-2">
                        <AppWindow className="w-5 h-5" /> Application Areas
                    </h4>
                    <div className="dark:bg-slate-800/50 bg-slate-50 rounded-xl p-6 border dark:border-slate-700 border-slate-200">
                        <p className="dark:text-slate-300 text-slate-700 mb-4">
                            Ideal for automotive and industrial applications requiring high precision and durability.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {(product.tags && product.tags.length > 0 ? product.tags : ['Automotive', 'EV / HEV', 'Industrial Motors', 'Home Appliances']).map((tag: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Specifications Table */}
            {product.specs && product.specs.length > 0 && (
                <div className="space-y-6">
                    <h4 className="text-xl font-bold dark:text-white text-slate-900 border-l-4 border-blue-500 pl-4">Technical Specifications</h4>
                    <div className="overflow-hidden rounded-xl border dark:border-slate-700 border-slate-200 overflow-x-auto">
                        <table className="w-full text-left text-sm md:text-base min-w-[320px]">
                            <thead className="dark:bg-slate-800 bg-slate-100 dark:text-slate-200 text-slate-700 uppercase font-bold">
                                <tr>
                                    <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">Parameter</th>
                                    <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-slate-800 divide-slate-200 dark:bg-slate-900/50 bg-white">
                                {product.specs.map((spec: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-3 md:px-6 md:py-4 font-medium dark:text-slate-300 text-slate-900 w-1/3 whitespace-nowrap">{spec.label}</td>
                                        <td className="px-4 py-3 md:px-6 md:py-4 dark:text-slate-400 text-slate-600 font-mono whitespace-nowrap">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Marketing Message */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Innovate?</h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                    Contact our engineering team for custom specifications and bulk order inquiries.
                </p>
                <a href="/templates/hangseong?tab=contact" className="inline-block bg-white text-blue-900 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors cursor-pointer">
                    Request a Quote
                </a>
            </div>
        </div>
    )
}
