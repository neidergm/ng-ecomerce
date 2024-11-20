'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

type Props = {
    quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {

    const [count, setCount] = useState(quantity)

    const onQuantityChange = (value: number) => {
        const newValue = count + value;
        if (newValue < 1) return

        setCount(newValue)
    }

    return (
        <div className="flex gap-3">

            <button
                className="py-1"
                onClick={() => onQuantityChange(-1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="bg-gray-100 rounded w-16 text-center font-bold pt-1 text-xl">{count}</span>
            <button
                className="py-1"
                onClick={() => onQuantityChange(1)}
            >
                <IoAddCircleOutline size={30} />
            </button>

        </div>
    )
}
