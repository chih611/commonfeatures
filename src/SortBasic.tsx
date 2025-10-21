import React, { useState, useMemo, useEffect } from "react";
import type { Data } from "./types/data";
import { generateBigData } from "./apis/bigData";

type Column = {
  id: keyof Data;
  label: string;
};
const TableWithSort: React.FC = () => {
  const [data, setData] = useState<Data[]>([]); // 100k rows
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState<Column[]>([]);
  const rowsPerPage = 10;
  useEffect(() => {
    (() => {
      const data: Data[] = generateBigData(100000);
      setData(data);
      setColumns(
        Object.keys(data[0]).map((key) => ({
          id: key as keyof Data,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        }))
      );
    })();
  }, []);
  // Sorting logic
  const sortedData = useMemo(() => {
    const start = performance.now();
    const sorted = [...data].sort((a, b) => {
      if (a.name < b.name) return sortOrder === "asc" ? -1 : 1;
      if (a.name > b.name) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    const end = performance.now();
    console.log("sortTime:", end - start, "ms");
    return sorted;
  }, [data, sortOrder]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Client-side Sorted Table (Name)</h2>
      <button onClick={toggleSort}>Sort by Name ({sortOrder})</button>

      <table
        border={1}
        cellPadding={5}
        style={{ width: "100%", marginTop: 10 }}
      >
        <thead>
          <tr>
            {columns?.map((c) => (
              <th key={c.id}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, i) => (
            <tr key={i}>
              {columns?.map((c) => (
                <td key={c.id}>{item.name}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button
          onClick={() =>
            setPage((p) => (p * rowsPerPage < sortedData.length ? p + 1 : p))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithSort;
