import { LucideIcon } from "lucide-react";

interface ContactInformationProps {
  icon: LucideIcon;
  identity: string;
  information: string;
}

export default function Information({
  icon: Icon,
  identity,
  information,
}: ContactInformationProps) {
  return (
    <>
      <div className="flex gap-1 items-center ml-2 mb-1">
        <div className="icon">
          <Icon className="w-4 h-4 text-gray-950" />
        </div>
        <p className="text-sm font-medium text-blue-950 w-1/3">{identity}</p>
        <p className="text-sm text-blue-950 w-2/3">{information}</p>
      </div>
    </>
  );
}
