import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (session) window.location.replace("/private");
  }, [loading, session]);

  console.log("Session: ", session);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-8">
      <div>
        <Link href="/auth/login">
          <a className="p-2 overflow-hidden text-white bg-blue-800 rounded-sm">LOGIN</a>
        </Link>
        <Link href="/auth/signup">
          <a className="p-2 ml-2 text-white bg-blue-800 rounded-sm">SIGN UP</a>
        </Link>
      </div>
      <div className="mt-5">
        <Link href="/bookings">
          <a className="p-2 ml-2 text-white bg-blue-800 rounded-sm">Book </a>
        </Link>
      </div>
    </div>
  );
}
