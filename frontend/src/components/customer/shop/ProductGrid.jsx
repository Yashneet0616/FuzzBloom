      import ProductCard from '../../admin/products/ProductCard'
      import useProducts from '../../../hooks/useProducts.js'

      function ProductGrid() {
        const { products, loading, error } = useProducts()

        if (loading) {
          return (
            <div className="py-20 text-center text-2xl font-semibold text-stone-600">
              Loading products...
            </div>
          )
        }

        if (error) {
          return (
            <div className="py-20 text-center text-red-500">
              Failed to load products.
            </div>
          )
        }

        if (products.length === 0) {
          return (
            <div className="py-20 text-center text-2xl text-stone-500">
              No products available.
            </div>
          )
        }

        return (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )
      }

      export default ProductGrid