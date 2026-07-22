  import { useEffect, useMemo, useState } from 'react'
  import toast from 'react-hot-toast'

  import SummaryCards from '../../components/admin/dashboard/SummaryCards'
  import ActiveOrders from '../../components/admin/dashboard/ActiveOrders'
  import QuickActions from '../../components/admin/dashboard/QuickActions'

  import {
    Package,
    ShoppingBag,
    PlusCircle,
    Users,
  } from 'lucide-react'

  import { getOrders } from '../../services/adminOrderService'
  import { getProducts } from '../../services/productService'

  function Dashboard() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      loadDashboard()
    }, [])

    async function loadDashboard() {
      try {
        const [orderData, productData] = await Promise.all([
          getOrders(),
          getProducts(),
        ])

        setOrders(orderData)
        setProducts(productData)
      } catch (error) {
        console.error(error)
        toast.error('Failed to load dashboard.')
      } finally {
        setLoading(false)
      }
    }

    const stats = useMemo(() => {
      const revenue = orders
        .filter((o) => o.payment?.status === 'Paid')
        .reduce((sum, order) => sum + Number(order.total || 0), 0)

      return {
        totalOrders: orders.length,
        totalProducts: products.length,
        revenue,
        pending: orders.filter((o) => o.status === 'Pending').length,
        preparing: orders.filter((o) => o.status === 'Preparing').length,
        shipped: orders.filter((o) => o.status === 'Shipped').length,
        delivered: orders.filter((o) => o.status === 'Delivered').length,
        cancelled: orders.filter((o) => o.status === 'Cancelled').length,
      }
    }, [orders, products])

    const business = useMemo(() => {
      return {
        averageOrder:
          orders.length === 0
            ? 0
            : Math.round(stats.revenue / orders.length),
      }
    }, [orders, stats])

    const recentOrders = orders.slice(0, 5)

    const quickActions = [
      {
        title: 'Products',
        icon: Package,
        link: '/admin/products',
      },
      {
        title: 'Add Product',
        icon: PlusCircle,
        link: '/admin/products/add',
      },
      {
        title: 'Orders',
        icon: ShoppingBag,
        link: '/admin/orders',
      },
      {
        title: 'Settings',
        icon: Users,
        link: '/admin/settings',
      },
    ]

    if (loading) {
      return (
        <div className="flex h-96 items-center justify-center text-lg font-medium text-gray-500">
          Loading Dashboard...
        </div>
      )
    }

    return (
      <>
        <SummaryCards
          stats={stats}
          business={business}
        />

        <ActiveOrders
          stats={stats}
          recentOrders={recentOrders}
        />

        <QuickActions
          actions={quickActions}
        />
      </>
    )
  }

  export default Dashboard