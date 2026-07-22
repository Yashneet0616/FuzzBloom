import {
  Mail,
  Phone,
  MessageCircle,
  Link,
} from 'lucide-react'

function ContactSettings({ settings, onChange }) {
  const contact = settings.contact

  const fields = [
    {
      icon: Mail,
      label: 'Email',
      field: 'email',
      type: 'email',
      placeholder: 'support@fuzzbloom.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      field: 'phone',
      type: 'text',
      placeholder: '+91 9876543210',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      field: 'whatsapp',
      type: 'text',
      placeholder: '+91 9876543210',
    },
    {
      icon: Link,
      label: 'Instagram',
      field: 'instagram',
      type: 'text',
      placeholder: 'https://instagram.com/yourstore',
    },
  ]

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Contact Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          These details will appear on your website.
        </p>
      </div>

      <div className="space-y-5">
        {fields.map(
          ({
            icon: Icon,
            label,
            field,
            type,
            placeholder,
          }) => (
            <div key={field}>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon
                  size={18}
                  className="text-rose-500"
                />
                {label}
              </label>

              <input
                type={type}
                value={contact[field]}
                placeholder={placeholder}
                onChange={(e) =>
                  onChange(
                    'contact',
                    field,
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-500"
              />
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default ContactSettings