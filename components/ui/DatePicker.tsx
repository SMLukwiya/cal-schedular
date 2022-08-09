import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import classNames from "lib/classNames";
import dayjs, { Dayjs, daysInMonth, yyyymmdd, weekdayNames } from "lib/dayjs";
import React from "react";

export type DatePickerProps = {
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onChange: (date: Dayjs) => void;
  onMonthChange?: (date: Dayjs) => void;
  selectedDate?: Dayjs;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  locale: string;
  excludedDates?: string[];
  includedDates?: string[];
  className?: string;
  isLoading: boolean;
};

export const Day = ({
  date,
  active,
  ...props
}: JSX.IntrinsicElements["button"] & { active: boolean; date: Dayjs }) => {
  return (
    <button
      className={classNames(
        "hover:border-gray-300 disabled:text-gray-500 absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light",
        active ? "bg-gray-600 text-white" : !props.disabled ? "bg-gray-100 text-black " : ""
      )}
      data-disabled={props.disabled}
      {...props}>
      {date.date()}
      {date.isToday() && <span className="absolute bottom-0 left-0 w-full mx-auto text-4xl">.</span>}
    </button>
  );
};

const Days = ({
  excludedDates = [],
  includedDates,
  browsingDate,
  weekStart,
  DayComponent = Day,
  selectedDate,
  ...props
}: Omit<DatePickerProps, "locale" | "className" | "weekStart"> & {
  DayComponent?: React.FC<React.ComponentProps<typeof Day>>;
  browsingDate: Dayjs;
  weekStart: number;
}) => {
  // day of the 1st date of the month
  const weekDayOfFirst = browsingDate.day();

  // fill all days before start of month(date) with null, i.e, when month doesn't start at weekstart
  const days: (Dayjs | null)[] = Array((weekDayOfFirst - weekStart + 7) % 7).fill(null);

  // get total days of the month and add them to days array
  const dayCount = daysInMonth(browsingDate);
  for (let day = 1; day <= dayCount; day++) {
    const date = browsingDate.set("date", day);
    days.push(date);
  }

  return (
    <>
      {days.map((day, index) => (
        <div
          key={day === null ? `emp-${index}` : `day-${day.format()}`}
          className="relative w-full pt-[100%]">
          {day === null ? (
            <div key={`emp-${index}`} />
          ) : props.isLoading ? (
            <div />
          ) : (
            <DayComponent
              date={day}
              onClick={() => {
                props.onChange(day);
              }}
              // disabled={includedDates && !includedDates.includes(yyyymmdd(day)) || excludedDates.includes(yyyymmdd(day))}
              disabled={yyyymmdd(dayjs()) > yyyymmdd(day)} // (work around) change after implementing event type
              active={selectedDate ? yyyymmdd(selectedDate) === yyyymmdd(day) : false}
            />
          )}
        </div>
      ))}
    </>
  );
};

const DatePicker = ({
  weekStart = 0,
  locale,
  selectedDate,
  onMonthChange,
  ...passedProps
}: DatePickerProps & Partial<React.ComponentProps<typeof Days>>) => {
  const browsingDate = passedProps.browsingDate || dayjs().startOf("month");

  const changeMonthHandler = (newMonth: number) => {
    if (onMonthChange) {
      onMonthChange(browsingDate.add(newMonth, "month"));
    }
  };

  return (
    <div
      className={classNames(
        "w-full mt-8 sm:min-w-[455px]",
        selectedDate ? "sm:w-1/2 sm:border-r sm:pl-4 sm:pr-6 sm:border-gray-700 md:w-1/3 " : "sm:pl-4"
      )}>
      <div className="flex justify-between mb-4 text-xl font-light">
        <span className="w-1/2 text-white">
          {browsingDate ? (
            <>
              <strong className="text-white">{browsingDate.format("MMMM")}</strong>{" "}
              <span className="text-gray-300">{browsingDate.format("YYYY")}</span>
            </>
          ) : (
            <div />
          )}
        </span>
        <div className="text-white">
          <button
            onClick={() => changeMonthHandler(-1)}
            className={classNames(
              "group opacity-50 hover:opacity-100",
              !browsingDate.isAfter(dayjs()) && "disabled:text-gray-500 hover:opacity-50"
            )}
            disabled={!browsingDate.isAfter(dayjs())}>
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button onClick={() => changeMonthHandler(+1)} className="opacity-50 group hover:opacity-100">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4 text-center">
        {weekdayNames(locale, weekStart, "short").map((weekday) => (
          <div key={weekday} className="my-4 text-xs text-white uppercase">
            {weekday}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        <Days
          weekStart={weekStart}
          selectedDate={selectedDate}
          {...passedProps}
          browsingDate={browsingDate}
        />
      </div>
    </div>
  );
};

export default DatePicker;
