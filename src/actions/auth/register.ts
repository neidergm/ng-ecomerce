'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const registerUser = async (data: { name: string, email: string, password: string }) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email.toLowerCase(),
                password: bcrypt.hashSync(data.password)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return {
            ok: true,
            data: user,
            message: 'User created successfully'
        }

    } catch (error) {
        return {
            ok: false,
            data: error,
            message: 'Error creating user'
        }
    }
}