import { useRef, type FC, type UIEventHandler } from "react";
import type { Data } from "../types/data";
type LazyloadTableProps = {
  currentData: Data[];
  loadMoreData: () => Data[];
};
const LazyloadTable: FC<LazyloadTableProps> = ({
  currentData,
  loadMoreData,
}) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const handleScroll: UIEventHandler<HTMLDivElement> = (): void => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) loadMoreData();
  };
  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
        onScroll={handleScroll}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ border: "1px solid #ddd", padding: "8px" }}>
              <td>ID</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, i) => (
              <tr key={i} style={{ border: "1px solid #ddd", padding: "8px" }}>
                <td>{row.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default LazyloadTable;
