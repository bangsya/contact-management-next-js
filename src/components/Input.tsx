import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";

interface InputProps {
  name: string;
  type?: "text" | "password" | "email" | "number";
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  togglePassword?: boolean;
  clearable?: boolean;
}

export default function Input({
  name,
  type = "text",
  placeholder,
  className,
  value = "",
  onChange,
  leftIcon,
  rightIcon,
  togglePassword = false,
  clearable = false,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    togglePassword && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const handleClear = () => {
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const showClear = clearable && value.length > 0 && !togglePassword;

  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className={`text-sm font-medium text-slate-500 mb-2 block`}
      >
        {name}
      </label>
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 top-1/3 -translate-y-1/4 text-slate-400 pointer-events-none">
            <div className="flex items-center justify-center w-5 h-5 leading-none p-0">
              {leftIcon}
            </div>
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          className={` w-full px-4 py-2.5 leading-normal border border-gray-300 rounded-xl bg-slate-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-2 
            ${leftIcon ? "pl-10" : ""} 
            ${
              (togglePassword && type === "password") || rightIcon || showClear
                ? "pr-10"
                : ""
            }
            ${className}`}
          id={name}
          value={value}
          onChange={onChange}
        />

        {togglePassword && type === "password" ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/3 -translate-y-1/4 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : showClear ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/3 -translate-y-1/4 right-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        ) : rightIcon ? (
          <span className="absolute top-1/3 -translate-y-1/4 right-3 flex items-center text-slate-400">
            {rightIcon}
          </span>
        ) : null}
      </div>
    </div>
  );
}
