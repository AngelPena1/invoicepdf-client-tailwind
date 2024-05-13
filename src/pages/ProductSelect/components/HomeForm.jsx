import React from "react";
import Select from "../../../components/Select/Index";

const HomeForm = ({
  clientsData,
  companyInputData,
  clientInputData,
  HandleInputData,
  HandleDataClient,
  HandleChangeTab
}) => {
  return (
    <section className="bg-white p-8 rounded-lg">
      <section className="mt-8 mb-20">
        <h2 className="text-3xl text-center font-bold">Información General</h2>
      </section>
      <div className="grid grid-cols-2 gap-28">
        <section className="">
          <section className="mb-8 h-16">
            <div className="">
              <h2 className="text-2xl inline-block mr-5">Datos del Negocio</h2>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-8">
            <div>
              <label htmlFor="">Razón Social</label>
              <input
                type="text"
                value={companyInputData?.name}
                onChange={(e) => {
                  HandleInputData({
                    type: "company",
                    value: { ...companyInputData, name: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">RNC</label>
              <input
                type="text"
                value={companyInputData?.rnc}
                onChange={(e) => {
                  HandleInputData({
                    type: "company",
                    value: { ...companyInputData, rnc: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={companyInputData?.email}
                onChange={(e) => {
                  HandleInputData({
                    type: "company",
                    value: { ...companyInputData, email: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Teléfono</label>
              <input
                type="text"
                value={companyInputData?.phone_1}
                onChange={(e) => {
                  HandleInputData({
                    type: "company",
                    value: { ...companyInputData, phone_1: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Teléfono 2</label>
              <input
                type="text"
                value={companyInputData?.phone_2}
                onChange={(e) => {
                  HandleInputData({
                    type: "company",
                    value: { ...companyInputData, phone_2: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Dirección</label>
              <input
                type="text"
                value={companyInputData?.address}
                onChange={(e) => {
                  HandleInputData({
                    type: "company",
                    value: { ...companyInputData, address: e.target.value },
                  });
                }}
              />
            </div>
          </section>
        </section>
        <section>
          <section className="mb-8 h-16">
            <div className="grid grid-cols-2">
              <h2 className="text-2xl inline-block mr-5">Datos del Cliente</h2>
              <Select 
                className="" 
                elements={clientsData}
                onClick={HandleDataClient}
              />
              {/* <label htmlFor="">Seleccione el cliente</label> */}
            </div>
          </section>
          <section className="grid grid-cols-2 gap-8">
            <div>
              <label htmlFor="">Nombre del Cliente</label>
              <input
                type="text"
                value={clientInputData?.name}
                onChange={(e) => {
                  HandleInputData({
                    type: "client",
                    value: { ...clientInputData, name: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Razón Social</label>
              <input
                type="text"
                value={clientInputData?.razon_social}
                onChange={(e) => {
                  HandleInputData({
                    type: "client",
                    value: { ...clientInputData, razon_social: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">RNC</label>
              <input
                type="text"
                value={clientInputData?.rnc}
                onChange={(e) => {
                  HandleInputData({
                    type: "client",
                    value: { ...clientInputData, rnc: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Teléfono</label>
              <input
                type="text"
                value={clientInputData?.phone_1}
                onChange={(e) => {
                  HandleInputData({
                    type: "client",
                    value: { ...clientInputData, phone_1: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Teléfono 2</label>
              <input
                type="text"
                value={clientInputData?.phone_2}
                onChange={(e) => {
                  HandleInputData({
                    type: "client",
                    value: { ...clientInputData, phone_2: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Dirección</label>
              <input
                type="text"
                value={clientInputData?.address}
                onChange={(e) => {
                  HandleInputData({
                    type: "client",
                    value: { ...clientInputData, address: e.target.value },
                  });
                }}
              />
            </div>
          </section>
        </section>
      </div>
      <section className="flex justify-end mt-20">
        <button className="px-4 "
          onClick={() => {
            HandleChangeTab("products")
          }}
        >Siguiente</button>
      </section>
    </section>
  );
};

export default HomeForm;
