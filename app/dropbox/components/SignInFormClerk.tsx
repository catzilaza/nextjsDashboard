"use client";

// import { useSignIn } from "@clerk/nextjs";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { signInSchema } from "../lib/db/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInFormClerk() {
  //   const { signIn, isLoaded, setActive } = useSignIn(); //cleark hook
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // if (!isLoaded) return;
    // setIsSubmitting(true);
    // setAuthError(null);
    // try {
    //   const result = await signIn.create({
    //     identifier: data.identifier,
    //     password: data.password,
    //   });
    //   if (result.status === "complete") {
    //     await setActive({ session: result.createdSessionId });
    //     router.push("/dashboard");
    //   } else {
    //     console.error("Sign-in incomplete:", result);
    //     setAuthError("Sign-in could not be completed. Please try again.");
    //   }
    // } catch (error: any) {
    //   console.error("Sign-in error:", error);
    //   setAuthError(
    //     error.errors?.[0]?.message ||
    //       "An error occurred during sign-in. Please try again."
    //   );
    // } finally {
    //   setIsSubmitting(false);
    // }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <h1 className="text-2xl font-bold text-default-900">
              Welcome Back
            </h1>
            <p className="text-default-500 text-center">
              Sign in to access your secure cloud storage
            </p>
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
          Card Action
        </CardHeader>

        <Separator />

        <CardContent>
          {authError && (
            <div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="text-sm font-medium text-default-900"
              >
                Email
              </label>
              <div className="w-full relative">
                {/* ไอคอนด้านซ้าย */}
                <Mail className="absolute left-3 top-5 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                {/* ช่องกรอก email */}
                <Input
                  id="identifier"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("identifier")}
                  className={`pl-10 w-full ${
                    errors.identifier
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />

                {/* แสดง error message */}
                {errors.identifier && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.identifier.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-default-900"
                >
                  Password
                </label>
              </div>
              <div className="w-full relative">
                {/* ไอคอนด้านซ้าย */}
                <Lock className="absolute left-3 top-5 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                {/* ช่องกรอก password */}
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`pl-10 pr-10 w-full ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />

                {/* ปุ่ม toggle show/hide password */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-5 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>

                {/* แสดง error message */}
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
