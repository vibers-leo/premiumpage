'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    subtitle?: string;
    category: string;
}

interface ProductNavigatorProps {
    currentProduct: Product;
    categoryProducts: Product[];
    categoryTitle: string;
    categoryPath: string;
    className?: string;
}

/**
 * Product Detail Navigator
 * - 제품 상세 페이지 간 이동 (카테고리 내부에서만)
 * - 페이지 네비게이터에는 카운트되지 않음
 */
export const ProductNavigator = ({
    currentProduct,
    categoryProducts,
    categoryTitle,
    categoryPath,
    className = ''
}: ProductNavigatorProps) => {
    const currentIndex = categoryProducts.findIndex(p => p.id === currentProduct.id);
    const prevProduct = currentIndex > 0 ? categoryProducts[currentIndex - 1] : null;
    const nextProduct = currentIndex < categoryProducts.length - 1 ? categoryProducts[currentIndex + 1] : null;

    return (
        <div className={`product-navigator ${className}`}>
            {/* Info Banner */}
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">Product Detail View:</span> Viewing {currentIndex + 1} of {categoryProducts.length} products in {categoryTitle}
                </p>
            </div>

            {/* Navigation Controls */}
            <div className="navigator-controls flex items-center justify-between py-4 px-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
                {/* Previous Product */}
                <div className="flex-1">
                    {prevProduct ? (
                        <Link
                            href={`/templates/hs-tech/product/${prevProduct.id}`}
                            className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-neutral-500">Previous Product</span>
                                <span className="font-medium text-sm">{prevProduct.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <div className="opacity-30 cursor-not-allowed flex items-center gap-2">
                            <ChevronLeft size={20} />
                            <span className="text-sm">First Product</span>
                        </div>
                    )}
                </div>

                {/* Back to Category */}
                <div className="flex-shrink-0 px-8">
                    <Link
                        href={categoryPath}
                        className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
                    >
                        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                        <span className="text-xs font-medium">Back to {categoryTitle}</span>
                    </Link>
                </div>

                {/* Next Product */}
                <div className="flex-1 flex justify-end">
                    {nextProduct ? (
                        <Link
                            href={`/templates/hs-tech/product/${nextProduct.id}`}
                            className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-neutral-500">Next Product</span>
                                <span className="font-medium text-sm">{nextProduct.title}</span>
                            </div>
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        <div className="opacity-30 cursor-not-allowed flex items-center gap-2">
                            <span className="text-sm">Last Product</span>
                            <ChevronRight size={20} />
                        </div>
                    )}
                </div>
            </div>

            {/* Product Progress within Category */}
            <div className="progress-bar mt-4">
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / categoryProducts.length) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>First Product</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                        {currentIndex + 1} / {categoryProducts.length}
                    </span>
                    <span>Last Product</span>
                </div>
            </div>

            {/* Quick Jump to Products */}
            <div className="mt-4">
                <details className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                        <span className="text-sm font-medium">Quick Jump to Product</span>
                        <ChevronRight size={16} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="mt-2 p-4 bg-neutral-50 dark:bg-neutral-900/30 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {categoryProducts.map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/templates/hs-tech/product/${product.id}`}
                                    className={`
                                        px-3 py-2 rounded-md text-sm transition-colors
                                        ${product.id === currentProduct.id
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold'
                                            : 'bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                                        }
                                    `}
                                >
                                    {index + 1}. {product.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
};
