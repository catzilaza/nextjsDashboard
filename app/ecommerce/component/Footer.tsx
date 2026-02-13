"use client";

import ChatWidget from "./ChatWidget";

export default function Footer() {
  return (
    <footer className="border-t bg-white/50">
      <div className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Acme. All rights reserved.</p>
      </div>
      <ChatWidget />
    </footer>
  );
}
