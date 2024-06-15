import React, { useEffect } from "react";
import axios from "../../../api/axios";

const useChangePassword = ({
  accessToken,
  password,
  confirmPassword,
  ResetValues,
  HandleToggles,
  setErrMsg,
  setSuccessMsg
}) => {
  async function postChangePassword(e) {
    e.preventDefault();

    console.log(password, confirmPassword);
    // if(password.trim() === "") return setErrMsg("Contraseña no valida.")
    if (password !== confirmPassword)
      return setErrMsg("Las contraseñas no coinciden");

    await axios
      .post("user/change-password", {
        accessToken,
        password,
      })
      .then((res) => {
        console.log(res?.status);
        if (res.status === 204) {
          ResetValues()
          HandleToggles('restart_password', false);
          setSuccessMsg("Cambio exitoso, vuelva a iniciar")
        }
      });
  }

  return { postChangePassword };
};

export default useChangePassword;
