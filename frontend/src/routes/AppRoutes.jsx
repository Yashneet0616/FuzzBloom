import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import CustomerProtectedRoute from "./CustomerProtectedRoute";


/* Customer Pages */
import Home from "../pages/customer/Home";
import Shop from "../pages/customer/Shop";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import OrderSuccess from "../pages/customer/OrderSuccess";
import About from "../pages/customer/About";
import Contact from "../pages/customer/Contact";
import CustomOrders from "../pages/customer/CustomOrders";

/* Customer Authentication */
import Auth from "../pages/auth/Auth";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

/* Account Pages */
import AccountDashboard from "../pages/customer/account/Dashboard";
import Profile from "../pages/customer/account/Profile";
import Addresses from "../pages/customer/account/Addresses";
import OrdersHistory from "../pages/customer/account/Orders";

/* Admin Pages */
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Orders from "../pages/admin/Orders";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

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

        {/* Authentication */}

        <Route path="/auth" element={<Auth />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
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

        <Route path="/custom-orders" element={<CustomOrders />} />

        {/* 404 */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;