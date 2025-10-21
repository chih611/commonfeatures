import { v4 as uuidv4 } from "uuid";
import type { Data } from "../types/data";

// Some sample words for random generation
const languages = ["English", "Japanese", "Vietnamese", "Arabic", "French"];
const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
const bios = [
  "Loves coding.",
  "Passionate about design.",
  "Enjoys coffee and React.",
  "Backend wizard.",
  "Frontend explorer.",
  "Tech enthusiast.",
];

// Generates a random item from an array
const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

// Generate N records
export const generateBigData = (count: number): Data[] => {
  const data: Data[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: uuidv4(),
      name: `${randomItem(names)} ${i}`,
      language: randomItem(languages),
      bio: randomItem(bios),
      version: Math.floor(Math.random() * 10) + 1,
    });
  }
  return data;
};
