'use server'

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (imageId: number, imageUrl: string) => {

    if (!imageUrl.startsWith("http")) {
        return {
            error: true,
            message: "Cannot delete image from external URL"
        }
    }

    const imageName = imageUrl.split("/").pop()?.split(".")[0] || ""
    console.log(imageName)
    try {

       const r =  await cloudinary.uploader.destroy(`${process.env.CLOUDINARY_FOLDER}/${imageName}`, { resource_type: "image" })

        console.log(r)

        if(r?.result !== "ok") {
            throw Error("Failed to delete image from cloudinary")
        }

        const deletedImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                Product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        revalidatePath(`/admin/product/${deletedImage.Product.slug}`)

        return {
            error: false,
            message: "Image deleted successfully",
            data: { deletedImage, imageName }
        }

    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Failed to delete image"
        }
    }



}