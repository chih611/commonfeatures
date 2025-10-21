import type { Data } from "../types/data";

export const generateData = async (): Promise<Data[]> => {
  try {
    const respone = await fetch(
      "https://microsoftedge.github.io/Demos/json-dummy-data/5MB.json"
    );
    if (!respone.ok) throw new Error(`HTTLP error: ${respone.status}`);
    const data: Data[] = await respone.json();
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};
