"use server";

export default async function checkoutAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  const itemName = formData.get("name") as any;
  console.log("From Check-Out Action");
  console.log("From Check-Out Action Item-Name", itemName);
  return previousState + 1;
}

// export default async function checkoutAction(previousState:any,
//   formData: FormData
// ): Promise<void> {

//   const itemName = formData.get("name") as string;
//   console.log("From Check-Out Action");
//   console.log("From Check-Out Action Item-Name", itemName);
// }
