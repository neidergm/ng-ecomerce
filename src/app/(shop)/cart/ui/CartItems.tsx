'use client'

import { useEffect, useState } from "react"
import { ProductImage, QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"

export const CartItems = () => {

  const productsInCart = useCartStore(s => s.cart)
  const [loaded, setLoaded] = useState(false)
  const updateProductQuantity = useCartStore(s => s.updateProductQuantity)
  const removeFromCart = useCartStore(s => s.removeFromCart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <div>
    <div className="bg-gray-200 animate-pulse p-5 rounded-md mb-2"></div>
    <div className="bg-gray-200 animate-pulse delay-1000 p-5 rounded-md mb-2"></div>
    <div className="bg-gray-200 animate-pulse delay-700 p-5 rounded-md mb-2"></div>
  </div>

  return (
    <div>
      {
        productsInCart.map((product) => {
          return <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <ProductImage
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
              className="mr-5 rounded"
            />
            <div>
              <p><span>{product.size}</span> | {product.name}</p>
              <p>{currencyFormat(product.price)}</p>
              <QuantitySelector
                quantity={product.quantity}
                onSelectQuantity={q => updateProductQuantity(product, q)}
              />
              <button className="underline" onClick={() => removeFromCart(product)}>Remove</button>
            </div>
          </div>
        })
      }
    </div>
  )
}
