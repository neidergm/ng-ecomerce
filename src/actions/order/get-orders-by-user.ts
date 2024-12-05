import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrdersByUser = async () => {

    const session = await auth()

    if (!session) return []

    return await prisma.order.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            OrderAddress: {
                select: {
                    name: true,
                    lastName: true
                }
            }
        }
    })

}