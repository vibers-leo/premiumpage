import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageNavigator } from '../../../components/PageNavigator';
import { SUB_CATEGORIES, DB } from '../../../data';

interface SubcategoryPageProps {
    params: { categoryId: string; subId: string };
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
    const subCategories = SUB_CATEGORIES[params.categoryId];

    if (!subCategories) {
        notFound();
    }

    const subCategory = subCategories.find((sub: any) => sub.id === params.subId);

    if (!subCategory) {
        notFound();
    }

    // Get products from DB matching this subcategory
    const categoryProducts = DB[params.categoryId] || [];
    const products = categoryProducts.filter((product: any) => product.category === params.subId);

    // Construct page ID for navigation (e.g., "humidity_handheld")
    const pageId = `${params.categoryId}_${params.subId}`;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Navigator */}
                <PageNavigator currentPageId={pageId} className="mb-12" />

                {/* Subcategory Header */}
                <header className="mb-12">
                    <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-4">
                        Series
                    </div>
                    <h1 className="text-5xl font-bold mb-4">{subCategory.title}</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        {subCategory.desc}
                    </p>
                </header>

                {/* Products Grid */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">
                        Products ({products.length})
                    </h2>

                    {products.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500">
                            No products available in this series.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product: any) => (
                                <Link
                                    key={product.id}
                                    href={`/templates/hs-tech/product/${product.id}`}
                                    className="group block bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg overflow-hidden"
                                >
                                    {/* Product Image */}
                                    <div className="h-56 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1 uppercase tracking-wide">
                                            {product.subtitle}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                            {product.desc}
                                        </p>

                                        <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400">
                                            <span>View Details</span>
                                            <svg
                                                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

// Generate static params for all subcategories
export function generateStaticParams() {
    const params: { categoryId: string; subId: string }[] = [];

    // Humidity subcategories (4)
    params.push(
        { categoryId: 'humidity', subId: 'handheld' },
        { categoryId: 'humidity', subId: 'industrial' },
        { categoryId: 'humidity', subId: 'hvac' },
        { categoryId: 'humidity', subId: 'probe' }
    );

    // Dewpoint subcategories (3)
    params.push(
        { categoryId: 'dewpoint', subId: 'portable' },
        { categoryId: 'dewpoint', subId: 'fixed' },
        { categoryId: 'dewpoint', subId: 'module' }
    );

    // CO2 subcategories (3)
    params.push(
        { categoryId: 'co2', subId: 'transmitter' },
        { categoryId: 'co2', subId: 'probe' },
        { categoryId: 'co2', subId: 'handheld' }
    );

    // Oil subcategories
    params.push(
        { categoryId: 'oil', subId: 'transformer' },
        { categoryId: 'oil', subId: 'fixed' },
        { categoryId: 'oil', subId: 'handheld' }
    );

    // Barometer
    params.push({ categoryId: 'barometer', subId: 'barometer' });

    // Weather
    params.push({ categoryId: 'weather', subId: 'trans' });

    // H2O2
    params.push({ categoryId: 'h2o2', subId: 'sensor' });

    // SETRA
    params.push(
        { categoryId: 'setra', subId: 'diff_ind' },
        { categoryId: 'setra', subId: 'diff_sen' },
        { categoryId: 'setra', subId: 'industrial' }
    );

    // JUMO
    params.push(
        { categoryId: 'jumo', subId: 'liquid' },
        { categoryId: 'jumo', subId: 'control' }
    );

    // KNICK
    params.push({ categoryId: 'knick', subId: 'analysis' });

    return params;
}
