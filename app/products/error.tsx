"use client";

import React, { useEffect } from "react";

interface ErrorDashBoardPageProb {
  error: Error;
  reset: () => void;
}

export default function ErrorProductsPage({
  error,
  reset,
}: ErrorDashBoardPageProb) {
  useEffect(() => {
    console.error("Error-DashBoard-Page", error);
  });
  return (
    <div>
      <h2>IN Error-DashBoard-Page Something went wrong!</h2>
      <button
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
