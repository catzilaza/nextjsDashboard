"use client";

// import { useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import React from "react";
import {
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { signUpSchema } from "../../dropbox/lib/db/schema";
import { getLoginSession } from "../lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SerializedUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  image_url?: string | null | undefined;
  role?: string | null | undefined;
  expiredAt?: string | null | undefined;
}

type typeUserProfile = SerializedUser;

export default function SignUpFormClerk() {
  //   const { signUp, isLoaded, setActive } = useSignUp(); //cleark hook
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [userProfile, setUserProfile] = useState<typeUserProfile>({
    name: "",
    email: "",
    image: "",
    image_url: "",
    role: "",
    expiredAt: "",
  });
  const hasuser = async () => {
    let user = await getLoginSession();
    if (user) {
      setIsLoaded(true);
      setIsLoggedIn(true);
      setIsSignedIn(true);
      setUserProfile({
        name: user.user.name,
        email: user.user.email,
        image: user.user.image,
        image_url: user.user.image_url,
        role: user.user.role,
        expiredAt: user.expires,
      });
      return user;
    } else {
      return null;
    }
  };

  useEffect(() => {
    hasuser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      //   await signUp.create({
      //     emailAddress: data.email,
      //     password: data.password,
      //   });

      //   await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (error: any) {
      console.error("Sign-up error:", error);
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-up. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // if (!isLoaded || !signUp) return;

    setIsSubmitting(true);
    setVerificationError(null);

    //     try {
    //       const result = await signUp.attemptEmailAddressVerification({
    //         code: verificationCode,
    //       });

    //       if (result.status === "complete") {
    //         await setActive({ session: result.createdSessionId });
    //         router.push("/dashboard");
    //       } else {
    //         console.error("Verification incomplete:", result);
    //         setVerificationError(
    //           "Verification could not be completed. Please try again."
    //         );
    //       }
    //     } catch (error: any) {
    //       console.error("Verification error:", error);
    //       setVerificationError(
    //         error.errors?.[0]?.message ||
    //           "An error occurred during verification. Please try again."
    //       );
    //     } finally {
    //       setIsSubmitting(false);
    //     }
    //   };

    if (verifying) {
      return (
        <Card className="w-full max-w-md border border-default-200 bg-default-50 shadow-xl">
          <CardHeader className="flex flex-col gap-1 items-center pb-2">
            <h1 className="text-2xl font-bold text-default-900">
              Verify Your Email
            </h1>
            <p className="text-default-500 text-center">
              We've sent a verification code to your email
            </p>
          </CardHeader>

          <Separator />

          <CardContent className="py-6">
            {verificationError && (
              <div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{verificationError}</p>
              </div>
            )}

            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="verificationCode"
                  className="text-sm font-medium text-default-900"
                >
                  Verification Code
                </label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter the 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                variant="default" // ใช้แทน color="primary"
                className="w-full"
                disabled={isSubmitting} // ใช้ disabled แทน isLoading
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-default-500">
                Didn't receive a code?{" "}
                <button
                  // onClick={async () => {
                  //   if (signUp) {
                  //     await signUp.prepareEmailAddressVerification({
                  //       strategy: "email_code",
                  //     });
                  //   }
                  // }}
                  className="text-primary hover:underline font-medium"
                >
                  Resend code
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <Card className="w-full max-w-md border border-default-200 bg-default-50 shadow-xl">
      <CardHeader className="flex flex-col gap-1 items-center pb-2">
        <h1 className="text-2xl font-bold text-default-900">
          Create Your Account
        </h1>
        <p className="text-default-500 text-center">
          Sign up to start managing your images securely
        </p>
      </CardHeader>

      <Separator />

      <CardContent className="py-6">
        {authError && (
          <div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-default-900"
            >
              Email
            </label>
            {/* <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              startContent={<Mail className="h-4 w-4 text-default-500" />}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
              className="w-full"
            /> */}
            <div className="w-full relative">
              {/* ไอคอนด้านซ้าย top-1/2*/}
              <Mail className="absolute left-3 top-5 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              {/* ช่องกรอก email */}
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email")}
                className={`pl-10 w-full ${
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />

              {/* แสดง error message */}
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-default-900"
            >
              Password
            </label>
            {/* <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 text-default-500" />}
              endContent={
                <Button
                  isIconOnly
                  variant="link"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-default-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-default-500" />
                  )}
                </Button>
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
              className="w-full"
            /> */}
            <div className="w-full relative">
              {/* ไอคอนด้านซ้าย top-1/2*/}
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

              {/* ปุ่ม toggle show/hide password top-1/2*/}
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

          <div className="space-y-2">
            <label
              htmlFor="passwordConfirmation"
              className="text-sm font-medium text-default-900"
            >
              Confirm Password
            </label>
            {/* <Input
              id="passwordConfirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 text-default-500" />}
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-default-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-default-500" />
                  )}
                </Button>
              }
              isInvalid={!!errors.passwordConfirmation}
              errorMessage={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
              className="w-full"
            /> */}
            <div className="w-full relative">
              {/* ไอคอนด้านซ้าย top-1/2*/}
              <Lock className="absolute left-3 top-5 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              {/* ช่องกรอก password confirmation */}
              <Input
                id="passwordConfirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("passwordConfirmation")}
                className={`pl-10 pr-10 w-full ${
                  errors.passwordConfirmation
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />

              {/* ปุ่ม toggle show/hide password top-1/2*/}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-5 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>

              {/* แสดง error message */}
              {errors.passwordConfirmation && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm text-default-600">
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-center py-4">
        <p className="text-sm text-default-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
