import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-8">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Build beautiful dashboards
          </h1>
          <p className="mt-4 max-w-lg text-lg opacity-90">
            A modern, responsive dashboard template built with Next.js and
            Tailwind CSS. Ship faster with ready components and sensible
            defaults.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/register"
              className="rounded-md bg-white/90 px-5 py-3 font-medium text-sky-700 hover:bg-white"
            >
              Get started
            </Link>
            <Link
              href="/landing#features"
              className="rounded-md border border-white/30 px-5 py-3 text-white/95 hover:bg-white/10"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:w-1/2">
          <div className="mx-auto max-w-md rounded-xl bg-white/10 p-6">
            <Image
              src="/hero-desktop.png"
              width={800}
              height={480}
              alt="Dashboard screenshot"
              className="rounded-md shadow-lg"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
