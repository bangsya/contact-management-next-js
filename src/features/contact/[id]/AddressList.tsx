import { Address } from "@/features/lib/contact";
import AddressItem from "./AddressItem";

interface AddressListProps {
  addressList: Address[];
}

export default function AddressList({
  id,
  addressList,
  handleDelete,
}: AddressListProps & {
  handleDelete: (addressId: string) => void;
  id: string;
}) {
  return (
    <>
      <div className="text-blue-950 p-2 text-lg grid lg:grid-cols-4 md:grid-cols-3 gap-3">
        {addressList.map((address) => (
          <AddressItem
            key={address._id}
            id={id}
            address={address}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
