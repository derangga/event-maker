import { prisma } from "@/libs/database";
import { EventCard } from "./_components/event-card";
import { Footer } from "./_components/footer";
import { Nav } from "./_components/nav";
import { Input } from "@heroui/react";
import { Search } from "./_components/search";

export default async function Home() {

  const events = await prisma.event.findMany({
    take: 10,
    where: {
      scheduledAt: {
        gt: new Date() //gt => greater than
      }
    },
    select: {
      title: true,
      location: true,
      description: true,
      scheduledAt: true,
      user: {
        select: {
          name: true
        }
      }
    },
    orderBy: [{ scheduledAt: 'desc' }]
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow py-4 w-6/12 space-y-4 self-center">
        <Search />
        <EventCard events={events} />
      </main>
      <Footer />
    </div>
  );
}
