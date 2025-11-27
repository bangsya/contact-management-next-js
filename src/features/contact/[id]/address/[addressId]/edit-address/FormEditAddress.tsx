"use client";
import FormInput from "@/components/FormInput";
import LayoutInputLocal from "@/components/LayoutInputLocal";
import { alertError, alertSuccess } from "@/features/lib/alert";
import { getAddress, updateAddress } from "@/features/lib/api/AddressApi";
import { Address } from "@/features/lib/contact";
import { useAppSelector } from "@/store/hooks";
import {
  Building2Icon,
  Flag,
  LineSquiggle,
  Map,
  Shredder,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function FormEditAddress({
  id,
  addressId,
}: {
  id: string;
  addressId: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<Address>();
  const token = useAppSelector((state) => state.userData.data.token);

  const getAddrress = useCallback(async () => {
    const response = await getAddress(token, id, addressId);
    const responseBody = await response.json();
    setFormData(responseBody.data);
  }, [token, id, addressId]);

  useEffect(() => {
    getAddrress();
  }, [getAddrress]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateAddress(token, id, addressId, {
      label: formData?.label || "",
      street: formData?.street || "",
      city: formData?.city || "",
      province: formData?.province || "",
      country: formData?.country || "",
      postalCode: formData?.postalCode || "",
    });
    const responseBody = await response.json();
    if (response.ok) {
      await alertSuccess(responseBody.message);
      router.push(`/contact/${id}`);
    } else {
      await alertError(responseBody.message);
    }
  };
  return (
    <>
      <LayoutInputLocal
        label="edit-address"
        href={`/contact/${id}`}
        hrefLabel="Contact"
      >
        <FormInput
          handleSubmit={handleSubmit}
          buttonLabel="Edit Address"
          formLabel={`Edit Address ${formData?.label || ""}`}
          input={[
            {
              name: "Label",
              type: "text",
              placeholder: "Input label",
              leftIcon: <Tag />,
              value: formData?.label || "",
              onChange: (e) =>
                setFormData({ ...formData, label: e.target.value }),
            },
            {
              name: "Street",
              type: "text",
              placeholder: "Input street",
              leftIcon: <LineSquiggle />,
              value: formData?.street || "",
              onChange: (e) =>
                setFormData({ ...formData, street: e.target.value }),
            },
            {
              name: "City",
              type: "text",
              placeholder: "Input city",
              leftIcon: <Building2Icon />,
              value: formData?.city || "",
              onChange: (e) =>
                setFormData({ ...formData, city: e.target.value }),
            },
            {
              name: "Province",
              type: "text",
              placeholder: "Input province",
              leftIcon: <Map />,
              value: formData?.province || "",
              onChange: (e) =>
                setFormData({ ...formData, province: e.target.value }),
            },
            {
              name: "Country",
              type: "text",
              placeholder: "Input country",
              leftIcon: <Flag />,
              value: formData?.country || "",
              onChange: (e) =>
                setFormData({ ...formData, country: e.target.value }),
            },
            {
              name: "Postal Code",
              type: "text",
              placeholder: "Input postal code",
              leftIcon: <Shredder />,
              value: formData?.postalCode || "",
              onChange: (e) =>
                setFormData({ ...formData, postalCode: e.target.value }),
            },
          ]}
        />
      </LayoutInputLocal>
    </>
  );
}
