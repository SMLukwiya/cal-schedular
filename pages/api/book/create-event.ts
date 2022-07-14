import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const createEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method is not allowed" });
  }

  const { title, eventDate, name, email } = JSON.parse(req.body);

  const newBooking = await prisma.booking.create({
    data: {
      title,
      eventDate,
      attendees: {
        create: { name, email },
      },
    },
  });

  return res.status(201).json(newBooking);
};

export default createEvent;
