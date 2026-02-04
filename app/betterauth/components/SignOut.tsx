"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "../actions/users";

export default function SignOut() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOut();

    if (!result.success) {
      console.log("From app/betterauth/components/SignOut", result.message);
      // alert(result.message); หรือใช้ toast/notification แสดงข้อความ
      return;
    }
    router.push("/betterauth");
  };
  return (
    <Button onClick={handleLogout} variant="outline">
      Logout <LogOut className="size-4" />
    </Button>
  );
}
