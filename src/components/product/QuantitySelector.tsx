'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

type Props = {
    quantity: number,
    onSelectQuantity: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, onSelectQuantity }: Props) => {

    const onQuantityChange = (value: number) => {
        const newValue = quantity + value;
        if (newValue < 1) return

        onSelectQuantity(newValue)
    }

    return (
        <div className="flex gap-3">

            <button
                className="py-1"
                onClick={() => onQuantityChange(-1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="bg-gray-100 rounded w-16 text-center font-bold pt-1 text-xl">{quantity}</span>
            <button
                className="py-1"
                onClick={() => onQuantityChange(1)}
            >
                <IoAddCircleOutline size={30} />
            </button>

        </div>
    )
}
