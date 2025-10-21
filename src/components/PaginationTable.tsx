import type { FC, RefObject } from "react";
import type { Data } from "../types/data";
type PaginationProps = {
  data: Data[];
  totalPages: number;
  goToPage: (page: number) => void;
  currentPage: number;
  // btnRef: RefObject<HTMLButtonElement>;
};
const PaginationComponent: FC<PaginationProps> = ({
  data,
  totalPages,
  goToPage,
  currentPage,
  // btnRef,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...");
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
    return pages;
  };
  return (
    <>
      <h2>Pagination Table</h2>
      <button
        style={{ width: "50px", height: "50px", marginRight: 10 }}
        onClick={() => {
          goToPage(currentPage - 1);
        }}
        hidden={currentPage === 1}
      >
        Previous
      </button>
      {getPageNumbers()?.map((page, i) =>
        typeof page === "string" ? (
          <span key={i}>{page}</span>
        ) : (
          <button
            key={i}
            style={{
              width: "50px",
              height: "50px",
              marginRight: 10,
              borderColor: page === currentPage ? "white" : "",
            }}
            onClick={() => {
              goToPage(page);
            }}
          >
            {page}
          </button>
        )
      )}
      <button
        style={{ width: "50px", height: "50px", marginLeft: 10 }}
        onClick={() => {
          goToPage(currentPage + 1);
        }}
        hidden={totalPages === currentPage}
      >
        Next
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ border: "1px solid #ddd", padding: "8px" }}>
            <td>ID</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr key={i} style={{ border: "1px solid #ddd", padding: "8px" }}>
              <td>{row.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default PaginationComponent;
