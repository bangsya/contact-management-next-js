"use client";

import FormInput from "@/components/FormInput";
import { useState } from "react";
import { alertError, alertSuccess } from "../lib/alert";
import { createUser } from "../lib/api/UserApi";
import { CheckCheck, IdCard, LockKeyhole, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormSignup() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alertError("Passwords do not match!");
      return;
    }

    const response = await createUser({
      username: userName,
      name,
      password,
    });

    const responseBody = await response.json();
    if (response.status === 201) {
      setUserName("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      alertSuccess("User created successfully!");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      alertError(responseBody.errors || "Failed to create user.");
    }
  };

  return (
    <FormInput
      formLabel="Create your Account"
      handleSubmit={handleSubmit}
      input={[
        {
          name: "Username",
          type: "text",
          placeholder: "Create a Username",
          onChange: (e) => setUserName(e.target.value),
          value: userName,
          leftIcon: <UserIcon />,
        },
        {
          name: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
          onChange: (e) => setName(e.target.value),
          value: name,
          leftIcon: <IdCard />,
        },
        {
          name: "Password",
          type: "password",
          placeholder: "Create a Password",
          onChange: (e) => setPassword(e.target.value),
          value: password,
          leftIcon: <LockKeyhole />,
          togglePassword: true,
        },
        {
          name: "Confirm Password",
          type: "password",
          placeholder: "Confirm Password",
          onChange: (e) => setConfirmPassword(e.target.value),
          value: confirmPassword,
          leftIcon: <CheckCheck />,
          togglePassword: true,
        },
      ]}
      buttonLabel="Sign Up"
    />
  );
}
