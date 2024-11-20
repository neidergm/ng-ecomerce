// import { notFound } from "next/navigation";

import { ProductsGrid, Title } from "@/components";
import { ValidCategories } from "@/interfaces";
import { initialData } from "@/seed/seed";

type Props = {
  params: {
    id: ValidCategories;
  }
}

const products = initialData.products;

export default function CategoryPage({ params }: Props) {

  // if (params.id === "kids") {
  //   notFound()
  // }

  const labels: Record<ValidCategories, string> = {
    men: "Men",
    women: "Women",
    kid: "Kids",
    unisex: "Everyone"
  }

  const categoryProducts = products.filter(product => product.gender === params.id);

  return (
    <div>
      <Title
        title="Products"
        subTitle={`For ${labels[params.id]}`}
      />
      <ProductsGrid
        products={categoryProducts}
      />
    </div>
  )
}
