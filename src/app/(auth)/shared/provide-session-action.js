"use server";
import { prisma } from "@/libs/database";
import { cookies } from "next/headers";

export async function provideSessionAction(userId) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 180); // session expires in 3hours
  const session = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: date,
    },
  });

  const cookie = await cookies();
  cookie.set("session_id", session.session, {
    httpOnly: true,
    expires: date,
    secure: process.env.NODE_ENV === "production",
  });
}
