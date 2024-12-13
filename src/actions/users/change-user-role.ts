'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const changeUserRole = async (userId: string, role: "admin" | "user") => {

    const session = await auth()

    if (session?.user.role !== "admin")
        return {
            error: true,
            message: "Should be an admin"
        }

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role
            }
        })

        revalidatePath('/admin/users')

        return {
            error: false,
            message: "User role updated"
        }

    } catch (error) {
        console.log(error)

        return {
            error: true,
            message: "Something went wrong"
        }
    }

}