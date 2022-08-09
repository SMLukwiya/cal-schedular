import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const createBooking = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method is not allowed" });
  }

  const { notes, eventDate, name, email, guests, user } = JSON.parse(req.body);

  const invitee = [{ name, email }];
  const others = (guests || []).map((guest: string[]) => ({
    email: guest,
    name: "",
  }));

  const attendees = [...invitee, ...others];

  const organizerUser = await prisma.user.findUnique({
    where: {
      username: user,
    },
  });

  if (!organizerUser) throw new Error("Can't continue, user not found");

  const newBooking = await prisma.booking.create({
    data: {
      description: notes,
      eventDate,
      attendees: {
        createMany: {
          data: attendees.map((attendee) => {
            return {
              name: attendee.name,
              email: attendee.email,
            };
          }),
        },
      },
      user: {
        connect: {
          id: organizerUser.id,
        },
      },
    },
  });

  return res.status(201).json(newBooking);
};

export default createBooking;
