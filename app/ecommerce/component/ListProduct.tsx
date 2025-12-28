import React from "react";
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
import { Badge } from "@/components/ui/badge";
import { formatDateToLocal } from "../hook/localdate";

export default function ListProduct({
  products,
}: {
  products?: ProductDessertSchema[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {products?.map((product) => (
        <Card key={product.dessert_id}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <Link
              href={`/ecommerce/${product.dessert_id}`}
              className="flex items-center justify-center gap-5 rounded-lg bg-white px-6 py-3  hover:bg-blue-200"
            >
              <div className="relative overflow-hidden border-2 border-gray-300 h-32 w-32 md:h-32 md:w-32 lg:h-64 lg:w-64 ">
                <img
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  // height={"auto"}
                  // width={"auto"}
                  src={product.image_url}
                  alt={`${product.name}'s profile picture`}
                />
              </div>
            </Link>
            <CardDescription>
              <Badge className="bg-white text-black font-semibold hover:text-red-200">
                Card Description
              </Badge>
              <div className="text-xl text-black">{product.name}</div>
              <div className="text-xl text-black">{product.name_eng}</div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>Card Content</div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <div className="text-xl font-medium">
                  ราคา : {product.price}
                </div>
                <div> วันที่ : {formatDateToLocal(product.date)}</div>
                <div> จำนวนคงเหลือ : {product.amount}</div>
              </div>
              <div className="flex justify-end gap-2"></div>
            </div>
          </CardContent>
          <CardFooter>
            <div>Card Footer</div>
            <div className="card-actions justify-end">
              <Link
                className="animate-jump-in animate-delay-300 animate-once bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                href={`/ecommerce/${product.dessert_id}`}
              >
                View Item
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
