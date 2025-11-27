"use client";
import LoadingFull from "@/components/LoadingFull";
import Contact from "@/features/home/Contact";
import FormSignIn from "@/features/signin/FormSignIn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setToken } from "@/store/userDataSlice";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userData.data.token);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      dispatch(setToken(storedToken || ""));
    }
    setChecking(false);
  }, [dispatch]);

  if (checking) {
    return <LoadingFull />;
  }

  return (
    <section className="scroll-auto">
      {token.length > 0 ? (
        <Contact />
      ) : (
        <div className="signin bg-white rounded-2xl p-6 shadow-md md:w-2xl w-full mx-auto flex flex-col gap-4 justify-center">
          <FormSignIn />
          <p className="text-center text-sm text-gray-500">
            Not have an account ?{" "}
            <Link href="/signup" className="text-blue-500 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}
