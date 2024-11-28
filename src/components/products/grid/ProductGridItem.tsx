'use client'

import { Product } from "@/interfaces"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Props = {
    product: Product
}

export default function ProductGridItem({ product }: Props) {

    const link = `/product/${product.slug}`
    const [displayImg, setDisplayImg] = useState(0)

    const onMouseEnter = () => {
        setDisplayImg(1)
    }

    const onMouseLeave = () => {
        setDisplayImg(0)
    }

    return (
        <div key={product.slug} className="rounded-md fade-in overflow-hidden">
            <Link href={link}>
                <Image
                    src={`/imgs/products/${product.images[displayImg]}`}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full object-cove rounded"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </Link>
            <div className="p-4 flex flex-col">
                <Link href={link} className="hover:text-blue-600">
                    {product.name}
                </Link>
                <span className="font-bold">{currencyFormat(product.price)}</span>
            </div>
        </div>
    )
}
