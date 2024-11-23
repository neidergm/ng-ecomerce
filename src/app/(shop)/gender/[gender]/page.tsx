
import { getPaginatedProductsWitImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { ValidCategories } from "@/interfaces";
import { Gender } from "@prisma/client";

type Props = {
  params: Promise<{
    gender: Gender;
  }>,
  searchParams: Promise<{
    page?: string;
    take?: string;
  }>
}


export default async function GenderPage({ params, searchParams }: Props) {

  const { gender } = await params;
  const { page, take } = await searchParams;
  // if (params.id === "kids") {
  //   notFound()
  // }

  const labels: Record<ValidCategories, string> = {
    male: "Men",
    female: "Women",
    unisex: "Everyone",
  }

  const { products, totalPages } = await getPaginatedProductsWitImages({ gender, page, take });

  return (
    <div>
      <Title
        title="Products"
        subTitle={`For ${labels[gender]}`}
      />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}
