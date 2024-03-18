import { useEffect } from "react";
import { useState } from "react";

const useSearchProduct = ({ dataArray, searchInput }) => {
  const [result, setResult] = useState([]);

  function HandleSearch() {
    const localArray = [];
    dataArray.forEach((data) => {
      const name = data?.name?.toUpperCase();
      const code = data?.code;
      if (!searchInput) return;
      if (name?.includes(searchInput.toUpperCase()))
        return localArray.push(data);
      if (code?.includes(searchInput)) return localArray.push(data);
    });
    return setResult(localArray);
  }

  useEffect(() => {
    HandleSearch();
    // eslint-disable-next-line
  }, [searchInput]);

  return { result };
};

export default useSearchProduct;
