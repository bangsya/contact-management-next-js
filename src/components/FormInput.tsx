import Button from "./Button";
import Input from "./Input";

type InputField = {
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
};

interface FormInputProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: InputField[];
  buttonLabel: string;
  formLabel?: string;
}

export default function FormInput({
  handleSubmit,
  input,
  buttonLabel,
  formLabel,
}: FormInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h1 className="text-center text-2xl font-bold text-blue-900">
        {formLabel}
      </h1>
      {input.map((item, index) => (
        <Input key={index} {...item} />
      ))}
      <Button
        type="submit"
        buttonSize="full"
        className="text-white mt-5 hover:bg-blue-600 transition-all duration-200 hover:ring-2 hover:ring-blue-200"
        onClick={() => handleSubmit}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
