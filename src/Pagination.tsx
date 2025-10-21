import { useEffect, useRef, useState, type FC } from "react";
import PaginationComponent from "./components/PaginationTable";
import type { Data } from "./types/data";
import { generateData } from "./apis/getData";

const Pagination: FC = () => {
  const PAGE_SIZE = 10;
  const [data, setData] = useState<Data[]>([]);
  const [sliceData, setSliceData] = useState<Data[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [clicked, setClicked] = useState(false);
  // const btnRef = useRef<HTMLButtonElement>(null!);
  useEffect(() => {
    (async () => {
      const data: Data[] = await generateData();
      setData(data);
      setSliceData(data.slice(0, PAGE_SIZE));
    })();
  }, []);
  // useEffect(() => {
  //   if (clicked) {
  //     btnRef.current?.focus();
  //   }
  // }, [clicked]);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const goToPage = (page: number): void => {
    // setClicked((prev) => !prev);
    // setClicked(true);
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setSliceData(data.slice(start, end));
    setCurrentPage(page);
  };
  return (
    <PaginationComponent
      data={sliceData}
      totalPages={totalPages}
      goToPage={goToPage}
      currentPage={currentPage}
      // btnRef={btnRef}
    />
  );
};
export default Pagination;
