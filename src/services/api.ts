import searches from "../db.json";

export type Search = {
  id: number;
  title: string;
};

export const filterData = (query: string): Promise<Search[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredData = searches.filter((search) => {
        return search.title.toLowerCase().includes(query.toLowerCase().trim());
      });
      resolve(filteredData);
    }, 500);
  });
}