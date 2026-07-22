import { FileText } from 'lucide-react'

function PolicySettings({ settings, onChange }) {
  const policies = settings.policies

  const fields = [
    {
      key: 'shipping',
      title: 'Shipping Policy',
      placeholder: 'Write your shipping policy...',
    },
    {
      key: 'returns',
      title: 'Return & Refund Policy',
      placeholder: 'Write your return policy...',
    },
    {
      key: 'privacy',
      title: 'Privacy Policy',
      placeholder: 'Write your privacy policy...',
    },
    {
      key: 'terms',
      title: 'Terms & Conditions',
      placeholder: 'Write your terms and conditions...',
    },
  ]

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <FileText
          size={28}
          className="text-indigo-500"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Website Policies
          </h2>

          <p className="text-sm text-gray-500">
            Manage the legal and informational pages shown on your website.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {fields.map(({ key, title, placeholder }) => (
          <div key={key}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {title}
            </label>

            <textarea
              rows={6}
              value={policies[key]}
              placeholder={placeholder}
              onChange={(e) =>
                onChange(
                  'policies',
                  key,
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default PolicySettings