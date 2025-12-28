"use client";

import React, { useEffect } from "react";

interface ErrorProductsPageProb {
  error: Error;
  reset: () => void;
}

export default function ErrorEcommercePage({
  error,
  reset,
}: ErrorProductsPageProb) {
  useEffect(() => {
    console.error("Error-Products-Page", error);
  });
  return (
    <div>
      <h2>IN Error-Products-Page Something went wrong!</h2>
      <button
        className="bg-blue-400 rounded-l-md p-2 text-white"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
