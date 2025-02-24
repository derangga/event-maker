import { prisma } from "@/libs/database";
import { Nav } from "../_components/nav";
import { Footer } from "../_components/footer";
import { ParticipantList } from "../_components/partcipant-list";

export default async function ParticipantsPage() {
  const participants = await prisma.participant.findMany({
    include: {
      user: true,
      event: true,
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow py-4 w-6/12 space-y-4 self-center">
        <h1 className="text-2xl font-bold">Daftar Participant</h1>
        <ParticipantList participants={participants} />
      </main>
      <Footer />
    </div>
  );
}
