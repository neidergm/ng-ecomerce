'use server'
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ProductSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2)))
    ,
    tags: z.string(),
    inStock: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(0)))
    ,
    sizes: z.coerce
        .string()
        .transform(val => val.split(','))
    ,
    gender: z.nativeEnum(Gender),
    categoryId: z.string().uuid(),
});

export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData);

    const productParsed = ProductSchema.safeParse(data);

    if (!productParsed.success) {
        return {
            error: true,
            message: 'Invalid data'
        }
    }

    const { id, ...rest } = productParsed.data;

    try {

        await prisma.$transaction(async (tx) => {

            const productToSave = {
                ...rest,
                sizes: {
                    set: rest.sizes as Size[]
                },
                tags: {
                    set: rest.tags.split(',').map(tag => tag.trim().toLowerCase())
                }
            }

            let product: Product;

            if (id) {
                product = await tx.product.update({
                    where: { id },
                    data: productToSave
                })
            } else {
                product = await tx.product.create({
                    data: productToSave
                })
            }

            if (formData.has('images')) {
                const uploadResult = await uploadImage(formData.getAll('images') as File[])

                if (!uploadResult) {
                    throw new Error('Error uploading images')
                }

                console.log(uploadResult)

                await tx.productImage.createMany({
                    data: uploadResult.map(image => ({
                        url: image,
                        productId: product.id
                    }))
                })
            }


            return product
        })

    } catch (error) {
        console.log(error)

        return {
            error: true,
            message: 'Error creating product'
        }
    }

    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${rest.slug}`)
    revalidatePath(`/products/${rest.slug}`)

    return {
        error: false,
        message: 'Product created successfully',
        data: rest
    }
}

const uploadImage = async (files: File[]) => {

    try {

        const uploadPromises = files.map(async (file) => {

            try {
                const buffer = await file.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`,
                    { folder: process.env.CLOUDINARY_FOLDER }
                ).then(r => r.secure_url)
            } catch (error) {
                console.log(error)
                return null;
            }
        })

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages.filter(i => i !== null);

    } catch (error) {
        console.log(error)
        return null;
    }
}