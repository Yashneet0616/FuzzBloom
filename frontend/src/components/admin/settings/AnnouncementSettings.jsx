import { Megaphone } from 'lucide-react'

function AnnouncementSettings({ settings, onChange }) {
  const announcement = settings.announcement

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Megaphone
          size={28}
          className="text-amber-500"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Announcement Bar
          </h2>

          <p className="text-sm text-gray-500">
            Display a promotional banner above the navbar.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <label className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <h3 className="font-medium text-gray-800">
              Enable Announcement
            </h3>

            <p className="text-sm text-gray-500">
              Show or hide the announcement bar.
            </p>
          </div>

          <input
            type="checkbox"
            checked={announcement.enabled}
            onChange={(e) =>
              onChange(
                'announcement',
                'enabled',
                e.target.checked
              )
            }
            className="h-5 w-5"
          />
        </label>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Announcement Text
          </label>

          <input
            type="text"
            value={announcement.text}
            onChange={(e) =>
              onChange(
                'announcement',
                'text',
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Background Color
            </label>

            <input
              type="color"
              value={announcement.backgroundColor}
              onChange={(e) =>
                onChange(
                  'announcement',
                  'backgroundColor',
                  e.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Text Color
            </label>

            <input
              type="color"
              value={announcement.textColor}
              onChange={(e) =>
                onChange(
                  'announcement',
                  'textColor',
                  e.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-gray-300 p-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Redirect Link
          </label>

          <input
            type="text"
            value={announcement.link}
            onChange={(e) =>
              onChange(
                'announcement',
                'link',
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-500"
          />
        </div>

        <div className="rounded-xl border-l-4 border-amber-500 bg-gray-50 p-4">
          <div
            className="rounded-lg px-4 py-3 text-center font-semibold"
            style={{
              background: announcement.backgroundColor,
              color: announcement.textColor,
            }}
          >
            {announcement.enabled
              ? announcement.text
              : 'Announcement Disabled'}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnnouncementSettings