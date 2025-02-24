import { prisma } from "@/libs/database";
import { Footer } from "./_components/footer";
import { Nav } from "./_components/nav";
import { Search } from "./_components/search";
import { EventFilter } from "./_components/event-filter";

export default async function Home() {
  const events = await prisma.event.findMany({
    take: 10,
    where: {
      scheduledAt: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      location: true,
      description: true,
      scheduledAt: true,
      image: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [{ scheduledAt: "desc" }],
  });

  const categories = await prisma.eventCategory.findMany();

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow py-4 w-6/12 space-y-4 self-center">
        <Search />
        <EventFilter categories={categories} initialEvents={events} />
      </main>
      <Footer />
    </div>
  );
}
