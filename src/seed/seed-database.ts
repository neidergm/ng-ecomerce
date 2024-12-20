import { Product } from '@prisma/client';
import prisma from '../lib/prisma';
import { initialData } from './seed'

async function main() {

    // 1. Delete all data in the database
    await prisma.orderAddress.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.country.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.user.deleteMany();

    //Create countries
    await prisma.country.createMany({ data: initialData.countries })

    // Create categories
    const categories = initialData.categories.map((name) => ({ name }))
    await prisma.category.createMany({ data: categories })

    // Create products

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((acc, category) => {
        acc[category.name] = category.id
        return acc
    }, {} as Record<string, string>)

    const genders = { "men": "male", "women": "female", "kid": "unisex", "unisex": "unisex" }

    initialData.products.forEach(async (p) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, images, gender, title, ...pdata } = p;

        const product = {
            ...pdata,
            name: title,
            gender: genders[gender],
            categoryId: categoriesMap[type]
        } as Product

        const productDB = await prisma.product.create({ data: product })

        const imagesData = images.map((url) => ({ url, productId: productDB.id }))

        await prisma.productImage.createMany({ data: imagesData })
    })

    // Create users

    await prisma.user.createMany({ data: initialData.users })


    console.log('Seed database executed correctly')
}

(() => {
    if (process.env.NODE_ENV === "production") return;

    main()
})()