"use client";

import React, { useActionState, useEffect, useState } from "react";
import { createEventAction, authWrapper, getCategories } from "./action";
import {
  Button,
  SelectItem,
  Input,
  Card,
  Select,
  DatePicker,
  Textarea,
} from "@heroui/react";
import { ImageIcon, GlobeIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  const [state, formAction, pending] = useActionState(createEventAction, null);
  const [session, setSession] = useState(null);
  const [isDelayed, setIsDelayed] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const userSession = await authWrapper();
      setSession(userSession);
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDelayed(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!session || !isDelayed) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* <p className="text-gray-500 text-lg">Checking authentication...</p> */}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center text-rose-600 bg-rose-50 p-2 rounded-lg">
        "you must be logged in to create an event"
      </div>
    );
  }
  return (
    <div className=" flex justify-center items-center p-6">
      <Card className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <form action={formAction} className="space-y-4">
          <div className="flex gap-4">
            <div className="relative w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
              {/* <ImageIcon className="h-12 w-12 text-gray-600" /> */}
              {/* <Input
                name="image"
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              /> */}
              <Input
                name="image"
                type="file"
                // className="absolute inset-0 opacity-0 cursor-pointer"
                variant="underlined"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <Input
                name="title"
                placeholder="Event Name"
                variant="underlined"
                className="text-xl font-bold"
                required
              />
              <Textarea
                name="description"
                placeholder="Add Description"
                variant="underlined"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Category</label>
            <Select name="category" className="w-full" required>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem key="none" value="0" disabled>
                  No Categories Found
                </SelectItem>
              )}
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Event Schedule</label>
            <DatePicker name="schedule" className="w-full" required />
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <GlobeIcon className="h-5 w-5" />
            <span>GMT+07:00 Jakarta</span>
          </div>

          <Input
            name="location"
            placeholder="Add Event Location"
            // variant="underlined"
            required
          />

          <Button
            isLoading={pending}
            type="submit"
            color="default"
            radius="lg"
            size="lg"
            className="w-full hover:bg-emerald-500"
          >
            Create Event
          </Button>

          {state?.status === "error" && (
            <div className="text-center text-rose-600 bg-rose-50 p-2 rounded-lg">
              {state.message}
            </div>
          )}
          {state?.status === "success" && (
            <div className="text-center text-emerald-600 bg-emerald-50 p-2 rounded-lg">
              {state.message}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
