import { useEffect, useState, type FC } from "react";
import type { Data } from "./types/data";
import { generateData } from "./apis/getData";
type Column = {
  id: keyof Data;
  label: string;
  visible: boolean;
};
const ConfigTableColumns: FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  useEffect(() => {
    (async () => {
      const data = await generateData();
      setColumns(
        Object.keys(data[0]).map((key) => ({
          id: key as keyof Data,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          visible: true,
        }))
      );
      setData(data);
    })();
  }, []);
  const visibleColumns: Column[] = columns.filter((c) => c.visible);
  const handleVisibleColumns = (id: keyof Data): void => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === id ? { ...col, visible: !col.visible } : col
      )
    );
  };
  return (
    <div style={{ marginBottom: 10 }}>
      <h1>Config Table Columns</h1>
      {columns?.map((col) => (
        <label key={col.id}>
          <input
            type="checkbox"
            checked={col.visible}
            onChange={() => handleVisibleColumns(col.id)}
          />
          {col.label}
        </label>
      ))}

      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {visibleColumns?.map((col) => (
              <td key={col.id} style={{ border: "1px solid #ccc" }}>
                {" "}
                {col.id}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr key={i}>
              {visibleColumns?.map((col) => (
                <td key={col.id} style={{ border: "1px solid #ccc" }}>
                  {row[col.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ConfigTableColumns;
