import { QuantitySelector, SizeSelector, ProductSlideShow, ProductSlideShowMobile } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

const products = initialData.products;

export default async  function ProductPage({ params }: ProductPageProps) {

  const { slug } = await params

  const product = products.find((product) => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2 ">
        <ProductSlideShowMobile className="block md:hidden" images={product.images} />
        <ProductSlideShow className="hidden md:block" images={product.images} />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <div className="mb-5">
          <h3 className="font-bold">Size</h3>
          <SizeSelector sizes={product.sizes} />
        </div>

        <QuantitySelector quantity={1} />

        <button className="btn-primary my-5">
          Add to cart
        </button>

        <h3 className="font-bold">Description</h3>
        <p>{product.description}</p>
      </div>

    </div>
  )
}
