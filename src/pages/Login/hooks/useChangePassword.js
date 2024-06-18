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
  

  function isValidPwd(pwd1, pwd2) {

    if(!pwd1 || !pwd2) {
      setErrMsg("La contraseña no es válida");
      return false
    }

    if(pwd1.trim() === "" || pwd2.trim() === "") {
      setErrMsg("La contraseña no es válida");
      return false
    }
    
    if(pwd1 !== pwd2) {
      setErrMsg("Las contraseñas no coinciden");
      return false
    }

    return true
  }

  async function postChangePassword(e) {
    e.preventDefault();

    if(!isValidPwd(password, confirmPassword)) return
    
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
          setSuccessMsg("Cambio exitoso, vuelva a iniciar sesión")
        }
      });
  }

  return { postChangePassword };
};

export default useChangePassword;
