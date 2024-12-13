import { getProductBySlug, getProductsCategories } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import ProductForm from "./ui/ProductForm";

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;

    const product = await getProductBySlug(slug)

    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }

    const { categories } = await getProductsCategories()

    const title = (slug === 'new') ? 'Add Product' : 'Edit Product'

    return (
        <>
            <Title title={title} />

            <div>

                <ProductForm product={product} categories={categories} />
            </div>
        </>
    );
}