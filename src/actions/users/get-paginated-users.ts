'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedUsers = async () => {

    const session = await auth()

    if (session?.user.role !== "admin") return {
        error: true,
        users: [],
        message: "Should be an admin"
    }

    const users = await prisma.user.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return {
        error: false,
        users,
        message: "Users list"
    }
}