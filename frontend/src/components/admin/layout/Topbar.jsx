import { Bell, UserCircle2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/admin/dashboard': {
    title: 'Dashboard',
    subtitle: 'Manage your flower business efficiently.',
  },
  '/admin/products': {
    title: 'Products',
    subtitle: 'Manage your flower catalog.',
  },
  '/admin/products/add': {
    title: 'Add Product',
    subtitle: 'Create a new handmade flower product.',
  },
  '/admin/orders': {
    title: 'Orders',
    subtitle: 'Track and manage customer orders.',
  },
  '/admin/settings': {
    title: 'Settings',
    subtitle: 'Manage your business preferences.',
  },
}

function Topbar() {
  const { pathname } = useLocation()

  const page =
    pageTitles[pathname] || {
      title: 'Admin Panel',
      subtitle: 'Welcome back!',
    }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-rose-100 bg-white px-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {page.title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {page.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-xl p-3 transition hover:bg-rose-50">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2">
          <UserCircle2 className="h-10 w-10 text-rose-500" />

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              FuzzBloom
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar