import FormProfileEdit from "@/features/profile-edit/FormProfileEdit";

export default function ProfileEditPage() {
  return (
    <section className="profile-edit">
      <div className="profile-edit-form bg-white rounded-2xl p-5 shadow-md md:w-2xl lg:w-full mx-auto flex flex-col gap-4 justify-center">
        <FormProfileEdit />
      </div>
    </section>
  );
}
