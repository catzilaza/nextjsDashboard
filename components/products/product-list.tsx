import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDateToLocal } from "@/app/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ProductDessertSchema } from "@/app/lib/definitions";
// import { Badge } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ProductList({
  products,
}: {
  products: ProductDessertSchema[];
}) {
  // console.log("++++++ From ProductList ", products);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.dessert_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Link
                        href="/products"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-100 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                      >
                        <Image
                          src={product.image_url}
                          className="mr-2 rounded-full"
                          width={50}
                          height={50}
                          alt={`${product.name}'s profile picture`}
                        />
                      </Link>

                      <p>{product.name}</p>
                      <p>{product.name_eng}</p>
                    </div>
                    <p className="text-sm text-gray-500">{product.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(product.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2"></div>
                </div>
              </div>
            ))}
          </div> */}
          <div className="hidden min-w-full text-gray-900 md:table">
            <div className="grid grid-cols-3 gap-4">
              {products?.map((product) => (
                <Card key={product.dessert_id}>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <Link
                      href={`/products/${product.dessert_id}/detail`}
                      className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                      <div className="relative h-full object-cover">
                        <img
                          className="w-100 h-50 transition-transform duration-300 hover:scale-105"
                          height={"auto"}
                          width={"auto"}
                          src={product.image_url}
                          alt={`${product.name}'s profile picture`}
                        />
                      </div>
                    </Link>

                    <CardDescription>
                      <Badge className="bg-secondary font-semibold hover:text-red-200">
                        Card Description
                      </Badge>
                      <div className="text-sm text-gray-500">
                        Name : {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Name_eng : {product.name_eng}
                      </div>
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
                        href={`/products/${product.dessert_id}/detail`}
                      >
                        View Item
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="mt-6 flow-root">
//   <div className="inline-block min-w-full align-middle">
//     <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
//       <div className="md:hidden">
//         {products?.map((product) => (
//           <div
//             key={product.dessert_id}
//             className="mb-2 w-full rounded-md bg-white p-4"
//           >
//             <div className="flex items-center justify-between border-b pb-4">
//               <div>
//                 <div className="mb-2 flex items-center">
//                   <Link
//                     href="/products"
//                     className="flex items-center gap-5 self-start rounded-lg bg-blue-100 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
//                   >
//                     <Image
//                       src={product.image_url}
//                       className="mr-2 rounded-full"
//                       width={50}
//                       height={50}
//                       alt={`${product.name}'s profile picture`}
//                     />
//                   </Link>

//                   <p>{product.name}</p>
//                   <p>{product.name_eng}</p>
//                 </div>
//                 <p className="text-sm text-gray-500">{product.name}</p>
//               </div>
//             </div>
//             <div className="flex w-full items-center justify-between pt-4">
//               <div>
//                 <p>{formatDateToLocal(product.date)}</p>
//               </div>
//               <div className="flex justify-end gap-2"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="hidden min-w-full text-gray-900 md:table">
//         <div className="grid grid-cols-3 gap-4">
//           {products?.map((product) => (
//             <Card key={product.dessert_id}>
//               <CardHeader>
//                 <CardTitle>Card Title</CardTitle>
//                 <Link
//                   href={`/products/${product.dessert_id}/detail`}
//                   className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
//                 >
//                   <div className="relative h-full object-cover">
//                     <img
//                       className="w-100 h-50 transition-transform duration-300 hover:scale-105"
//                       height={"auto"}
//                       width={"auto"}
//                       src={product.image_url}
//                       alt={`${product.name}'s profile picture`}
//                     />
//                   </div>
//                 </Link>

//                 <CardDescription>
//                   <Badge className="bg-secondary font-semibold hover:text-red-200">
//                     Card Description
//                   </Badge>
//                   <p className="text-sm text-gray-500">
//                     Name : {product.name}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Name_eng : {product.name_eng}
//                   </p>
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Card Content</p>
//                 <div className="flex w-full items-center justify-between pt-4">
//                   <div>
//                     <p className="text-xl font-medium">
//                       ราคา : {product.price}
//                     </p>
//                     <p> วันที่ : {formatDateToLocal(product.date)}</p>
//                     <p> จำนวนคงเหลือ : {product.amount}</p>
//                   </div>
//                   <div className="flex justify-end gap-2"></div>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <p>Card Footer</p>
//                 <div className="card-actions justify-end">
//                   <Link
//                     className="animate-jump-in animate-delay-300 animate-once bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//                     href={`/products/${product.dessert_id}/detail`}
//                   >
//                     View Item
//                   </Link>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
