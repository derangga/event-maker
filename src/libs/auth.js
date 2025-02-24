import { cookies } from "next/headers";
import { prisma } from "./database";

export async function auth() {
  try {
    const cookiesStore = await cookies();
    const sessionId = await cookiesStore.get("session_id")?.value;

    if (!sessionId) {
      return null;
    }

    const session = await prisma.session.findFirst({
      where: {
        session: sessionId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!session) {
      return null;
    }

    return session;
  } catch (error) {
    console.log("Error in auth function", error);
    return null;
  }
}
