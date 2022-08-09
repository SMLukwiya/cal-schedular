import { BookingCreateBody } from "lib/types/booking";

const createBooking = async (data: BookingCreateBody) => {
  const response = await fetch("/api/book/create-event", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export default createBooking;
