import { useEffect } from "react";
import Search from "../../components/Search";
import MaintenanceForm from "./components/MaintenanceForm";
import useInputData from "./hooks/useInputData";
import useTabNavigation from "./hooks/useTabNavigation";
import NavigationBar from "./components/NavigationBar";
import useGetCategories from "./hooks/useGetCategories";
import usePostProduct from "./hooks/usePostProduct";
import useGetProducts from "../../hooks/useGetProducts";
import useGetImgProduct from "./hooks/useGetImgProduct";
import ProductsForm from "./components/ProductsForm";
import useSearchProduct from "./hooks/useSearchProduct";

const Index = () => {
  const {
    data: categoriesData,
    getOnlyNames,
    HandleSearch: HandleSearchCategories,
  } = useGetCategories();

  const {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleEventSearch,
    HandleCategorySelect,
    HandleSubcategorySelect,
    HandleImageChange,
    HandleEditProduct,
  } = useInputData({ categoriesData });

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

  const { data: productsData, HandleSearch: HandleSearchProducts } =
    useGetProducts();

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
    HandleInputData({ ...inputData, image: imgData?.image });
  }, [imgData]);

  useEffect(() => {
    HandleSearchCategories();
    HandleSearchProducts();
  }, [resfresh]);

  return (
    <section className="">
      <NavigationBar
        currentTab={currentTab}
        ResetInputValues={ResetInputValues}
        HandleChangeTab={HandleChangeTab}
      />
      <Search
        result={result}
        value={inputData?.search}
        onChange={HandleEventSearch}
        onClick={(event) => {
          console.log(event.currentTarget.value );
          HandleEditProduct();
          HandleSearchImg();
        }}
        conditionToShowResults={currentTab !== "default"}
      />
      {currentTab === "default" && (
        <ProductsForm
          productsData={productsData}
          searchInput={inputData?.search}
          result={result}
          HandleChangeTab={HandleChangeTab}
          HandleEditProduct={HandleEditProduct}
          HandleSearchImg={HandleSearchImg}
        />
      )}
      {currentTab === "create" && (
        <MaintenanceForm
          inputData={inputData}
          categoriesData={categoriesData}
          loadingImg={loadingImg}
          onlyNamesCategories={getOnlyNames(categoriesData)}
          onlyNamesSubcategories={getOnlyNames(inputData?.subcategories)}
          getOnlyNames={getOnlyNames}
          HandleInputData={HandleInputData}
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
