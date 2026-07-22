import { HeartHandshake, Gift, Leaf, Sparkles } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const features = [
  {
    icon: HeartHandshake,
    title: 'Handmade with Love',
    description:
      'Every flower is carefully handcrafted to make every gift truly special.',
  },
  {
    icon: Gift,
    title: 'Perfect for Gifting',
    description:
      'Ideal for birthdays, anniversaries, weddings and every celebration.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description:
      'Beautiful creations made with reusable materials that last for years.',
  },
  {
    icon: Sparkles,
    title: 'Unique Designs',
    description:
      'Every arrangement is crafted with attention to detail and creativity.',
  },
]

function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Crafted with Passion, Made to Last"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-3xl bg-rose-50 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                  <Icon className="h-8 w-8 text-rose-500" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-stone-800">
                  {feature.title}
                </h3>

                <p className="text-stone-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs