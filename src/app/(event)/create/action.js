"use server";

import { auth } from "@/libs/auth";
import { prisma } from "@/libs/database";
import { uploadImage } from "@/libs/file-ops";

export async function getCategories() {
  try {
    const categories = await prisma.eventCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function authWrapper() {
  const session = await auth();
  return session;
}

export async function createEventAction(_, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const description = formData.get("description");
  const category = formData.get("category");
  const datetime = formData.get("schedule");
  const location = formData.get("location");

  const session = await auth();

  if (!title || !datetime || !description || !category || !location) {
    return {
      status: "error",
      message: "All fields are required",
    };
  }

  const newEvent = await prisma.event.create({
    data: {
      title,
      description,
      location,
      image: image.size != 0 ? image.name : "",
      user: { connect: { id: session.user.id } },
      category: { connect: { id: BigInt(category) } },

      scheduledAt: new Date(datetime),
    },
  });

  await uploadImage({ key: image.name, folder: session.user.id, body: image });

  return {
    status: "success",
    message: "Event created",
  };
}
