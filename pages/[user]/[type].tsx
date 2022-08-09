import { ClockIcon, VideoCameraIcon } from "@heroicons/react/solid";
import dayjs, { daysInMonth, weekdayNames } from "lib/dayjs";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Image from "next/image";
import { z } from "zod";

import prisma from "@helpers/prisma";

import AvailabilityPage from "@components/ui/AvailabilityPage";

import { inferSSRProps } from "../../lib/types/inferSSRProps";

export type AvailabilityPageProps = inferSSRProps<typeof getStaticProps>;

const Bookings = (props: AvailabilityPageProps) => {
  // const browsingDate = dayjs()
  // const weekDayOfFirst = browsingDate.day()
  // const days = Array((weekDayOfFirst - 0 + 7) % 7).fill(null);
  // const daycount = daysInMonth(browsingDate)
  // console.log('BROWSING DATE ---- ', browsingDate)
  // console.log('WEEKDAYOFIRST ---- ', weekDayOfFirst);
  // console.log('Dayjs Arrays ----- ', days.length);
  // console.log('Days in a month', daycount)
  // console.log('Setting Date ----', browsingDate.set('date', 1).day())
  // console.log('Weekdays', weekdayNames())

  return <AvailabilityPage {...props} />;
};

const paramsSchema = z.object({ user: z.string(), type: z.string() });

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { user: username } = paramsSchema.parse(context.params);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) return { notFound: true };

  return {
    props: JSON.parse(JSON.stringify(user)),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export default Bookings;
