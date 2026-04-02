import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Download } from 'lucide-react';
import { DB, CATEGORY_INFO } from '../../data';
import { ProductNavigator } from '../../components/ProductNavigator';

interface ProductPageProps {
    params: { productId: string };
}

// Helper function to find product and its navigation context
function findProductContext(productId: string) {
    let product = null;
    let allProducts: any[] = [];
    let categoryKey = '';

    // Search through all categories to find the product
    for (const [category, products] of Object.entries(DB)) {
        const foundProduct = products.find((p: any) => p.id === productId);
        if (foundProduct) {
            product = foundProduct;
            categoryKey = category;
            allProducts = products;
            break;
        }
    }

    if (!product) return null;

    // Find current index and navigation
    const currentIndex = allProducts.findIndex((p: any) => p.id === productId);
    const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
    const nextProduct = currentIndex < allProducts.length - 1 ? allProducts[currentIndex + 1] : null;

    return {
        product,
        categoryKey,
        allProducts,
        prevProduct,
        nextProduct,
        currentIndex,
        totalProducts: allProducts.length,
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const context = findProductContext(params.productId);

    if (!context) {
        notFound();
    }

    const { product, categoryKey, allProducts } = context;
    const categoryInfo = CATEGORY_INFO[categoryKey];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Product Navigator */}
                <ProductNavigator
                    currentProduct={product}
                    categoryProducts={allProducts}
                    categoryTitle={categoryInfo?.title || categoryKey}
                    categoryPath={`/templates/hs-tech/category/${categoryKey}`}
                    className="mb-12"
                />

                {/* Product Header */}
                <header className="mb-12">
                    <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold mb-4">
                        Product
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-500 uppercase tracking-wide mb-2">
                        {product.subtitle}
                    </div>
                    <h1 className="text-5xl font-bold mb-4">{product.title}</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        {product.desc}
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Image Gallery */}
                    <section>
                        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800">
                            <div className="mb-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto object-contain max-h-96"
                                />
                            </div>

                            {/* Additional Gallery Images */}
                            {product.gallery && product.gallery.length > 1 && (
                                <div className="grid grid-cols-4 gap-2 mt-4">
                                    {product.gallery.map((img: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="bg-white dark:bg-neutral-800 rounded-lg p-2 border border-neutral-200 dark:border-neutral-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.title} ${idx + 1}`}
                                                className="w-full h-16 object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Specifications */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
                        <div className="space-y-4">
                            {product.specs && product.specs.length > 0 ? (
                                product.specs.map((spec: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800"
                                    >
                                        <div className="font-semibold text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                                            {spec.label}
                                        </div>
                                        <div className="text-neutral-900 dark:text-neutral-100 whitespace-pre-line">
                                            {spec.value}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-neutral-500 dark:text-neutral-500">
                                    No specifications available
                                </div>
                            )}
                        </div>

                        {/* Datasheet Link */}
                        {product.datasheet && (
                            <div className="mt-8">
                                <a
                                    href={product.datasheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
                                >
                                    <Download size={20} />
                                    Download Datasheet
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

// Generate static params for all products
export function generateStaticParams() {
    const productIds: { productId: string }[] = [];

    // Collect all product IDs from all categories
    for (const products of Object.values(DB)) {
        for (const product of products) {
            productIds.push({ productId: product.id });
        }
    }

    return productIds;
}
