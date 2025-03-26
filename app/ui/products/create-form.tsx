"use client";

import { useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import Image from "next/image";

import { ProductDessertField } from "@/app/lib/definitions";
import { createProductDessert, StateProductDessert } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form({
  products,
}: {
  products: ProductDessertField[];
}) {
  const initialState: StateProductDessert = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createProductDessert,
    initialState
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <form action={formAction}>
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Product ID */}
            <div className="mb-4">
              <label
                htmlFor="productId"
                className="mb-2 block text-sm font-medium"
              >
                Enter an product id
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="productId"
                    name="productId"
                    type="text"
                    placeholder="Enter product id"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="productId-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.productId &&
                    state.errors.productId.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {/* Product Thai Name */}
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Enter an Thai Name
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.name &&
                    state.errors.name.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {/* Product English Name */}
            <div className="mb-4">
              <label
                htmlFor="name_eng"
                className="mb-2 block text-sm font-medium"
              >
                Enter an English Name
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="name_eng"
                    name="name_eng"
                    type="text"
                    placeholder="Enter name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="name_eng-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.name_eng &&
                    state.errors.name_eng.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
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
                    placeholder="Enter price"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="price-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.price &&
                    state.errors.price.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {/* Product Amount */}
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium"
              >
                Choose an amount
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter Amount"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="amount-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.amount &&
                    state.errors.amount.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label
                htmlFor="image_url"
                className="mb-2 block text-sm font-medium"
              >
                Enter an image url
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="image_url"
                    name="image_url"
                    type="text"
                    placeholder="Enter image url"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="image_url-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.image_url &&
                    state.errors.image_url.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
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
            <Button type="submit" disabled={isPending}>
              Create Product
            </Button>
            <div className="flex h-8 items-end space-x-1">
              {/* Add form errors here */}
              {isPending && <p>Please wait...</p>}
              {state.errors && <p className="text-red-500">{state.message}</p>}
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="picture" className="mb-2 block text-sm font-medium">
              Picture
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Image
                  src={"/products/banana-egg-cake.jpg"}
                  priority
                  width={300}
                  height={200}
                  alt={`${"/products/banana-egg-cake.jpg"}'s profile picture`}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const [selectedImage, setSelectedImage] = useState("");

// const handleSelectChange = (event: any) => {
//   const item = products.find(
//     (product) => product.dessert_id === event.target.value
//   );
//   setSelectedImage(String(item?.image_url));
// };
// <form>
//   <div className="rounded-md bg-gray-50 p-4 md:p-6">
//     {/* Product Name */}
//     <div className="mb-4">
//       <label htmlFor="product" className="mb-2 block text-sm font-medium">
//         Product Name
//       </label>
//       <div className="relative">
//         <select
//           id="product"
//           name="productId"
//           className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//           defaultValue=""
//           aria-describedby="product-error"
//           onChange={handleSelectChange}
//         >
//           <option value="" disabled>
//             Select a product
//           </option>
//           {products.map((product) => (
//             <option key={product.id} value={product.id}>
//               {product.name}
//             </option>
//           ))}
//         </select>
//         <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//       </div>
//       {selectedImage && (
//         <div className="mt-4">
//           <img
//             src={selectedImage}
//             width={200}
//             height={100}
//             alt="Selected"
//           />
//         </div>
//       )}
//     </div>

//     {/* Product Amount */}
//     <div className="mb-4">
//       <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//         Choose an amount
//       </label>
//       <div className="relative mt-2 rounded-md">
//         <div className="relative">
//           <input
//             id="amount"
//             name="amount"
//             type="number"
//             placeholder="Enter USD amount"
//             className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//             required
//           />
//           <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="mt-6 flex justify-end gap-4">
//     <Link
//       href="/dashboard/products"
//       className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//     >
//       Cancel
//     </Link>
//     {/* <Link
//       href="/dashboard/products"
//       className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//     >
//       Edit product
//     </Link> */}
//     <Button type="submit">Edit product</Button>
//   </div>
// </form>

// <div className="rounded-md bg-gray-50 p-4 md:p-6">
//   <div className="grid grid-cols-2 gap-4">
//     <div className="...">
//       <form>
//         <div className="rounded-md bg-gray-50 p-4 md:p-6">
//           {/* Product Name */}
//           <div className="mb-4">
//             <label
//               htmlFor="product"
//               className="mb-2 block text-sm font-medium"
//             >
//               Product Name
//             </label>
//             <div className="relative">
//               <select
//                 id="product"
//                 name="productId"
//                 className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 defaultValue=""
//                 aria-describedby="product-error"
//                 onChange={handleSelectChange}
//               >
//                 <option value="" disabled>
//                   Select a product
//                 </option>
//                 {products.map((product) => (
//                   <option key={product.id} value={product.id}>
//                     {product.name}
//                   </option>
//                 ))}
//               </select>
//               <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Product English Name */}
//           <div className="mb-4">
//             <label
//               htmlFor="name_eng"
//               className="mb-2 block text-sm font-medium"
//             >
//               Product Name_ENG
//             </label>
//             <div className="relative mt-2 rounded-md">
//               <div className="relative">
//                 <input
//                   id="name_eng"
//                   name="name_eng"
//                   type="text"
//                   placeholder="Enter English Name"
//                   className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                   required
//                 />
//                 <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//               </div>
//             </div>
//           </div>

//           {/* Product Price */}
//           <div className="mb-4">
//             <label
//               htmlFor="price"
//               className="mb-2 block text-sm font-medium"
//             >
//               Choose an price
//             </label>
//             <div className="relative mt-2 rounded-md">
//               <div className="relative">
//                 <input
//                   id="price"
//                   name="price"
//                   type="text"
//                   placeholder="Enter Thai price"
//                   className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                   required
//                 />
//                 <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//               </div>
//             </div>
//           </div>

//           {/* Product Amount */}
//           <div className="mb-4">
//             <label
//               htmlFor="amount"
//               className="mb-2 block text-sm font-medium"
//             >
//               Choose an amount
//             </label>
//             <div className="relative mt-2 rounded-md">
//               <div className="relative">
//                 <input
//                   id="amount"
//                   name="amount"
//                   type="number"
//                   placeholder="Enter USD amount"
//                   className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                   required
//                 />
//                 <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end gap-4">
//           <Link
//             href="/dashboard/products"
//             className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//           >
//             Cancel
//           </Link>
//           <Button type="submit">Edit product</Button>
//         </div>
//       </form>
//     </div>
//     <div className="...">
//       {selectedImage && (
//         <div className="mt-4">
//           <img
//             src={selectedImage}
//             style={{ maxWidth: "600px", maxHeight: "600px" }}
//             alt="Selected"
//           />
//         </div>
//       )}
//     </div>
//   </div>
// </div>
