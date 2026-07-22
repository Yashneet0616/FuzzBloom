import { Link } from 'react-router-dom'
import {
  Clock3,
  ClipboardList,
  Truck,
  CheckCircle2,
} from 'lucide-react'

function ActiveOrders({ stats, recentOrders }) {
  const statusCards = [
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock3,
      color: 'text-yellow-500',
    },
    {
      title: 'Preparing',
      value: stats.preparing,
      icon: ClipboardList,
      color: 'text-indigo-500',
    },
    {
      title: 'Shipped',
      value: stats.shipped,
      icon: Truck,
      color: 'text-cyan-500',
    },
    {
      title: 'Delivered',
      value: stats.delivered,
      icon: CheckCircle2,
      color: 'text-emerald-500',
    },
  ]

  return (
    <section className="mt-10 space-y-8">
      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statusCards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <Icon
                size={34}
                className={`mb-4 ${card.color}`}
              />

              <h2 className="text-4xl font-bold">
                {card.value}
              </h2>

              <p className="text-gray-500">
                {card.title}
              </p>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Recent Orders
          </h2>

          <Link
            to="/admin/orders"
            className="font-medium text-rose-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">
            No orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">
                    Order
                  </th>

                  <th className="py-3 text-left">
                    Customer
                  </th>

                  <th className="py-3 text-left">
                    Amount
                  </th>

                  <th className="py-3 text-left">
                    Payment
                  </th>

                  <th className="py-3 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-rose-50"
                  >
                    <td className="py-4 font-medium">
                      {order.orderNumber}
                    </td>

                    <td className="py-4">
                      {order.customer?.name}
                    </td>

                    <td className="py-4">
                      ₹{order.total}
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.payment?.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.payment?.status || 'Pending'}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default ActiveOrders