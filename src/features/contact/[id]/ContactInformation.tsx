import { MailIcon, Phone, User2Icon } from "lucide-react";
import ItemDetailContact from "./ItemDetailContact";
import { contact } from "@/features/lib/contact";

export default function ContactInformation({
  contactDetail,
}: {
  contactDetail: contact;
}) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-3 mt-5 pb-5">
        <div className="w-full">
          <h2 className="font-bold text-blue-950 text-center text-lg">
            Contact Information
          </h2>
          <div className="flex justify-between items-center w-full mt-3 gap-3 flex-col md:flex-row">
            <ItemDetailContact
              title="First Name"
              value={contactDetail.firstName}
              icon={User2Icon}
              className="md:w-1/2"
            />
            <ItemDetailContact
              title="Last Name"
              value={contactDetail.lastName}
              icon={User2Icon}
              className="md:w-1/2"
            />
          </div>
          <ItemDetailContact
            title="Email"
            value={contactDetail.email}
            icon={MailIcon}
            className="mt-3"
          />
          <ItemDetailContact
            title="Phone"
            value={contactDetail.phone}
            icon={Phone}
            className="mt-3"
          />
          <div className="flex justify-between items-center w-full mt-3 gap-3 flex-col md:flex-row">
            <ItemDetailContact
              title="Created at"
              value={contactDetail.createdAt || ""}
              icon={User2Icon}
              className="md:w-1/2"
            />
            <ItemDetailContact
              title="Updated at"
              value={contactDetail.updatedAt || ""}
              icon={User2Icon}
              className="md:w-1/2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
