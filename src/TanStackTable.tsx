import { useEffect, useMemo, useState, type FC } from "react";
import type { Data } from "./types/data";
import { generateData } from "./apis/getData";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

const TanStackTable: FC = () => {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    (async () => {
      setData(await generateData());
    })();
  });
  const columns: ColumnDef<Data>[] = useMemo(() => {
    const key = Object.keys(data[0] || []);
    return key.map((key) => ({
      accessorKey: key,
      header: key.toUpperCase(),
      cell: (info) => String(info.getValue()),
    }));
  }, [data]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  return (
    <div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ border: "solid 1px white" }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} style={{ border: "solid 1px white" }}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ border: "solid 1px white" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TanStackTable;
