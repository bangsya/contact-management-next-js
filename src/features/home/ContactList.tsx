import { contact } from "../lib/contact";
import ContactItem from "./ContactItem";
import Pagination from "./Pagination";

interface ContactListProps {
  contactList: contact[];
  paging: {
    totalPages: number;
    page: number;
  };
  handlePageChange: (page: number) => void;
  handleDelete: (id: string) => void;
}

export default function ContactList({
  contactList,
  paging,
  handlePageChange,
  handleDelete,
}: ContactListProps) {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 justify-between items-center border-blue-800 mt-4 ">
        {contactList.map((contact) => (
          <ContactItem
            key={contact._id}
            contact={contact}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div>
        <Pagination
          totalPage={paging.totalPages}
          page={paging.page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
