'use client'
import { QuantitySelector, SizeSelector } from '@/components'
import { Product, ValidSizes } from '@/interfaces'
import { useCartStore } from '@/store'
import React, { useState } from 'react'

type Props = {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(s => s.addToCart)

    const [size, setSize] = useState<ValidSizes>()
    const [quantity, setQuantity] = useState(1)
    const [posted, setPosted] = useState(false)

    const handleAddToCart = () => {
        setPosted(true)

        if (!size) return

        addProductToCart({
            quantity,
            size,
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0]
        })
    }

    return (
        <div>
            <div className="mb-5">
                <h3 className="font-bold">Size</h3>
                <SizeSelector sizes={product.sizes} selectedSize={size} onSelectSize={setSize} />
                {
                    !size && posted && (
                        <p className="text-red-600 text-sm fade-in">Please select a size *</p>
                    )
                }
            </div>

            <QuantitySelector quantity={quantity} onSelectQuantity={setQuantity} />

            <button className="btn-primary my-5" onClick={handleAddToCart}>
                Add to cart
            </button>

        </div>
    )
}
