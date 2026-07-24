import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Loader2, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { resetPassword } from '../../services/auth/authService'

function ForgotPassword() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
    try {
      setLoading(true)

      await resetPassword(data.email)

      toast.success(
        'Password reset email sent successfully.'
      )
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
            <Mail
              size={30}
              className="text-rose-500"
            />
          </div>

          <h1 className="text-3xl font-bold text-rose-600">
            Forgot Password
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
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

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="mr-2 animate-spin"
                />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="font-semibold text-rose-500 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword