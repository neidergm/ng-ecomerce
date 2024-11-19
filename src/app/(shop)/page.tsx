import { ProductsGrid } from "@/components/products/grid/ProductsGrid";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <main>
      <ProductsGrid 
        products={products}
      />
    </main>
  );
}
