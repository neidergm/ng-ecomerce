'use server'

import { auth } from "@/auth.config"
import { UserAddressServerAction } from "@/interfaces"
import prisma from "@/lib/prisma"

export const setUserAddress = async (data: UserAddressServerAction) => {

    const session = await auth()

    try {
        if (!session) throw new Error;

        const { country, saveAddress, ...rest } = data;

        if (saveAddress) {
            await prisma.userAddress.upsert({
                where: {
                    userId: session.user.id
                },
                update: {
                    ...rest
                },
                create: {
                    ...rest,
                    countryId: country,
                    userId: session.user.id
                }
            })
        }

        return {
            message: 'Address saved',
            error: false
        }
    } catch (e) {
        console.log(e)
        return {
            message: 'There was an error saving the address',
            error: true
        }
    }
}
