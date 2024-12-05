'use client'

import { placeOrder } from '@/actions'
import { useCartStore, userAddressStore } from '@/store'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const CheckOutSummaryDetails = () => {

  const address = userAddressStore(s => s.address)
  const cart = useCartStore(s => s.cart)
  const clearCart = useCartStore(s => s.clearCart)

  const summary = useCartStore(s => s.getSummaryInformation)()
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const router = useRouter();

  const startPlaceOrder = async () => {
    console.log('startPlaceOrder')
    setIsPlacingOrder(true)
    const products = cart.map(product => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size
    }))
    const r = await placeOrder(products, address!)
    console.log(r)

    if (r.error) {
      setErrorMessage(r.message)
      setIsPlacingOrder(false)
      return
    }

    clearCart();
    router.replace('/orders/' + r.data?.order.id);

  }

  if (!address) return null

  if(!cart.length) return null

  return (
    <>
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{address.name} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.city}</p>
        <p>{address.postalCode}</p>
        <p>{address.country}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">

        <span>No. Productos</span>
        <span className="text-right">{cart.length} artículos</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(summary.subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(summary.tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(summary.total)}</span>


      </div>

      <div className="mt-5 mb-2 w-full">

        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
          </span>
        </p>


        <p className="text-red-500">{errorMessage}</p>


        <button
          className={
            clsx("flex btn-primary justify-center", {
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }
          onClick={startPlaceOrder}
        >
          Colocar orden
        </button>
        {/* 
        <Link
          className="flex btn-primary justify-center"
          href="/orders/123">
          Colocar orden
        </Link> */}
      </div>

    </>
  )
}
