"use server";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export default async function checkoutAction({ myitems }: { myitems: any }) {
  // const line_items = myitems.map((item: any) => ({
  //   price_data: {
  //     currency: "usd",
  //     product_data: {
  //       name: item.name,
  //     },
  //     unit_amount: item.price * 100,
  //   },
  //   quantity: item.quantity,
  // }));
  const ttt = {myitems};
  console.log("From Check-Out Action...", myitems);
  console.log("From Check-Out Action...", ttt.myitems);
}
// export default async function checkoutAction(
//   previousState: any,
//   formData: FormData
// ): Promise<any> {
//   const itemName = formData.get("name") as any;
//   console.log("From Check-Out Action");
//   console.log("From Check-Out Action Item-Name", itemName);
//   return previousState + 1;
// }

// export default async function checkoutAction(previousState:any,
//   formData: FormData
// ): Promise<void> {

//   const itemName = formData.get("name") as string;
//   console.log("From Check-Out Action");
//   console.log("From Check-Out Action Item-Name", itemName);
// }
