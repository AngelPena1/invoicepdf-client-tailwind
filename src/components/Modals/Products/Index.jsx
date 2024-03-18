import React, { useEffect, useRef } from "react";
import Catalog from "./components/Catalog";
import useGetProducts from "./hooks/useGetProducts";
import useToggles from "./hooks/useToggles";
// import useGetImgProduct from "./hooks/useGetImgProductsArray";
import useInputData from "./hooks/useInputData";

const Index = ({ onHide, onClick }) => {
  const limit = 50;
  const onClickCatalogHasFunction = onClick ? onClick : null;

  const scrollbarRef = useRef(null)

  const {
    inputData,
    forceRefresh,
    clearInputs,
    HandleInputData,
    HandleKeyPress,
    HandleClickFilters,
  } = useInputData();

  const {
    data,
    page,
    // setProductsData,
    loading,
    productsData,
    HandlePage,
    HandleSearch,
  } = useGetProducts({
    limit,
    searchProduct: inputData?.search,
    inputData,
  });

  // const {
  //   data: productsImgData,
  //   alreadyFetch,
  //   HandleSearch: HandleSearchImg,
  //   HandleAlreadyFetch,
  // } = useGetImgProduct({ productsData, setProductsData });

  const { toggles, toggleFilters } = useToggles();

  useEffect(() => {
    HandleSearch();
    // HandleAlreadyFetch(false);
    // eslint-disable-next-line
  }, [forceRefresh, page]);

  // useEffect(() => {
    // if (!productsData.length > 0 || alreadyFetch) return;
    // HandleSearchImg();
  // }, [productsData]);

  return (
    <Catalog
      data={data}
      limit={limit}
      productsData={productsData}
      // productsImgData={productsImgData} //disabled
      loading={loading}
      toggles={toggles}
      toggleFilters={toggleFilters}
      inputData={inputData}
      scrollbarRef={scrollbarRef}
      clearInputs={clearInputs}
      onHide={onHide}
      onClick={onClickCatalogHasFunction}
      HandleKeyPress={HandleKeyPress}
      HandleInputData={HandleInputData}
      HandleClickFilters={HandleClickFilters}
      HandleSearch={() => {
        HandleSearch();
        // HandleAlreadyFetch(false);
      }}
      HandlePage={(e) => {
        HandlePage(e);
      }}
    />
  );
};

export default Index;
