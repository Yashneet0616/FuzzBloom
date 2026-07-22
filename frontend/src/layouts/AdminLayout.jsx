import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/layout/Sidebar'
import Topbar from '../components/admin/layout/Topbar'

function AdminLayout() {
  return (
    <div className="min-h-screen bg-rose-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex min-h-screen flex-1 flex-col lg:ml-64">
          <Topbar />

          <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout