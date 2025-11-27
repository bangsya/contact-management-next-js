import Button from "@/components/Button";
import Information from "@/components/Information";
import { Address } from "@/features/lib/contact";
import {
  Building2Icon,
  Flag,
  LineSquiggle,
  Map,
  MapPinned,
  Shredder,
  SquarePen,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddressItem({
  address,
  handleDelete,
  id,
}: {
  address: Address;
  handleDelete: (addressId: string) => void;
  id: string;
}) {
  const router = useRouter();
  return (
    <>
      <div className="rounded-md shadow-md bg-blue-50 p-3 hover:-translate-y-2 transition-all duration-300">
        <div
          className="hover:bg-white p-2 rounded-xl cursor-pointer"
          onClick={() =>
            router.push(`/contact/${id}/address/${address._id || ""}`)
          }
        >
          <div className="flex gap-1 ml-2 mb-3 items-center">
            <div className="icon">
              <MapPinned className="w-7 h-7 text-gray-950" />
            </div>
            <h2 className="text-lg font-bold text-blue-950">{address.label}</h2>
          </div>
          <Information
            icon={LineSquiggle}
            identity="Street"
            information={address.street || ""}
          />
          <Information
            icon={Building2Icon}
            identity="City"
            information={address.city || ""}
          />
          <Information
            icon={Map}
            identity="Province"
            information={address.province || ""}
          />
          <Information
            icon={Flag}
            identity="Country"
            information={address.country || ""}
          />
          <Information
            icon={Shredder}
            identity="Postal Code"
            information={address.country || ""}
          />
        </div>
        <div className="action w-full mt-3 flex justify-end gap-2">
          <Button
            buttonSize="xs"
            onClick={() =>
              router.push(
                `/contact/${id}/address/${address._id || ""}/edit-address`
              )
            }
          >
            <div className="flex gap-1 items-center text-white">
              <SquarePen className="w-4 h-4" />
              <p className="font-medium ">Edit</p>
            </div>
          </Button>
          <Button
            buttonSize="xs"
            className="bg-red-500 hover:bg-red-600 hover:ring-red-200"
            onClick={() => handleDelete(address._id || "")}
          >
            <div className="flex gap-1 items-center text-white">
              <Trash className="w-4 h-4" />
              <p className="font-medium ">Delete</p>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
