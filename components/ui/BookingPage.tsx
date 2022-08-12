import { ClockIcon, CalendarIcon, InformationCircleIcon, PlusIcon } from "@heroicons/react/solid";
import { BookPageProps } from "@pages/[user]/book";
import { useMutation } from "@tanstack/react-query";
import createBooking from "lib/bookings/create-event";
import dayjs, { parseDate } from "lib/dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/style.css";

import Avatar from "@components/ui/Avatar";
import { EmailInput } from "@components/ui/Input";

import classNames from "../../lib/classNames";

type BookingFormValues = {
  name: string;
  email: string;
  guests?: string[];
  notes?: string;
};

const BookingPage = (props: BookPageProps) => {
  //eventtype??
  const router = useRouter();

  const date = router.query.date as string;
  const [guestToggle, setGuestToggle] = useState(false);

  const { user } = props;

  useEffect(() => {
    if (router.query.guest) {
      setGuestToggle(true);
    }
  }, [router.query.guest]);

  const inputClassName =
    "focus:border-black block w-full rounded-sm border-gray-900 focus:ring-black disabled:bg-gray-200 disbaled:hover:cursor-not-allowed bg-gray-700 text-white selection:bg-green-500 disabled:text-gray-500 text-sm";

  const { register, handleSubmit, formState, control } = useForm<BookingFormValues>();

  const mutation = useMutation(createBooking, {
    onSuccess: async () => {
      return router.push("/");
    },
  });

  const bookEvent = (booking: BookingFormValues) => {
    mutation.mutate({
      ...booking,
      user: router.query.user as string,
      eventDate: dayjs(date).format(),
    });
  };

  return (
    <div className="mt-4">
      <main className="max-w-3xl mx-auto my-0">
        <div className="overflow-hidden bg-gray-800 border border-gray-600 rounded-md sm:border">
          <div className="px-4 py-5 sm:flex sm:p-4">
            <div className="sm:w-1/2 sm:border-r sm:border-gray-700">
              <Avatar name={user.name} />
              {/* <h2 className="mt-2 font-medium text-gray-300">{user.name}</h2> */}
              <h2 className="mt-1 text-xl font-bold text-white">Quick chat</h2>
              <div className="flex items-center my-2">
                <ClockIcon className="w-4 h-4 text-gray-400 ml-[10px] mr-[10px]" />
                <p className="text-white">30 Minutes</p>
              </div>
              <div className="flex mb-4 text-white">
                <CalendarIcon className="w-4 h-4 text-gray-400 ml-[10px] mr-[10px]" />
                <div className="-mt-1">{parseDate(dayjs(date).tz("Africa/Kampala"))}</div>
              </div>
            </div>
            <div className="sm:w-1/2 sm:pl-8 sm:pr-4">
              <form onSubmit={handleSubmit(bookEvent)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Your name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      required
                      className={inputClassName}
                      placeholder="example_name"
                      // disabled={disabledInput}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Email Address
                  </label>
                  <EmailInput
                    {...register("email")}
                    required
                    placeholder="you@example.com"
                    type="search"
                    className={classNames(
                      inputClassName,
                      formState.errors.email ? "border-red-700 focus:ring-red-700" : "border-gray-900 "
                    )}
                  />
                  {formState.errors.email && (
                    <div className="flex items-center mt-2 text-sm text-red-700">
                      <InformationCircleIcon className="w-4 h-4 text-gray-400 ml-[10px] mr-[10px]" />
                      <p>Email validation error</p>
                    </div>
                  )}
                </div>
                {/*  */}
                <div className="mb-4">
                  {!guestToggle && (
                    <label
                      htmlFor="guests"
                      onClick={() => setGuestToggle(!guestToggle)}
                      className="flex items-center mb-1 text-sm font-medium text-white hover:cursor-pointer">
                      <PlusIcon className="w-4 h-4 text-gray-400 ml-[10px] mr-[10px]" />
                      <p>Additional Guests</p>
                    </label>
                  )}
                  {guestToggle && (
                    <div>
                      <label htmlFor="guests" className="block mb-1 text-sm font-medium text-white">
                        Guests
                      </label>
                      {/*  */}
                      <Controller
                        control={control}
                        name="guests"
                        render={({ field: { onChange, value } }) => (
                          <ReactMultiEmail
                            className="relative"
                            placeholder="guest@example.com"
                            emails={value}
                            onChange={onChange}
                            getLabel={(
                              email: string,
                              index: number,
                              removeEmail: (index: number) => void
                            ) => {
                              return (
                                <div data-tag key={index} className="cursor-pointer">
                                  {email}
                                  <span data-tag-handle onClick={() => removeEmail(index)}>
                                    x
                                  </span>
                                </div>
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="notes" className="block mb-1 text-sm font-medium text-white">
                    Additional notes
                  </label>
                  <textarea
                    {...register("notes")}
                    name="notes"
                    id="notes"
                    rows={3}
                    className={inputClassName}
                    placeholder="Share additional notes"
                  />
                </div>
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <button
                    type="submit"
                    className="p-2 text-gray-900 bg-white rounded-sm"
                    disabled={mutation.isLoading}>
                    Confirm
                  </button>
                  <button type="button" onClick={() => router.back()} className="p-2 text-white">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
