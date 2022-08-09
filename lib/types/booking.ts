import { Attendee, Booking } from "@prisma/client";
import { Dayjs } from "lib/dayjs";

export type BookingResponse = Booking & {
  attendees: Attendee[];
};

export type BookingCreateBody = {
  guests?: string[];
  eventDate: Dayjs | string;
  eventTypeId?: number;
  name: string;
  email: string;
  user?: string | string[];
  description?: string;
};
