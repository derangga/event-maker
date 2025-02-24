"use client"

import { formatDateTime } from "@/libs/date"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"
import Link from "next/link"
import { startTransition, useState } from "react"
import { deleteEvent } from "../manage/action"

export const EventTable = ({ events, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedEvent) {
            startTransition(async () => {
                await deleteEvent(selectedEvent.id);
                setIsModalOpen(false);
            })
        }
    }
    return (
        <div>
            <div className="border rounded-lg p-4">
                <div className="grid grid-cols-6 font-semibold border-b pb-2 text-center">
                    <div>No</div>
                    <div>Name</div>
                    <div>Location</div>
                    <div>Category</div>
                    <div>Date</div>
                    <div>Action</div>
                </div>
                {events.map((event, index) => (
                    <div key={event.id} className="grid grid-cols-6 py-2 border-b items-center text-center">
                        <div>{index + 1}</div>
                        <div>{event.title}</div>
                        <div>{event.location}</div>
                        <div>{event.category.name}</div>
                        <div>{formatDateTime(event.scheduledAt)}</div>
                        <div className="flex justify-center gap-1">
                            <Button as={Link} href={`${event.id}/edit`} size="sm" color="warning">Edit</Button>
                            <Button size="sm" color="danger" onPress={() => handleDeleteClick(event)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalContent>

                        <ModalHeader>Confirm Deletion</ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure to archieve <strong>{selectedEvent?.title}</strong>?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button color="danger" onPress={confirmDelete}>Archive</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}