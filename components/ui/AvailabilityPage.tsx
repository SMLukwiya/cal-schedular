import { ClockIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { AvailabilityPageProps } from "@pages/[user]/[type]";
import classNames from "lib/classNames";
import dayjs, { Dayjs } from "lib/dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { z } from "zod";

import Avatar from "@components//ui/Avatar";
import AvailableTimes from "@components/ui/AvailableTime";
import DatePicker from "@components/ui/DatePicker";

const useRouterQuery = <T extends string>(name: T) => {
  const router = useRouter();
  const query = z.object({ [name]: z.string().optional() }).parse(router.query);

  const setQuery = (newValue: string | number | null | undefined) => {
    router.replace({ query: { ...router.query, [name]: newValue } }, undefined, { shallow: true });
  };

  return { [name]: query[name], setQuery } as { [K in T]: string | undefined } & {
    setQuery: typeof setQuery;
  };
};

const dateQuerySchema = z.object({
  date: z.string().optional().default(""),
});

const AvailabilityPage = (props: AvailabilityPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [browsingDate, setBrowsingDate] = useState<Dayjs>();
  const { date, setQuery: setDate } = useRouterQuery("date");
  const { month, setQuery: setMonth } = useRouterQuery("month");
  const [isAvailableTimesVisible, setIsAvailableTimesVisible] = useState<boolean>();
  const router = useRouter();
  const query = dateQuerySchema.parse(router.query);

  useEffect(() => {
    setIsAvailableTimesVisible(!!query.date);
  }, [query.date]);

  useEffect(() => {
    if (!router.isReady) return;

    setBrowsingDate(dayjs.utc(month).set("date", 1).set("hour", 0).set("minute", 0).set("second", 0));
    if (date) {
      setSelectedDate(dayjs.utc(date));
    }
  }, [router.isReady, month, date]);

  const maxWidth = isAvailableTimesVisible ? "max-w-4xl" : "max-w-3xl";

  return (
    <div className="bg-gray-800">
      <main className={classNames(maxWidth, "mx-auto md:my-24")}>
        <div className="mx-auto bg-gray-800 border border-gray-400 rounded-md">
          <div className="p-4 sm:flex sm:py-5">
            <div
              className={classNames(
                "hidden pr-8 overflow-hidden sm:border-r sm:border-gray-500 md:flex md:flex-col",
                isAvailableTimesVisible ? "sm:w-1/3" : "sm:w-1/2"
              )}>
              <Avatar name={props.name} />
              <h2 className="mt-1 text-xl font-bold text-white">Quick chat</h2>
              <div>
                <div className="flex items-center my-2">
                  <VideoCameraIcon className="w-4 h-4 text-gray-400 ml-[10px] mr-[10px]" />
                  <p className="text-white">Google Meet</p>
                </div>
                <div className="flex items-center my-2">
                  <ClockIcon className="w-4 h-4 text-gray-400 ml-[10px] mr-[10px]" />
                  <p className="text-white">30 Minutes</p>
                </div>
              </div>
            </div>
            <DatePicker
              isLoading={false}
              selectedDate={selectedDate}
              locale={"en"}
              onChange={(newDate) => {
                setDate(newDate.format("YYYY-MM-DD"));
              }}
              onMonthChange={(newMonth) => {
                setMonth(newMonth.format("YYYY-MM"));
              }}
              browsingDate={browsingDate}
              weekStart={0}
            />
            {selectedDate && (
              <AvailableTimes
                isLoading={false}
                slots={[]}
                date={selectedDate}
                eventTypeId={"1"}
                eventTypeSlug={"quick-chat"}
                users={[]}
                timeFormat="h:mma"
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvailabilityPage;
