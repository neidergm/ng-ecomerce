'use client'

import { Product, ValidSizes } from "@/interfaces"
import clsx from "clsx"

type Props = {
    sizes: Product["sizes"],
    selectedSize?: ValidSizes,
    onSelectSize: (size: ValidSizes) => void
}

export const SizeSelector = ({ sizes, selectedSize, onSelectSize }: Props) => {
    return (
        <div className="flex gap-3">
            {
                sizes.map((size) => <span
                    key={size}
                    onClick={() => onSelectSize(size)}
                    className={clsx(
                        "font-semibold underline-offset-4 hover:underline cursor-pointer",
                        { "underline": size === selectedSize }
                    )}
                >{size}</span>)
            }
        </div>
    )
}
