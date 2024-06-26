import React from "react";

const LoginForm = (props) => {
  return (
    <section className="grid justify-items-center items-center">
      <form
        onSubmit={props.HandleLogin}
        className="w-96 h-30r bg-white rounded-lg relative top-12 shadow-style-2 overflow-hidden"
      >
        <div className="p-8">
          <h4 className="text-center  font-bold text-2xl mb-16">
            Inicio de sesión
          </h4>
          <div className="mb-12">
            <label htmlFor="user" className="block mb-2 text-sm font-medium">
              Usuario
            </label>
            <input
              type="text"
              id="user"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              placeholder="Escriba su usuario..."
              ref={props.usernameRef}
              required
            />
          </div>
          <div className="mb-12">
            <label
              htmlFor="passwords"
              className="block mb-2 text-sm font-medium"
            >
              Contraseña
            </label>
            <input
              id="passwords"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              placeholder="Escriba su contraseña..."
              autoComplete="off"
              ref={props.passwordRef}
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            Entrar
          </button>
        </div>
        {props.errMsg ? (
          <div className="h-16 rounded-b-lg bg-red-400 text-center grid place-content-center relative top-1 animate-show_up_error">
            <p className="text-white">{props.errMsg}</p>
          </div>
        ) : (
          <></>
        )}
      </form>
      <div className="absolute bottom-5 right-10">
        Powered By: Blue Logistic Services
      </div>
    </section>
  );
};

export default LoginForm;
