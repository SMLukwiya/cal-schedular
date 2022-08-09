import { ArrowRightIcon, ClockIcon, UserIcon } from "@heroicons/react/solid";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";

import prisma from "@helpers/prisma";

const User = (props: any) => {
  const { user } = props;

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-gray-800 p-36">
      <>
        <Image src={"/images/earth.png"} alt="globe" width={100} height={100} className="object-contain" />
        <div className="mt-4 text-2xl font-bold text-white">{user.name}</div>
      </>
      <div className="relative flex flex-row w-3/4 h-24 p-5 mt-5 bg-gray-800 border border-gray-600 rounded-sm hover:border-gray-500 group">
        <ArrowRightIcon className="absolute w-4 h-4 text-white transition-opacity opacity-0 right-3 top-3 group-hover:opacity-100" />
        <Link href={`${user.username}/quick-chart`}>
          <a className="w-full">
            <p className="mb-3 font-bold text-white">Quick chat</p>
            <div className="flex flex-row items-center">
              <>
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <p className="mx-2 text-white">30m</p>
              </>
              <>
                <UserIcon className="w-4 h-4 ml-2 text-gray-400" />
                <p className="mx-2 text-white">1-on-1</p>
              </>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const username = context.query.user as string;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return { notFound: true };
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

export default User;
