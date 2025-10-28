import React from "react";

export default function BetterAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>BetterAuthLayout</h1>
      {children}
    </div>
  );
}
