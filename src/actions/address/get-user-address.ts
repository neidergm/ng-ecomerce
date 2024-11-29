'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getUserAddress = async () => {

    const session = await auth()

    if (!session) throw new Error;

    const result = await prisma.userAddress.findUnique({
        where: {
            userId: session.user.id
        }
    })

    if (!result) return undefined;

    // const { countryId, id, updatedAt, createdAt, userId, address2, ...rest } = result;

    return result

}