import { Outlet } from 'react-router-dom'

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-pink-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout