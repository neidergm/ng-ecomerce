'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

type Props = {
    children: React.ReactNode;
}

const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "USD",
    intent: "capture",
};

export const PaypalProvider = ({ children }: Props) => {

    return (
        <PayPalScriptProvider
            options={initialOptions}
        >
            {children}
        </PayPalScriptProvider>
    )
}