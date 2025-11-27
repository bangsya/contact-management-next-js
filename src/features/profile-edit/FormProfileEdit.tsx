"use client";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { editUser } from "../lib/api/UserApi";
import { CheckCheck, IdCard, LockKeyhole, UserIcon } from "lucide-react";
import { alertError, alertSuccess } from "../lib/alert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/userDataSlice";

export default function FormProfileEdit() {
  const userData = useAppSelector((state) => state.userData.data);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        username: userData.username,
        name: userData.name,
      }));
    }
  }, [userData]);

  const handleSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await editUser(localStorage.getItem("token") || "", {
      name: formData.name,
      username: formData.username,
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      dispatch(setUser(responseBody.data));
      alertSuccess("Profile updated successfully!");
    } else {
      alertError(responseBody.errors || "Failed to update profile.");
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alertError("Passwords do not match.");
      return;
    }
    const response = await editUser(localStorage.getItem("token") || "", {
      password: formData.newPassword,
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      setFormData({
        ...formData,
        newPassword: "",
        confirmPassword: "",
      });
      alertSuccess("Password updated successfully!");
    } else {
      alertError(responseBody.errors || "Failed to update password.");
    }
  };
  return (
    <>
      <div className="flex flex-col w-full lg:flex-row lg:gap-10">
        <div className="lg:w-1/2">
          <FormInput
            formLabel="Edit Profile"
            handleSubmit={handleSubmitName}
            buttonLabel="Edit Profile"
            input={[
              {
                name: "Edit Username",
                type: "text",
                placeholder: "Enter your new Username",
                value: formData.username,
                onChange: (e) =>
                  setFormData({ ...formData, username: e.target.value }),
                leftIcon: <UserIcon />,
              },
              {
                name: "Edit Full Name",
                type: "text",
                placeholder: "Enter your new Full Name",
                value: formData.name,
                onChange: (e) =>
                  setFormData({ ...formData, name: e.target.value }),
                leftIcon: <IdCard />,
              },
            ]}
          />
        </div>
        <div className="mt-5 border-t-2 border-gray-200 pt-4 lg:w-1/2 lg:mt-0 lg:border-t-0 lg:pt-0">
          <FormInput
            formLabel="Edit Password"
            handleSubmit={handleSubmitPassword}
            buttonLabel="Edit Password"
            input={[
              {
                name: "Edit New Password",
                type: "password",
                placeholder: "Enter your new Password",
                value: formData.newPassword,
                onChange: (e) =>
                  setFormData({ ...formData, newPassword: e.target.value }),
                leftIcon: <LockKeyhole />,
                togglePassword: true,
              },
              {
                name: "Confirm New Password",
                type: "password",
                placeholder: "Confirm your new Password",
                value: formData.confirmPassword,
                onChange: (e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value }),
                leftIcon: <CheckCheck />,
                togglePassword: true,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
