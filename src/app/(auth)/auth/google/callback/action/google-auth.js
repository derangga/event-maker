"use server";
import { provideSessionAction } from "@/app/(auth)/shared/provide-session-action";
import { prisma } from "@/libs/database";
import { googleClient } from "@/libs/google";
import { cookies } from "next/headers";

export async function validateGoogleAuth(params) {
  try {
    const cookie = await cookies();
    const code = params?.code;
    const codeVerifier = cookie.get("codeVerifier")?.value || "";
    const tokens = await googleClient().validateAuthorizationCode(
      code,
      codeVerifier
    );
    const accessToken = tokens.accessToken();

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user = await response.json();
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const appAuthFlow = async (googleAccount) => {
  const user = await prisma.user.findFirst({
    where: { email: googleAccount.email },
  });
  const authType = user ? "login" : "register";

  return { user, authType };
};

export async function registerGoogleAction(googleAccount) {
  const name = googleAccount.name;
  const email = googleAccount.email;

  const response = (success, message) => {
    return {
      success,
      message,
    };
  };

  const user = await prisma.user.create({
    data: {
      name,
      email,
      role: "USER",
    },
  });

  if (!user) {
    return response(false, "failed register user");
  }

  await provideSessionAction(user.id);

  return response(true, "");
}
