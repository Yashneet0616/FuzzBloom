import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import ProductForm from '../../components/admin/ProductForm'
import {
  getProductById,
  updateProduct,
} from '../../services/productService'
import { uploadImage } from '../../services/cloudinaryService'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  })

  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [currentImage, setCurrentImage] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        const product = await getProductById(id)

        if (!product) {
          toast.error('Product not found.')
          navigate('/admin/products', { replace: true })
          return
        }

        setFormData({
          name: product.name || '',
          category: product.category || '',
          price: product.price || '',
          description: product.description || '',
        })

        setCurrentImage(product.image || '')
        setPreview(product.image || '')
      } catch (error) {
        console.error(error)
        toast.error('Failed to load product.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id, navigate])

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

    setSaving(true)

    try {
      let imageUrl = currentImage

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      await updateProduct(id, {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        description: formData.description.trim(),
        image: imageUrl,
      })

      toast.success('Product updated successfully!')

      navigate('/admin/products')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update product.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-rose-50">
        <h1 className="text-3xl font-bold text-stone-700">
          Loading Product...
        </h1>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-rose-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h1
            className="mb-8 text-5xl font-bold text-stone-800"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Edit Product
          </h1>

          <ProductForm
            formData={formData}
            loading={saving}
            preview={preview}
            submitText="Update Product"
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

export default EditProduct