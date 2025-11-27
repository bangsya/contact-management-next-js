import FormAddAddress from "@/features/contact/[id]/add-address/FormAddAddress";

export default async function AddAddress({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <>
      <FormAddAddress id={id} />
    </>
  );
}
