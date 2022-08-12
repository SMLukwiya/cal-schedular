import { BookingResponse } from "lib/types/booking";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import { getSession } from "@helpers/auth";
import prisma from "@helpers/prisma";

import Shell from "@components/Shell";
import Booking from "@components/ui/Booking";

type Props = {
  bookings: BookingResponse[];
};

export default function Manage(props: Props) {
  const { bookings } = props;

  return (
    <Shell>
      <div className="p-8">
        <div className="text-xl fonts-bold">Bookings</div>
        <div className="text-sm text-gray-700">See all your events</div>
        <div>
          {bookings.map((booking) => (
            <Booking key={booking.id} {...booking} />
          ))}
        </div>
        <Link href="/api/auth/signout">
          {/* this is the default next-auth sign-out template. */}
          <a className="p-1 ml-2 text-white bg-blue-800">LOGOUT</a>
        </Link>
        {/* <h1 className="py-4 text-3xl font-bold">You are signed in.</h1> */}
      </div>
    </Shell>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const session = await getSession({ req });

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session?.id as number,
    },
    include: {
      attendees: true,
    },
  });

  return {
    props: { bookings: JSON.parse(JSON.stringify(bookings)) },
  };
};
