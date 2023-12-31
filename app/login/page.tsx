"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log({ data, error });
    router.push("/");
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log({ data, error });
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2">
      {view === "check-email" ? (
        <p className="text-center text-gray-400">
          Check <span className="font-bold text-white">{email}</span> to
          continue signing up
        </p>
      ) : (
        <form
          className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2"
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <label className="text-md text-gray-400" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md text-gray-400" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === "sign-in" ? (
            <>
              <button
                className="bg-green-700 rounded px-4 py-2 text-gray-200 mb-6"
                type="submit"
              >
                Sign In
              </button>
              <button
                onClick={signInWithGoogle}
                type="button"
                className="bg-from-green-700 rounded px-4 py-2 text-gray-200 mb-6"
              >
                Sign In With Google
              </button>
              <p className="text-sm text-gray-500 text-center">
                Don't have an account?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView("sign-up")}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          ) : null}
          {view === "sign-up" ? (
            <>
              <button
                className="bg-green-700 rounded px-4 py-2 text-gray-200 mb-6"
                type="submit"
              >
                Sign Up
              </button>
              <button
                onClick={signInWithGoogle}
                type="button"
                className="bg-green-700 rounded px-4 py-2 text-gray-200 mb-6"
              >
                Sign In With Google
              </button>
              <p className="text-sm text-gray-500 text-center">
                Already have an account?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView("sign-in")}
                >
                  Sign In Now
                </button>
              </p>
            </>
          ) : null}
        </form>
      )}
    </div>
  );
}
