import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProduct } from '../../context/ProductContext'

import ShopSidebar from '../../components/customer/shop/ShopSidebar'
import ProductCard from '../../components/customer/shop/ProductCard'
import FeatureStrip from '../../components/customer/shop/FeatureStrip'

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

function Shop() {
  const { products, loading } = useProduct()
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    maxPrice: 1299,
    searchQuery: '',
  })

  const [sortBy, setSortBy] = useState('newest')

  // Safely update URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (filters.category === 'all') {
      params.delete('category')
    } else {
      params.set('category', filters.category)
    }
    setSearchParams(params, { replace: true })
  }, [filters.category, searchParams, setSearchParams])

  const clearFilters = () => {
    setFilters({
      category: 'all',
      maxPrice: 1299,
      searchQuery: '',
    })
  }

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category Filter
    if (filters.category !== 'all') {
      result = result.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Search Filter
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase()
      result = result.filter(
        (p) => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      )
    }

    // Price Filter
    result = result.filter((p) => (p.price ?? 0) <= filters.maxPrice)

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        break
      case 'price-desc':
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        // Safely breaking without assuming createdAt exists yet
        break
    }

    return result
  }, [products, filters, sortBy])

  useEffect(() => {
    document.title = 'Shop | FuzzBloom'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white pb-20 pt-8">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-[#c894e1]">
          <Link to="/" className="hover:text-purple-700">Home</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-800">Shop</span>
        </nav>

        {/* Header Section */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-gray-100 pb-8 lg:flex-row lg:items-end">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight text-gray-900">
              our collection
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d48be9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </h1>
            <p className="mt-2 text-[15px] font-medium text-gray-500">
              Handmade with love, crafted to bring smiles.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-[#c98bef] focus:border-[#c98bef] focus:bg-white focus:ring-1 focus:ring-[#c98bef]"
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-gray-700 outline-none transition-colors hover:border-[#c98bef] focus:border-[#c98bef] focus:ring-1 focus:ring-[#c98bef]"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A-Z</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar */}
          <ShopSidebar filters={filters} setFilters={setFilters} clearFilters={clearFilters} />

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Meta bar */}
            {!loading && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> products
                </p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="aspect-[4/5] w-full animate-pulse bg-gray-100" />
                    <div className="flex flex-col p-4">
                      <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                      <div className="mb-4 h-5 w-1/3 animate-pulse rounded bg-gray-200" />
                      <div className="h-10 w-full animate-pulse rounded-xl bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div key={product._id || product.id} variants={itemVariants} layout>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 py-32 text-center"
              >
                <span className="text-4xl">🌸</span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">No products found</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-sm">
                  We couldn't find any items matching your search. Try another category or adjust your search.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-[#f7ebff] px-6 py-2.5 text-sm font-semibold text-[#a855f7] transition-colors hover:bg-[#ebd5fc]"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <FeatureStrip />
      </div>
    </div>
  )
}

export default Shop