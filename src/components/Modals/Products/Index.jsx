import React, { useEffect } from "react";
import Catalog from "./components/Catalog";
import useGetProducts from "./hooks/useGetProducts";
import useToggles from "./hooks/useToggles";
import useGetImgProduct from "./hooks/useGetImgProductsArray";
import useInputData from "./hooks/useInputData";

const Index = ({ onHide, onClick }) => {
  const limit = 5;
  const onClickCatalogHasFunction = onClick ? onClick : null;

  const {
    inputData,
    forceRefresh,
    HandleInputData,
    HandleKeyPress,
    HandleClickFilters,
  } = useInputData();

  const {
    data,
    page,
    setProductsData,
    loading,
    productsData,
    HandlePage,
    HandleSearch,
  } = useGetProducts({
    limit,
    searchProduct: inputData?.search,
    inputData,
  });

  const {
    data: productsImgData,
    alreadyFetch,
    HandleSearch: HandleSearchImg,
    HandleAlreadyFetch,
  } = useGetImgProduct({ productsData, setProductsData });

  const { toggles, toggleFilters } = useToggles();

  useEffect(() => {
    HandleSearch();
    HandleAlreadyFetch(false);
  }, [forceRefresh, page]);

  useEffect(() => {
    if (!productsData.length > 0 || alreadyFetch) return;
    HandleSearchImg();
  }, [productsData]);

  return (
    <Catalog
      data={data}
      limit={limit}
      productsData={productsData}
      productsImgData={productsImgData}
      loading={loading}
      toggles={toggles}
      toggleFilters={toggleFilters}
      inputData={inputData}
      onHide={onHide}
      onClick={onClickCatalogHasFunction}
      HandleKeyPress={HandleKeyPress}
      HandleInputData={HandleInputData}
      HandleClickFilters={HandleClickFilters}
      HandleSearch={() => {
        HandleSearch();
        HandleAlreadyFetch(false);
      }}
      HandlePage={(e) => {
        HandlePage(e);
      }}
    />
  );
};

export default Index;
