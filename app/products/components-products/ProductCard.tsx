"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductDessertSchema } from "@/app/lib/definitions";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

export default function ProductCard({
  product,
}: {
  product: ProductDessertSchema;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

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
    setSheetOpen(true);
  };

  const onRemoveItem = () => {
    removeItem(product.dessert_id);
  };

  // console.log("+++++ From ProductCard : ", items);
  // console.log("+++++ From ProductCard : ", items[0]?.name);
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
              href={"/products"}
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
              Remove to Cart
            </Button>
          </div>
          <div className="card-actions justify-end px-1">
            <Link
              href={"/products/checkout"}
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

// <>
//   {" "}
//   <Card key={product.dessert_id}>
//     <CardHeader>
//       username : <p>{username}</p>
//       role : <p>{role}</p>
//       {/* items : <p>{items}</p> */}
//       <CardTitle>Card Title</CardTitle>
//       <img
//         className="w-100 h-50"
//         height={"auto"}
//         width={"auto"}
//         src={product.image_url}
//         alt={`${product.name}'s profile picture`}
//       />
//       <CardDescription>
//         Card Description
//         <p className="text-sm text-gray-500">Name : {product.name}</p>
//         <p className="text-sm text-gray-500">
//           Name_eng : {product.name_eng}
//         </p>
//       </CardDescription>
//     </CardHeader>
//     <CardContent>
//       <p>Card Content</p>
//       <div className="flex w-full items-center justify-between pt-4">
//         <div>
//           <p className="text-xl font-medium">ราคา : {product.price}</p>
//           {/* <p> วันที่ : {formatDateToLocal(product.date)}</p> */}
//           <p> จำนวนคงเหลือ : {product.amount}</p>
//         </div>
//         <div className="flex justify-end gap-2">
//           {/* <UpdateProduct id={product.dessert_id} />
//         <DeleteProduct id={product.dessert_id} /> */}
//         </div>
//       </div>
//     </CardContent>
//     <CardFooter>
//       <p>Card Footer</p>
//       <div className="card-actions justify-end">
//         <Link
//           href={"/products"}
//           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//         >
//           Back
//         </Link>
//       </div>
//       <div className="card-actions justify-end">
//         <Button
//           type="button"
//           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//           onClick={onAddItem}
//         >
//           Add to Cart
//         </Button>
//       </div>
//       <div className="card-actions justify-end">
//         <Button
//           type="button"
//           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//           onClick={onRemoveItem}
//         >
//           Remove to Cart
//         </Button>
//       </div>
//       <div className="card-actions justify-end">
//         <Link
//           href={"/checkout"}
//           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//         >
//           Check-out page
//         </Link>
//       </div>
//     </CardFooter>
//   </Card>
// </>

//
// <div className="grid grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//   <div>
//     <Card key={product.dessert_id}>
//       <CardHeader>
//         username : <p>{username}</p>
//         role : <p>{role}</p>
//         {/* items : <p>{items}</p> */}
//         <CardTitle>Card Title</CardTitle>
//         <img
//           className="w-100 h-50"
//           height={"auto"}
//           width={"auto"}
//           src={product.image_url}
//           alt={`${product.name}'s profile picture`}
//         />
//         <CardDescription>
//           Card Description
//           <p className="text-sm text-gray-500">Name : {product.name}</p>
//           <p className="text-sm text-gray-500">
//             Name_eng : {product.name_eng}
//           </p>
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <p>Card Content</p>
//         <div className="flex w-full items-center justify-between pt-4">
//           <div>
//             <p className="text-xl font-medium">ราคา : {product.price}</p>
//             {/* <p> วันที่ : {formatDateToLocal(product.date)}</p> */}
//             <p> จำนวนคงเหลือ : {product.amount}</p>
//           </div>
//           <div className="flex justify-end gap-2">
//             {/* <UpdateProduct id={product.dessert_id} />
//       <DeleteProduct id={product.dessert_id} /> */}
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <p>Card Footer</p>
//         <div className="card-actions justify-end">
//           <Link
//             href={"/products"}
//             className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//           >
//             Back
//           </Link>
//         </div>
//         <div className="card-actions justify-end">
//           <Button
//             type="button"
//             className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//             onClick={onAddItem}
//           >
//             Add to Cart
//           </Button>
//         </div>
//         <div className="card-actions justify-end">
//           <Button
//             type="button"
//             className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//             onClick={onRemoveItem}
//           >
//             Remove to Cart
//           </Button>
//         </div>
//         <div className="card-actions justify-end">
//           <Link
//             href={"/checkout"}
//             className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//           >
//             Check-out page
//           </Link>
//         </div>
//       </CardFooter>
//     </Card>
//   </div>

//   <div className="flex flex-col justify-between p-4 leading-normal">
//     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//       Noteworthy technology acquisitions 2021
//     </h5>
//     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//       Here are the biggest enterprise technology acquisitions of 2021 so
//       far, in reverse chronological order.
//     </p>
//   </div>
// </div>
