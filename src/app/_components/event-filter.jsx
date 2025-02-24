"use client";

import { useState } from "react";
import { Input, Select, DatePicker, Button } from "@heroui/react";
import { EventCard } from "./event-card";

export const EventFilter = ({ categories, initialEvents = [] }) => {
  const [events, setEvents] = useState(initialEvents);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSubmit = async () => {
    const queryParams = new URLSearchParams();
    if (filters.categoryId) {
      queryParams.set("categoryId", filters.categoryId);
    }
    if (filters.location) {
      queryParams.set("location", filters.location);
    }
    if (filters.scheduledAt) {
      queryParams.set("scheduledAt", filters.scheduledAt.toISOString());
    }

    const response = await fetch(`/api/events?${queryParams.toString()}`);
    const filteredEvents = await response.json();
    setEvents(filteredEvents);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-4 p-4 rounded-lg">
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
        <Button onPress={handleSubmit}>Filters</Button>
      </div>
      <EventCard events={events} />
    </div>
  );
};
