"use client";
import LayoutInputLocal from "@/components/LayoutInputLocal";
import FormAddContact from "@/features/add-contact/FormAddContact";

export default function AddContact() {
  return (
    <LayoutInputLocal label="add-contact" href="/" hrefLabel="Home">
      <FormAddContact />
    </LayoutInputLocal>
  );
}
