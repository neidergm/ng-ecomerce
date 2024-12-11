'use server'

import { PaypalCheckOrderResponse } from "@/interfaces"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const checkPaypalPayment = async (paypalTransactionId: string) => {

    const authToken = await getPaypalBearerToken()

    if (!authToken) return {
        error: true,
        message: "Error getting paypal token"
    }

    const orderStatus = await verifyPaypalPayment(paypalTransactionId, authToken);

    if (!orderStatus) return {
        error: true,
        message: "Error verifying payment"
    }

    const { status, purchase_units } = orderStatus

    if (status !== "COMPLETED") return {
        error: true,
        message: "Payment not completed"
    }

    try {
        const orderId = purchase_units[0].invoice_id

        const result = await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        })

        if (!result) throw new Error("Error updating order")

        revalidatePath(`/orders/${orderId}`)

        return {
            error: false,
            message: "Payment completed"
        }

    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "500 - Payment not saved"
        }
    }
}

const getPaypalBearerToken = (): Promise<string | null> => {

    const base64Token = Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`,
        "utf-8"
    ).toString("base64")

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    return fetch(`${process.env.PAYPAL_OAUTH_URL}`, {
        ...requestOptions,
        cache: "no-store",
    })
        .then(r => r.json())
        .then(data => data.access_token)
        .catch(e => {
            console.log(e)
            return null
        })
}

const verifyPaypalPayment = (paypalTransactionId: string, token: string): Promise<PaypalCheckOrderResponse | null> => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    return fetch(`${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`, {
        ...requestOptions,
        cache: "no-store",
    })
        .then(r => r.json())
        .catch(() => null)
}
