"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { username } from "better-auth/plugins";
import checkoutAction from "../lib/uitls";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.string().email("Please enter a valid email address."),
  street: z
    .string()
    .min(5, "Street must be at least 5 characters.")
    .max(32, "Street must be at most 32 characters."),
  city: z
    .string()
    .min(5, "City must be at least 5 characters.")
    .max(32, "City must be at most 32 characters."),
  state: z
    .string()
    .min(5, "State must be at least 5 characters.")
    .max(10, "State must be at most 10 characters."),
  zipcode: z
    .string()
    .min(5, "Zipcode must be at least 5 characters.")
    .max(32, "Zipcode must be at most 32 characters."),
  country: z
    .string()
    .min(5, "Country must be at least 5 characters.")
    .max(32, "Country must be at most 32 characters."),
  phone: z
    .string()
    .min(5, "Phone must be at least 5 characters.")
    .max(32, "Phone must be at most 32 characters."),
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export default function CheckOutPage() {
  const { items, removeItem, addItem, getTotalItem } = useCartStore();
  const [updateItems, setUpdateItems] = useState<any[]>(items);
  const user = useCartStore((state) => state.user);
  const total = getTotalItem();
  const [message, setMessage] = useState("");
  // const [message, formAction, isPending] = useActionState(checkoutAction, 0);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // เพิ่มสำหรับ Submit button

  if (updateItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  const router = useRouter();

  // const handleCheckoutAction = async () => {
  // const cbody = JSON.stringify({
  //   cartItems: items.map((item) => ({
  //     ...item,
  //     quantity: item.quantity,
  //   })),
  // });
  // console.log("cbody : ", cbody);
  // console.log("items : ", items);
  //   await checkoutAction(items as any);
  // };

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
  const [data, setData] = useState<Payment[]>([
    {
      id: "728ed52f",
      item: "Product 1",
      price: 100,
      quantity: 1,
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]);
  useEffect(() => {
    setUpdateItems(items);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
      title: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true); // เริ่ม loading
    try {
      const response = await fetch("/api/ecommerce/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Failed to submit address");
        throw new Error(message);
        // return;
      }
      toast.success("Address submitted successfully");
      form.reset(); // reset form หลังสำเร็จ
    } catch (error) {
      toast.error("Failed to submit address");
      return;
    } finally {
      setIsSubmitting(false); // จบ loading
    }

    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // });
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl justify-center mx-auto p-10 gap-6">
        <div>
          <Card className="w-full sm:max-w-md">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Name : {user.name}</CardDescription>
              <CardDescription>Email : {user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-name">
                            Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your name"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-email">
                            Email
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-email"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your email"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="street"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-street">
                            Street Address
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-street"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your street address"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-city">
                            City
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-city"
                            aria-invalid={fieldState.invalid}
                            placeholder="Login button not working on mobile"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="state"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-state">
                            State
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-state"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your state"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="zipcode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-zipcode">
                            Zip Code
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-zipcode"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your zip code"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="country"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-country">
                            Country
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-country"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your country"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-phone">
                            Phone Number
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-phone"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your phone number"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-title">
                            Bug Title
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-title"
                            aria-invalid={fieldState.invalid}
                            placeholder="Login button not working on mobile"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-description">
                            Description
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="form-rhf-demo-description"
                              placeholder="I'm having an issue with the login button on mobile."
                              rows={6}
                              className="min-h-24 resize-none"
                              aria-invalid={fieldState.invalid}
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupText className="tabular-nums">
                                {field.value.length}/100 characters
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          <FieldDescription>
                            Include steps to reproduce, expected behavior, and
                            what actually happened.
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="form-rhf-demo"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h1>Infomation User orders</h1>
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
              </div>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-2 border-b pb-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span>
                        {" "}
                        <div className="flex items-center gap-2">
                          {/* <span dangerouslySetInnerHTML={{ __html: SuccessIcon }} /> */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            –
                          </Button>
                          <span className="text-lg font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addItem({ ...item, quantity: 1 })}
                          >
                            +
                          </Button>
                        </div>
                      </span>
                      <span className="font-semibold">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <span dangerouslySetInnerHTML={{ __html: SuccessIcon }} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        –
                      </Button>
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addItem({ ...item, quantity: 1 })}
                      >
                        +
                      </Button>
                    </div> */}
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-2 text-lg font-semibold">
                Total: ${(total / 100).toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
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
                  <p className="text-red-400 text-5xl font-bold mt-3">
                    {"error"}
                  </p>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

{
  /* <div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
  <Card className="max-w-md mx-auto mb-8">
    <CardHeader>
      <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        <h1>Infomation User orders</h1>
        <h1>{user.userId}</h1>
        <h1>{user.username}</h1>
        <h1>{user.role}</h1>
      </div>
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
              <span dangerouslySetInnerHTML={{ __html: SuccessIcon }} />
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
          <p className="text-green-400 text-5xl font-bold mt-3">{"success"}</p>
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
</div>; */
}
