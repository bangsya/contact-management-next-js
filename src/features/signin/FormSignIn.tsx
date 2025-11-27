"use client";

import FormInput from "@/components/FormInput";
import { LockKeyhole, UserIcon } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../lib/api/UserApi";
import { alertError } from "../lib/alert";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/userDataSlice";

export default function FormSignIn() {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginUser({
      username: form.username,
      password: form.password,
    });

    const responseBody = await response.json();
    if (response.status === 200) {
      // save token to localstorage
      localStorage.setItem("token", responseBody.data.token);
      setForm({
        username: "",
        password: "",
      });
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        dispatch(setToken(storedToken || ""));
      }
    } else {
      alertError(responseBody.errors || "Username or password is incorrect.");
    }
  };

  return (
    <FormInput
      formLabel="Sign In to Your Account"
      handleSubmit={handleSubmit}
      buttonLabel="Sign In"
      input={[
        {
          name: "Username",
          type: "text",
          placeholder: "Enter your Username",
          onChange: (e) => {
            setForm({ ...form, username: e.target.value });
          },
          value: form.username,
          leftIcon: <UserIcon />,
        },
        {
          name: "Password",
          type: "password",
          placeholder: "Enter your Password",
          leftIcon: <LockKeyhole />,
          togglePassword: true,
          value: form.password,
          onChange: (e) => {
            setForm({ ...form, password: e.target.value });
          },
        },
      ]}
    />
  );
}
