import Button from "@/components/Button";
import Link from "next/link";
import ContactList from "./ContactList";
import Search from "./Search";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { contactListAPI, deleteContact } from "../lib/api/ContactApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { contact } from "../lib/contact";
import { setPage } from "@/store/searchSlice";
import { alertConfirm, alertSuccess } from "../lib/alert";

export default function Contact() {
  const [contactList, setContactList] = useState<contact[]>([]);
  const dispatch = useAppDispatch();
  const paging = useAppSelector((state) => state.search.paging);
  const search = useAppSelector((state) => state.search);

  const feactContactList = useCallback(async () => {
    const response = await contactListAPI(localStorage.getItem("token") || "", {
      page: search.paging.page,
      name: search.searchForm.name,
      email: search.searchForm.email,
      phone: search.searchForm.phone,
    });
    const responseBody = await response.json();

    if (response.status === 200) {
      setContactList(responseBody.data);
      dispatch(
        setPage({
          totalPages: responseBody.paging.totalPages,
          page: responseBody.paging.page,
        })
      );
    }
  }, [
    search.searchForm.name,
    search.searchForm.email,
    search.searchForm.phone,
    search.paging.page,
    dispatch,
  ]);

  useEffect(() => {
    feactContactList();
  }, [feactContactList]);

  function handlePageChange(page: number) {
    dispatch(
      setPage({
        totalPages: paging.totalPages,
        page,
      })
    );
  }

  async function handleDelete(id: string) {
    if (
      !(await alertConfirm("Apakah Anda yakin ingin menghapus kontak ini?"))
    ) {
      return;
    } else {
      const response = await deleteContact(
        localStorage.getItem("token") || "",
        id
      );
      const responseBody = await response.json();
      if (response.status === 200) {
        feactContactList();
        await alertSuccess(responseBody.message);
      }
    }
  }

  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <div className="w-full">
        <div className="judul flex justify-between items-center w-full border-blue-800 pb-2 border-b-3">
          <h1 className="text-xl font-bold text-gray-950">Daftar Contact</h1>
          <div className="flex justify-end items-center gap-2">
            <Button
              buttonSize="sm"
              className="text-white rounded-xl"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <SearchIcon size={20} />
            </Button>
            <Link href="/add-contact">
              <Button buttonSize="sm" className="text-white rounded-xl">
                Add Contact
              </Button>
            </Link>
          </div>
        </div>
        {searchOpen && <Search />}
        <ContactList
          contactList={contactList}
          paging={paging}
          handlePageChange={handlePageChange}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}
