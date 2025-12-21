import React from "react";
import HomeHeader from "./home-header";
import HomeNavbar from "./home-navbar";
import HomeBody from "./home-body";

export default function MainHome() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <HomeHeader />
      <HomeNavbar />
      <HomeBody />
    </main>
  );
}
