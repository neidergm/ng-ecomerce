'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {

    try {
        const product = await prisma.product.findUnique({
            include: {
                ProductImage: {
                    select: { url: true }
                }
            },
            where: { slug }
        })

        if (!product) return null

        const { ProductImage, ...rest } = product

        return {
            ...rest,
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