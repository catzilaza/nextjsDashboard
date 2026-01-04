"use client";

// Learn Next.js by Coding Your Own Dropbox Clone – Full Tutorial//
//  https://www.youtube.com/watch?v=IcOiX-jynfI//
// https://github.com/hiteshchoudhary/droply

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CloudUpload,
  Folder,
  ImageIcon,
  Shield,
} from "lucide-react";
import Link from "next/link";
// import Navbar from "@/app/dashboard/ui/dropbox/Navbar";
import Navbar from "./components/Navbar";
import { SignOut } from "@/lib/utils/dropbox/uitls";

export default function DropboxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <div className="flex-1 bg-slate-200">
        {/* Hero section */}
        <section className="bg-slate-100 py-12 md:py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-default-900 leading-tight">
                    Store your <span className="text-primary">images</span> with
                    ease
                  </h1>
                  <p className="text-lg md:text-xl text-default-600">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <div className="mr-4">
                    <Link href="/signup" className="mr-4">
                      <Button size="lg" variant="default" color="primary">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="default" color="primary">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Link href="/dashboard/dropbox">
                      <Button size="lg" variant="default" color="primary">
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-24 md:h-32 w-24 md:w-32 text-primary/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="bg-slate-300 py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
                What You Get
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <CloudUpload className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-default-900">
                    Quick Uploads
                  </h3>
                  <p className="text-default-600">Drag, drop, done.</p>
                </CardContent>
              </Card>

              <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Folder className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-default-900">
                    Smart Organization
                  </h3>
                  <p className="text-default-600">
                    Keep it tidy, find it fast.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-full">
                <CardContent className="p-6 text-center">
                  <Shield className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-default-900">
                    Locked Down
                  </h3>
                  <p className="text-default-600">
                    Your images, your eyes only.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
              Ready?
            </h2>
            <div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/login" className="mb-4">
                  <Button size="lg" variant="default" color="primary">
                    Let's Go
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <Link href="/dashboard/dropbox">
                <Button size="lg" variant="default" color="primary">
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Simple footer */}
        <footer className="border-t border-default-200 py-4 md:py-6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <CloudUpload className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Droply</h2>
              </div>
              <p className="text-default-500 text-sm">
                &copy; {new Date().getFullYear()} Droply
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Learn Next.js by Coding Your Own Dropbox Clone – Full Tutorial
// https://www.youtube.com/watch?v=IcOiX-jynfI
// https://github.com/hiteshchoudhary/droply
//
// ===================================================
//
// File uploads in next.js using vercel blob
// https://www.youtube.com/watch?v=t6tSwxIqXao
// https://github.com/adityasinghcodes/vercel-blob-tutorial
//
// ===================================================
//
// How to use Vercel blob storage in NextJs
// https://www.youtube.com/watch?v=-HSFV9ILFuk
// https://github.com/HamedBahram/next-novel
// ===================================================
//
// Data Fetching using React Suspense and Error Boundary - React Data Fetching Patterns.
// https://www.youtube.com/watch?v=OpHbSHp8PcI
// https://github.com/atapas/youtube/tree/main/react/23-suspense
// ===================================================
