import { Attendee, Booking } from "@prisma/client";

export type BookingResponse = Booking & {
    attendees: Attendee[];
};
