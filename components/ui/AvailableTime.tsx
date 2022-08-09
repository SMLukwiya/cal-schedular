import dayjs, { Dayjs, nameOfDay } from "lib/dayjs";
import { Slot } from "lib/types/slot";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import Slots from "@helpers/dummySlots";

type AvailableTimeProps = {
  eventTypeId: string;
  eventTypeSlug: string;
  date: Dayjs;
  users: { username: string | null }[];
  slots?: Slot[];
  isLoading: boolean;
  timeFormat: string;
};

const AvailableTimes: FC<AvailableTimeProps> = ({
  slots = [],
  isLoading,
  date,
  eventTypeId,
  eventTypeSlug,
  timeFormat,
}) => {
  const router = useRouter();

  const dummySlots = Slots(date);
  console.log(dayjs(dummySlots[0].time).format());

  return (
    <div className="flex flex-col mt-8 text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5">
      <div className="mb-4 text-lg font-light text-left text-gray-600">
        <span className="w-1/2 text-white">
          <strong className="">{nameOfDay("en-GB", Number(date.format("d")))}</strong>
          <span className="text-gray-400">
            {date.format(", D ")}
            {date.toDate().toLocaleString("en-GB", { month: "long" })}
          </span>
        </span>
      </div>
      <div className="grid flex-grow overflow-y-auto md:h-[364px] sm:block grid-cols-2 gap-x-2">
        {dummySlots.length > 0 &&
          dummySlots.map((slot) => {
            type BookingUrl = {
              pathname: string;
              query: Record<string, string | number | string[] | undefined>;
            };

            const bookingUrl: BookingUrl = {
              pathname: "book",
              query: {
                ...router.query,
                date: dayjs(slot.time).format(),
                type: eventTypeId,
                slug: eventTypeSlug,
              },
            };

            return (
              <div key={dayjs(slot.time).format()}>
                <Link href={bookingUrl} prefetch={false}>
                  <a className="block py-4 mb-2 font-medium text-gray-300 bg-gray-600 border border-transparent rounded-sm hover:bg-white hover:text-gray-900">
                    {dayjs(slot.time).tz("Africa/Nairobi").format(timeFormat)}
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AvailableTimes;
