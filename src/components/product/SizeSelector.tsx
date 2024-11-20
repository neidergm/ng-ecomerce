import { Product } from "@/interfaces"
import clsx from "clsx"

type Props = {
    sizes: Product["sizes"]
}

export const SizeSelector = ({ sizes }: Props) => {
    return (
        <div className="flex gap-3">
            {
                sizes.map((size) => <span
                    key={size}
                    className={clsx(
                        "font-semibold underline-offset-4 hover:underline cursor-pointer",
                        { "underline": size === "S" }
                    )}
                >{size}</span>)
            }
        </div>
    )
}
