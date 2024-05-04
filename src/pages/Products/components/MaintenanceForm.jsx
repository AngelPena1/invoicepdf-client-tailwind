import { faImage, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../../../components/Select/Index";

function MaintenanceForm({
  inputData,
  loadingImg,
  onlyNamesBranch,
  HandleFinishesSelect,
  onlyNamesCategories,
  onlyNamesFinishes,
  onlyNamesSubcategories,
  HandleInputData,
  HandleBrandSelect,
  HandleCategorySelect,
  HandleSubcategorySelect,
  HandleImageChange,
  HandleCreateProduct,
  HandleUpdateProduct,
}) {
  return (
    <section className="grid xl:grid-cols-3 lg:grid-cols-2 xl:gap-24 lg:gap-10 bg-white p-2 rounded-lg">
      <section className="">
        <div className="mb-10">
          <label htmlFor="" className="text-base">
            Descripción del producto
          </label>
          <textarea
            type="text"
            placeholder="Escriba una breve descripción del producto..."
            className="w-full"
            autoComplete="off"
            value={inputData?.description}
            onChange={(e) => {
              HandleInputData({
                ...inputData,
                description: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <label htmlFor="" className="text-base">
              Marca
            </label>
            <Select
              value={inputData?.brand_id}
              value_id={true}
              onClick={HandleBrandSelect}
              elements={onlyNamesBranch}
            />
          </div>
          <div>
            <label htmlFor="" className="text-base">
              Categoría
            </label>
            <Select
              value={inputData?.category_id}
              value_id={true}
              onClick={HandleCategorySelect}
              elements={onlyNamesCategories}
            />
          </div>
          <div>
            <label htmlFor="" className="text-base">
              Subcategoría
            </label>
            <Select
              value={inputData?.subcategory_id}
              value_id={true}
              onClick={HandleSubcategorySelect}
              elements={onlyNamesSubcategories}
            />
          </div>
        </div>
        <div className="grid">
          <label htmlFor="" className="text-base">
            Acabados
          </label>
          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              className="h-11"
              placeholder="Código del acabado..."
              value={inputData?.finishes_code}
              disabled
            />
            <Select
              value={inputData?.finishes_id}
              value_id={true}
              onClick={HandleFinishesSelect}
              elements={onlyNamesFinishes}
            />
          </div>
        </div>
      </section>
      <section className="grid">
        <div className="mb-8 relative">
          <label htmlFor="" className="text-base">
            Imagen del producto (opcional)
          </label>
          {!inputData?.image && !loadingImg && (
            <div className="grid place-content-center text-center">
              <label
                htmlFor="input-img"
                className="w-60 h-60 bg-transparent border-2 border-dashed border-slate-300 rounded-lg grid place-content-center place-items-center cursor-pointer"
                accept=".jpg, .png"
              >
                <FontAwesomeIcon icon={faImage} className="text-3xl mb-4" />
                Haga click aquí para seleccionar la imagen
              </label>
              <input
                id="input-img"
                type="file"
                className="hidden"
                onChange={HandleImageChange}
              />
            </div>
          )}
          {loadingImg && (
            <div
              id="img-skeleton"
              className="w-60 h-60 rounded-lg skeleton m-auto"
            />
          )}
          {inputData?.image && (
            <div className="grid place-content-center">
              <FontAwesomeIcon
                icon={faX}
                className="absolute right-5 top-10 cursor-pointer"
                onClick={() => {
                  HandleInputData({
                    ...inputData,
                    image: null,
                  });
                }}
              />
              <img
                src={inputData?.image}
                alt=""
                className="w-60 h-60 object-cover bg-center rounded-lg grid place-content-center place-items-center cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="mb-10">
          <label className="text-base mb-6">Seleccione el tamaño (opcional)</label>
          <div className="grid grid-cols-3">
            <button
              className={
                inputData?.image_size === "small"
                  ? "button-2 bg-primary text-white"
                  : "button-2"
              }
              type="button"
              value={"small"}
              onClick={(e) => {
                HandleInputData({
                  ...inputData,
                  image_size: e.target.value,
                });
              }}
            >
              Pequeño
            </button>
            <button
              className={
                inputData?.image_size === "medium"
                  ? "button-2 bg-primary text-white"
                  : "button-2"
              }
              type="button"
              value={"medium"}
              onClick={(e) => {
                HandleInputData({
                  ...inputData,
                  image_size: e.target.value,
                });
              }}
            >
              Mediano
            </button>
            <button
              className={
                inputData?.image_size === "large"
                  ? "button-2 bg-primary text-white"
                  : "button-2"
              }
              type="button"
              value={"large"}
              onClick={(e) => {
                HandleInputData({
                  ...inputData,
                  image_size: e.target.value,
                });
              }}
            >
              Grande
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="">
            <label htmlFor="" className="text-base">
              Costo
            </label>
            <input
              type="text"
              placeholder="Inserte el costo..."
              value={inputData?.cost}
              onChange={(e) => {
                HandleInputData({ ...inputData, cost: e.target.value });
              }}
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-base">
              Precio RD
            </label>
            <input
              type="text"
              placeholder="Inserte el precio..."
              value={inputData?.price}
              onChange={(e) => {
                HandleInputData({ ...inputData, price: e.target.value });
              }}
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-base">
              Precio US
            </label>
            <input
              type="text"
              placeholder="Inserte el precio..."
              value={inputData?.price_us}
              onChange={(e) => {
                HandleInputData({ ...inputData, price_us: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="mb-10">
            <label htmlFor="" className="text-base">
              Código del producto
            </label>
            <input
              type="text"
              placeholder="Escriba el código..."
              value={inputData?.product_code}
              onChange={(e) => {
                HandleInputData({
                  ...inputData,
                  product_code: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-10">
            <label htmlFor="" className="text-base">
              Estado
            </label>
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={inputData?.isActive}
                onChange={() => {}}
                onClick={() => {
                  HandleInputData({
                    ...inputData,
                    isActive: !inputData?.isActive,
                  });
                }}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Activado
              </span>
            </label>
          </div>
        </div>
        <div className="grid p-8">
          <button
            type="submit"
            className="bg-primary"
            onClick={HandleCreateProduct}
          >
            Añadir producto
          </button>
          <button
            type="submit"
            onClick={HandleUpdateProduct}
            className="button-2"
          >
            Guardar cambios
          </button>
        </div>
      </section>
    </section>
  );
}

export default MaintenanceForm;
