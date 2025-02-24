"use server";

import { prisma } from "@/libs/database";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId) {
    await prisma.event.update({
        where: { id: eventId },
        data: { deletedAt: new Date() },
    });

    revalidatePath("/events/manage");
}
