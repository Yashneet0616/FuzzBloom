import { Link } from 'react-router-dom'
import {
  User,
  MapPin,
  Package,
  ChevronRight,
} from 'lucide-react'
import useAuth from '../../hooks/useAuth'

function Dashboard() {
  const { profile } = useAuth()

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          My Account
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back,
          {' '}
          <span className="font-semibold text-pink-600">
            {profile?.firstName || 'Customer'}
          </span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          to="/account/profile"
          className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <User
            className="mb-4 text-pink-500"
            size={34}
          />

          <h2 className="text-xl font-semibold">
            Profile
          </h2>

          <p className="mt-2 text-gray-500">
            Update your personal information.
          </p>

          <ChevronRight className="mt-5" />
        </Link>

        <Link
          to="/account/addresses"
          className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <MapPin
            className="mb-4 text-pink-500"
            size={34}
          />

          <h2 className="text-xl font-semibold">
            Addresses
          </h2>

          <p className="mt-2 text-gray-500">
            Manage delivery addresses.
          </p>

          <ChevronRight className="mt-5" />
        </Link>

        <Link
          to="/account/orders"
          className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <Package
            className="mb-4 text-pink-500"
            size={34}
          />

          <h2 className="text-xl font-semibold">
            Orders
          </h2>

          <p className="mt-2 text-gray-500">
            View your purchase history.
          </p>

          <ChevronRight className="mt-5" />
        </Link>
      </div>
    </div>
  )
}

export default Dashboard