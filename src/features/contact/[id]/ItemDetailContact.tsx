import { LucideIcon } from "lucide-react";

interface ItemDetailContactProps {
  title: string;
  value: string;
  icon: LucideIcon;
  className?: string;
}

export default function ItemDetailContact({
  title,
  value,
  icon: Icon,
  className,
}: ItemDetailContactProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-xl bg-blue-50 p-3 ">
        <p className="text-sm text-blue-900 flex items-center gap-2">
          <Icon className="h-4 w-4" /> {title}
        </p>
        <p className="font-bold text-blue-900 pl-6">{value}</p>
      </div>
    </div>
  );
}
