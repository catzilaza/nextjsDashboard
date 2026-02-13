import { fetchProducts_DessertById } from "@/app/ecommerce/lib/data";
import { fetchProductById } from "../../actions/productAction";
import CardProduct from "../../component/CardProduct";

export default async function DetailProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  // const [product] = await Promise.all([fetchProducts_DessertById(id)]);
  const [product] = (await Promise.all([fetchProductById(id)])) as any[];

  return (
    <>
      <CardProduct product={product} />
    </>
  );
}
