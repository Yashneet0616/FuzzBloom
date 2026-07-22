import { useLocation, Link } from 'react-router-dom'

function OrderSuccess() {
  const { state } = useLocation()

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-rose-50 px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>

        <p className="mb-6 text-stone-600">
          Thank you for shopping with FuzzBloom.
        </p>

        <div className="mb-8 rounded-2xl bg-rose-50 p-5">
          <p className="text-sm text-stone-500">
            Order ID
          </p>

          <p className="mt-2 text-2xl font-bold text-rose-600">
            {state?.orderId || 'Not Available'}
          </p>
        </div>

        <Link
          to="/shop"
          className="rounded-xl bg-rose-500 px-6 py-3 text-white hover:bg-rose-600"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}

export default OrderSuccess