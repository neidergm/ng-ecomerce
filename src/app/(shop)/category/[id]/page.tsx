import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  }
}

export default function CategoryPage({ params }: Props) {

  if (params.id === "kids") {
    notFound()
  }

  return (
    <div>Category Page - {params.id}</div>
  )
}
