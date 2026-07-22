import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Flower2,
} from 'lucide-react'

function Sidebar() {
  const navigate = useNavigate()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: Package,
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: BarChart3,
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin')

    navigate('/admin/login')
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-rose-100 bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-rose-100 px-6">
        <div className="rounded-xl bg-rose-100 p-2">
          <Flower2 className="h-6 w-6 text-rose-600" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-gray-800">
            FuzzBloom
          </h1>

          <p className="text-xs text-gray-500">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-rose-100 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar