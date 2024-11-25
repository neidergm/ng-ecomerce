export const revalidate = 60; //60 secs

import { getPaginatedProductsWitImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page: number;
    take: number;
    gender?: Gender;
  }>
}

export default async function Home({ searchParams }: Props) {

  const { page, take } = await searchParams;

  const { products, totalPages } = await getPaginatedProductsWitImages({ page, take });

  if (products.length === 0) redirect('/');


  return (
    <>
      <Title
        title="Shop"
        subTitle="All products"
        className="mb-2"
      />

      <ProductsGrid products={products} />


      <Pagination totalPages={totalPages} />

    </>
  );
}
