import createBooking from "lib/bookings/create-event";
import React, { useState } from "react";

import Button from "@components/ui/Button";
import Input from "@components/ui/Input";

export type BookingCreateBody = {
  title: string;
  eventDate: string;
  eventTypeId?: number;
  name: string;
  email: string;
  user?: string | string[];
};

const Bookings = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "meeting-time") {
      setDate(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  };

  const bookHandler = async () => {
    if (!title || !date || !name || !email) return alert("Fill in all fields");
    const eventDate = new Date(date).toISOString();
    const now = new Date().toISOString();
    if (eventDate < now) return alert("Cannot set event for past date");
    const booking = await createBooking({ title, eventDate, name, email });
    setTitle("");
    setDate("");
    setName("");
    setEmail("");
    return booking;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>Book a meeting</div>
      <div className="text-xl font-bold">30 Min Meeting</div>
      <div className="w-96">
        <Input name="title" type="text" value={title} onChange={inputHandler} label="Title" />
        <Input
          name="meeting-time"
          type="datetime-local"
          value={date}
          onChange={inputHandler}
          label="Set meeting time"
        />
      </div>
      <div className="mt-5 w-96">
        <div>Attendee</div>
        <Input label="Name" type="text" value={name} name="name" onChange={inputHandler} />
        <Input label="Email" type="email" value={email} name="email" onChange={inputHandler} />
      </div>
      <div>
        <Button title="Book" onClick={bookHandler} />
      </div>
    </div>
  );
};

export default Bookings;
