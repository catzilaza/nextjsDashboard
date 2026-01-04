"use client";

import checkoutAction from "../lib/uitls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Error from "next/error";
import { Loader2 } from "lucide-react";
import { set } from "better-auth";

// ------- UI Resources -------
// const SuccessIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <g transform="translate(0,2)">
//     <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z" fill="white"/>
//   </g>
// </svg>`;

// const ErrorIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z" fill="white"/>
// </svg>`;

// const InfoIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z" fill="white"/>
//   <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z" fill="white"/>
//   <path d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z" fill="white"/>
// </svg>`;

export default function CheckOutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [message, setMessage] = useState("");
  // const [message, formAction, isPending] = useActionState(checkoutAction, 0);

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const response = await fetch("/api/ecommerce/stripe/checkout", {
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
        setMessage(message);
        alert(`Error creating checkout session ${message}`);
        // throw new Error(message);
        return;
      }

      // const data = await response.json();
      // const message = data?.message; // ใช้ optional chaining
      // const url = data?.url as string; // ใช้ optional chaining

      const { url, message }: { url: string; message: string } =
        await response.json();

      setMessage(message);

      await new Promise((resolve) => setTimeout(resolve, 5000));
      // setIsLoading(false);

      if (url && typeof url === "string") {
        //เมื่อต้องการกระโดดออกไปเว็บอื่น (เช่น ไปหน้าจ่ายเงิน Stripe, ไปหน้า Login ของ Google)
        window.location.href = url;
        //เมื่อเปลี่ยนหน้าภายในแอป Next.js ของคุณเอง (เช่น จากหน้าสินค้า ไปหน้าตะกร้า) เพื่อความลื่นไหล
        //   router.push(url);
      } else {
        router.push("/ecommerce/cancel");
        //   throw new Error("No checkout url");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error creating checkout session");
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
                  {/* <span dangerouslySetInnerHTML={{ __html: SuccessIcon }} /> */}
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
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        type="submit"
        // formAction={formAction}
        variant="default"
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin " />
            Processing...
          </>
        ) : (
          <>"Proceed to Payment"</>
        )}
      </Button>
      {message.trim() !== "" ? (
        <>
          {message == "success" ? (
            <>
              <p className="text-green-400 text-5xl font-bold mt-3">
                {"success"}
              </p>
            </>
          ) : (
            <>
              <p className="text-red-400 text-5xl font-bold mt-3">{"error"}</p>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
