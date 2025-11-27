"use client";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProfileProps {
  onLogout?: () => void;
  name?: string;
  username?: string;
  ref?: React.Ref<HTMLDivElement>;
  handleClose?: () => void;
}

export default function Profile({
  onLogout,
  name,
  username,
  ref,
  handleClose,
}: ProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: -8, x: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -8, x: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-20 right-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 w-64 z-50"
      ref={ref}
    >
      <p className="font-semibold text-center text-gray-800">User Profile</p>

      <div className="mt-4 text-sm grid grid-cols-3 gap-y-2 text-gray-700">
        <span className="font-medium">Username</span>
        <span className="col-span-2 text-gray-500">{username}</span>

        <span className="font-medium">Name</span>
        <span className="col-span-2 text-gray-500">{name}</span>
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div className="flex gap-2 justify-center">
        <Link href="/profile-edit" onClick={handleClose}>
          <Button
            buttonSize="sm"
            className="bg-slate-200 text-blue-950 hover:bg-slate-100 hover:ring-slate-200 hover:shadow-sm"
          >
            Edit Profile
          </Button>
        </Link>

        <Button
          buttonSize="sm"
          className="bg-red-500 text-white hover:bg-red-600 hover:ring-red-300 hover:shadow-sm"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </motion.div>
  );
}
