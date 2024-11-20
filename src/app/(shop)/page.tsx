import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <main>
      <Title
        title="Shop"
        subTitle="Welcome to our shop"
      />
      <ProductsGrid
        products={products}
      />
    </main>
  );
}
