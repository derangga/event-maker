import { Card, CardBody } from "@heroui/react";

export const EventCard = ({ events = [] }) => {
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Tidak ada event yang tersedia.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card
          key={event.id}
          className="hover:border-white/50 transition-all duration-300 ease-in-out"
        >
          <CardBody className="grid grid-cols-4 items-center justify-between gap-4">
            <div className="col-span-3 flex flex-col">
              <p className="text-sm">
                {new Date(event.scheduledAt).toLocaleDateString()}
              </p>
              <p className="font-semibold text-lg">{event.title}</p>
              <p className="text-gray-500 font-semibold">
                By {event.user.name}
              </p>
            </div>
            <div className="">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-20 object-cover rounded-lg"
                />
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
