import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { signup } from '../../services/authService'

function Signup() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
    try {
      setLoading(true)

      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
      })

      toast.success('Account created successfully.')

      navigate('/')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-rose-600">
            🌸 FuzzBloom
          </h1>

          <p className="mt-2 text-gray-500">
            Create your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <input
              {...register('firstName', {
                required: 'First name is required',
              })}
              placeholder="First Name"
              className="w-full rounded-xl border p-3"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('lastName', {
                required: 'Last name is required',
              })}
              placeholder="Last Name"
              className="w-full rounded-xl border p-3"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('phone', {
                required: 'Phone number is required',
              })}
              placeholder="Phone Number"
              className="w-full rounded-xl border p-3"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('email', {
                required: 'Email is required',
              })}
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border p-3"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message:
                    'Password must be at least 6 characters',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-xl border p-3 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  className="mr-2 animate-spin"
                  size={20}
                />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-rose-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup