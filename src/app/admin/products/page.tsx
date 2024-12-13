import { getPaginatedProductsWitImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        page: string
    }>
}

export default async function ProductsPage({ searchParams }: Props) {

    const { page } = await searchParams;

    const { products, totalPages } = await getPaginatedProductsWitImages({ page, take: 7 });

    return (
        <>
            <Title title="Products" />

            <Link href="/admin/product/new"
                className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
            >
                Add Product
            </Link>
            <div className="my-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Image
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Product
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Gender
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Stok
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Sizes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product =>
                                <tr key={product.id}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/admin/product/${product.slug}`}>
                                            <ProductImage
                                                src={product.images[0]}
                                                alt={product.name}
                                                width={50}
                                                height={50}
                                                className="rounded-lg"
                                            />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                                            {product.name}
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(product.price)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.gender}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.inStock}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <span className="font-bold">
                                            {product.sizes.join(", ")}
                                        </span>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className="mb-10">
                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}