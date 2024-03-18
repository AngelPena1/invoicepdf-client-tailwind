import React from "react";
import { faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BusinessForm = ({
  inputData,
  loading_image,
  HandleInputData,
  HandleImageChange,
  HandleUpdateClient,
  toggleCompanyInfo,
}) => {
  const noImageFound =
    inputData?.image === "" || inputData?.image === null || !inputData?.image;
  return (
    <>
      <div
        id="background"
        className="w-screen h-screen bg-slate-500 opacity-40 fixed z-40 inset-0 flex litems-center justify-center"
        onClick={() => {
          toggleCompanyInfo(false);
        }}
      ></div>
      <form className="w-xl md:w-2xl lg:w-4xl h-fit rounded-lg bg-white fixed left-0 right-0 top-0 bottom-0 m-auto z-40 p-5">
        <section className="w-72 h-44 mx-auto mb-20 relative">
          {!noImageFound && !loading_image && (
            <>
              <img
                src={inputData?.image}
                alt=""
                className="w-full h-full rounded-lg"
              />
              <FontAwesomeIcon
                icon={faX}
                className="absolute top-0 -right-7 cursor-pointer"
                onClick={() => {
                  HandleInputData({ ...inputData, image: null });
                }}
              />
            </>
          )}

          {loading_image && (
            <div className="w-60 h-44 rounded-lg skeleton"></div>
          )}

          {noImageFound && !loading_image && (
            <div className="w-60 h-44">
              <label
                className="bg-slate-200 h-full w-60 rounded-lg grid justify-center items-center cursor-pointer"
                htmlFor="img-input"
              >
                <FontAwesomeIcon
                  icon={faImages}
                  className="text-5xl m-auto relative top-5 "
                />
                <label htmlFor="">Haga click para insertar el logo</label>
              </label>
              <input
                type="file"
                name=""
                id="img-input"
                className="hidden"
                onChange={HandleImageChange}
              />
            </div>
          )}
        </section>
        <section className="grid grid-cols-3 gap-8">
          <div>
            <label htmlFor="">Razón Social</label>
            <input
              type="text"
              value={inputData?.name}
              onChange={(e) => {
                HandleInputData({ ...inputData, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="">RNC</label>
            <input
              type="text"
              value={inputData?.rnc}
              onChange={(e) => {
                HandleInputData({ ...inputData, rnc: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={inputData?.email}
              onChange={(e) => {
                HandleInputData({ ...inputData, email: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="">Teléfono 1</label>
            <input
              type="text"
              value={inputData?.phone_1}
              onChange={(e) => {
                HandleInputData({ ...inputData, phone_1: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="">Teléfono 2</label>
            <input
              type="text"
              value={inputData?.phone_2}
              onChange={(e) => {
                HandleInputData({ ...inputData, phone_2: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="">Dirección</label>
            <input
              type="text"
              value={inputData?.address}
              onChange={(e) => {
                HandleInputData({ ...inputData, address: e.target.value });
              }}
            />
          </div>
        </section>
        <section className="flex justify-end mt-14">
          <button type="button" className="px-2 button-2" onClick={() => {
            toggleCompanyInfo(false)
          }}>
            Descartar Cambios
          </button>
          <button
            type="submit"
            className="px-2 ml-4 bg-primary"
            onClick={HandleUpdateClient}
          >
            Guardar Cambios
          </button>
        </section>
      </form>
    </>
  );
};

export default BusinessForm;
