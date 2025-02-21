"use client";
import { Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export const Search = () => {
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search")?.trim(); // Get input value

        if (query) {
            router.push(`/search?name=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex w-64 ml-auto gap-2 items-center">
            <Input
                name="search" // Important for FormData to work
                variant="bordered"
                label="Search"
                placeholder="Search Event"
            />
            <Button type="submit" variant="light">Go</Button>
        </form>
    );
};
