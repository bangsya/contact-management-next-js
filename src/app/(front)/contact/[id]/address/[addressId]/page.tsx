import DetailAddress from "@/features/contact/[id]/address/[addressId]/DetailAddress";

export default async function DetailAddressId({
  params,
}: {
  params: { id: string; addressId: string };
}) {
  const { id, addressId } = await params;
  return (
    <>
      <DetailAddress id={id} addressId={addressId} />
    </>
  );
}
