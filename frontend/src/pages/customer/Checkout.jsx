import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { createRazorpayOrder } from '../../services/paymentService'
import { verifyPayment } from '../../services/verifyPaymentService'
import { uploadFile } from '../../services/cloudinaryService'
import { loadRazorpay } from '../../utils/loadRazorpay'

import Button from '../../components/ui/Button'
import { useCart } from '../../context/CartContext'

function Checkout() {
  const navigate = useNavigate()

  const { cartItems, clearCart } = useCart()

  const [loading, setLoading] = useState(false)

  const [referenceFile, setReferenceFile] = useState(null)
  const [referencePreview, setReferencePreview] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: 'India',
    notes: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const fetchPincodeDetails = async (pincode) => {
    if (pincode.length !== 6) return

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      )

      const data = await response.json()

      if (
        data[0].Status === 'Success' &&
        data[0].PostOffice?.length
      ) {
        const post = data[0].PostOffice[0]

        setFormData((prev) => ({
          ...prev,
          city: post.District,
          state: post.State,
          country: post.Country,
        }))
      } else {
        toast.error('Invalid pincode')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch pincode')
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    setReferenceFile(file)

    if (file.type.startsWith('image/')) {
      setReferencePreview(URL.createObjectURL(file))
    } else {
      setReferencePreview('')
    }
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty.')
      return
    }

    if (!formData.name.trim()) {
      toast.error('Please enter your name.')
      return
    }

    if (!formData.phone) {
      toast.error('Please enter a valid phone number.')
      return
    }

    if (!formData.address.trim()) {
      toast.error('Please enter your address.')
      return
    }

    if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      toast.error('Please enter a valid 6-digit pincode.')
      return
    }

    setLoading(true)

    try {
      let uploadedFile = null

      if (referenceFile) {
        uploadedFile = await uploadFile(referenceFile)
      }

      const loaded = await loadRazorpay()

      if (!loaded) {
        toast.error('Failed to load Razorpay.')
        setLoading(false)
        return
      }

      const razorpayOrder = await createRazorpayOrder(cartItems)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.order.amount,
        currency: razorpayOrder.order.currency,
        name: 'FuzzBloom',
        description: 'Flower Order',
        order_id: razorpayOrder.order.id,

        handler: async function (response) {
          try {
            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              customer: {
                name: formData.name.trim(),
                phone: formData.phone,
                address: formData.address.trim(),
                pincode: formData.pincode.trim(),
                city: formData.city,
                state: formData.state,
                country: formData.country,
                notes: formData.notes.trim(),
              },

              items: cartItems,

              referenceFile: uploadedFile,
            })

            clearCart()

            toast.success('Order placed successfully!')

            navigate('/order-success', {
              state: {
                orderId: result.orderId,
              },
            })
          } catch (error) {
            console.error(error)
            toast.error(error.message || 'Payment verification failed.')
          } finally {
            setLoading(false)
          }
        },

        prefill: {
          name: formData.name,
          contact: formData.phone,
        },

        theme: {
          color: '#f43f5e',
        },

        modal: {
          ondismiss: () => {
            setLoading(false)
            toast.error('Payment cancelled.')
          },
        },
      }

      const razorpay = new window.Razorpay(options)

      razorpay.open()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong.')
      setLoading(false)
    }
  }
    return (
    <section className="bg-rose-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h1
          className="mb-10 text-center text-5xl font-bold text-stone-800"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-rose-100 p-4 outline-none focus:border-rose-400"
              />

              <PhoneInput
                international
                defaultCountry="IN"
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: value || '',
                  }))
                }
                className="w-full rounded-2xl border border-rose-100 p-4 focus-within:border-rose-400"
              />

              <textarea
                name="address"
                rows="4"
                placeholder="Complete Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-rose-100 p-4 outline-none focus:border-rose-400"
              />

              <input
                type="text"
                name="pincode"
                placeholder="6-digit Pincode"
                value={formData.pincode}
                maxLength={6}
                onChange={(e) => {
                  handleChange(e)

                  if (e.target.value.length === 6) {
                    fetchPincodeDetails(e.target.value)
                  }
                }}
                className="w-full rounded-2xl border border-rose-100 p-4 outline-none focus:border-rose-400"
              />

              {formData.city && (
                <div className="rounded-2xl bg-rose-50 p-4 text-sm text-stone-700">
                  <p>
                    <strong>City:</strong> {formData.city}
                  </p>

                  <p>
                    <strong>State:</strong> {formData.state}
                  </p>

                  <p>
                    <strong>Country:</strong> {formData.country}
                  </p>
                </div>
              )}

              <textarea
                name="notes"
                rows="3"
                placeholder="Instructions (Optional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full rounded-2xl border border-rose-100 p-4 outline-none focus:border-rose-400"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Customization Image (Optional)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full rounded-2xl border border-rose-100 p-3 file:mr-4 file:rounded-xl file:border-0 file:bg-rose-500 file:px-4 file:py-2 file:text-white hover:file:bg-rose-600"
                />

                {referenceFile && (
                  <p className="mt-2 text-sm text-stone-600">
                    Selected: {referenceFile.name}
                  </p>
                )}

                {referencePreview && (
                  <img
                    src={referencePreview}
                    alt="Reference Preview"
                    className="mt-4 h-40 w-40 rounded-2xl border object-cover"
                  />
                )}

                <Button
                  className="mt-6 w-full"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading
                    ? 'Processing Payment...'
                    : 'Proceed to Payment'}
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-3xl font-semibold text-stone-800">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-stone-500">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between"
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

                <hr className="my-6" />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>

                  <span className="text-rose-500">
                    ₹{total}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
      )
}

export default Checkout