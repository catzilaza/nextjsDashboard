import { fetchProducts_DessertById } from "@/app/lib/data";
import ProductCard from "@/components/products/product-card";

export default async function DetailProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const [product] = await Promise.all([fetchProducts_DessertById(id)]);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[720px] flex-col space-y-2.5 p-4 md:-mt-32">
        <ProductCard product={product} />
      </div>
    </main>
  );
}

{
  /* <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
<div className="w-32 text-white md:w-36">
  <AcmeLogo />
</div>
</div>
<Card key={product.dessert_id}>
<CardHeader>
  <CardTitle>Card Title</CardTitle>
  <img
    className="w-100 h-50"
    height={"auto"}
    width={"auto"}
    src={product.image_url}
    alt={`${product.name}'s profile picture`}
  />

  <CardDescription>
    Card Description
    <p className="text-sm text-gray-500">Name : {product.name}</p>
    <p className="text-sm text-gray-500">
      Name_eng : {product.name_eng}
    </p>
  </CardDescription>
</CardHeader>
<CardContent>
  <p>Card Content</p>
  <div className="flex w-full items-center justify-between pt-4">
    <div>
      <p className="text-xl font-medium">ราคา : {product.price}</p>

      <p> จำนวนคงเหลือ : {product.amount}</p>
    </div>
    <div className="flex justify-end gap-2"></div>
  </div>
</CardContent>
<CardFooter>
  <p>Card Footer</p>
  <div className="card-actions justify-end">
    <Button
      type="button"
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Add to Cart
    </Button>
  </div>
  <div className="card-actions justify-end">
    <Link
      href={"/products"}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Back
    </Link>
  </div>
</CardFooter>
</Card> */
}
