import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const image =
    product.images?.[0]?.url ??
    product.images?.[0] ??
    product.image ??
    '/placeholder-product.png'

  const formattedPrice = new Intl.NumberFormat('en-IN').format(product.price ?? 0)
  const isNew = product.isNew || false

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link
      to={`/product/${product._id || product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        {isNew && (
          <div className="absolute left-3 top-3 rounded-full bg-[#d48be9] px-3 py-1 text-xs font-semibold tracking-wider text-white shadow-sm">
            New
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-4">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="mt-1 text-[15px] font-bold text-gray-900">
          ₹{formattedPrice}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f7ebff] py-2.5 text-sm font-semibold text-[#a855f7] transition-colors hover:bg-[#ebd5fc]"
        >
          <ShoppingCart size={16} />
          Add to cart
        </button>
      </div>
    </Link>
  )
}

export default ProductCard