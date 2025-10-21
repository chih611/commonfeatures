import { useEffect, useState, type FC } from "react";
import LazyloadTable from "./components/LazyloadTable";
import type { Data } from "./types/data";
import { generateData } from "./apis/getData";

const Lazyload: FC = () => {
  const PAGE_SIZE = 20;
  const [currentData, setCurrentData] = useState<Data[]>([]);
  const [fetchedData, setFetchedData] = useState<Data[]>([]);
  useEffect(() => {
    (async () => {
      const data: Data[] = await generateData();
      setCurrentData(data.slice(0, PAGE_SIZE));
      setFetchedData(data);
    })();
  }, []);
  const loadMoreData = (): Data[] => {
    const start = currentData.length;
    const end = start + PAGE_SIZE;
    const data: Data[] = fetchedData.slice(start, end);
    setCurrentData((pre) => [...pre, ...data]);
    return data;
  };
  return (
    <>
      <LazyloadTable currentData={currentData} loadMoreData={loadMoreData} />
    </>
  );
};
export default Lazyload;
