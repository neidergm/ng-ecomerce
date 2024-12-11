'use server'

import prisma from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {

    try {

        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                transactionId
            }
        })

        if (!order) {
            return {
                error: true,
                message: "Order not found"
            }
        }

        return {
            error: false,
            message: "Transaction set successfully"
        }

    } catch (error) {
        console.log(error)

        return {
            error: true,
            message: "There was an error setting the transaction"
        }

    }

}