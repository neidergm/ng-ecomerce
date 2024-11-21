import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
    <Title
      title="Shop"
      subTitle="All products"
      className="mb-2"
    />

    <ProductsGrid 
      products={ products }
    />
    
  </>
  );
}
