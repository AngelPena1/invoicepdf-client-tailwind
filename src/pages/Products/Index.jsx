import { useEffect } from "react";
import Search from "./components/Search";
import MaintenanceForm from "./components/MaintenanceForm";
import { useParams } from "react-router-dom";
import useInputData from "./hooks/useInputData";
import useTabNavigation from "./hooks/useTabNavigation";
import NavigationBar from "./components/NavigationBar";
import useGetCategories from "./hooks/useGetCategories";
import usePostProduct from "./hooks/usePostProduct";
import useGetProducts from "./hooks/useGetProducts";
import useGetImgProduct from "./hooks/useGetImgProduct";
import ProductsForm from "./components/ProductsForm";
import useSearchProduct from "./hooks/useSearchProduct";

const Index = () => {
  const {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleCategorySelect,
    HandleImageChange,
    HandleEditProduct,
  } = useInputData();

  const { tab: currentTab, HandleChangeTab } = useTabNavigation({
    ResetInputValues,
  });

  const {
    data: categoriesData,
    getOnlyNames,
    HandleSearch: HandleSearchCategories,
  } = useGetCategories();

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
    <section className="pt-32 md:pt-32 xl:px-60 lg:px-40 md:px-20 px-10">
      <NavigationBar
        currentTab={currentTab}
        ResetInputValues={ResetInputValues}
        HandleChangeTab={HandleChangeTab}
      />
      <Search
        result={result}
        inputData={inputData}
        currentTab={currentTab}
        ResetInputValues={ResetInputValues}
        HandleInputData={HandleInputData}
        HandleEditProduct={HandleEditProduct}
        HandleSearchImg={HandleSearchImg}
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
          getOnlyNames={getOnlyNames}
          HandleInputData={HandleInputData}
          HandleCategorySelect={HandleCategorySelect}
          HandleImageChange={HandleImageChange}
          HandleCreateProduct={HandleCreateProduct}
          HandleUpdateProduct={HandleUpdateProduct}
        />
      )}
    </section>
  );
};

export default Index;
