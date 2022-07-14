import Link from "next/link";

import prisma from "@helpers/prisma";

import Shell from "@components/Shell";
import Booking from "@components/ui/Booking";

export default function Manage(props) {
  const { bookings } = props;
  console.log(bookings);

  return (
    <Shell>
      <div className="p-8">
        <div className="text-xl fonts-bold">Bookings</div>
        <div className="text-sm text-gray-700">See all your events</div>
        <div>
          {bookings.map(({ id, title, eventDate, name, email, attendees }) => (
            <Booking
              key={id}
              title={title}
              eventDate={eventDate}
              name={name}
              email={email}
              attendees={attendees}
            />
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

export const getServerSideProps = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      attendees: true,
    },
  });

  return {
    props: { bookings: JSON.parse(JSON.stringify(bookings)) },
  };
};
