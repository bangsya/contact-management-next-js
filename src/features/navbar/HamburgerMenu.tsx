export default function HamburgerMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden flex flex-col justify-center items-center w-12 h-9 space-y-1.5 cursor-pointer bg-slate-200 rounded-xl"
      aria-label="Toggle menu"
    >
      <span
        className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
}
