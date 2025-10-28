import Image from "next/image";
import { UpdateProduct, DeleteProduct } from "@/app/dashboard/ui/products/button";
// import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredProducts_Dessert } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { products_desserts } from "@/app/lib/placeholder-data";
import pic1 from "../../../public/products/Brownie.jpg";

export default async function ProductCard({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts_Dessert(query, currentPage);

  // console.log("Products ===> : ", products);
  //[Error: Unable to optimize image and unable to fallback to upstream image]
  //statusCode: 400

  //min-w-full text-gray-900

  return (
    <div className="mt-6 bg-gray-200 p-2 inline-block min-w-full align-middle">
      <div className="md:hidden">
        {products?.map((product) => (
          <div
            key={product.dessert_id}
            className="mb-2 w-full rounded-md bg-white p-4"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <Image
                    src={product.image_url}
                    priority
                    className="mr-2"
                    width={100}
                    height={50}
                    alt={`${product.name_eng}'s profile picture`}
                    style={{
                      width: "auto",
                      height: "auto",
                    }}
                  />
                  <p>{product.name}</p>
                  <p>{product.name_eng}</p>
                </div>
                <p className="text-sm text-gray-500">{product.name}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p className="text-xl font-medium">
                  {formatCurrency(product.amount)}
                </p>
                <p>{formatDateToLocal(product.date)}</p>
              </div>
              <div className="flex justify-end gap-2">
                <UpdateProduct id={product.dessert_id} />
                <DeleteProduct id={product.dessert_id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden items-center justify-center min-w-full text-gray-900 md:table">
        <div className="grid lg:grid-cols-5 gap-4">
          {products?.map((product) => (
            <Card key={product.dessert_id} className="md:overflow-hidden">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <div className="relative border-2 lg:w-64 lg:h-64">
                  <Image
                    src={product.image_url}
                    priority
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    width={300}
                    height={100}
                    alt={`${product.name_eng}'s profile picture`}
                    // style={{
                    //   width: "auto",
                    //   height: "auto",
                    // }}
                  />
                </div>
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
                    <p className="text-xl font-medium">
                      ราคา : {product.price}
                    </p>
                    <p> วันที่ : {formatDateToLocal(product.date)}</p>
                    <p> จำนวนคงเหลือ : {product.amount}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateProduct id={product.dessert_id} />
                    <DeleteProduct id={product.dessert_id} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
                <div className="card-actions justify-end">
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    View
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* <img
className="w-100 h-50"
height={"auto"}
width={"auto"}
src={product.image_url}
alt={`${product.name}'s profile picture`}
/> */
}

// https://medium.com/@enayetflweb/crafting-effective-ui-with-the-card-component-in-shadcn-ui-9c41719b8e44

// {
//   <Image
//     src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
//     width={400}
//     height={400}
//     alt="Album"
//   />;
// }

//{
/* <div className="grid grid-cols-4 gap-4">
{products?.map((product) => (
  <div
    key={product.id}
    className="card lg:card-side bg-base-100 shadow-xl"
  >
    <figure>
      <Image
        src={product.image_url}
        className="rounded-full"
        width={80}
        height={80}
        alt={`${product.name}'s profile picture`}
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">New album is released!</h2>
      <p className="text-sm text-gray-500">
        Name : {product.name}
      </p>
      <p className="text-sm text-gray-500">
        E-mail : {product.name}
      </p>     
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">
            {formatCurrency(product.amount)}
          </p>
          <p>{formatDateToLocal(product.date)}</p>
        </div>
        <div className="flex justify-end gap-2">
          <UpdateInvoice id={product.id} />
          <DeleteInvoice id={product.id} />
        </div>
      </div>
      <div className="card-actions justify-end">
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Listen
        </button>
      </div>
    </div>
  </div>
))}
</div> */
//}

//{
/* <div className="mt-6 flow-root">
<div className="inline-block min-w-full align-middle">
  <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
    <div className="md:hidden">
      {products?.map((product) => (
        <div
          key={product.dessert_id}
          className="mb-2 w-full rounded-md bg-white p-4"
        >
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <div className="mb-2 flex items-center">
                <Image
                  src={product.image_url}
                  className="mr-2 rounded-full"
                  width={50}
                  height={50}
                  alt={`${product.name}'s profile picture`}
                />
                <p>{product.name}</p>
                <p>{product.name_eng}</p>
              </div>
              <p className="text-sm text-gray-500">{product.name}</p>
            </div>                 
          </div>
          <div className="flex w-full items-center justify-between pt-4">
            <div>
              <p className="text-xl font-medium">
                {formatCurrency(product.amount)}
              </p>
              <p>{formatDateToLocal(product.date)}</p>
            </div>
            <div className="flex justify-end gap-2">
              <UpdateProduct id={product.dessert_id} />
              <DeleteProduct id={product.dessert_id} />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="hidden min-w-full text-gray-900 md:table">
      <div className="grid grid-cols-5 gap-4">
        {products?.map((product) => (
          <Card key={product.dessert_id}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <img
                className="w-100 h-50"
                height={"auto"}
                width={"auto"}
                src={'/products/BananaEggCake.jpg'}
                alt={`${product.name}'s profile picture`}
              />
              <CardDescription>
                Card Description
                <p className="text-sm text-gray-500">
                  Name : {product.name}
                </p>
                <p className="text-sm text-gray-500">
                  Name_eng : {product.name_eng}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p className="text-xl font-medium">
                    ราคา : {product.price}
                  </p>
                  <p> วันที่ : {formatDateToLocal(product.date)}</p>
                  <p> จำนวนคงเหลือ : {product.amount}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <UpdateProduct id={product.dessert_id} />
                  <DeleteProduct id={product.dessert_id} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
              <div className="card-actions justify-end">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Listen
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </div>
</div>
</div> */
//}

//============================================================
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
//                   <Image
//                     src={product.image_url}
//                     priority
//                     className="mr-2"
//                     width={100}
//                     height={50}
//                     alt={`${product.name_eng}'s profile picture`}
//                     style={{
//                       width: "auto",
//                       height: "auto",
//                     }}
//                   />
//                   <p>{product.name}</p>
//                   <p>{product.name_eng}</p>
//                 </div>
//                 <p className="text-sm text-gray-500">{product.name}</p>
//               </div>
//             </div>
//             <div className="flex w-full items-center justify-between pt-4">
//               <div>
//                 <p className="text-xl font-medium">
//                   {formatCurrency(product.amount)}
//                 </p>
//                 <p>{formatDateToLocal(product.date)}</p>
//               </div>
//               <div className="flex justify-end gap-2">
//                 <UpdateProduct id={product.dessert_id} />
//                 <DeleteProduct id={product.dessert_id} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="hidden min-w-full text-gray-900 md:table">
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
//           {products?.map((product) => (
//             <Card key={product.dessert_id}>
//               <CardHeader>
//                 <CardTitle>Card Title</CardTitle>
//                 <div className="relative overflow-hidden border-2 lg:w-64 lg:h-64 border-gray-300">
//                   <Image
//                     src={product.image_url}
//                     priority
//                     className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
//                     width={300}
//                     height={100}
//                     alt={`${product.name_eng}'s profile picture`}
//                     // style={{
//                     //   width: "auto",
//                     //   height: "auto",
//                     // }}
//                   />
//                 </div>
//                 <CardDescription>
//                   Card Description
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
//                   <div className="flex justify-end gap-2">
//                     <UpdateProduct id={product.dessert_id} />
//                     <DeleteProduct id={product.dessert_id} />
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <p>Card Footer</p>
//                 <div className="card-actions justify-end">
//                   <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
//                     View
//                   </button>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
