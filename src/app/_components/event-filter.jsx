// app/_components/event-filter.js
"use client"; // Tandai sebagai Client Component

import { useState } from "react";
import { Input, Select, DatePicker } from "@heroui/react";
import { EventCard } from "./event-card";

export const EventFilter = ({ categories, initialEvents }) => {
  const [events, setEvents] = useState(initialEvents);
  const [filters, setFilters] = useState({});

  const handleFilterChange = async (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Buat query berdasarkan filter
    const queryParams = new URLSearchParams();
    if (updatedFilters.categoryId) {
      queryParams.set("categoryId", updatedFilters.categoryId);
    }
    if (updatedFilters.location) {
      queryParams.set("location", updatedFilters.location);
    }
    if (updatedFilters.scheduledAt) {
      queryParams.set("scheduledAt", updatedFilters.scheduledAt.toISOString());
    }

    // Fetch data dari API route
    const response = await fetch(`/api/events?${queryParams.toString()}`);
    const filteredEvents = await response.json();
    setEvents(filteredEvents);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-4 p-4  rounded-lg">
        <Select
          size="sm"
          label="Category"
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          onChange={(e) => handleFilterChange({ categoryId: e.target.value })}
        />
        <Input
          size="sm"
          label="Location"
          placeholder="Enter location"
          onChange={(e) => handleFilterChange({ location: e.target.value })}
        />
        <DatePicker
          size="sm"
          label="Date"
          onChange={(date) => handleFilterChange({ scheduledAt: date })}
        />
      </div>
      <EventCard events={events} />
    </div>
  );
};
