'use client'

import { useEffect, useState } from "react"
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { getSummaryInformation: getSummary } = useCartStore(state => state) 
  const summary = getSummary()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <div>
    <div className="p-5 bg-gray-200 animate-pulse mb-2 rounded-lg w-60"></div>
    <div className="p-5 bg-gray-200 animate-pulse mb-2 rounded-lg w-40"></div>
    <div className="p-5 bg-gray-200 animate-pulse mb-2 rounded-lg"></div>
  </div>

  return (
    <div className="grid grid-cols-2">
      <span>Products</span>
      <span className="text-right">{summary.itemsInCart} items</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(summary.subTotal)}</span>

      <span>Tax (15%)</span>
      <span className="text-right">{currencyFormat(summary.tax)}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(summary.total)}</span>
    </div>
  )
}
