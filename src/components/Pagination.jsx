import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  itemsCount,
  itemsPerPage,
  loading,
  hasData,
  disable,
  HandlePage,
  scrollbarRef
}) => {
  const [totalButtons, setTotalButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const HandlePageProp = (e) => {
    if(HandlePage) {
      return HandlePage(e)
    } else {
      return null
    }
  }

  const pageCount = Math.ceil(itemsCount / itemsPerPage) - 1;

  const hasPreviousPage = currentPage <= 0;
  const previousPage = currentPage - 1;

  const nextPage = currentPage + 1;
  const hasNextPage = nextPage >= (pageCount + 1);

  function ClearTotalButtons() {
    if (totalButtons?.length > 0) return setTotalButtons([]);
  }
  function HandlePageClick(event) {
    return setCurrentPage(event);
  }

  function HandlePreviousPage() {
    if (hasPreviousPage) return;
    return setCurrentPage(previousPage);
  }

  function HandleNextPage() {
    if (hasNextPage) return;
    return setCurrentPage(nextPage);
  }

  function ScrollToTop() {
    if(!scrollbarRef) return
    if(scrollbarRef.current) {
      scrollbarRef.current.scrollTop = 0
    }
  }

  // useEffect(() => {
  //   ResetPage();
  // }, [resetPage]);

  useEffect(() => {
    const localButtons = [];

    const maxInPage = 10;
    const itsStartsInCero = 1
    const pageCountExceedMaxInPage = (pageCount + itsStartsInCero) > maxInPage;

    if (pageCountExceedMaxInPage) {
      const middleMaxInPage = maxInPage / 2;
      const userIsBeforeTheMiddle = currentPage < 4;
      const userIsAfterTheMiddle = currentPage + 1 >= middleMaxInPage;
      const userIsBetweenTheMiddle =
        userIsAfterTheMiddle && currentPage < pageCount - middleMaxInPage;

      if (userIsBeforeTheMiddle) {
        for (let index = 0; index <= (middleMaxInPage - 1); index ++) {
          localButtons.push(index);
        }
        localButtons.push("...");
        for (
          let index = pageCount - (middleMaxInPage - 2);
          index <= pageCount;
          index++
        ) {
          localButtons.push(index);
        }
      }

      if (userIsBetweenTheMiddle) {
        for (let index = 0; index < (middleMaxInPage / 2) - 1; index++) {
          localButtons.push(index);
        }
        localButtons.push("...");
        for (let index = currentPage - 1; index < currentPage + 2; index++) {
          localButtons.push(index);
        }
        localButtons.push("... ");
        for (let index = pageCount - 2; index <= pageCount; index++) {
          localButtons.push(index);
        }
      }

      if (currentPage > pageCount - 6) {
        for (let index = 0; index <( middleMaxInPage / 2) - 1; index++) {
          localButtons.push(index);
        }
        localButtons.push("...");
        for (
          let index = pageCount - 6;
          index <= pageCount;
          index++
        ) {
          localButtons.push(index);
        }
      }
    } else {
      for (let index = 0; index <= pageCount; index++) {
        localButtons.push(index);
      }
    }

    ClearTotalButtons();

    setTotalButtons([...new Set(localButtons)]);
    // eslint-disable-next-line
  }, [currentPage, itemsCount]);

  useEffect(() => {
    ScrollToTop()
    HandlePageProp(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <>
      <section className={!loading && hasData && !disable ? "flex" : "hidden"}>
        <button
          className={!hasPreviousPage ? "px-3 bg-primary-2" : "px-3 bg-primary-2"}
          onClick={HandlePreviousPage}
        >
          <FontAwesomeIcon className="" icon={faArrowLeft} />
        </button>
        <div className="">
          {totalButtons?.map((value, index) => {
            if(typeof value !== "string") {
              return (
                <button
                  className={value === currentPage ? "px-3 bg-primary min-w-10" : "px-3 bg-primary-2 min-w-10"}
                  key={index}
                  value={value}
                  onClick={() => {
                    HandlePageClick(value);
                  }}
                >
                  {value + 1}
                </button>
              );
            } else {
              return (
                <button
                  className="min-w-10"
                  key={index}
                  disabled
                >
                  {value}
                </button>
              );
            }
           
          })}
        </div>
        <button
          className={!hasNextPage ? "px-3 bg-primary-2 min-w-10" : "px-3 bg-primary-2 min-w-10"}
          onClick={HandleNextPage}
        >
          <FontAwesomeIcon className="" icon={faArrowRight} />
        </button>
      </section>
    </>
  );
};

export default Pagination;
