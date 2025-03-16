"use client";

import { useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ProductField } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import Image from "next/image";

export default function Form({ products }: { products: ProductField[] }) {
  const [selectedImage, setSelectedImage] = useState("");

  const handleSelectChange = (event: any) => {
    const item = products.find((product) => product.id === event.target.value);
    setSelectedImage(String(item?.image_url));
  };

  return (
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

    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="...">
          <form>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
              {/* Product Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Product Name
                </label>
                <div className="relative">
                  <input
                    id="name_eng"
                    name="name_eng"
                    type="text"
                    placeholder="Enter English Name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              {/* Product English Name */}
              <div className="mb-4">
                <label
                  htmlFor="name_eng"
                  className="mb-2 block text-sm font-medium"
                >
                  Product Name_ENG
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="name_eng"
                      name="name_eng"
                      type="text"
                      placeholder="Enter English Name"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
              </div>

              {/* Product Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium"
                >
                  Choose an price
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="Enter Thai price"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                      placeholder="Enter USD amount"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      required
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
              <Button type="submit">Edit product</Button>
            </div>
          </form>
        </div>
        <div className="...">
          {/* Upload Product Image */}
          <div className="mb-4">
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Upload Image
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="image"
                  name="image"
                  type="file"
                  placeholder="Upload Image"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Show Image
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <div className="mt-4">
                  <Image
                    src={"/products/product-001.jpg"}
                    width={200}
                    height={100}
                    alt="Selected"
                  />
                </div>
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
