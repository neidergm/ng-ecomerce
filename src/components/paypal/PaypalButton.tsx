'use client'

import { checkPaypalPayment, setTransactionId } from "@/actions";
import {
    PayPalButtons,
    usePayPalScriptReducer,
    PayPalButtonsComponentProps
} from "@paypal/react-paypal-js"

type Props = {
    amount: number;
    orderId: string;
}

export const PaypalButton = ({ amount, orderId }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    if (isPending) return <div >
        <div className="h-11 mb-4 animate-pulse rounded-sm bg-gray-300"></div>
        <div className="h-11 mb-10 animate-pulse rounded-sm bg-gray-300"></div>
    </div>

    const roundedAmount = Math.round(amount * 100) / 100

    const createOrder: PayPalButtonsComponentProps["createOrder"] = async (data, actions) => {
        console.log("createOrder")

        const transactionId = await actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
                invoice_id: orderId,
                amount: {
                    value: roundedAmount.toString(),
                    currency_code: "USD"
                }
            }]
        })

        console.log(transactionId)
        const res = await setTransactionId(orderId, transactionId)

        console.log(res)

        if (res.error) {
            throw new Error(res.message)
        }

        return transactionId
    }

    const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data, actions) => {
        console.log("onApprove")
        const details = await actions.order?.capture()

        console.log({ details })

        if (!details?.id) {
            return
        }

        const result = await checkPaypalPayment(details.id)

        console.log(result)
    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    )
}
