import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "@helpers/auth";
import prisma from "@helpers/prisma";

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Method is not allowed" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ msg: "Not authenticated" });
  }

  const data = await prisma.booking.findMany();

  return res.status(200).json(data);
};

export default getEvents;
