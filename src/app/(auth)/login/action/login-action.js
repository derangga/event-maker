"use server";

import { prisma } from "@/libs/database";
import bcrypt from "bcrypt";
import { provideSessionAction } from "../../shared/provide-session-action";
import { cookies } from "next/headers";
import * as arctic from "arctic";
import { googleClient } from "@/libs/google";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = (success, message) => {
    return { success, message };
  };
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return response(false, "invalid credential");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return response(false, "invalid password");
  }

  await provideSessionAction(user.id);

  return response(true, "");
}

export async function loginGoogleAction(_, formData) {
  const cookie = await cookies();
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = googleClient().createAuthorizationURL(
    state,
    codeVerifier,
    scopes
  );

  cookie.set("codeVerifier", codeVerifier, { httpOnly: true });

  redirect(`${url.href}`);
}
