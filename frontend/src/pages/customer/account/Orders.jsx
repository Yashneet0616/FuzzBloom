import { useEffect, useState } from 'react'
import {
  Package,
  ShoppingBag,
  Calendar,
  CreditCard,
} from 'lucide-react'
import toast from 'react-hot-toast'

import { getOrders } from '../../../services/customer/orderService'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (error) {
        console.error(error)
        toast.error(error.message || 'Failed to load orders.')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        Loading orders...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Track and review your previous purchases.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white p-12 text-center">
          <ShoppingBag
            size={60}
            className="mx-auto mb-5 text-pink-400"
          />

          <h2 className="text-2xl font-semibold">
            No Orders Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Your completed purchases will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Package
                      size={20}
                      className="text-pink-500"
                    />

                    <h2 className="font-semibold">
                      {order.orderNumber}
                    </h2>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />

                      <span>
                        {order.createdAt?.seconds
                          ? new Date(
                              order.createdAt.seconds * 1000
                            ).toLocaleDateString()
                          : '-'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CreditCard size={16} />

                      <span>
                        {order.payment?.status ||
                          'Paid'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-500">
                    Status
                  </p>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {order.status}
                  </span>

                  <p className="mt-5 text-2xl font-bold text-pink-600">
                    ₹{Number(order.total).toFixed(2)}
                  </p>
                </div>
              </div>

              {order.items?.length > 0 && (
                <div className="mt-6 border-t pt-5">
                  <h3 className="mb-4 font-semibold">
                    Items
                  </h3>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-14 w-14 rounded-xl object-cover"
                          />

                          <div>
                            <p className="font-medium">
                              {item.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <span className="font-medium">
                          ₹
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders