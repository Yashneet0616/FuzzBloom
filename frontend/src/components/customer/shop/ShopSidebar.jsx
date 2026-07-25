import { SlidersHorizontal } from 'lucide-react'

const CATEGORIES = [
  { id: 'all', label: 'All Products', icon: '💮' },
  { id: 'bouquets', label: 'Bouquets', icon: '💐' },
  { id: 'flowers', label: 'Flowers', icon: '🌷' },
  { id: 'keychains', label: 'Keychains', icon: '🔑' },
  { id: 'decor', label: 'Decor & More', icon: '🪴' },
  { id: 'custom', label: 'Custom Orders', icon: '✨' },
]

function ShopSidebar({ filters, setFilters, clearFilters }) {
  const handleCategoryChange = (categoryId) => {
    setFilters((prev) => ({ ...prev, category: categoryId }))
  }

  return (
    <aside className="w-full shrink-0 md:w-64">
      <div className="sticky top-28 rounded-3xl bg-[#faf8fc] p-6">
        
        {/* Categories */}
        <div className="mb-8">
          <h3 className="mb-4 text-sm font-bold text-[#b774d6]">Categories</h3>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => {
              const isActive = filters.category === cat.id
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#f0e1f7] text-[#9333ea]'
                        : 'text-gray-600 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="mb-4 text-sm font-bold text-[#b774d6]">Price Range</h3>
          <input
            type="range"
            min="199"
            max="1299"
            value={filters.maxPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="h-1.5 w-full appearance-none rounded-full bg-gray-200 accent-[#d48be9]"
          />
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>₹199</span>
            <span>₹{filters.maxPrice}</span>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#ebd5fc] bg-white py-2.5 text-sm font-semibold text-[#b774d6] transition-colors hover:bg-[#faf8fc]"
        >
          Clear Filters
          <SlidersHorizontal size={14} />
        </button>
      </div>
    </aside>
  )
}

export default ShopSidebar