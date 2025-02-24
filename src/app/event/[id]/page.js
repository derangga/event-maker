import { auth } from "@/libs/auth";
import { prisma } from "@/libs/database";
import { getEventImageUrl } from "@/utils/imageLoader";
import { Button, Image } from "@heroui/react";
import { PinIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import {
  formatMonth,
  formatDay,
  formatFullDate,
  formatTime,
} from "@/utils/dateFormatter";

export default async function Page({ params }) {
  const { id } = await params;

  const session = await auth();

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    return <div>Event not Found</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center  p-6">
      <div className="flex flex-row w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg justify-between items-center gap-8">
        <div className="flex flex-col items-center gap-8 space-y-4 m-6">
          <div className="w-64 h-80 bg-gray-300 rounded-lg flex items-center justify-center">
            {event.image ? (
              <Image
                alt={event.title}
                src={getEventImageUrl(event.userId, event.image)}
              />
            ) : (
              <p className="text-gray-500">No Image Available</p>
            )}
          </div>

          {event.userId === session?.user.id && (
            <Link href={`${id}/edit`}>
              <Button
                color="default"
                radius="lg"
                size="lg"
                className="w-full hover:bg-orange-300"
              >
                Edit Event
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col space-y-6 flex-1 text-left">
          <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>

          <section className="flex items-center gap-4">
            <div className="border rounded-lg overflow-hidden text-center w-16 shadow-sm">
              <div className="px-3 py-1 text-sm font-semibold bg-gray-100">
                {formatMonth(event.date)}
              </div>
              <div className="px-3 py-2 text-lg font-bold text-gray-900">
                {formatDay(event.date)}
              </div>
            </div>
            <div className="text-gray-700">
              <p className="font-semibold">{formatFullDate(event.date)}</p>
              <p>{formatTime(event.date)}</p>
            </div>
          </section>

          <section className="flex items-center gap-4">
            <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-gray-100">
              <PinIcon size={20} className="text-gray-600" />
            </div>
            <div className="text-gray-700">
              <p className="font-semibold">{event.location}</p>
              <p>Indonesia</p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">About Event</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
