'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client"

type PaginationOptions = {
    page?: number| string,
    take?: number | string,
    gender?: Gender
}

const defaultTake = 9;

export const getPaginatedProductsWitImages = async (
    { page = 1, take = defaultTake, gender }: PaginationOptions
) => {
    try {
        page = Number(page)
        take = Number(take)

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(take) || page < 1) page = defaultTake;

        const products = await prisma.product.findMany({
            take,
            skip: take * (page - 1),
            include: {
                category: {
                    select: { name: true }
                },
                ProductImage: {
                    take: 2,
                    select: { url: true }
                }
            },
            where: {
                gender: gender
            }
        })

        const pages = await prisma.product.count({ where: { gender } })
        const totalPages = Math.ceil(pages / take)

        return {
            totalPages,
            currentPage: page,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            products: products.map(({ ProductImage, createdAt, updatedAt, category, ...product }) => ({
                ...product,
                category: category.name,
                images: ProductImage.map((image) => image.url)
            }))
        }

    } catch (error) {
        console.error(error)
        throw new Error('Error fetching products')
    }
}