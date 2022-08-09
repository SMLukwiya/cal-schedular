import { Dayjs } from "lib/dayjs";

const slots = [
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "1:00 pm",
  "1:30 pm",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
  "3:30 pm",
  "4:00 pm",
  "4:30 pm",
  "5:00 pm",
  "5:30 pm",
  "6:00 pm",
  "6:30 pm",
  "7:00 pm",
  "7:30 pm",
  "8:00 pm",
  "8:30 pm",
  "9:00 pm",
  "9:30 pm",
];

const Slots = (date: Dayjs) => {
  const timeRegex = /(\d+):(\d+) (\w+)/;

  const dateSlots = slots.map((slot) => {
    const parts = slot.match(timeRegex);
    const hours = /am/i.test(parts![3]) ? parseInt(parts![1], 10) : parseInt(parts![1], 10) + 12;
    const minutes = parseInt(parts![2], 10);

    const time = date.hour(hours).minute(minutes);

    return {
      time,
    };
  });

  return dateSlots;
};

export default Slots;
