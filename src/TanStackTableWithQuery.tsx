import { useInfiniteQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, type FC } from "react";
import type { Data } from "./types/data";
import { generateData } from "./apis/getData";

type DataApiResponse = {
  data: Data[];
  meta: { totalRowCount: number };
};
const TanStackTableWithQuery: FC = () => {
  const pageSize = 20;
  const { data, fetchNextPage, isLoading, isFetched } =
    useInfiniteQuery<DataApiResponse>({
      queryKey: ["data"],
      queryFn: async ({ pageParam = 0 }) => {
        const fetchedData = await generateData();
        const start = (pageParam as number) * pageSize;
        const chunkData = fetchedData.slice(start, start + pageSize);
        return {
          data: chunkData,
          meta: { totalRowCount: fetchedData.length },
        };
      },
      initialPageParam: 0,
      getNextPageParam: (_lastGroup, groups) => groups.length,
    });
  const flatData = useMemo(() => {
    return data?.pages?.flatMap((page) => page.data || []);
  }, [data]);
  const columns = useMemo<ColumnDef<Data>[]>(() => {
    const key = Object.keys(flatData?.[0] ?? {});
    return key.map((key) => ({
      accessorKey: key,
      header: key.toUpperCase(),
      cell: (info) => String(info.getValue()),
    }));
  }, [flatData]);
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: flatData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();
  isLoading && <p>Loading...</p>;
  return (
    <div style={{ height: "600px", overflow: "auto" }}>
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
                  ....
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ border: "solid 1px white" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  .....
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TanStackTableWithQuery;
