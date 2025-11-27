"use client";
import FormInput from "@/components/FormInput";
import LayoutInputLocal from "@/components/LayoutInputLocal";
import { alertError, alertSuccess } from "@/features/lib/alert";
import { contactDetailAPI, updateContact } from "@/features/lib/api/ContactApi";
import { contact } from "@/features/lib/contact";
import { BookUser, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface FormEditContactProps {
  id: string;
}

export default function FormEditContact({ id }: FormEditContactProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<contact>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const getConotactDetail = useCallback(async () => {
    const response = await contactDetailAPI(
      localStorage.getItem("token") || "",
      id
    );
    const data = await response.json();
    setFormData({
      _id: data.data._id,
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      email: data.data.email,
      phone: data.data.phone,
    });
  }, [id]);

  useEffect(() => {
    getConotactDetail();
  }, [getConotactDetail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateContact(
      localStorage.getItem("token") || "",
      id,
      formData
    );
    const responseBody = await response.json();
    if (response.ok) {
      alertSuccess(responseBody.message);
      router.push("/");
    } else {
      alertError(responseBody.errors);
    }
  };
  return (
    <>
      <LayoutInputLocal label="edit-contact" href={`/`} hrefLabel="Home">
        <FormInput
          handleSubmit={handleSubmit}
          buttonLabel="Edit Contact"
          formLabel="Edit a Contact"
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
      </LayoutInputLocal>
    </>
  );
}
