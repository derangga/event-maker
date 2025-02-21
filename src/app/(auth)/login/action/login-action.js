"use server";

import { prisma } from "@/libs/database";
import bcrypt from "bcrypt";
import { provideSessionAction } from "../../shared/provide-session-action";

export default async function loginAction(_, formData) {
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
