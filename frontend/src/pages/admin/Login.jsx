import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/shared/ui/Button'
import { login } from '../../services/auth/authService'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password)

      navigate('/admin/dashboard')
    }  catch (error) {
  console.error(error);
  console.error("Code:", error.code);
  console.error("Message:", error.message);

  setError(error.message);
} finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-rose-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1
          className="mb-2 text-center text-4xl font-bold text-stone-800"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Admin Login
        </h1>

        <p className="mb-8 text-center text-stone-500">Welcome back to FuzzBloom</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-rose-100 p-4 outline-none focus:border-rose-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-rose-100 p-4 outline-none focus:border-rose-400"
            required
          />

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Login
