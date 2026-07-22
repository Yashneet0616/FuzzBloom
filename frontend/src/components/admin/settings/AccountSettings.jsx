import { User, Mail, Lock, LogOut } from 'lucide-react'

function AccountSettings() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <User size={28} className="text-green-500" />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Account
          </h2>

          <p className="text-sm text-gray-500">
            Manage your administrator account.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Admin Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="admin@fuzzbloom.com"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            New Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-green-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700">
          Change Password
        </button>

        <button className="rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600">
          Logout
        </button>
      </div>
    </section>
  )
}

export default AccountSettings