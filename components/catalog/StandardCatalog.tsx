'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, ChevronRight, Download, Filter, Menu, X } from 'lucide-react'

// Mock Data for Standard Catalog
const CATEGORIES = ['All', 'Automation', 'Safety', 'Tools', 'Accessories']

const PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
    id: `prod-${i}`,
    name: `Industrial Series ${1000 + i * 10}`,
    category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1],
    price: `$${(Math.random() * 500 + 100).toFixed(2)}`,
    status: Math.random() > 0.2 ? 'In Stock' : 'Out of Stock',
    specs: ['24V DC', 'IP67 Rated', 'Aluminum Housing'],
    image: `/assets/industry-0${(i % 5) + 1}.png` // Using existing assets as placeholders
}))

export function StandardCatalog() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const filteredProducts = PRODUCTS.filter(p =>
        (selectedCategory === 'All' || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">N</div>
                        <span className="text-xl font-bold tracking-tight">NEXUS <span className="text-zinc-400 font-normal">Industrial</span></span>
                    </div>

                    {/* Desktop Search & Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search part number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full w-64 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all focus:w-80"
                            />
                            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        <nav className="flex gap-4 text-sm font-medium text-zinc-600">
                            <a href="#" className="hover:text-blue-600 transition-colors">Products</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Solutions</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
                        </nav>
                        <button className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors">
                            Download PDF
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-zinc-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
                    >
                        <div className="p-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full p-2 bg-zinc-100 rounded-md outline-none"
                            />
                            <div className="flex flex-col gap-2">
                                <a href="#" className="py-2 text-zinc-600 border-b border-zinc-100">Products</a>
                                <a href="#" className="py-2 text-zinc-600 border-b border-zinc-100">Solutions</a>
                                <a href="#" className="py-2 text-zinc-600">Support</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
                    <div>
                        <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Categories
                        </h3>
                        <div className="space-y-1">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === cat
                                            ? 'bg-blue-50 text-blue-600 font-semibold'
                                            : 'text-zinc-600 hover:bg-zinc-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-zinc-900 mb-4">Availability</h3>
                        <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer hover:text-zinc-900 pb-2">
                            <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                            In Stock Only
                        </label>
                        <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer hover:text-zinc-900">
                            <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                            New Arrivals
                        </label>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-zinc-500">
                            Showing <span className="font-bold text-zinc-900">{filteredProducts.length}</span> results
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 text-zinc-400">
                            <div className="mb-4">No products found</div>
                            <button
                                onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex items-center p-4 gap-6' : ''
                                        }`}
                                >
                                    {/* Product Image */}
                                    <div className={`${viewMode === 'grid' ? 'aspect-video w-full border-b border-zinc-100' : 'w-24 h-24 rounded-lg border border-zinc-100'} bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200/f4f4f5/a1a1aa?text=No+Image'
                                            }}
                                        />
                                        {product.status === 'In Stock' && (
                                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                                                Stock
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className={`flex-1 ${viewMode === 'grid' ? 'p-5' : ''}`}>
                                        <div className="text-xs font-semibold text-blue-600 mb-1">{product.category}</div>
                                        <h3 className="font-bold text-zinc-900 mb-2 truncate group-hover:text-blue-700 transition-colors">{product.name}</h3>

                                        <div className="space-y-1 mb-4">
                                            {product.specs.slice(0, 2).map((spec, i) => (
                                                <div key={i} className="text-xs text-zinc-500 flex items-center gap-1.5">
                                                    <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                                                    {spec}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <span className="font-bold text-zinc-900">{product.price}</span>
                                            <button className="text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors">
                                                Details <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
