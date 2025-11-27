import FormEditAddress from "@/features/contact/[id]/address/[addressId]/edit-address/FormEditAddress";

export default async function EditAddress({
  params,
}: {
  params: {
    id: string;
    addressId: string;
  };
}) {
  const { id, addressId } = await params;
  return (
    <>
      <FormEditAddress id={id} addressId={addressId} />
    </>
  );
}
