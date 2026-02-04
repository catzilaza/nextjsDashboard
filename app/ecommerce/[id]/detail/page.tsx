import { fetchProducts_DessertById } from "@/app/lib/data";
import CardProduct from "../../component/CardProduct";

export default async function DetailProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const [product] = await Promise.all([fetchProducts_DessertById(id)]);

  return (
    <>
      <CardProduct product={product} />
    </>
  );
}
