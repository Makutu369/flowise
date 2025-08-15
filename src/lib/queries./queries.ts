"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export async function SignInGoogle() {
  await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/",
    },
  });
}

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
