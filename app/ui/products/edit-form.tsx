"use client";

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ProductDessertForm, ProductDessertField } from "@/app/lib/definitions";
import { updateProductDessert, StateProductDessert } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditProductForm({
  product,
}: {
  product: ProductDessertField;
}) {
  const initialState: StateProductDessert = { message: null, errors: {} };
  const updateProductWithId = updateProductDessert.bind(
    null,
    product.dessert_id
  );
  const [state, formAction] = useActionState(updateProductWithId, initialState);

  // console.log("EditProductForm ====> : ", product);
  // console.log("EditProductForm ====> : ", initialState);
  // console.log("EditProductForm ====> : ", updateProductWithId);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Image */}
        <div className="mb-4">
          <label
            htmlFor="productimg"
            className="mb-2 block text-sm font-medium"
          >
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

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image_url"
                name="image_url"
                type="text"
                placeholder="Enter image url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                defaultValue={product.image_url}
                readOnly
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* <div id="image_url-error" aria-live="polite" aria-atomic="true">
              {state.errors?.image_url &&
                state.errors.image_url.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
          </div>
        </div>

        {/* Product ID */}
        <div className="mb-4">
          <label htmlFor="productId" className="mb-2 block text-sm font-medium">
            Product Id
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="productId"
                name="productId"
                type="text"
                placeholder="Enter product id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                readOnly
                defaultValue={product.dessert_id}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* <div id="productId-error" aria-live="polite" aria-atomic="true">
              {state.errors?.productId &&
                state.errors.productId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Product name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                // required
                readOnly
                defaultValue={product.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Product English Name */}
        <div className="mb-4">
          <label htmlFor="name_eng" className="mb-2 block text-sm font-medium">
            Product english name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name_eng"
                name="name_eng"
                type="text"
                // required
                readOnly
                defaultValue={product.name_eng}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Enter an price
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
            Enter an amount
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

// export default function EditProductForm({
//   product,
// }: {
//   product: ProductDessertForm;
// }) {
//   const initialState: StateProductDessert = { message: null, errors: {} };
//   const updateProductWithId = updateProductDessert.bind(
//     null,
//     product.dessert_id
//   );
//   const [state, formAction] = useActionState(updateProductWithId, initialState);

//   console.log("EditProductForm ====> : ", product);
//   console.log("EditProductForm ====> : ", initialState);
//   console.log("EditProductForm ====> : ", updateProductWithId);

//   return (
//     <form action={formAction}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Product Image */}
//         <div className="mb-4">
//           <label
//             htmlFor="productimg"
//             className="mb-2 block text-sm font-medium"
//           >
//             Product Image
//           </label>
//           <div className="relative">
//             <Image
//               src={product.image_url}
//               width={150}
//               height={100}
//               alt={product.name_eng}
//             ></Image>
//           </div>
//         </div>

//         {/* Product Price */}
//         <div className="mb-4">
//           <label htmlFor="name" className="mb-2 block text-sm font-medium">
//             Product name
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 defaultValue={product.name}
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               />
//               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>

//         {/* Product Price */}
//         <div className="mb-4">
//           <label htmlFor="price" className="mb-2 block text-sm font-medium">
//             Choose an price
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="price"
//                 name="price"
//                 type="text"
//                 defaultValue={product.price}
//                 placeholder="Enter price"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               />
//               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>

//         {/* Product Amount */}
//         <div className="mb-4">
//           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//             Choose an amount
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 defaultValue={product.amount}
//                 placeholder="Enter USD amount"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               />
//               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/products"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Link
//           href="/dashboard/products"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Edit product
//         </Link>
//         <Button type="submit">Edit product</Button>
//       </div>
//     </form>
//   );
// }
