import {
  Package,
  CircleDollarSign,
  TrendingUp,
} from 'lucide-react'

import SummaryCard from './SummaryCard'

function SummaryCards({
  stats,
  business,
}) {
  const cards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'text-rose-500',
    },
    {
      title: 'Revenue',
      value: `₹${stats.revenue}`,
      icon: CircleDollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-indigo-500',
    },
    {
      title: 'Avg Order Value',
      value: `₹${business.averageOrder}`,
      icon: TrendingUp,
      color: 'text-orange-500',
    },
  ]

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </section>
  )
}

export default SummaryCards