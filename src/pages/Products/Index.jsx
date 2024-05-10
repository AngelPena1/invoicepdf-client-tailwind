import { useEffect, useRef } from "react";
import Search from "../../components/Searchs/SearchProducts";
import MaintenanceForm from "./components/MaintenanceForm";
import useInputData from "./hooks/useInputData";
import useTabNavigation from "./hooks/useTabNavigation";
import NavigationBar from "./components/NavigationBar";
import useGetGroupWithDivisions from "./hooks/useGetGroupWithDivisions";
import usePostProduct from "./hooks/usePostProduct";
import useGetImgProduct from "./hooks/useGetImgProduct";
import ProductsForm from "./components/ProductsForm";
import useSearchProduct from "./hooks/useSearchProduct";
import useGetProductsLimit from "../../hooks/useGetProductLimit";

const Index = () => {
  const limit = 500;
  const scrollbarRef = useRef(null);

  const {
    data: divisionsData,
    getOnlyNames,
    HandleSearch: HandleSearchCategories,
  } = useGetGroupWithDivisions();

  const {
    inputData,
    ResetInputValues,
    ResetImage,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleEventSearch,
    HandleGroupSelect,
    HandleFinishesSelect,
    HandleCategorySelect,
    HandleSubcategorySelect,
    HandleImageChange,
    HandleEditProduct,
  } = useInputData({ divisionsData });

  const { tab: currentTab, HandleChangeTab } = useTabNavigation({
    ResetInputValues,
  });

  const { resfresh, HandleCreateProduct, HandleUpdateProduct } = usePostProduct(
    {
      data: inputData,
      ResetInputValues,
      CheckForNotEmptyValues,
    }
  );

  const {
    data: productsData,
    loading,
    HandleSearch: HandleSearchProducts,
    HandlePage,
  } = useGetProductsLimit({ limit, searchProduct: inputData?.search });

  const {
    data: imgData,
    loading: loadingImg,
    HandleSearch: HandleSearchImg,
  } = useGetImgProduct();

  const { result } = useSearchProduct({
    dataArray: productsData,
    searchInput: inputData?.search,
  });

  useEffect(() => {
    if (!imgData) return;
    // HandleInputData({ ...inputData, image: imgData?.image });
    // eslint-disable-next-line
  }, [imgData]);

  useEffect(() => {
    HandleSearchCategories();
    HandleSearchProducts();
    // eslint-disable-next-line
  }, [resfresh]);

  return (
    <section className="bg-white p-4 shadow-style-2 rounded-lg">
      <NavigationBar
        currentTab={currentTab}
        ResetInputValues={ResetInputValues}
        HandleChangeTab={HandleChangeTab}
      />
      <Search
        result={result}
        value={inputData?.search}
        onChange={HandleEventSearch}
        onClick={(value) => {
          HandleEditProduct(value);
          HandleChangeTab("create");
          HandleSearchImg(value?.id);
          // HandleInputData({...inputData, search: ""})
        }}
        conditionToShowResults={currentTab !== "default"}
      />
      {currentTab === "default" && (
        <ProductsForm
          loading={loading}
          limit={limit}
          count={productsData?.count}
          productsData={productsData?.rows}
          searchInput={inputData?.search}
          result={result}
          scrollbarRef={scrollbarRef}
          HandleChangeTab={HandleChangeTab}
          HandleEditProduct={HandleEditProduct}
          HandleSearchImg={HandleSearchImg}
          HandlePage={HandlePage}
        />
      )}
      {currentTab === "create" && (
        <MaintenanceForm
          inputData={inputData}
          divisionsData={divisionsData}
          loadingImg={loadingImg}
          onlyNamesGroup={getOnlyNames(divisionsData)}
          onlyNamesFinishes={getOnlyNames(inputData?.finishes)}
          onlyNamesCategories={getOnlyNames(inputData?.categories)}
          onlyNamesSubcategories={getOnlyNames(inputData?.subcategories)}
          getOnlyNames={getOnlyNames}
          ResetImage={ResetImage}
          HandleInputData={HandleInputData}
          HandleGroupSelect={HandleGroupSelect}
          HandleFinishesSelect={HandleFinishesSelect}
          HandleCategorySelect={HandleCategorySelect}
          HandleSubcategorySelect={HandleSubcategorySelect}
          HandleImageChange={HandleImageChange}
          HandleCreateProduct={HandleCreateProduct}
          HandleUpdateProduct={HandleUpdateProduct}
        />
      )}
    </section>
  );
};

export default Index;
