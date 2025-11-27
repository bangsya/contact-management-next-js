import FormEditContact from "@/features/contact/[id]/edit/FormEditContact";

export default async function EditContact({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <>
      <FormEditContact id={id} />
    </>
  );
}
