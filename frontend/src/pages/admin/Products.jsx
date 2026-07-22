import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import { getProducts, deleteProduct } from '../../services/productService'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadProducts() {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleDelete(id, name) {
    const confirmed = window.confirm(
      `Delete "${name}"? This action cannot be undone.`
    )

    if (!confirmed) return

    try {
      await deleteProduct(id)
      await loadProducts()
    } catch (error) {
      console.error(error)
      alert('Failed to delete product.')
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-rose-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold">Loading products...</h1>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-rose-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-5xl font-bold text-stone-800">
            Products
          </h1>

          <Link to="/admin/products/add">
            <Button>Add Product</Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="mb-3 text-3xl font-semibold">
              No Products Found
            </h2>

            <p className="text-stone-500">
              Add your first product to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-rose-100">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                    </td>

                    <td className="p-4 font-medium">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="p-4">
                      ₹{product.price}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="rounded-xl bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(product.id, product.name)
                          }
                          className="rounded-xl bg-red-500 p-2 text-white transition hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products