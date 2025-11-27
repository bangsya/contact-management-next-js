"use client";
import { ContactRound, Mail, SquarePen, Trash, User } from "lucide-react";
import Button from "@/components/Button";
import { contact } from "../lib/contact";
import { useRouter } from "next/navigation";
import Information from "../../components/Information";

export default function ContactItem({
  contact,
  handleDelete,
}: {
  contact: contact;
  handleDelete: (id: string) => void;
}) {
  const router = useRouter();
  return (
    <>
      <div
        className="w-full mb-2 hover:-translate-y-1 transition-all duration-300"
        id={contact._id}
      >
        <div className="rounded-md shadow-md bg-white p-2">
          <div
            className="hover:bg-blue-50/50 p-2 rounded-xl cursor-pointer"
            onClick={() => router.push(`/contact/${contact._id}`)}
          >
            <div className="flex gap-1 ml-2 mb-3 items-center">
              <div className="icon">
                <ContactRound className="w-7 h-7 text-gray-950" />
              </div>
              <h2 className="text-md font-bold text-blue-950">
                {contact.firstName} {contact.lastName}
              </h2>
            </div>
            <Information
              icon={User}
              identity="First Name"
              information={contact.firstName}
            />
            <Information
              icon={User}
              identity="Last Name"
              information={contact.lastName}
            />
            <Information
              icon={Mail}
              identity="Email"
              information={contact.email}
            />
            <Information
              icon={Mail}
              identity="Phone"
              information={contact.phone}
            />
          </div>
          <div className="action w-full mt-3 flex justify-end gap-2">
            <Button
              buttonSize="xs"
              onClick={() => router.push(`/contact/${contact._id}/edit`)}
            >
              <div className="flex gap-1 items-center text-white">
                <SquarePen className="w-4 h-4" />
                <p className="font-medium ">Edit</p>
              </div>
            </Button>
            <Button
              buttonSize="xs"
              className="bg-red-500 hover:bg-red-600 hover:ring-red-200"
              onClick={() => handleDelete(contact._id)}
            >
              <div className="flex gap-1 items-center text-white">
                <Trash className="w-4 h-4" />
                <p className="font-medium ">Delete</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
