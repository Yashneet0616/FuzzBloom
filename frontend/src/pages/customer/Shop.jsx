import ProductGrid from '../../components/customer/shop/ProductGrid'
import ShopFilters from '../../components/customer/shop/ShopFilters'
import SectionTitle from '../../components/shared/ui/SectionTitle'

function Shop() {
  return (
    <section className="bg-rose-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          subtitle="Our Collection"
          title="Shop Handmade Flowers"
        />

        <ShopFilters />

        <ProductGrid />
      </div>
    </section>
  )
}

export default Shop