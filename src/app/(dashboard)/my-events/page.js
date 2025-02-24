import { auth } from "@/libs/auth";
import { prisma } from "@/libs/database";
import { EventTable } from "./_components/event-table";

export default async function Page() {
    const session = await auth();
    const username = session.user.name;
    const userId = session.user.id;

    const userEvents = await prisma.event.findMany({
        where: { userId },
        include: {
            category: true
        }
    });

    return (
        <div>
            <div className="flex justify-between p-4 bg-white shadow-md">
                <h1>My Events</h1>
                <span>{username}</span>
            </div>
            <div className="p-8 bg-white shadow-md rounded-lg m-4">
                <h1 className="font-semibold text-xl ml-2 pb-2">Created Events</h1>
                <EventTable events={userEvents} />
            </div>
        </div>
    );
}
