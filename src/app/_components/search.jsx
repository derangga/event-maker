"use client"
import { Input, Button } from "@heroui/react"
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Search = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?name=${encodeURIComponent(search)}`);
        }
    };
    return (
        <form onSubmit={handleSearch} className="flex w-64 ml-auto gap-2 items-center">
            <Input
                variant="light"
                label="Search"
                placeholder="Search Event"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="light">Go</Button>
        </form>
    )
}