import { useEffect } from "react";
import { useState } from "react";

const useSearchProduct = ({ dataArray, searchInput }) => {
  const [result, setResult] = useState([]);
  
  function HandleSearch() {
    const localArray = [];
    if (!dataArray) return null;
    if (!(dataArray?.rows?.length > 0)) return null;
    dataArray?.rows?.forEach((data) => {
      const description = data?.description?.toUpperCase();
      const code = data?.code;
      if (!searchInput) {
        return;
      }
      if (description?.includes(searchInput.toUpperCase())) {
        return localArray.push(data);
      }
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
