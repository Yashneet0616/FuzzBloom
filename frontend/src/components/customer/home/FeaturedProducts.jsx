  import SectionTitle from '../../shared/ui/SectionTitle'
  import ProductCard from '../../admin/products/ProductCard'
  import useProducts from '../../../hooks/useCustomerProducts.js'

  function FeaturedProducts() {
    const { products, loading, error } = useProducts()

    if (loading) {
      return (
        <section className="bg-rose-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle
              subtitle="Best Sellers"
              title="Featured Products"
            />

            <p className="text-center text-xl text-stone-600">
              Loading products...
            </p>
          </div>
        </section>
      )
    }

    if (error) {
      return (
        <section className="bg-rose-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle
              subtitle="Best Sellers"
              title="Featured Products"
            />

            <p className="text-center text-red-500">
              Failed to load products.
            </p>
          </div>
        </section>
      )
    }

    return (
      <section className="bg-rose-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            subtitle="Best Sellers"
            title="Featured Products"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  export default FeaturedProducts