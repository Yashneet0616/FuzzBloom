import { NavLink } from 'react-router-dom'
import { ShoppingCart, User, LogOut } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import useAuth from '../../hooks/useAuth'
import { logout } from '../../services/authService'

function Navbar() {
  const { cartItems } = useCart()
  const { user, profile } = useAuth()

  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <NavLink
          to="/"
          className="text-2xl font-bold text-pink-600"
        >
          🌸 FuzzBloom
        </NavLink>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-pink-600'
                : 'text-gray-700 hover:text-pink-600'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-pink-600'
                : 'text-gray-700 hover:text-pink-600'
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-pink-600'
                : 'text-gray-700 hover:text-pink-600'
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-pink-600'
                : 'text-gray-700 hover:text-pink-600'
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-6">
          <NavLink
            to="/cart"
            className="relative flex items-center"
          >
            <ShoppingCart size={22} />

            {cartItems.length > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          {!user ? (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="font-medium text-gray-700 hover:text-pink-600"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="rounded-full bg-pink-500 px-5 py-2 font-medium text-white transition hover:bg-pink-600"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to="/account"
                className="flex items-center gap-2 rounded-full border border-pink-200 px-4 py-2 transition hover:bg-pink-50"
              >
                <User size={18} />

                <span>
                  {profile?.firstName || 'Account'}
                </span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 transition hover:text-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar