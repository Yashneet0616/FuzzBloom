import { Heart, Leaf, Gift, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: <Heart size={28} strokeWidth={1.5} />,
    title: '100% Handmade',
    description: 'crafted with love',
  },
  {
    icon: <Leaf size={28} strokeWidth={1.5} />,
    title: 'Eco-Friendly',
    description: 'safe for you & the planet',
  },
  {
    icon: <Gift size={28} strokeWidth={1.5} />,
    title: 'Perfect for Gifting',
    description: 'for every emotion & occasion',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: 'Made to Last',
    description: 'timeless keepsakes, not just things',
  },
]

function FeatureStrip() {
  return (
    <div className="mt-16 overflow-hidden rounded-3xl border border-[#ebd5fc] bg-[#fdfcff]">
      <div className="grid grid-cols-1 divide-y divide-[#ebd5fc] md:grid-cols-2 md:divide-y-0 md:divide-x lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4 px-8 py-8">
            <div className="text-gray-800">
              {feature.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
              <p className="mt-0.5 text-xs font-medium text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureStrip