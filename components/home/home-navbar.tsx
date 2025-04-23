import React from "react";
// import Navbar from "@/app/ui/navbar";
import Navbar from "@/components/navbar";

const homenavbar = () => {
  return (
    <div className="flex h-20 shrink-0 justify-center rounded-lg bg-slate-200 p-4 md:h-22">
      <Navbar />
    </div>
  );
};

export default homenavbar;
