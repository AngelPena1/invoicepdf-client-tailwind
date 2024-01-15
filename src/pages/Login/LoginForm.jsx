import React from "react";

const LoginForm = (props) => {
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={props.HandleLogin}
        className="w-96 h-30r bg-white rounded-lg p-8"
      >
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
          <label htmlFor="passwords" className="block mb-2 text-sm font-medium">
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
      </form>
      <div className="absolute bottom-5 right-10">
        Powered By: Blue Logistic Services
      </div>
    </section>
  );
};

export default LoginForm;
