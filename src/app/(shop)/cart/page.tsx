import { Title } from "@/components";
import Link from "next/link";
import { CartItems } from "./ui/CartItems";
import { OrderSummary } from "./ui/OrderSummary";

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
                    <div className="mt-5">
                        <CartItems />
                    </div>

                </div>
                {/* Checkout */}
                <div className="w-full">

                    <h2 className="text-2xl mb-3">Order summary</h2>
                    <OrderSummary />

                    <div className="flex mt-5">
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