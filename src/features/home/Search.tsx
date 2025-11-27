import Button from "@/components/Button";
import Input from "@/components/Input";
import { Mail, Phone, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { setPage, setSearch } from "@/store/searchSlice";
import { useState } from "react";

export default function Search() {
  const dispatch = useAppDispatch();
  const [searchForm, setSearchForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearch(searchForm));
    dispatch(
      setPage({
        page: 1,
      })
    );
  };

  // const search = useAppSelector((state) => state.search);
  // console.log(search);
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full grid gap-2 bg-white p-4 mt-2 rounded-xl shadow-md md:grid-cols-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Input
        name="Name"
        placeholder="Search Name"
        type="text"
        leftIcon={<User />}
        value={searchForm.name}
        onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
      />
      <Input
        name="Email"
        placeholder="Search Email"
        type="text"
        leftIcon={<Mail />}
        value={searchForm.email}
        onChange={(e) =>
          setSearchForm({ ...searchForm, email: e.target.value })
        }
      />
      <Input
        name="Phone"
        placeholder="Search Phone"
        type="text"
        leftIcon={<Phone />}
        value={searchForm.phone}
        onChange={(e) =>
          setSearchForm({ ...searchForm, phone: e.target.value })
        }
      />

      <Button
        buttonSize="sm"
        className="text-white rounded-xl md:w-1/2 md:col-start-3 md:row-start-2 md:justify-self-end"
        type="submit"
        onClick={() => handleSubmit}
      >
        Search
      </Button>
    </motion.form>
  );
}
