import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/shared/ui/Button'
import { useCart } from '../../context/CartContext'
import { getProductById } from '../../services/customer/customerProductService'  

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)        
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <section className="bg-rose-50 py-20 text-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="bg-rose-50 py-20 text-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </section>
    )
  }

  return (
    <section className="bg-rose-50 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        <div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {product.category}
          </p>

          <h1
            className="mb-6 text-5xl font-bold text-stone-800"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {product.name}
          </h1>

          <p className="mb-6 text-3xl font-bold text-rose-500">
            ₹{product.price}
          </p>

          <p className="mb-10 leading-8 text-stone-600">
            {product.description}
          </p>

          <Button onClick={() => addToCart(product)}>
            Add to Cart
          </Button>

        </div>

      </div>
    </section>
  )
}

export default ProductDetails