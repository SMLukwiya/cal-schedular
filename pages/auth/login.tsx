import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { getSession } from "@helpers/auth";

import Button from "@components/ui/Button";

interface ServerSideProps {
  csrfToken: string;
}

export default function Login({ csrfToken }: ServerSideProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/private";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    if (!response) {
      throw new Error("Received empty response from next auth");
    }

    if (!response.error) {
      // we're logged in! let's do a hard refresh to the desired url
      window.location.replace(callbackUrl);
      return;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50">
      <Button title="Home" home />
      <div className="m-3 text-xl font-bold">Sign in to your account</div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border border-gray-500 rounded-md w-80">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />
        <>
          <label className="mb-1 text-sm text-gray-700">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            className="block w-full p-1 mb-3 text-sm border border-neutral-300 focus:ring-neutral-900"
          />
        </>
        <>
          <label className="mb-1 text-sm text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
            className="block w-full p-1 mb-3 border border-neutral-300 focus:ring-neutral-900"
          />
        </>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-1 mt-2 mb-2 text-sm text-white bg-blue-800">
          Sign in
        </button>
        {isSubmitting && <div className="m-2 text-sm text-gray-500">loading...</div>}
      </form>
      <div className="mt-2 text-xs text-center">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup">
          <span className="font-bold hover:cursor-pointer">Create an account</span>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
