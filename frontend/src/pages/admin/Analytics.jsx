import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  XCircle,
  Calendar,
} from 'lucide-react'

import { getOrders } from "../../services/admin/adminOrderService";
import { getProducts } from "../../services/admin/productService";

function Analytics() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  async function loadAnalytics() {
    try {
      const [orderData, productData] = await Promise.all([
        getOrders(),
        getProducts(),
      ])

      setOrders(orderData)
      setProducts(productData)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load analytics.')
    } finally {
      setLoading(false)
    }
  }

  const analytics = useMemo(() => {
    const revenue = orders
      .filter((o) => o.payment?.status === 'Paid')
      .reduce((sum, order) => sum + Number(order.total || 0), 0)

    const today = new Date()

    const todayOrders = orders.filter((order) => {
      if (!order.createdAt?.seconds) return false

      const date = new Date(order.createdAt.seconds * 1000)

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    })

    const weekOrders = orders.filter((order) => {
      if (!order.createdAt?.seconds) return false

      const date = new Date(order.createdAt.seconds * 1000)

      return today - date <= 7 * 24 * 60 * 60 * 1000
    })

    const monthOrders = orders.filter((order) => {
      if (!order.createdAt?.seconds) return false

      const date = new Date(order.createdAt.seconds * 1000)

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    })

    return {
      revenue,
      averageOrder:
        orders.length === 0
          ? 0
          : Math.round(revenue / orders.length),
      todayOrders: todayOrders.length,
      weekOrders: weekOrders.length,
      monthOrders: monthOrders.length,
      cancelled: orders.filter(
        (o) => o.status === 'Cancelled'
      ).length,
      totalProducts: products.length,
    }
  }, [orders, products])

  const cards = [
    {
      title: 'Revenue',
      value: `₹${analytics.revenue}`,
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Average Order',
      value: `₹${analytics.averageOrder}`,
      icon: TrendingUp,
      color: 'text-blue-500',
    },
    {
      title: "Today's Orders",
      value: analytics.todayOrders,
      icon: Calendar,
      color: 'text-rose-500',
    },
    {
      title: 'This Week',
      value: analytics.weekOrders,
      icon: ShoppingBag,
      color: 'text-orange-500',
    },
    {
      title: 'This Month',
      value: analytics.monthOrders,
      icon: Package,
      color: 'text-indigo-500',
    },
    {
      title: 'Cancelled',
      value: analytics.cancelled,
      icon: XCircle,
      color: 'text-red-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading Analytics...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500">
          Business insights and performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <Icon
                size={36}
                className={`mb-4 ${card.color}`}
              />

              <h2 className="text-4xl font-bold">
                {card.value}
              </h2>

              <p className="mt-2 text-gray-500">
                {card.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Analytics