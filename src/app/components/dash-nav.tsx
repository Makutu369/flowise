"use server";
import Link from "next/link";
import {
  CalendarIcon,
  BarChart3,
  Home,
  Droplets,
  Bell,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SignInModal from "./sign-in-modal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const Navbar = async () => {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/calendar", label: "Calendar", icon: CalendarIcon },
    { href: "/insights", label: "AI Insights", icon: BarChart3 },
  ];

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold">FloWise</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 font-medium transition-colors"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <div className="flex items-center gap-3">
                {!session && <SignInModal />}
                {session?.user.name}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
