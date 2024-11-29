'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

export const deleteUserAddress = async () => {

    const session = await auth()

    if (!session) throw new Error;

    try {
        const result = await prisma.userAddress.delete({
            where: {
                userId: session.user.id
            }
        })

        return {
            error: false,
            message: "Deleted address successfully",
            data: result
        }

    } catch (error) {
        console.error(error)

        return {
            error: true,
            message: "Error deleting address"
        }
    }

}