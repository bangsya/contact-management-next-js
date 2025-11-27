import Image from "next/image";

export default function IconAkun() {
  return (
    <div className="w-10 h-10 bg-slate-200 rounded-full border border-blue-950 flex items-center justify-center">
      <Image src="/icon/user.png" alt="user" width={32} height={32} />
    </div>
  );
}
