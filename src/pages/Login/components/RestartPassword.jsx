import React from "react";

const RestartPassword = ({
  newPassword,
  HandleChangeInput,
  postChangePassword,
}) => {
  return (
    <form className="grid justify-center" action="">
      <div className="relative mb-10 w-44" data-twe-input-wrapper-init>
        <input
          type="password"
          className="peer block min-h-[auto] w-full rounded-none border-0 border-b-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none   [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          id="password"
          name="change_password"
          placeholder="Password"
          value={newPassword?.change_password}
          onChange={HandleChangeInput}
        />
        <label
          htmlFor="password"
          className={
            newPassword?.change_password !== ""
              ? "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out -translate-y-[1.45rem] scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
              : "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
          }
        >
          Inserte una contraseña
        </label>
      </div>
      <div className="relative mb-10 w-44" data-twe-input-wrapper-init>
        <input
          type="password"
          className="peer block min-h-[auto] w-full rounded-none border-0 border-b-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none   [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={newPassword?.confirmPassword}
          onChange={HandleChangeInput}
        />
        <label
          htmlFor="confirm-password"
          className={
            newPassword?.confirmPassword !== ""
              ? "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out -translate-y-[1.45rem] scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
              : "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none "
          }
        >
          Confirme su contraseña
        </label>
      </div>
      <button onClick={postChangePassword} className="w-44 mt-6">
        Cambiar
      </button>
    </form>
  );
};

export default RestartPassword;
