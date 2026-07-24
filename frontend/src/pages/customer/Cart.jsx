import { Link } from 'react-router-dom'
import Button from '../../components/shared/ui/Button'
import { useCart } from '../../context/CartContext'

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <section className="bg-rose-50 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="mb-4 text-5xl font-bold text-stone-800"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Your Cart is Empty
          </h1>

          <p className="mb-8 text-stone-600">
            Add some beautiful handmade flowers to your cart.
          </p>

          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-rose-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h1
          className="mb-10 text-5xl font-bold text-stone-800"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-white p-6 shadow-sm md:flex-row"
            >
              <div className="flex items-center gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="text-2xl font-semibold text-stone-800">
                    {item.name}
                  </h2>

                  <p className="text-stone-500">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  −
                </Button>

                <span className="text-xl font-semibold">
                  {item.quantity}
                </span>

                <Button
                  variant="secondary"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </Button>
              </div>

              <Button
                variant="secondary"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-stone-800">
                Total
              </h2>

              <span className="text-3xl font-bold text-rose-500">
                ₹{total}
              </span>
            </div>

            <div className="flex justify-end">
              <Link to="/checkout">
                <Button>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart