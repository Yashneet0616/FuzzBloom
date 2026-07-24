function ShopFilters() {
  return (
    <div className="mb-12 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <input
        type="text"
        placeholder="Search flowers..."
        className="w-full rounded-2xl border border-rose-100 px-5 py-3 outline-none transition focus:border-rose-400 md:max-w-sm"
      />

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Category */}
        <select className="rounded-2xl border border-rose-100 px-5 py-3 outline-none focus:border-rose-400">
          <option>All Categories</option>
          <option>Bouquets</option>
          <option>Flower Pots</option>
          <option>Mini Pots</option>
          <option>Lamps</option>
          <option>Keychains</option>
        </select>

        {/* Sort */}
        <select className="rounded-2xl border border-rose-100 px-5 py-3 outline-none focus:border-rose-400">
          <option>Sort By</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Name: A-Z</option>
        </select>
      </div>
    </div>
  )
}

export default ShopFilters