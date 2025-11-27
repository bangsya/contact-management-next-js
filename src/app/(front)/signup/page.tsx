import FormSignup from "@/features/signup/FormSignup";
import Link from "next/link";

export default function Signup() {
  return (
    <section className="">
      <div className="signup bg-white rounded-2xl p-6 shadow-md md:w-2xl w-full mx-auto flex flex-col gap-4 justify-center">
        <FormSignup />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/" className="text-blue-500 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
