'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {

    try {
        const product = await prisma.product.findUnique({
            include: {
                ProductImage: {
                    select: { url: true }
                },
                category:{
                    select: { name: true }
                }
            },
            where: { slug }
        })

        if (!product) return null

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ProductImage, category, categoryId, ...rest } = product

        return {
            ...rest,
            category: category.name,
            images: ProductImage.map(({ url }) => url)
        }
    } catch (error) {
        console.log(error)
        throw new Error(`Product "${slug}" not found`)
    }
}

export const getProductStock = async (slug: string) => {
    try {
        const product = await prisma.product.findUnique({
            select: { inStock: true },
            where: { slug }
        })

        if (!product) return 0

        return product.inStock
    } catch (error) {
        console.log(error)
        return 0
    }
}