import type { Data } from "../types/data";
import { generateData } from "./getData";

export type DataApiResponse = {
  data: Data[];
  meta: {
    totalRowCount: number;
  };
};
//simulates a backend api
export const fetchData = async (
  start: number,
  size: number
  // sorting: SortingState
) => {
  const dbData = await generateData();
  return {
    data: dbData.slice(start, start + size),
    meta: {
      totalRowCount: dbData.length,
    },
  };
};

export default fetchData;
