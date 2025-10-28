import { Suspense } from "react";
import ButtonBetterAuth from "./components/ButtonBetterAuth";

export default async function BetterAuthPage() {
  const session: boolean = false;
  return (
    <div>
      <Suspense fallback={<>loading...</>}>
        <ButtonBetterAuth session={session} />
      </Suspense>
    </div>
  );
}
