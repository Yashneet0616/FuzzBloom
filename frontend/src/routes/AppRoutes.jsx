import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import CustomerProtectedRoute from './CustomerProtectedRoute'

/* Customer Pages */
import Home from '../pages/customer/Home'
import Shop from '../pages/customer/Shop'
import ProductDetails from '../pages/customer/ProductDetails'
import Cart from '../pages/customer/Cart'
import Checkout from '../pages/customer/Checkout'
import OrderSuccess from '../pages/customer/OrderSuccess'
import About from '../pages/customer/About'
import Contact from '../pages/customer/Contact'

/* Customer Authentication */
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import ForgotPassword from '../pages/auth/ForgotPassword'

/* Account Pages */
import AccountDashboard from '../pages/account/Dashboard'
import Profile from '../pages/account/Profile'
import Addresses from '../pages/account/Addresses'
import OrdersHistory from '../pages/account/Orders'

/* Admin Pages */
import AdminLogin from '../pages/admin/Login'
import Dashboard from '../pages/admin/Dashboard'
import Products from '../pages/admin/Products'
import AddProduct from '../pages/admin/AddProduct'
import EditProduct from '../pages/admin/EditProduct'
import Orders from '../pages/admin/Orders'
import Analytics from '../pages/admin/Analytics'
import Settings from '../pages/admin/Settings'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={
              <CustomerProtectedRoute>
                <Checkout />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <CustomerProtectedRoute>
                <OrderSuccess />
              </CustomerProtectedRoute>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Customer Account */}

          <Route
            path="/account"
            element={
              <CustomerProtectedRoute>
                <AccountDashboard />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/account/profile"
            element={
              <CustomerProtectedRoute>
                <Profile />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/account/addresses"
            element={
              <CustomerProtectedRoute>
                <Addresses />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/account/orders"
            element={
              <CustomerProtectedRoute>
                <OrdersHistory />
              </CustomerProtectedRoute>
            }
          />
        </Route>

        {/* Customer Auth */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Admin Login */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="products/add"
            element={<AddProduct />}
          />

          <Route
            path="products/edit/:id"
            element={<EditProduct />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes