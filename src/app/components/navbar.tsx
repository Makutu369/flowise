"use server";
import { Button } from "@/components/ui/button";
import { Droplets, Heart, Link } from "lucide-react";
import SignInModal from "./sign-in-modal";
import { getSession } from "@/lib/queries./queries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold">FloWise</span>
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#community"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Community
          </a>
          <a
            href="#support"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Support
          </a>
        </div>

        {/* Sign In Button */}
        <div className="flex items-center gap-3">
          {!session && <SignInModal />}
          {session?.user.name}
        </div>
      </div>
    </nav>
  );
}
