import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react'

import { useCart } from '../../../context/CartContext'
import useAuth from '../../../hooks/useAuth'
import { logout } from '../../../services/auth/authService'

// Uncomment when you have the logo
// import Logo from '../../../assets/logo/fuzzbloom-logo.png'

function Navbar() {
  const { cartItems } = useCart()
  const { user, profile } = useAuth()

  const [shopOpen, setShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [scrolled, setScrolled] = useState(false)

  async function handleLogout() {
    try {
      await logout()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = ({ isActive }) =>
    `relative text-[15px] font-medium transition duration-300 ${
      isActive
        ? 'text-black'
        : 'text-black hover:text-purple-500'
    }`

  return (
    <>
      {/* Announcement Bar */}

      <div className="h-8 w-full bg-[#ead4f6]">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-center gap-3 px-6 text-[13px] font-medium tracking-wide text-black">
          <span>🎀</span>

          <span>Free shipping on orders above ₹999</span>

          <span className="text-gray-500">|</span>

          <span>Handmade with Love 🧡</span>
        </div>
      </div>

      {/* Header */}

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-gray-100 bg-white/95 shadow-md backdrop-blur-lg'
            : 'bg-white'
        }`}
      >
        <div className="mx-auto flex h-[88px] max-w-[1280px] items-center justify-between px-8">

          {/* Logo */}

          <NavLink
            to="/"
            className="flex flex-col"
          >
            {/* Replace this with image later */}

            {/* <img src={Logo} className="w-[170px]" /> */}

            <span className="text-[44px] font-black leading-none tracking-tight text-black">
              FuzzBloom
            </span>

            <span className="mt-1 text-[13px] tracking-[0.25em] text-black">
              Pipe cleaner magic ✨
            </span>
          </NavLink>

          {/* Center Navigation */}

          <nav className="hidden items-center gap-12 lg:flex">

            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-black transition hover:text-purple-500">
                Shop

                <ChevronDown
                  size={15}
                  strokeWidth={2.3}
                />
              </button>

              <AnimatePresence>

                {shopOpen && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="absolute left-0 top-10 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
                  >
                    <NavLink
                      to="/shop"
                      className="block px-5 py-3 hover:bg-purple-50"
                    >
                      All Products
                    </NavLink>

                    <NavLink
                      to="/shop?category=bouquets"
                      className="block px-5 py-3 hover:bg-purple-50"
                    >
                      Bouquets
                    </NavLink>

                    <NavLink
                      to="/shop?category=flowers"
                      className="block px-5 py-3 hover:bg-purple-50"
                    >
                      Flowers
                    </NavLink>

                    <NavLink
                      to="/shop?category=keychains"
                      className="block px-5 py-3 hover:bg-purple-50"
                    >
                      Keychains
                    </NavLink>

                    <NavLink
                      to="/shop?category=decor"
                      className="block px-5 py-3 hover:bg-purple-50"
                    >
                      Decor
                    </NavLink>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            <NavLink
              to="/custom-orders"
              className={navClass}
            >
              Custom Orders
            </NavLink>

            <NavLink
              to="/about"
              className={navClass}
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={navClass}
            >
              Contact
            </NavLink>

          </nav>

          {/* Right Side */}

          <div className="flex items-center gap-8">

            {/* Search */}

            <button
              onClick={() => setSearchOpen(true)}
              className="transition hover:scale-110"
            >
              <Search
                size={24}
                strokeWidth={2}
              />
            </button>

            {/* Account */}

            {!user ? (

              <NavLink
                to="/auth"
                className="transition hover:scale-110"
              >
                <User
                  size={24}
                  strokeWidth={2}
                />
              </NavLink>

            ) : (

              <NavLink
                to="/account"
                className="flex items-center gap-2 rounded-full border border-[#efc8ea] px-5 py-2 transition hover:bg-pink-50"
              >
                <User size={18} />

                <span className="max-w-[90px] truncate font-medium">
                  {profile?.firstName || 'Account'}
                </span>

              </NavLink>

            )}

            {/* Cart */}

            <NavLink
              to="/cart"
              className="relative transition hover:scale-110"
            >
              <ShoppingBag
                size={24}
                strokeWidth={2}
              />

              {cartItems.length > 0 && (

                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d48be9] text-[10px] font-bold text-white">

                  {cartItems.length}

                </span>

              )}

            </NavLink>

            {/* Logout */}

            {user && (

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 transition hover:text-red-500"
              >
                <LogOut size={19} />

                Logout

              </button>

            )}

          </div>

        </div>

      </header>

      {/* Search Popup */}

      <AnimatePresence>

        {searchOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[999] flex items-start justify-center bg-black/40 pt-28"
            onClick={() => setSearchOpen(false)}
          >

            <motion.div
              initial={{
                y: -30,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -30,
                opacity: 0,
              }}
              transition={{
                duration: .25,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl"
            >

              <h2 className="mb-6 text-2xl font-bold">
                Search Products
              </h2>

              <div className="flex items-center gap-3 rounded-full border border-[#e8d4f5] px-6 py-4">

                <Search
                  size={22}
                  className="text-purple-500"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search bouquets, flowers, keychains..."
                  className="flex-1 bg-transparent outline-none"
                  autoFocus
                />

              </div>

              <div className="mt-8">

                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Popular Searches
                </p>

                <div className="flex flex-wrap gap-3">

                  {[
                    'Tulips',
                    'Rose Bouquet',
                    'Birthday',
                    'Anniversary',
                    'Keychains',
                    'Decor'
                  ].map((item) => (

                    <button
                      key={item}
                      className="rounded-full bg-[#f6ebfd] px-5 py-2 transition hover:bg-[#ead5fb]"
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </div>

              <button
                onClick={() => setSearchOpen(false)}
                className="mt-8 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Close Search
              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
            {/* Optional Bottom Border */}

      <div className="border-b border-[#f3f3f3]" />
    </>
  )
}

export default Navbar