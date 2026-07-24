import { useEffect, useState } from 'react'
import { getProducts } from '../services/customer/customerProductService'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error(err)
        setError(err)
      } finally {   
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return {
    products,
    loading,
    error,
  }
}