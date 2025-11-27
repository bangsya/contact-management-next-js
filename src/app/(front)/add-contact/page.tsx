"use client";
import LayoutInputLocal from "@/components/LayoutInputLocal";
import FormAddContact from "@/features/add-contact/FormAddContact";
import { alertError } from "@/features/lib/alert";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddContact() {
  const router = useRouter();
  const token = useAppSelector((state) => state.userData.data.token);
  useEffect(() => {
    const alert = async () => {
      if (!token) {
        router.push("/");
        return await alertError("Please login first");
      }
    };
    alert();
  }, [token, router]);

  return (
    <LayoutInputLocal label="add-contact" href="/" hrefLabel="Home">
      <FormAddContact />
    </LayoutInputLocal>
  );
}
