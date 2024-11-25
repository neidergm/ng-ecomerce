import { Metadata } from "next";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { QuantitySelector, SizeSelector, ProductSlideShow, ProductSlideShowMobile, ProductStockLabel } from "@/components";
import { getProductBySlug } from "@/actions";

type Props = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 604800;

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.name || 'Product not found',
    description: product?.description || 'Product not found',
    openGraph: {
      images: [`/products/${product?.images[0]}`],
    },
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = await params

  const product = await getProductBySlug(slug)

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

        <ProductStockLabel slug={slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.name}
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
