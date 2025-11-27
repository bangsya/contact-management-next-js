export default function LoadingFull() {
  return (
    <section className=" flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    </section>
  );
}
