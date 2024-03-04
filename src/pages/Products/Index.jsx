import { useEffect } from "react";
import Search from "../../components/SearchProducts";
import MaintenanceForm from "./components/MaintenanceForm";
import useInputData from "./hooks/useInputData";
import useTabNavigation from "./hooks/useTabNavigation";
import NavigationBar from "./components/NavigationBar";
import useGetBranchWithDivisions from "./hooks/useGetBranchWithDivisions";
import usePostProduct from "./hooks/usePostProduct";
import useGetProducts from "../../hooks/useGetProducts";
import useGetImgProduct from "./hooks/useGetImgProduct";
import ProductsForm from "./components/ProductsForm";
import useSearchProduct from "./hooks/useSearchProduct";

const Index = () => {
  const {
    data: divisionsData,
    getOnlyNames,
    HandleSearch: HandleSearchCategories,
  } = useGetBranchWithDivisions();

  const {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleEventSearch,
    HandleBrandSelect,
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
  } = useGetProducts();

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
        onClick={(value) => {
          HandleEditProduct(value);
          HandleSearchImg(value?.id);
          // HandleInputData({...inputData, search: ""})
        }}
        conditionToShowResults={currentTab !== "default"}
      />
      {/* <section className="grid place-items-center">
        <div
          className="inline-block h-8 w-8  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </section> */}
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
      {currentTab === "create" && !loading && (
        <MaintenanceForm
          inputData={inputData}
          divisionsData={divisionsData}
          loadingImg={loadingImg}
          onlyNamesBranch={getOnlyNames(divisionsData)}
          onlyNamesFinishes={getOnlyNames(inputData?.finishes)}
          onlyNamesCategories={getOnlyNames(inputData?.categories)}
          onlyNamesSubcategories={getOnlyNames(inputData?.subcategories)}
          getOnlyNames={getOnlyNames}
          HandleInputData={HandleInputData}
          HandleBrandSelect={HandleBrandSelect}
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
