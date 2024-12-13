"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { Product, ProductCategory, ProductImages, ValidGenders, ValidSizes } from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
    product: Product & { ProductImage?: ProductImages[] } | null;
    categories: Array<ProductCategory>
}

interface FormInputs {
    name: string;
    slug: string;
    description: string;
    price: number;
    tags: string;
    inStock: number;
    sizes: ValidSizes[];
    gender: ValidGenders;
    categoryId: string;

    images: FileList;
}

const sizes: ValidSizes[] = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        // formState: { errors }
    } = useForm<FormInputs>({
        defaultValues: product ? {
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            tags: product.tags?.join(","),
            inStock: product.inStock,
            sizes: product.sizes || [],
            gender: product.gender,
            categoryId: product.categoryId
        } : {}
    })

    watch("sizes");

    const onChangeSizes = (size: ValidSizes) => {
        const sizes = new Set(getValues("sizes"));
        if (sizes.has(size)) {
            sizes.delete(size);
        } else {
            sizes.add(size);
        }
        setValue("sizes", Array.from(sizes));
    }

    const onDeleteImage = async (image: ProductImages) => {
        const result = await deleteProductImage(image.id, image.url);

        console.log(result)
        // if (!result.error) {
        //     router.reload();
        // }
    }

    const onSubmit = async (data: FormInputs) => {

        const formData = new FormData();
        if (product) {
            formData.append("id", product.id ?? '');
        }
        formData.append("name", data.name ?? '');
        formData.append("categoryId", data.categoryId ?? '');
        formData.append("gender", data.gender ?? '');
        formData.append("price", data.price.toString() ?? '');
        formData.append("sizes", data.sizes.toString() ?? '');
        formData.append("tags", data.tags.toString() ?? '');
        formData.append("slug", data.slug ?? '');
        formData.append("inStock", data.inStock.toString() ?? '');
        formData.append("description", data.description ?? '');


        if (data.images) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append("images", data.images[i]);
            }
        }


        const result = await createUpdateProduct(formData);

        if (!result.error) {
            router.replace(`/admin/product/${result.data?.slug}`);
        }

        console.log(result);
    }

    return (
        <form
            className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        {...register("slug", { required: true })}
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        {...register("description", { required: true })}
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input
                        {...register("price", { required: true })}
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input
                        {...register("tags", { required: true })}
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("gender", { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select
                        {...register("categoryId", { required: true })}
                        className="p-2 border rounded-md bg-gray-200"
                    >
                        <option value="">[Seleccione]</option>
                        {
                            categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}

                <div className="flex flex-col mb-2">
                    <span>Stock</span>
                    <input
                        {...register("inStock", { required: true })}
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                    />
                </div>

                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                <div key={size}
                                    onClick={() => onChangeSizes(size)}
                                    className={
                                        clsx(
                                            "flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer",
                                            {
                                                "bg-blue-500 text-white": getValues("sizes")?.includes(size)
                                            }
                                        )
                                    }
                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            {...register("images")}
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                    </div>

                    <div className="flex gap-2 mt-3">
                        {
                            product?.ProductImage?.map(image => (
                                <div key={image.id} className="rounded-lg shadow-lg">
                                    <ProductImage
                                        src={image.url}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="object-cover rounded-t-lg"
                                    />
                                    <button className="!rounded-none !rounded-b-lg btn-danger w-full"
                                        onClick={()=> onDeleteImage(image)}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};

export default ProductForm;
