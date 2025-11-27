import Button from "@/components/Button";

interface PaginationProps {
  totalPage: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPage,
  page,
  onPageChange,
}: PaginationProps) {
  const generatePages = () => {
    const pages = [];

    if (totalPage <= 5) {
      // Jika total page kecil, tampilkan semuanya
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      // Banyak halaman → pakai ellipsis
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPage);
      } else if (page >= totalPage - 2) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPage);
      }
    }
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="paging flex justify-center items-center gap-1">
      <Button
        buttonSize="xs"
        className="text-white"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </Button>
      {pages.map((p, index) =>
        p === "..." ? (
          <Button
            key={index}
            buttonSize="xs"
            className="text-white"
            disabled={true}
          >
            ...
          </Button>
        ) : (
          <Button
            key={index}
            buttonSize="xs"
            className={`text-white ${page === Number(p) ? "bg-blue-900" : ""}`}
            onClick={() => onPageChange(Number(p))}
          >
            {p}
          </Button>
        )
      )}
      <Button
        buttonSize="xs"
        className="text-white"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPage}
      >
        Next
      </Button>
    </div>
  );
}
