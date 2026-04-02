
import React from 'react'
import { X, FileText } from 'lucide-react'
import Image from 'next/image'

interface ProductDetailModalProps {
    isOpen: boolean
    onClose: () => void
    product: any
    specs: any[] // Array of tables
}

export default function ProductDetailModal({ isOpen, onClose, product, specs }: ProductDetailModalProps) {
    if (!isOpen || !product) return null

    // Helper to render complex table data
    // The data is Array of Tables -> Array of Rows -> Array of Cells (Strings)
    const renderTable = (table: string[][], tableIdx: number) => {
        if (!table || table.length === 0) return null

        // Assume first row is header if distinct style needed, but for now generic table
        return (
            <div key={tableIdx} className="mb-8 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse border border-slate-200">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs font-mono">
                        <tr>
                            {table[0].map((cell, idx) => (
                                <th key={idx} className="border border-slate-200 px-4 py-3 whitespace-pre-wrap">{cell}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.slice(1).map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-slate-50 border-b border-slate-100">
                                {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="border border-slate-200 px-4 py-3 align-top whitespace-pre-wrap text-slate-600 font-light leading-relaxed">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content - Updated Width to 80vw */}
            <div className="relative w-full w-[90vw] md:w-[80vw] max-w-none max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-600 uppercase tracking-widest mb-1">
                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                            Technical Specifications
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{product.title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50">

                    {/* Intro / Image logic could go here too, but focus on Specs */}
                    <div className="flex flex-col md:flex-row gap-8 mb-10">
                        <div className="w-full md:w-1/3 relative aspect-square bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-8 flex items-center justify-center">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={600} // Increased res
                                height={600}
                                className="object-contain"
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h4 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-teal-500" />
                                Product Description
                            </h4>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-6 font-light">
                                {product.desc}
                            </p>

                            {/* Existing Specs Tags */}
                            {product.specs && (
                                <div className="flex flex-wrap gap-2">
                                    {product.specs.map((s: any, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-mono text-slate-500">
                                            <span className="font-bold text-slate-700">{s.label}:</span> {s.value}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed Tables */}
                    {specs && specs.length > 0 ? (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-slate-200"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detail Data</span>
                                <div className="h-px flex-1 bg-slate-200"></div>
                            </div>

                            {specs.map((tbl, idx) => renderTable(tbl, idx))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-slate-400 font-medium">Detailed specifications not available for this model.</p>
                            <p className="text-slate-300 text-sm mt-1">Please download the datasheet for full details.</p>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-100 text-slate-600 font-bold text-sm rounded hover:bg-slate-200 transition-colors"
                    >
                        Close
                    </button>
                    <button className="px-6 py-2 bg-teal-500 text-white font-bold text-sm rounded hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20">
                        Contact Sales
                    </button>
                </div>

            </div>
        </div>
    )
}
