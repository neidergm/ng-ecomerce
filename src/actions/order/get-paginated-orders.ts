import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedOrders = async () => {

    const session = await auth()

    if (session?.user.role !== "admin") return {
        error: true,
        message: 'Should be authenticated',
        orders: []
    }

    const orders = await prisma.order.findMany({
        include: {
            OrderAddress: {
                select: {
                    name: true,
                    lastName: true
                }
            }
        }
    })

    return {
        error: false,
        orders
    }

}