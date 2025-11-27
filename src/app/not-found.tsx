// app/not-found.tsx
import Button from "@/components/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-[calc(100vh-160px)] w-full flex items-center justify-center bg-white px-6 rounded-2xl">
      <div className="w-full max-w-xl text-center flex flex-col items-center">
        {/* SVG + 404 side by side */}
        <div className="flex items-center gap-6 mb-8">
          {/* SVG Aesthetic Illustration */}
          <svg width="200" height="200" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>

              <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="12"
                  floodOpacity="0.12"
                />
              </filter>
            </defs>

            {/* Circle Background */}
            <circle
              cx="200"
              cy="200"
              r="120"
              fill="url(#grad)"
              opacity="0.15"
            />

            {/* Document Card */}
            <rect
              x="135"
              y="110"
              width="130"
              height="180"
              rx="16"
              fill="#fff"
              stroke="#e5e7eb"
              strokeWidth="2"
              filter="url(#shadow)"
            />

            <rect
              x="160"
              y="150"
              width="80"
              height="10"
              rx="4"
              fill="#e5e7eb"
            />
            <rect
              x="160"
              y="175"
              width="55"
              height="10"
              rx="4"
              fill="#e5e7eb"
            />
            <rect
              x="160"
              y="200"
              width="95"
              height="10"
              rx="4"
              fill="#e5e7eb"
            />

            {/* Magnifying Glass */}
            <g transform="translate(230,240) rotate(-20)">
              <circle cx="0" cy="0" r="22" fill="url(#grad)" opacity="0.9" />
              <rect
                x="20"
                y="20"
                width="70"
                height="8"
                rx="4"
                transform="rotate(45 20 20)"
                fill="#cbd5e1"
              />
            </g>
          </svg>

          {/* 404 Text */}
          <h1 className="text-6xl font-extrabold text-blue-700 select-none">
            404
          </h1>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-blue-600">
          Halaman Tidak Ditemukan
        </h1>

        {/* Desc */}
        <p className="mt-3 text-sm text-slate-600 max-w-md">
          Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>

        {/* Button */}
        <Link href="/" className="mt-8">
          <Button
            className="text-white rounded-xl bg-blue-900 hover:bg-blue-800"
            buttonSize="md"
          >
            Kembali ke Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
