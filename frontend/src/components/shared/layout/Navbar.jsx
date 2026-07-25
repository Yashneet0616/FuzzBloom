import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, LogOut, ChevronDown, Menu, X } from 'lucide-react'

import { useCart } from '../../../context/CartContext'
import useAuth from '../../../hooks/useAuth'
import { logout } from '../../../services/auth/authService'

// Navigation data
const navigationLinks = [
  { label: 'Collections', to: '/collections' },
  { label: 'Custom Orders', to: '/custom-orders' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const shopCategories = [
  { label: 'All Products', desc: 'Browse entire collection', to: '/shop' },
  { label: 'Bouquets', desc: 'Most Popular', to: '/shop?category=bouquets' },
  { label: 'Flowers', desc: 'Single Stems', to: '/shop?category=flowers' },
  { label: 'Keychains', desc: 'Cute Gifts', to: '/shop?category=keychains' },
  { label: 'Decor & More', desc: 'Home Decor', to: '/shop?category=decor' },
]

const announcementMessages = [
  'Free Shipping on Orders Above ₹999',
  'Handcrafted with Premium Pipe Cleaners',
  'Complimentary Gift Wrapping Available',
  'Custom Floral Creations Made Just for You',
]

const popularSearches = ['Tulips', 'Rose Bouquet', 'Birthday', 'Anniversary', 'Keychains', 'Decor']

function Navbar() {
  const { cartItems } = useCart()
  const { user } = useAuth()

  const [shopOpen, setShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)

  const dropdownTimeout = useRef(null)

  async function handleLogout() {
    try {
      await logout()
      setMobileMenuOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Announcement bar ticker interval - slowed down for a calmer luxury feel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcementMessages.length)
    }, 6800)
    return () => clearInterval(interval)
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || searchOpen ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen, searchOpen])

  // Keyboard support - Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMobileMenuOpen(false)
        setShopOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleEscapeKey)
    return () => window.removeEventListener('keydown', handleEscapeKey)
  }, [])

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current)
      }
    }
  }, [])

  const handleShopMouseEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current)
    }
    setShopOpen(true)
  }

  const handleShopMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShopOpen(false)
    }, 150)
  }

  const handleMobileMenuToggle = () => {
    setShopOpen(false)
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleSearchClose = () => {
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="h-9 w-full border-b border-[#eddaf7] bg-gradient-to-r from-[#f7ebff] via-[#fef9ff] to-[#f7ebff] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnouncementIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] text-[#5b4764]"
          >
            <span>{announcementMessages[currentAnnouncementIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-gray-100 bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,.05)]'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-[1320px] items-center justify-between px-8 xl:px-10">
          
          {/* Logo with Imported Cormorant Garamond */}
          <NavLink to="/" className="flex shrink-0 flex-col relative transition-opacity duration-300 hover:opacity-80">
            <div className="flex items-center">
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-[30px] font-semibold italic tracking-tight text-black"
              >
                FuzzBloom
              </span>
              <span className="absolute -top-1 -right-4 text-sm select-none">🌸</span>
            </div>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-neutral-400 font-medium">
              pipe cleaner magic ✨
            </span>
          </NavLink>

          {/* Center Navigation - Desktop */}
          <nav className="hidden items-center gap-10 lg:flex">
            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleShopMouseEnter}
              onMouseLeave={handleShopMouseLeave}
            >
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `relative text-[15px] font-medium transition-colors duration-300 group flex items-center gap-1 py-2 ${
                    isActive ? 'text-black' : 'text-neutral-800 hover:text-[#c98bef]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Shop
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                    <span className="absolute left-0 -bottom-1 w-full flex items-center justify-center pointer-events-none">
                      <motion.span
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        className="h-0.5 bg-[#d48be9] w-full origin-center"
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </>
                )}
              </NavLink>

              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-12 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_25px_60px_rgba(0,0,0,.12)] py-2"
                    onMouseEnter={handleShopMouseEnter}
                    onMouseLeave={handleShopMouseLeave}
                  >
                    <div className="px-5 pt-2 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      Shop
                    </div>
                    <div className="mx-4 my-2 h-[1px] bg-neutral-100" />
                    {shopCategories.map((category) => (
                      <NavLink
                        key={category.to}
                        to={category.to}
                        onClick={() => setShopOpen(false)}
                        className="flex flex-col px-5 py-2.5 transition-colors hover:bg-purple-50/70"
                      >
                        <span className="text-sm font-semibold text-neutral-800 hover:text-purple-600">
                          {category.label}
                        </span>
                        {category.desc && (
                          <span className="text-[11px] font-medium text-neutral-400">
                            {category.desc}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Navigation Links */}
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[15px] font-medium transition-colors duration-300 py-2 ${
                    isActive ? 'text-black' : 'text-neutral-800 hover:text-[#c98bef]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className="absolute left-0 -bottom-1 w-full flex items-center justify-center pointer-events-none">
                      <motion.span
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        className="h-0.5 bg-[#d48be9] w-full origin-center"
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 transition-colors duration-300 hover:bg-[#f8efff] hover:text-[#bf86f5] rounded-full"
              aria-label="Search"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Account */}
            {!user ? (
              <NavLink
                to="/auth"
                className="p-2.5 transition-colors duration-300 hover:bg-[#f8efff] hover:text-[#bf86f5] rounded-full"
                aria-label="Login to account"
              >
                <User size={22} strokeWidth={1.5} />
              </NavLink>
            ) : (
              <NavLink
                to="/account"
                className="p-2.5 transition-colors duration-300 hover:bg-[#f8efff] hover:text-[#bf86f5] rounded-full"
                aria-label="My account"
              >
                <User size={22} strokeWidth={1.5} />
              </NavLink>
            )}

            {/* Cart */}
            <NavLink 
              to="/cart" 
              className="relative p-2.5 transition-colors duration-300 hover:bg-[#f8efff] hover:text-[#bf86f5] rounded-full"
              aria-label={`Shopping cart with ${cartItems.length} items`}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute right-[3px] top-[3px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#b87ad9] text-[10px] font-semibold text-white shadow-sm ring-2 ring-white">
                  {cartItems.length}
                </span>
              )}
            </NavLink>

            {/* Logout */}
            {user && (
              <button
                onClick={handleLogout}
                className="p-2.5 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 rounded-full"
                aria-label="Logout"
              >
                <LogOut size={22} strokeWidth={1.5} />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2.5 transition-colors duration-300 hover:bg-[#f8efff] rounded-full"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-gray-100 bg-white/95 backdrop-blur-lg"
          >
            <div className="mx-auto max-w-[1320px] px-8 py-6">
              <nav className="flex flex-col gap-6">
                <div>
                  <NavLink
                    to="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[15px] font-medium text-neutral-800 hover:text-[#c98bef] transition-colors block mb-4"
                  >
                    Shop
                  </NavLink>

                  <div className="pl-4 flex flex-col gap-3 border-l border-gray-200">
                    {shopCategories.slice(1).map((category) => (
                      <NavLink
                        key={category.to}
                        to={category.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-medium text-neutral-700 hover:text-[#c98bef] transition-colors flex flex-col"
                      >
                        <span>{category.label}</span>
                        <span className="text-[11px] text-neutral-400">{category.desc}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>

                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[15px] font-medium text-neutral-800 hover:text-[#c98bef] transition-colors"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/25 backdrop-blur-sm pt-28 lg:pt-32"
            onClick={handleSearchClose}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl mx-4 rounded-3xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,.15)]"
            >
              {/* Close Button Top-Right */}
              <button
                onClick={handleSearchClose}
                className="absolute right-6 top-6 p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
                aria-label="Close search"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <h2 className="mb-6 text-2xl font-bold text-black">Search Products</h2>

              <div className="flex items-center gap-3 rounded-full border border-[#e8d4f5] bg-[#faf8fd] px-6 py-4">
                <Search size={22} className="text-[#d48be9]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search bouquets, flowers, keychains..."
                  className="flex-1 bg-transparent outline-none text-[15px] text-gray-800 placeholder:text-gray-500"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <div className="mt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="rounded-full bg-[#f6ebfd] px-5 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-[#ead5fb] hover:text-[#c98bef]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Border */}
      <div className="border-b border-[#f3f3f3]" />
    </>
  )
}

export default Navbar