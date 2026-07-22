function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Icon
        size={36}
        className={`mb-4 ${color}`}
      />

      <h2 className="text-4xl font-bold text-gray-800">
        {value}
      </h2>

      <p className="mt-2 text-gray-500">
        {title}
      </p>
    </div>
  )
}

export default SummaryCard