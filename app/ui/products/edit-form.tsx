"use client";

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ProductDessertForm } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateProduct, StateProduct } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditProductForm({ product }: { product: ProductDessertForm }) {
  const initialState: StateProduct = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.dessert_id);
  const [state, formAction] = useActionState(updateProductWithId, initialState);

  //console.log("EditProductForm ====> : ", product);
  // console.log("EditProductForm ====> : ", initialState);
  //console.log("EditProductForm ====> : ", updateProductWithId);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Image */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Product Image
          </label>
          <div className="relative">
            <Image
              src={product.image_url}
              width={150}
              height={100}
              alt={product.name_eng}
            ></Image>
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Product name
          </label>
          <div className="relative">
            <select
              id="product"
              name="productId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={product.dessert_id}
            >
              <option value="" disabled>
                Select a product
              </option>
              {
                <option key={product.dessert_id} value={product.dessert_id}>
                  {product.name}
                </option>
              }
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Choose an price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="text"
                defaultValue={product.price}
                placeholder="Enter price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Product Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                defaultValue={product.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        {/* <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Edit product
        </Link> */}
        <Button type="submit">Edit product</Button>
      </div>
    </form>
  );
}
