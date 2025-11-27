"use client";
import { contactDetailAPI, deleteContact } from "@/features/lib/api/ContactApi";
import { contact } from "@/features/lib/contact";
import { useCallback, useEffect, useState } from "react";
import ContactInformation from "./ContactInformation";
import AddressInformation from "./AddressInformation";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { alertConfirm, alertSuccess } from "@/features/lib/alert";
import { House, SquarePen, Trash } from "lucide-react";

export default function DetailContactId({ id }: { id: string }) {
  //   const token = useAppSelector((state) => state.userData.data.token);
  const router = useRouter();
  const [contactDetail, setContactDetail] = useState<contact>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    createdAt: "",
    updatedAt: "",
    address: [],
  });

  const getConotactDetail = useCallback(async () => {
    const response = await contactDetailAPI(
      localStorage.getItem("token") || "",
      id
    );
    const data = await response.json();
    setContactDetail({
      ...data.data,
      createdAt: data.data.createdAt
        ? new Date(data.data.createdAt).toLocaleString("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
          })
        : "",
      updatedAt: data.data.updatedAt
        ? new Date(data.data.updatedAt).toLocaleString("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
          })
        : "",
    });
  }, [id]);
  const handleDelete = async () => {
    if (
      !(await alertConfirm("Apakah Anda yakin ingin menghapus kontak ini?"))
    ) {
      return;
    } else {
      const response = await deleteContact(
        localStorage.getItem("token") || "",
        id
      );
      const responseBody = await response.json();
      if (response.status === 200) {
        await alertSuccess(responseBody.message);
        router.push("/");
      }
    }
  };

  useEffect(() => {
    getConotactDetail();
  }, [getConotactDetail]);
  return (
    <>
      <div className="w-full">
        <div className="judul flex justify-between items-center w-full border-blue-800 pb-2 border-b-3">
          <h1 className="text-xl font-bold text-blue-950">
            Detail {contactDetail.firstName} {contactDetail.lastName}
          </h1>
          <div className="flex gap-2">
            <Button
              buttonSize="xs"
              onClick={() => router.push(`/contact/${id}/edit`)}
              className="text-white"
            >
              <div className="flex gap-1 items-center text-white">
                <SquarePen className="w-4 h-4" />
                <p className="font-medium ">Edit Contact</p>
              </div>
            </Button>
            <Button
              buttonSize="xs"
              onClick={() => handleDelete()}
              className="text-white bg-red-500 hover:bg-red-600 hover:ring-red-200"
            >
              <div className="flex gap-1 items-center text-white">
                <Trash className="w-4 h-4" />
                <p className="font-medium ">Delete Contact</p>
              </div>
            </Button>
            <Button
              buttonSize="xs"
              onClick={() => router.push("/")}
              className="text-white"
            >
              <div className="flex gap-1 items-center text-white">
                <House className="w-4 h-4" />
                <p className="font-medium ">Back to Home</p>
              </div>
            </Button>
          </div>
        </div>
        <ContactInformation contactDetail={contactDetail} />
        <AddressInformation id={id} />
      </div>
    </>
  );
}
