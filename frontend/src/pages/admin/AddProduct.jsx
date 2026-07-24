import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import ProductForm from "../../components/admin/products/ProductForm";
import { addProduct } from "../../services/admin/productService";
import { uploadImage } from '../../services/shared/cloudinaryService'

function AddProduct() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  })

  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!imageFile) {
      toast.error('Please select an image.')
      return
    }

    setLoading(true)

    try {
      const imageUrl = await uploadImage(imageFile)

      await addProduct({
        ...formData,
        price: Number(formData.price),
        image: imageUrl,
      })

      toast.success('Product added successfully!')

      navigate('/admin/products')
    } catch (error) {
      console.error(error)
      toast.error('Failed to add product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-rose-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h1
            className="mb-8 text-5xl font-bold text-stone-800"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Add Product
          </h1>

          <ProductForm
            formData={formData}
            loading={loading}
            preview={preview}
            submitText="Save Product"
            onChange={handleChange}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/products')}
          />
        </div>
      </div>
    </section>
  )
}

export default AddProduct