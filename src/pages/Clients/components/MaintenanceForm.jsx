import React from "react";

const MaintenanceForm = ({
  inputData,
  HandleInputData,
  HandleCreateClient,
  HandleUpdateClient,
}) => {
  return (
    <form className="grid grid-cols-3 gap-10">
      <section>
        <div className="mb-16">
          <label htmlFor="">Nombre *</label>
          <input
            type="text"
            placeholder="Escriba el nombre..."
            value={inputData?.name}
            onChange={(e) => {
              HandleInputData({ ...inputData, name: e.target.value });
            }}
          />
        </div>
        <div className="mb-16">
          <label htmlFor="">RNC</label>
          <input
            type="text"
            placeholder="Escriba el rnc..."
            value={inputData?.rnc}
            onChange={(e) => {
              HandleInputData({ ...inputData, rnc: e.target.value });
            }}
          />
        </div>
        <div className="mb-16">
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Escriba el email..."
            value={inputData?.email}
            onChange={(e) => {
              HandleInputData({ ...inputData, email: e.target.value });
            }}
          />
        </div>
      </section>
      <section>
        <div className="mb-16">
          <label htmlFor="">Razón Social</label>
          <input
            type="text"
            placeholder="Escriba la razón social..."
            value={inputData?.razon_social}
            onChange={(e) => {
              HandleInputData({ ...inputData, razon_social: e.target.value });
            }}
          />
        </div>
        <div className="mb-16">
          <label htmlFor="">Teléfono 1</label>
          <input
            type="text"
            placeholder="Escriba el teléfono..."
            value={inputData?.phone}
            onChange={(e) => {
              HandleInputData({ ...inputData, phone: e.target.value });
            }}
          />
        </div>
        <div className="mb-16">
          <label htmlFor="">Teléfono 2</label>
          <input
            type="text"
            placeholder="Escriba un segundo teléfono (opcional)"
            value={inputData?.phone_2}
            onChange={(e) => {
              HandleInputData({ ...inputData, phone_2: e.target.value });
            }}
          />
        </div>
      </section>
      <section className="pt-6">
        <button
          type="submit"
          className="bg-primary block w-full"
          onClick={HandleCreateClient}
        >
          Añadir cliente
        </button>
        <button
          type="submit"
          className="block w-full button-2"
          onClick={HandleUpdateClient}
        >
          Guardar cambios
        </button>
      </section>
    </form>
  );
};

export default MaintenanceForm;
