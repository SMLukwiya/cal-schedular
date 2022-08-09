import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isBetween from "dayjs/plugin/isBetween";
import dayjsBusinessTime from "dayjs-business-days2";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import toArray from "dayjs/plugin/toArray";

dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(dayjsBusinessTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(toArray);

export type Dayjs = dayjs.Dayjs;

export type { ConfigType } from "dayjs";

export const daysInMonth = (date: Date | Dayjs) =>
    date instanceof Date ? dayjs(date).daysInMonth() : date.daysInMonth();

export const yyyymmdd = (date: Date | Dayjs) =>
    date instanceof Date ? dayjs(date).format("YYYY-MM-DD") : date.format("YYYY-MM-DD");

export const weekdayNames = (locale: string | string[] = 'en-GB', weekStart = 0, type: "short" | "long" = "long") =>
    Array.from(Array(7).keys()).map((d) => nameOfDay(locale, d + weekStart, type));

export const nameOfDay = (locale: string | string[], day: number, type: "short" | "long" = "long") =>
    new Intl.DateTimeFormat(locale, { weekday: type }).format(new Date(1970, 0, day + 4));

export const processDate = (date: string | null | Dayjs) => {
    const parsedZone = dayjs(date);
    if (!parsedZone.isValid()) return "Invalid date";
    const formattedTime = parsedZone.format("h:mma");
    return formattedTime + ", " + dayjs(date).toDate().toLocaleString('en', { dateStyle: "full" });
}

export const parseDate = (date: string | null | Dayjs) => {
    if (!date) return ["No date"];
    return processDate(date)
}

export default dayjs;