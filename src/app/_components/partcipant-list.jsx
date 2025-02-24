import { Card, CardBody } from "@heroui/react";

export const ParticipantList = ({ participants = [] }) => {
  if (!participants || participants.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Tidak ada participant yang tersedia.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {participants.map((participant) => (
        <Card
          key={participant.id}
          className="hover:border-white/50 transition-all duration-300 ease-in-out"
        >
          <CardBody className="grid grid-cols-4 items-center justify-between gap-4">
            <div className="col-span-3 flex flex-col">
              <p className="font-semibold text-lg">{participant.user.name}</p>
              <p className="text-gray-500 font-semibold">
                Event: {participant.event.title}
              </p>
              <p className="text-sm">
                Joined At: {new Date(participant.joinedAt).toLocaleDateString()}
              </p>
              {participant.canceledAt && (
                <p className="text-sm text-red-500">
                  Canceled At:{" "}
                  {new Date(participant.canceledAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
