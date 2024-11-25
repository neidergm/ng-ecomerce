'use client'

import { useEffect, useState } from 'react'
import { getProductStock } from '@/actions'
import { titleFont } from '@/config/fonts'

export const ProductStockLabel = ({ slug }: { slug: string }) => {

    // const useState
    const [stock, setStock] = useState<number>()

    const getStock = async () => {
        const s = await getProductStock(slug)
        setStock(s)
    }

    useEffect(() => {
        getStock()
    }, [])

    if (stock === undefined) return (
        <h2 className={`animate-pulse p-3 bg-gray-200 rounded-md mb-3`}></h2>
    )

    return (
        <h2 className={`${titleFont.className} antialiased text-sm mb-3`}>
            Stock: <span className='font-bold'>{stock}</span>
        </h2>
    )
}
