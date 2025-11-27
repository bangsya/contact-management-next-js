import DetailContactId from "@/features/contact/[id]/DetailContactId";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ContactDetail({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <DetailContactId id={id} />
    </>
  );
}
