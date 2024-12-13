'use server'

import prisma from "@/lib/prisma"

export const getProductsCategories = async () => {

    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return {
        error: false,
        categories,
        message: "Categories list"
    }
}