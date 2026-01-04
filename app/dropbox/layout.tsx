import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TooltipProvider>
        <div>{children}</div>
      </TooltipProvider>
    </>
  );
}
