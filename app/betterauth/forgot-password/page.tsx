import Image from "next/image";
import Link from "next/link";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          href="/"
        >
          <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
            {/* <Image
              alt="Better Auth Starter Logo"
              height={50}
              priority
              src={"/better-auth-starter.png"}
              width={50}
            /> */}
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
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
