"use client";

import FormInput from "@/components/FormInput";
import { BookUser, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { addContact } from "../lib/api/ContactApi";
import { alertError, alertSuccess } from "../lib/alert";

export default function FormAddContact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    const response = await addContact(token, formData);
    const responseBody = await response.json();
    if (response.ok) {
      alertSuccess(responseBody.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    } else {
      alertError(responseBody.errors);
    }
  };
  return (
    <>
      <FormInput
        handleSubmit={handleSubmit}
        buttonLabel="Add Contact"
        formLabel="Add a New Contact"
        input={[
          {
            name: "First Name",
            type: "text",
            placeholder: "Input first name",
            leftIcon: <BookUser />,
            value: formData.firstName,
            onChange: (e) =>
              setFormData({ ...formData, firstName: e.target.value }),
          },
          {
            name: "Last Name",
            type: "text",
            placeholder: "Input last name",
            leftIcon: <BookUser />,
            value: formData.lastName,
            onChange: (e) =>
              setFormData({ ...formData, lastName: e.target.value }),
          },
          {
            name: "Email",
            type: "email",
            placeholder: "Input email",
            leftIcon: <Mail />,
            value: formData.email,
            onChange: (e) =>
              setFormData({ ...formData, email: e.target.value }),
          },
          {
            name: "Number Phone",
            type: "text",
            placeholder: "Input number phone",
            leftIcon: <Phone />,
            value: formData.phone,
            onChange: (e) =>
              setFormData({ ...formData, phone: e.target.value }),
          },
        ]}
      />
    </>
  );
}
