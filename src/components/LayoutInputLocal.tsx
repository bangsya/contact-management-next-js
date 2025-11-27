import Link from "next/link";

export default function LayoutInputLocal({
  children,
  label,
  href,
  hrefLabel,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
  hrefLabel: string;
}) {
  return (
    <section className={label}>
      <div className="bg-white rounded-2xl p-5 shadow-md md:w-2xl w-full mx-auto flex flex-col gap-4 justify-center">
        {children}
        <div className="text-center">
          <Link href={href}>
            <span className="text-slate-400 hover:text-blue-950 cursor-pointer">
              Back to {hrefLabel}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
