import { BookingResponse } from "lib/types/booking";

const Booking = (props: BookingResponse) => {
  const { eventDate, description, attendees } = props;

  return (
    <div className="flex m-2">
      <div className="mr-4">
        <div className="text-sm">{new Date(eventDate).toLocaleDateString()}</div>
        {/* <div className="text-sm">Time</div> */}
      </div>
      <div>
        <div className="text-sm font-bold">30 Min Meeting between Lukwiya and {attendees[0].name}</div>
        <div className="text-xs text-gray-600">{description}</div>
        <div className="text-xs text-gray-600">{attendees[0].email}</div>
      </div>
    </div>
  );
};

export default Booking;
