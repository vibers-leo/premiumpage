import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageNavigator } from '../../components/PageNavigator';
import { BRANDS, CATEGORY_INFO } from '../../data';

interface BrandPageProps {
    params: { brandId: string };
}

export default function BrandPage({ params }: BrandPageProps) {
    const brand = BRANDS[params.brandId as keyof typeof BRANDS];

    if (!brand) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Navigator */}
                <PageNavigator currentPageId={params.brandId} className="mb-12" />

                {/* Brand Header */}
                <header className="mb-12">
                    <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
                        Brand
                    </div>
                    <h1 className="text-5xl font-bold mb-4">{brand.label}</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        {brand.desc}
                    </p>
                </header>

                {/* Categories Grid */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Product Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {brand.categories.map((catId) => {
                            const catInfo = CATEGORY_INFO[catId];
                            if (!catInfo) return null;

                            return (
                                <Link
                                    key={catId}
                                    href={`/templates/hs-tech/category/${catId}`}
                                    className="group block p-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
                                >
                                    {/* Category Image */}
                                    {catInfo.images && catInfo.images.length > 0 && (
                                        <div className="mb-4 h-40 bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden">
                                            <img
                                                src={catInfo.images[0]}
                                                alt={catInfo.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {catInfo.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {catInfo.desc}
                                    </p>

                                    <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
                                        <span>View Products</span>
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

// Generate static params for all brands
export function generateStaticParams() {
    return Object.keys(BRANDS).map((brandId) => ({
        brandId,
    }));
}
