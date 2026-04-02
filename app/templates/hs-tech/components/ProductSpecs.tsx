'use client'
import React, { useEffect, useState } from 'react'
import specsData from '../product_specs.json'

const allSpecs = specsData as Record<string, any>

// Map product IDs to spec keys (handle naming mismatches)
const SPEC_KEY_MAP: Record<string, string> = {
    'hmt120': 'hmt120_130',
    'dmt345': 'dmt345_346',
    'indigo80_hmp80': 'indigo80+hmp80',
    'indigo80_dmp80': 'indigo80+hmp80',
    'indigo80_gmp252': 'indigo80+hmp80',
}

function findSpecData(productId: string): any[] | null {
    const id = productId.toLowerCase()
    const mappedKey = SPEC_KEY_MAP[id] || id
    return allSpecs[mappedKey] || allSpecs[mappedKey.toUpperCase()] || null
}

export default function ProductSpecs({ product }: { product: any }) {
    const specData = product?.id ? findSpecData(product.id) : null

    if (!specData || specData.length === 0) return null

    return (
        <div className="w-full space-y-8">
            {specData.map((table: any[], tableIdx: number) => {
                if (!table || table.length === 0) return null
                const headers = table[0]
                const rows = table.slice(1)

                return (
                    <div key={tableIdx} className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm md:text-base border-collapse">
                            <thead>
                                <tr>
                                    {headers.map((h: string, i: number) => (
                                        <th key={i} className="bg-neutral-800 text-white font-semibold p-4 text-left border-b border-cyan-500/30 whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row: any[], rowIdx: number) => (
                                    <tr key={rowIdx} className="hover:bg-white/5 transition-colors">
                                        {row.map((cell: string, cellIdx: number) => (
                                            <td key={cellIdx} className="p-4 border-b border-neutral-800 text-neutral-300 whitespace-pre-line align-top">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}
