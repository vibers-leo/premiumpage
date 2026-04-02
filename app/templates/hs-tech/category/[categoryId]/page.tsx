import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageNavigator } from '../../components/PageNavigator';
import { CATEGORY_INFO, SUB_CATEGORIES } from '../../data';

interface CategoryPageProps {
    params: { categoryId: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const categoryInfo = CATEGORY_INFO[params.categoryId];
    const subCategories = SUB_CATEGORIES[params.categoryId];

    if (!categoryInfo || !subCategories) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Navigator */}
                <PageNavigator currentPageId={params.categoryId} className="mb-12" />

                {/* Category Header */}
                <header className="mb-12">
                    <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
                        Category
                    </div>
                    <h1 className="text-5xl font-bold mb-4">{categoryInfo.title}</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        {categoryInfo.desc}
                    </p>
                </header>

                {/* Category Hero Images */}
                {categoryInfo.images && categoryInfo.images.length > 0 && (
                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryInfo.images.slice(0, 2).map((image: string, idx: number) => (
                            <div
                                key={idx}
                                className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden"
                            >
                                <img
                                    src={image}
                                    alt={`${categoryInfo.title} ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Subcategories Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Product Series</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subCategories.map((subCat: any) => {
                            const productCount = subCat.items ? subCat.items.length : 0;

                            return (
                                <Link
                                    key={subCat.id}
                                    href={`/templates/hs-tech/subcategory/${params.categoryId}/${subCat.id}`}
                                    className="group block p-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-lg"
                                >
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                        {subCat.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                        {subCat.desc}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-neutral-500 dark:text-neutral-500">
                                            {productCount} {productCount === 1 ? 'Product' : 'Products'}
                                        </span>
                                        <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                                            <span>View Products</span>
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
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

// Generate static params for all categories
export function generateStaticParams() {
    const categoryIds = [
        'humidity',
        'dewpoint',
        'co2',
        'oil',
        'barometer',
        'weather',
        'h2o2',
        'setra',
        'jumo',
        'knick'
    ];

    return categoryIds.map((categoryId) => ({
        categoryId,
    }));
}
