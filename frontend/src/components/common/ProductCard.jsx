import { Link } from 'react-router-dom'
import Button from '../ui/Button'

function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover"
        />
      </Link>

      <div className="space-y-4 p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-2xl font-semibold text-stone-800 transition hover:text-rose-500">
            {product.name}
          </h3>
        </Link>

        <p className="text-stone-500">
          {product.category}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-rose-500">
            ₹{product.price}
          </span>

          <Link to={`/product/${product.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard