function SectionTitle({ title, subtitle }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
        {subtitle}
      </p>

      <h2
        className="text-4xl font-bold text-stone-800 md:text-5xl"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionTitle