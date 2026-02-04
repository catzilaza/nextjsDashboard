import Image from "next/image";
import Link from "next/link";
// import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import ResetPasswordForm from "@/app/betterauth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          href="/"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Image
              alt="Better Auth"
              // className="rounded-lg dark:invert object-contain"
              src="/logo.png"
              loading="eager"
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
              }}
              width={300}
              height={200}
            />
          </div>
          Better Auth Starter
        </Link>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
