"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductDessertSchema } from "@/app/lib/definitions";
import { useCartStore } from "@/store/cart-store";

export default function ProductCard({
  product,
}: {
  product: ProductDessertSchema;
}) {
  const { addItem, removeItem, updateUserName } = useCartStore();
  const { username, role } = useCartStore((state: any) => state.user);
  const items = useCartStore((state: any) => state.items);

  const onAddItem = () => {
    addItem({
      id: product.dessert_id,
      name: product.name,
      price: product.amount as number,
      imageUrl: product.image_url ? product.image_url[0] : null,
      quantity: 1,
    });
    updateUserName("555", "newRole");
  };

  const onRemoveItem = () => {
    removeItem(product.dessert_id);
  };

  console.log("+++++ From ProductCard : ", items);
  return (
    <>
      {" "}
      <Card key={product.dessert_id}>
        <CardHeader>
          username : <p>{username}</p>
          role : <p>{role}</p>
          {/* items : <p>{items}</p> */}
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
              {/* <p> วันที่ : {formatDateToLocal(product.date)}</p> */}
              <p> จำนวนคงเหลือ : {product.amount}</p>
            </div>
            <div className="flex justify-end gap-2">
              {/* <UpdateProduct id={product.dessert_id} />
            <DeleteProduct id={product.dessert_id} /> */}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
          <div className="card-actions justify-end">
            <Link
              href={"/products"}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Back
            </Link>
          </div>
          <div className="card-actions justify-end">
            <Button
              type="button"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={onAddItem}
            >
              Add to Cart
            </Button>
          </div>
          <div className="card-actions justify-end">
            <Button
              type="button"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={onRemoveItem}
            >
              Remove to Cart
            </Button>
          </div>
          <div className="card-actions justify-end">
            <Link
              href={"/checkout"}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Check-out page
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
