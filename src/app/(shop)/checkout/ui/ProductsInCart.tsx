'use client'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import Image from 'next/image'

export const ProductsInCart = () => {

    const productsInCart = useCartStore(s => s.cart)

    return (
        <div>
            {
                productsInCart.map(product => (

                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/imgs/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.name}
                            className="mr-5 rounded"
                        />

                        <div>
                            <p>{product.name}</p>
                            <p>${product.price} x {product.quantity}</p>
                            <p className="font-bold">Subtotal: {currencyFormat(product.quantity * product.price)}</p>
                        </div>

                    </div>


                ))
            }

        </div>
    )
}
