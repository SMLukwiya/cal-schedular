import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function redirectOnLogin() {
      const session = await getSession();
      if (session) window.location.replace("/");
    }
    redirectOnLogin();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    return axios
      .post("/api/auth/signup", {
        name,
        email,
        password,
      })
      .then(() => {
        alert("success");
        window.location.replace("/");
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50">
      <div className="m-3 text-xl font-bold">Create your account</div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border border-gray-500 rounded-md w-80">
        <>
          <label className="mb-1 text-sm text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            className="block w-full p-1 mb-3 text-sm border border-neutral-300 focus:ring-neutral-900"
          />
        </>
        <>
          <label className="mb-1 text-sm text-gray-700">Email</label>
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
            className="block w-full p-1 mb-3 text-sm border border-neutral-300 focus:ring-neutral-900"
          />
        </>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-1 mt-2 mb-2 text-sm text-white bg-blue-800">
          Sign up
        </button>
      </form>
      <div className="mt-2 text-xs text-center">
        Already have an account?{" "}
        <Link href="/auth/login">
          <span className="font-bold hover:cursor-pointer">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
