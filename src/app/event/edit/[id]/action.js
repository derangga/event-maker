"use server";

import { prisma } from "@/libs/database";
import { auth } from "@/libs/auth";
import { uploadImage } from "@/libs/file-ops";

export async function authWrapper() {
  const session = await auth();

  return session;
}

export async function getEventById(eventId) {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }

    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event) {
      return null;
    }

    if (event.userId !== session.user.id) {
      return null;
    }
    // console.log(session.user.id);
    // console.log(event);
    return event;
  } catch (error) {
    console.log("Error fetching event:", error);
    return null;
  }
}

export async function updateEventAction(_, formData) {
  try {
    const session = await auth();
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in to edit an event.",
      };
    }

    const eventId = formData.get("eventId");
    const title = formData.get("title");
    const description = formData.get("description");
    const location = formData.get("location");
    const schedule = formData.get("schedule");
    const image = formData.get("image");

    if (!eventId || !title || !description || !location || !schedule) {
      return { status: "error", message: "All fields are required." };
    }

    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event || event.userId !== session.user.id) {
      return { status: "error", message: "Unauthorized to edit this event." };
    }

    await prisma.event.update({
      where: { id: parseInt(eventId) },
      data: {
        title,
        description,
        location,
        scheduledAt: new Date(schedule),
        image: image.size != 0 ? image.name : "",
      },
    });

    await uploadImage({
      key: image.name,
      folder: session.user.id,
      body: image,
    });

    return { status: "success", message: "Event updated successfully!" };
  } catch (error) {
    console.error("Update Event Error:", error);
    return { status: "error", message: "Failed to update event." };
  }
}
