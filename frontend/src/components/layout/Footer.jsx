function Footer() {
  return (
    <footer className="border-t border-pink-100 py-6 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} FuzzBloom. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer