"use client";

import React, { useEffect, useState } from "react";
import { ProductDessertSchema } from "../models/dessert";
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
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";

export default function CardProduct({
  product,
}: {
  product: ProductDessertSchema;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const { addItem, removeItem, updateUserName } = useCartStore();
  const { username, role } = useCartStore((state: any) => state.user);
  const items = useCartStore((state: any) => state.items);

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    );
  }, []);

  const onAddItem = () => {
    addItem({
      id: product.dessert_id,
      name: product.name,
      price: product.amount as number,
      imageUrl: product.image_url ? product.image_url[0] : null,
      quantity: 1,
    });
    updateUserName("555", "newRole");
    setSheetOpen(true);
  };

  const onRemoveItem = () => {
    removeItem(product.dessert_id);
  };

  //  const imageUrlCard = product.image_url && product.image_url.length > 0 ? product.image_url[0] : '/not-found.jpg';

  return (
    <div>
      <Card key={product.dessert_id} className="w-[800px]">
        <CardHeader>
          {/* username : <div>{username}</div>
          role : <div>{role}</div> */}
          {/* items : <p>{items}</p> */}
          <CardTitle>Card Title</CardTitle>
          <div className="relative h-80 w-full overflow-hidden border-2 border-gray-300">
            <img
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              // height={"auto"}
              // width={"auto"}
              src={product.image_url}
              alt={`${product.name}'s profile picture`}
            />
          </div>
          {/* <img
            className="w-100 h-50"
            height={"auto"}
            width={"auto"}
            src={product.image_url}
            alt={`${product.name}'s profile picture`}
          /> */}
          <CardDescription>
            Card Description
            <div className="text-sm text-gray-500">Name : {product.name}</div>
            <div className="text-sm text-gray-500">
              Name_eng : {product.name_eng}
            </div>
            <div className="text-sm text-gray-500">Date : {}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>Card Content</div>
          <div className="flex w-full items-center justify-between pt-4">
            <div>
              <div className="text-xl font-medium">ราคา : {product.price}</div>
              {/* <p> วันที่ : {formatDateToLocal(product.date)}</p> */}
              <div> จำนวนคงเหลือ : {product.amount}</div>
            </div>
            <div className="flex justify-end gap-2">
              {/* <UpdateProduct id={product.dessert_id} />
            <DeleteProduct id={product.dessert_id} /> */}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div>Card Footer</div>
          <div className="card-actions justify-end px-1">
            <Link
              href={"/ecommerce"}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Back
            </Link>
          </div>
          <div className="card-actions justify-end px-1">
            <Button
              type="button"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={onAddItem}
            >
              <ShoppingCartIcon />
              Add to Cart
            </Button>
          </div>
          <div className="card-actions justify-end px-1">
            <Button
              type="button"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={onRemoveItem}
            >
              Remove from Cart
            </Button>
          </div>
          <div className="card-actions justify-end px-1">
            <Link
              href={"/ecommerce/checkout"}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Check-out page
            </Link>
          </div>
        </CardFooter>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SheetContent>
          <SheetHeader>
            <SheetTitle> Your cart </SheetTitle>
            {items.map((item: any, idx: any) => (
              <div key={item.id || idx}>
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                {/* Add more fields as needed */}
              </div>
            ))}
            <SheetDescription>your items.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
