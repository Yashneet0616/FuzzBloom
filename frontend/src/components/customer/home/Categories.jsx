import { Link } from 'react-router-dom'
import SectionTitle from '../../shared/ui/SectionTitle'

const categories = [
  {
    name: 'Bouquets',
    emoji: '💐',
    link: '/shop',
  },
  {
    name: 'Flower Pots',
    emoji: '🪴',
    link: '/shop',
  },
  {
    name: 'Lamps',
    emoji: '💡',
    link: '/shop',
  },
  {
    name: 'Keychains',
    emoji: '🔑',
    link: '/shop',
  },
]

function Categories() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          subtitle="Collections"
          title="Explore Our Categories"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="rounded-3xl border border-rose-100 bg-rose-50 p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-6xl">
                {category.emoji}
              </div>

              <h3 className="text-2xl font-semibold text-stone-800">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories