function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles =
    'rounded-full px-8 py-4 font-medium transition-all duration-300'

  const variants = {
    primary:
      'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-lg',

    secondary:
      'border border-rose-300 bg-white text-rose-500 hover:bg-rose-50',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button