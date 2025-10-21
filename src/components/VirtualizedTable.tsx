// LazyTable.tsx
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import type { Data } from "../types";

const LazyTable: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 100;

  // Fake API fetch
  const fetchData = async (page: number) => {
    await new Promise((r) => setTimeout(r, 300)); // simulate delay
    const newRows = Array.from({ length: pageSize }, (_, i) => ({
      id: `id-${page * pageSize + i}`,
      name: `Name ${page * pageSize + i}`,
      language: ["EN", "JP", "AR", "VN"][i % 4],
      bio: `This is a bio for user ${page * pageSize + i}`,
      version: Math.floor(Math.random() * 10),
    }));
    return newRows;
  };

  useEffect(() => {
    const loadData = async () => {
      const newData = await fetchData(page);
      setData((prev) => [...prev, ...newData]);
      if (newData.length < pageSize) setHasMore(false);
    };
    loadData();
  }, [page]);

  const columns: ColumnDef<Data>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Language", accessorKey: "language" },
    { header: "Bio", accessorKey: "bio" },
    { header: "Version", accessorKey: "version" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: "600px",
        overflowY: "auto",
        border: "1px solid #ddd",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 2fr 1fr",
          fontWeight: "bold",
        }}
      >
        {table.getFlatHeaders().map((header) => (
          <div key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        ))}
      </div>

      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 2fr 1fr",
            borderBottom: "1px solid #eee",
            padding: "4px 0",
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}

      {hasMore ? (
        <div style={{ textAlign: "center", padding: 8 }}>Loading more...</div>
      ) : (
        <div style={{ textAlign: "center", padding: 8 }}>No more data</div>
      )}
    </div>
  );
};

export default LazyTable;
