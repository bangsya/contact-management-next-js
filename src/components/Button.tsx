"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  className?: string;
  buttonSize?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  buttonSize = "md",
  disabled = false,
}: ButtonProps) => {
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
    full: "w-full py-3 text-base",
  };

  return (
    <button
      className={`flex items-center justify-center font-bold px-4 py-2 rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all duration-200 hover:ring-2 hover:ring-blue-200 ${
        sizeClasses[buttonSize]
      } ${className} ${
        disabled
          ? "cursor-not-allowed opacity-50 disabled:hover:ring-0 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-500"
          : ""
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
