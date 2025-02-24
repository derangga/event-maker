import { formatDateTime } from "@/libs/date"

export const EventTable = ({ events }) => {

    return (
        <div>
            <div className="border rounded-lg p-4">
                <div className="grid grid-cols-5 font-semibold border-b pb-2">
                    <div>No</div>
                    <div>Name</div>
                    <div>Location</div>
                    <div>Category</div>
                    <div>Date</div>
                </div>
                {events.map((event, index) => (
                    <div key={event.id} className="grid grid-cols-5 py-2 border-b">
                        <div>{index + 1}</div>
                        <div>{event.title}</div>
                        <div>{event.location}</div>
                        <div>{event.category.name}</div>
                        <div>{formatDateTime(event.scheduledAt)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}