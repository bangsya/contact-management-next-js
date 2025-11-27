"use client";
import Button from "@/components/Button";
import Link from "next/link";
import AddressList from "./AddressList";
import { useCallback, useEffect, useState } from "react";
import { Address } from "@/features/lib/contact";
import { deleteAddress, listAddress } from "@/features/lib/api/AddressApi";
import { alertConfirm, alertError } from "@/features/lib/alert";
import { useAppSelector } from "@/store/hooks";

export default function AddressInformation({ id }: { id: string }) {
  const [addressList, setAddressList] = useState<Address[]>([]);
  const token = useAppSelector((state) => state.userData.data.token);

  const fetchAddressList = useCallback(async () => {
    if (!token) {
      return;
    }
    const response = await listAddress(token, id);
    const responseBody = await response.json();
    if (response.ok) {
      setAddressList(responseBody.data);
    } else {
      alertError(responseBody.errors);
    }
  }, [id, token]);

  useEffect(() => {
    fetchAddressList();
  }, [fetchAddressList]);

  const handleDelete = async (addressId: string) => {
    if (
      !(await alertConfirm("Apakah anda yakin ingin menghapus Address ini?"))
    ) {
      return;
    } else {
      if (!token) {
        return;
      }
      const response = await deleteAddress(token, id, addressId);
      const responseBody = await response.json();
      if (response.ok) {
        fetchAddressList();
      } else {
        alertError(responseBody.errors);
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-3 mt-5 pb-5">
        <div className="w-full">
          <div className="judul flex justify-between items-center w-full pb-2">
            <h2 className="font-bold text-blue-950 text-center text-lg">
              Address Information
            </h2>
            <Link href={`/contact/${id}/add-address`}>
              <Button className="text-white" buttonSize="sm">
                Add Address
              </Button>
            </Link>
          </div>
          <AddressList
            addressList={addressList}
            handleDelete={handleDelete}
            id={id}
          />
        </div>
      </div>
    </>
  );
}
