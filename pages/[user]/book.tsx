import { inferSSRProps } from "lib/types/inferSSRProps";
import { GetServerSidePropsContext } from "next";

import prisma from "@helpers/prisma";

import BookingPage from "@components/ui/BookingPage";

export type BookPageProps = inferSSRProps<typeof getServerSideProps>;

const Book = (props: BookPageProps) => {
  return <BookingPage {...props} />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const _user = context.query.user as string;
  // const eventTypeSlug = context.query.slug as string;

  const user = await prisma.user.findUnique({
    where: {
      username: _user,
    },
  });

  if (!user) return { notFound: true };

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Book;
