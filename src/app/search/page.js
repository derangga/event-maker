import { prisma } from "@/libs/database";
import { EventCard } from "../_components/event-card";
import { Footer } from "../_components/footer";
import { Nav } from "../_components/nav";

export default async function SearchPage({ searchParams }) {
    const searchQuery = searchParams?.name || "";

    const events = await prisma.event.findMany({
        where: {
            title: {
                contains: searchQuery,
                mode: "insensitive",
            },
        },
        select: {
            title: true,
            location: true,
            description: true,
            scheduledAt: true,
            user: { select: { name: true } },
        },
        orderBy: [{ scheduledAt: "desc" }],
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-grow py-4 w-6/12 space-y-4 self-center">
                <h1 className="text-xl font-bold">Search Results for &quot;{searchQuery}&quot;</h1>
                {events.length > 0 ? (
                    <EventCard events={events} />
                ) : (
                    <p className="text-gray-500">No events found.</p>
                )}
            </main>
            <Footer />
        </div>
    );
}
