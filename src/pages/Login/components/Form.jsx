import React from "react";
import facturaLoginImg from "../../../assets/logo_1.png";
import RestartPassword from "./RestartPassword";

const LoginForm2 = ({
  errMsg,
  successMsg,
  credentials,
  newPassword,
  toggles,
  HandleChangeInput,
  HandleLogin,
  postChangePassword,
}) => {
  return (
    <section className="grid justify-center">
      <div className="container h-full mt-14 w-full sm:w-xl sm:border-2 sm:rounded-lg sm:shadow-lg">
        <div className="grid justify-center relative overflow-hidden">
          {/* Success message */}
          {successMsg && (
            <div className="h-14 rounded-lg slide-in-top bg-green-400 text-center place-content-center absolute left-0 right-0">
              <p className="text-white">{successMsg}</p>
            </div>
          )}
          {/* Error message */}
          {errMsg && (
            <div className="h-14 rounded-lg slide-in-top bg-red-400 text-center place-content-center absolute left-0 right-0">
              <p className="text-white">{errMsg}</p>
            </div>
          )}
          <div className="grid justify-center mb-24 mt-28">
            <img src={facturaLoginImg} className="w-32" alt="logo" />
          </div>
          <div className="w-full">
            {!toggles?.restart_password ? (
              <form onSubmit={HandleLogin}>
                <div className="relative mb-10 " data-twe-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded-none border-0 border-b-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="username"
                    name="username"
                    placeholder="Email address"
                    value={credentials?.username}
                    onChange={HandleChangeInput}
                  />
                  <label
                    htmlFor="username"
                    className={
                      credentials?.username !== ""
                        ? "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out -translate-y-[1.45rem] scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                        : "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    }
                  >
                    Usuario
                  </label>
                </div>
                {/* Password input */}
                <div className="relative mb-16" data-twe-input-wrapper-init>
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded-none border-0 border-b-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none   [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={credentials?.password}
                    onChange={HandleChangeInput}
                  />
                  <label
                    htmlFor="password"
                    className={
                      credentials?.password !== ""
                        ? "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out -translate-y-[1.45rem] scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                        : "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    }
                  >
                    Contraseña
                  </label>
                </div>
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Iniciar sesión
                </button>
              </form>
            ) : (
              <RestartPassword 
                newPassword={newPassword}
                HandleChangeInput={HandleChangeInput}
                postChangePassword={postChangePassword}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm2;
