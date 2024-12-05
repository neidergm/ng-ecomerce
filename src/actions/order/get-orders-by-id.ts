import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrdersById = async (id: string) => {

    const session = await auth()

    if (!session) return null

    const order = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            OrderAddress: true,
            OrderItem: {
                select: {
                    price: true,
                    quantity: true,
                    size: true,
                    Product: {
                        select: {
                            name: true,
                            slug: true,
                            ProductImage: {
                                select: {
                                    url: true
                                },
                                take: 1
                            }
                        }
                    }
                }
            }
        }
    })

    return order

}