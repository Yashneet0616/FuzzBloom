import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getOrders,
  updateOrderStatus,
} from "../../services/admin/adminOrderService";

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load orders.')
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase()

    return orders.filter((order) => {
      return (
        order.customer?.name?.toLowerCase().includes(keyword) ||
        order.customer?.phone?.includes(keyword) ||
        order.customer?.email?.toLowerCase().includes(keyword) ||
        order.orderNumber?.toLowerCase().includes(keyword)
      )
    })
  }, [orders, search])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700'

      case 'Accepted':
        return 'bg-blue-100 text-blue-700'

      case 'Preparing':
        return 'bg-purple-100 text-purple-700'

      case 'Shipped':
        return 'bg-indigo-100 text-indigo-700'

      case 'Cancelled':
        return 'bg-red-100 text-red-700'

      default:
        return 'bg-yellow-100 text-yellow-700'
    }
  }

  const getPaymentColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700'

      case 'Failed':
        return 'bg-red-100 text-red-700'

      default:
        return 'bg-yellow-100 text-yellow-700'
    }
  }

  const handleStatusChange = async (status) => {
    try {
      await updateOrderStatus(selectedOrder.id, status)

      toast.success('Status updated.')

      const updated = {
        ...selectedOrder,
        status,
      }

      setSelectedOrder(updated)

      setOrders((prev) =>
        prev.map((order) =>
          order.id === updated.id ? updated : order
        )
      )
    } catch (error) {
      console.error(error)
      toast.error('Failed to update status.')
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading orders...
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <input
          type="text"
          placeholder="Search by name, phone, email or order no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border p-3 md:w-96"
        />
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Order No
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Phone
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Payment
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
                        {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold">
                  {order.orderNumber}
                </td>

                <td className="px-6 py-4">
                  {order.customer?.name}
                </td>

                <td className="px-6 py-4">
                  {order.customer?.phone}
                </td>

                <td className="px-6 py-4">
                  ₹{order.total}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getPaymentColor(
                      order.payment?.status
                    )}`}
                  >
                    {order.payment?.status || 'Pending'}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <p>
                <strong>Order No:</strong><br />
                {selectedOrder.orderNumber}
              </p>

              <p>
                <strong>Customer:</strong><br />
                {selectedOrder.customer?.name}
              </p>

              <p>
                <strong>Phone:</strong><br />
                {selectedOrder.customer?.phone}
              </p>

              <p>
                <strong>Email:</strong><br />
                {selectedOrder.customer?.email || 'Not Provided'}
              </p>

              <p>
                <strong>Payment Status:</strong><br />
                {selectedOrder.payment?.status || 'Pending'}
              </p>

              <p>
                <strong>Payment ID:</strong><br />
                {selectedOrder.payment?.razorpayPaymentId || 'N/A'}
              </p>

              <p>
                <strong>Total:</strong><br />
                ₹{selectedOrder.total}
              </p>

              <p>
                <strong>Created:</strong><br />
                {selectedOrder.createdAt?.seconds
                  ? new Date(
                      selectedOrder.createdAt.seconds * 1000
                    ).toLocaleString()
                  : 'N/A'}
              </p>
                            <div className="md:col-span-2">
                <strong>Address:</strong>

                <div className="mt-2 rounded-lg bg-gray-100 p-4">
                  <p>{selectedOrder.customer?.address}</p>

                  <p>
                    {selectedOrder.customer?.city},{' '}
                    {selectedOrder.customer?.state}
                  </p>

                  <p>
                    {selectedOrder.customer?.country} -{' '}
                    {selectedOrder.customer?.pincode}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2">
                <strong>Notes:</strong>

                <div className="mt-2 rounded-lg bg-gray-100 p-4">
                  {selectedOrder.customer?.notes || 'None'}
                </div>
              </div>

              {selectedOrder.referenceFile && (
                <div className="md:col-span-2 rounded-lg border bg-gray-50 p-4">
                  <h3 className="mb-4 text-lg font-semibold">
                    Reference Image
                  </h3>

                  {selectedOrder.referenceFile.resourceType === 'image' && (
                    <img
                      src={selectedOrder.referenceFile.url}
                      alt="Reference"
                      className="mb-4 h-56 w-56 rounded-lg border object-cover"
                    />
                  )}

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>File Name:</strong>{' '}
                      {selectedOrder.referenceFile.originalName}
                    </p>

                    <p>
                      <strong>File Type:</strong>{' '}
                      {selectedOrder.referenceFile.format?.toUpperCase()}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <a
                      href={selectedOrder.referenceFile.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      View
                    </a>

                    <a
                      href={selectedOrder.referenceFile.url}
                      download
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                    >
                      Download
                    </a>
                  </div>
                </div>
              )}
            </div>

            <h3 className="mt-8 mb-3 text-lg font-bold">
              Products
            </h3>

            <div className="space-y-3">
              {selectedOrder.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between rounded-lg bg-gray-100 p-3"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <label className="mb-2 block font-semibold">
                Update Order Status
              </label>

              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value)
                }
                className="w-full rounded-lg border p-3"
              >
                <option>Pending</option>
                <option>Accepted</option>
                <option>Preparing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
                        <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      {!loading && filteredOrders.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            No Orders Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try searching with a different customer name,
            phone number, email or order number.
          </p>
        </div>
      )}
    </div>
  )
}

export default Orders