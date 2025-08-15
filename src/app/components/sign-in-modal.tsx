"use client";

import type React from "react";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { format } from "path";
import { authClient } from "@/lib/auth-client";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";
import { Loader } from "./loader";

export default function SignInModal() {
  const [pending, setPending] = useState(false);
  const signInWithGoogle = async () => {
    setPending(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/information",
    });
    setPending(false);
  };

  return (
    <Dialog>
      <DialogTrigger>Sign in</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {"Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {"Sign in to your CycleTracker account"}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={signInWithGoogle} className="w-full h-14 rounded-full">
          {pending && <Loader />}
          Continue with Google
        </Button>
        <div className="text-center text-sm"></div>
      </DialogContent>
    </Dialog>
  );
}
