import { useEffect } from "react";
import { useState } from "react";

const useSearchClient = ({ dataArray, searchInput }) => {
  const [result, setResult] = useState([]);

  function HandleSearch() {
    const localArray = [];
    dataArray.forEach((data) => {
      const name = data?.name?.toUpperCase();
      const phone = data?.phone;
      if (!searchInput) return;
      if (name?.includes(searchInput.toUpperCase()))
        return localArray.push(data);
      if (phone?.includes(searchInput)) return localArray.push(data);
    });
    return setResult(localArray);
  }

  useEffect(() => {
    HandleSearch();
  }, [searchInput]);

  return { result };
};

export default useSearchClient;
