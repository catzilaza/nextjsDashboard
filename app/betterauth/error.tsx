"use client";

import React, { useEffect } from "react";

interface ErrorBetterAuthPageProb {
  error: Error;
  reset: () => void;
}

export default function ErrorBetterAuthPage({
  error,
  reset,
}: ErrorBetterAuthPageProb) {
  useEffect(() => {
    console.error("Error-BetterAuth-Page", error);
  });
  return (
    <div>
      <h2>IN Error-BetterAuth-Page Something went wrong!</h2>
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
