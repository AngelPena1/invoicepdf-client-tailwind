import { useEffect, useState } from "react";

const usePage = ({ maxPages }) => {
  const [page, setPage] = useState(0);
  const [signByPage, setSignByPage] = useState([]);

  function createArray(length) {
    return new Array(length).fill(null).map(() => false);
  }

  function HandleSetSignInPage(index, bool) {
    let localArray = signByPage.map((element, localIndex) => {
      if (index !== localIndex) return element;
      return bool;
    });
    setSignByPage(localArray);
  }

  function leftPage() {
    if (page > 0) return setPage(page - 1);
  }

  function rightPage() {
    if (page + 1 < maxPages) return setPage(page + 1);
  }

  useEffect(() => {
    return setSignByPage(createArray(maxPages))
  }, [maxPages])
  return { page, signByPage, leftPage, rightPage, HandleSetSignInPage };
};

export default usePage;
