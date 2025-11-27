"use client";

import { getAddress } from "@/features/lib/api/AddressApi";
import { Address } from "@/features/lib/contact";
import { useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useState } from "react";
import ItemDetailContact from "../../ItemDetailContact";
import { Flag, LineSquiggle, Shredder, Map, Building2Icon } from "lucide-react";
import Link from "next/link";

export default function DetailAddress({
  id,
  addressId,
}: {
  id: string;
  addressId: string;
}) {
  const [addressDetail, setAddressDetail] = useState<Address>();
  const token = useAppSelector((state) => state.userData.data.token);

  const getAddrress = useCallback(async () => {
    const response = await getAddress(token, id, addressId);
    const responseBody = await response.json();
    setAddressDetail(responseBody.data);
  }, [token, id, addressId]);

  useEffect(() => {
    getAddrress();
  }, [getAddrress]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-3 mt-5 pb-5">
        <div className="w-full">
          <h2 className="font-bold text-blue-950 text-center text-lg">
            {addressDetail?.label || ""}
          </h2>
          <div className="flex justify-between items-center w-full mt-3 gap-3 flex-col md:flex-row">
            <ItemDetailContact
              title="Street"
              value={addressDetail?.street || ""}
              icon={LineSquiggle}
              className="md:w-1/2"
            />
            <ItemDetailContact
              title="City"
              value={addressDetail?.city || ""}
              icon={Building2Icon}
              className="md:w-1/2"
            />
          </div>
          <ItemDetailContact
            title="Province"
            value={addressDetail?.province || ""}
            icon={Map}
            className="mt-3"
          />
          <ItemDetailContact
            title="Country"
            value={addressDetail?.country || ""}
            icon={Flag}
            className="mt-3"
          />
          <ItemDetailContact
            title="Postal Code"
            value={addressDetail?.postalCode || ""}
            icon={Shredder}
            className="mt-3"
          />
        </div>
        <div className="text-center m-4">
          <Link href={`/contact/${id}`}>
            <span className="text-slate-400 hover:text-blue-950 cursor-pointer">
              Back to Contact
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
