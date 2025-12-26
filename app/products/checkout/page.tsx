"use client";

// import checkoutAction from "../../lib/actions/checkout/checkout-action";
// import { useCartStore } from "../../store/cart-store";
// import checkoutAction from "@/lib/actions/checkout/checkout-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import checkoutAction from "../action-products/checkout-action";
import { use, useActionState, useState } from "react";
import { useRouter } from "next/navigation";

// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

export interface DessertProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export default function CheckOutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [message, setMessage] = useState("");
  // const [message, formAction, isPending] = useActionState(checkoutAction, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  const router = useRouter();

  const handleCheckoutAction = async () => {
    // const cbody = JSON.stringify({
    //   cartItems: items.map((item) => ({
    //     ...item,
    //     quantity: item.quantity,
    //   })),
    // });
    // console.log("cbody : ", cbody);
    console.log("items : ", items);
    await checkoutAction(items as any);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/products/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: items.map((item) => ({
            ...item,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        console.error("Checkout failed:", message);
        return;
      }

      const data = await response.json();
      const message = data?.message; // ใช้ optional chaining

      console.log("message : ", message);
      setMessage(message);

      // if (url && typeof url === "string") router.push(url);

      // const { url } = await response.json();
      // router.push(url);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      {/* <form action={formAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          onClick={handleCheckout}
          type="submit"
          formAction={formAction}
          variant="default"
          className="w-full"
        >
          Proceed to Payment
        </Button>
        {isPending ? "Loading..." : message}
      </form> */}
      {/* <Button
        onClick={handleCheckoutAction}
        type="submit"
        // formAction={formAction}
        variant="default"
        className="w-full"
      >
        Proceed to Payment
      </Button> */}
      <Button
        onClick={handleCheckout}
        type="submit"
        // formAction={formAction}
        variant="default"
        className="w-full"
      >
        Proceed to Payment
      </Button>
      {message.trim() !== "" ? (
        <>
          {message == "success" ? (
            <>
              <p>{"success"}</p>
            </>
          ) : (
            <>
              <p>{"error"}</p>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
