import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export default function CartPage() {
    return <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

        <div className="flex flex-col w-1000px">

            <Title title="Cart" />


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* Cart */}
                <div className="flex flex-col mt-5">
                    <span className="text-xl">Add more products</span>
                    <Link href="/">Continue shopping</Link>

                    {/* Items */}
                    <div>
                        {
                            productsInCart.map((product) => {
                                return <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/imgs/products/${product.images[0]}`}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p>{product.title}</p>
                                        <p>${product.price}</p>
                                        <QuantitySelector quantity={2} />
                                        <button>Remove</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>


                </div>
                {/* Checkout */}
                <div className="w-full">
                    <div className="flex">
                        <Link
                            className="btn-primary w-full text-center"
                            href="/checkout/address"
                        >Checkout</Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
}