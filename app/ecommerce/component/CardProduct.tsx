"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-stroe";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getCurrentSession,
  getCurrentUser,
} from "@/app/betterauth/actions/users";
import { ProductDessertSchema } from "../lib/db/models/dessert";
import { User, Role } from "../lib/db/models/user";
import { Product } from "../lib/db/models/product";

export default function CardProduct({ product }: { product: Product }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const { addItem, removeItem } = useCartStore();
  const { updateUser } = useUserStore();
  const { username, role } = useUserStore((state: any) => state.user);
  const items = useCartStore((state: any) => state.items);

  const [open, setOpen] = useState(false);
  const [isLogedin, setIsLogedin] = useState(false);
  const [userProfile, setUserProfile] = useState<User>({
    id: "",
    name: "",
    email: "",
    image: "",
    role: undefined,
  });
  const hasuser = async () => {
    // let user = await getSession();
    let session = await getCurrentSession();
    if (session) {
      setIsLogedin(true);
      let user = await getCurrentUser();
      setUserProfile({
        id: user.user.id,
        name: user.user.name,
        email: user.user.email,
        image: user.user.image,
        role: user?.currentUser?.role as Role,
        // role: user?.currentUser?.role?.toLowerCase() as Role,
      });
      return user;
    } else {
      return null;
    }
  };

  useEffect(() => {
    hasuser();
    setCurrentDate(
      new Date().toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }),
    );
  }, []);

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price as number,
      image_url: product.image_url,
      quantity: 1,
      // stock: product.stock,
    });
    updateUser(
      userProfile.id as string,
      userProfile?.name as string,
      userProfile.email as string,
      userProfile?.image as string,
      userProfile?.role as Role,
    );
    setSheetOpen(true);
  };

  const onRemoveItem = () => {
    removeItem(product.id);
  };

  // console.log("From /app/ecommerce/components/CardProduct : ");
  // console.log("product : ", product);
  // console.log("userProfile : ", userProfile);
  // console.log("items : ", items);
  // console.log("username : ", username);
  // console.log("role : ", role);

  //  const imageUrlCard = product.image_url && product.image_url.length > 0 ? product.image_url[0] : '/not-found.jpg';

  return (
    <>
      <div className="grid grid-rows-2 gap-6 w-full max-w-7xl justify-center mx-auto p-10">
        <div className="w-full justify-center items-center gap-4">
          <div className="w-full shadow-lg">
            <Card className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* คอลัมน์ซ้าย: Header + รูปภาพ */}
                <div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      Product Title
                    </CardTitle>
                    <div className="relative h-80 w-full overflow-hidden rounded-md border-2 border-gray-300">
                      <img
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        // height={"auto"}
                        // width={"auto"}
                        src={product.image_url}
                        alt={`${product.name}'s profile picture`}
                      />
                    </div>
                  </CardHeader>
                </div>

                {/* คอลัมน์ขวา: รายละเอียด + ราคา + ปุ่ม */}
                <div className="flex flex-col justify-between p-4">
                  <CardDescription className="mt-12">
                    <div className="text-xl text-gray-600">
                      Name (TH): {product.name}
                    </div>
                    <div className="text-xl text-gray-600">
                      Name (EN): {product.name_eng}
                    </div>
                    <div className="text-sm text-gray-600">
                      Date: 2026-02-02
                    </div>
                  </CardDescription>

                  <CardContent className="mt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xl font-semibold">
                          เนื้อหา: Lorem ipsum dolor sit amet, consectetur
                          adipisicing elit. Harum vitae optio praesentium
                          consequatur, nulla, iure perspiciatis molestias eius
                          labore facilis sapiente hic earum obcaecati, ratione
                          expedita eligendi enim neque quis.
                        </div>
                        <div className="text-xl font-semibold">
                          ราคา: {product.price}
                        </div>
                        <div className="text-md text-gray-700">
                          จำนวนคงเหลือ: {product.stock}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-wrap gap-2 justify-start mt-4 ">
                    <div className="px-1">
                      <Link
                        href={"/ecommerce"}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
                      >
                        Back
                      </Link>
                    </div>
                    <Button
                      className="bg-green-500 text-white"
                      onClick={onAddItem}
                    >
                      <ShoppingCartIcon />
                      Add to Cart
                    </Button>
                    <Button
                      className="bg-red-500 text-white"
                      onClick={onRemoveItem}
                    >
                      Remove
                    </Button>
                    <Link
                      href="/ecommerce/checkout"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Checkout
                    </Link>
                  </CardFooter>
                </div>
              </div>
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
        </div>
        {/* แถวสอง: Comment Section */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <div className="space-y-3">
            {/* ตัวอย่าง comment */}
            <div className="p-2 border rounded bg-white">
              <p className="text-sm text-gray-800">User1: สินค้าดีมากครับ 👍</p>
            </div>
            <div className="p-2 border rounded bg-white">
              <p className="text-sm text-gray-800">User2: ส่งไว คุณภาพดี</p>
            </div>
          </div>

          {/* ฟอร์มเพิ่ม comment */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="เขียนความคิดเห็น..."
              className="flex-1 border rounded px-3 py-2"
            />
            <Button className="bg-blue-500 text-white">ส่ง</Button>
          </div>
        </div>
      </div>
    </>
  );
}
