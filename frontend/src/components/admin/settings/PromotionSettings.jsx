import { BadgePercent, Calendar, Ticket } from 'lucide-react'

function PromotionSettings() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <BadgePercent
          size={28}
          className="text-emerald-500"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Promotions
          </h2>

          <p className="text-sm text-gray-500">
            Create and manage promotional offers.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Coupon Code
          </label>

          <div className="relative">
            <Ticket
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="WELCOME10"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Discount (%)
          </label>

          <input
            type="number"
            placeholder="10"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Start Date
          </label>

          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            End Date
          </label>

          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <label className="mt-6 flex items-center justify-between rounded-xl border p-4">
        <div>
          <h3 className="font-medium text-gray-800">
            Promotion Active
          </h3>

          <p className="text-sm text-gray-500">
            Enable or disable this promotion.
          </p>
        </div>

        <input
          type="checkbox"
          className="h-5 w-5"
          defaultChecked
        />
      </label>
    </section>
  )
}

export default PromotionSettings