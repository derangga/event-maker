"use client";

import React, { useActionState, useEffect, useState } from "react";

import { Button, Input, DatePicker, Textarea, Card } from "@heroui/react";
import { ImageIcon } from "lucide-react";
import { useParams, redirect } from "next/navigation";
import { authWrapper, getEventById, updateEventAction } from "./action";

export default function EditEventPage() {
  const { id } = useParams();
  const [state, formAction, pending] = useActionState(updateEventAction, null);
  const [session, setSession] = useState(null);
  const [event, setEvent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    async function fetchEventData() {
      const userSession = await authWrapper();
      if (!userSession) {
        redirect("/login");
        return;
      }

      setSession(userSession);

      const fetchedEvent = await getEventById(id, userSession.user.id);
      if (!fetchedEvent) {
        redirect("/"); // Redirect if the user isn't the event owner
        return;
      }

      setEvent(fetchedEvent);
      setImagePreview(fetchedEvent.image || null);
    }
    fetchEventData();
  }, [id]);

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg"></p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading event data...
      </div>
    );
  }

  if (state?.status === "success") {
    setTimeout(() => {
      redirect("/"); // Redirect to homepage after 3 seconds
    }, 3000);
  }

  return (
    <div className="flex justify-center items-center p-6">
      <Card className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="eventId" value={event.id} />

          <div className="flex gap-4 items-center justify-center">
            <label
              htmlFor="file-upload"
              className="relative w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
            >
              {imagePreview ? (
                <img
                  src={`https://pub-d667a4b6b3234b3da35d82684d8c7b7e.r2.dev/${event.userId}/${imagePreview}`}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-600" />
              )}
              <input
                id="file-upload"
                name="image"
                type="file"
                className="hidden"
                defaultValue={event.image}
              />
            </label>
          </div>
          <div className="flex flex-col space-y-5">
            <label className="text-sm text-black">Event Title</label>
            <Input
              name="title"
              defaultValue={event.title}
              placeholder="Event Name"
              required
            />
            <label className="text-sm text-black">Event Description</label>
            <Textarea
              name="description"
              defaultValue={event.description}
              placeholder="Description"
              required
            />
            <label className="text-sm text-black">Event Location</label>
            <Input
              name="location"
              defaultValue={event.location}
              placeholder="Location"
              required
            />
            <label className="text-sm text-black">Event Schedule</label>
            <DatePicker
              name="schedule"
              // defaultValue={new Date(event.scheduledAt)}
              required
            />
          </div>

          <Button
            isLoading={pending}
            type="submit"
            color="default"
            className="w-full  hover:bg-emerald-500"
          >
            Save Changes
          </Button>

          {state?.status && (
            <div
              className={`p-2 text-center ${
                state.status === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {state.message}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
