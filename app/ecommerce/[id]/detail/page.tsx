import { fetchProducts_DessertById } from "@/app/lib/data";
import CardProduct from "../../component/CardProduct";
// import CardProduct from "../component/CardProduct";

export default async function DetailProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const [product] = await Promise.all([fetchProducts_DessertById(id)]);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[720px] flex-col space-y-2.5 p-4 md:-mt-32">
        <CardProduct product={product} />
      </div>
    </main>
  );
}
