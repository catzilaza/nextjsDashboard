import { Suspense } from "react";
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense
          fallback={<p className="text-sm text-gray-600">Loading...</p>}
        >
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}

{
  /* <div className="flex flex-col items-center justify-center h-screen gap-4">
  <h1 className="text-2xl font-bold">Sign Up</h1>
  <form action={signUpAction} className="flex flex-col gap-3 w-64">
    <Input type="text" name="name" placeholder="Name" required />
    <Input type="email" name="email" placeholder="Email" required />
    <Input type="password" name="password" placeholder="Password" required />
    <Button type="submit">Sign Up</Button>
  </form>
</div>; */
}
