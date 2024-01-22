import React from "react";

const HomeForm = () => {
  return (
    <section>
      <section className="mt-8 mb-20">
        <h2 className="text-3xl text-center font-bold">Crear cotización</h2>
      </section>
      <div className="grid grid-cols-2 gap-28">
        <section className="">
          <section className="mb-8">
            <div className="">
              <h2 className="text-2xl inline-block mr-5">Datos del Negocio</h2>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-8">
            <div>
              <label htmlFor="">Nombre del Cliente</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Razón Social</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">RNC</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Teléfono</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Teléfono 2</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Dirreción</label>
              <input type="text" />
            </div>
          </section>
        </section>
        <section>
          <section className="mb-8">
            <div className="">
              <h2 className="text-2xl inline-block mr-5">Datos del Cliente</h2>
              <select name="" id="">
                <option value="">Prueba</option>
              </select>
              {/* <label htmlFor="">Seleccione el cliente</label> */}
            </div>
          </section>
          <section className="grid grid-cols-2 gap-8">
            <div>
              <label htmlFor="">Nombre del Cliente</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Razón Social</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">RNC</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Teléfono</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Teléfono 2</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Dirreción</label>
              <input type="text" />
            </div>
          </section>
        </section>
      </div>
    </section>
  );
};

export default HomeForm;
