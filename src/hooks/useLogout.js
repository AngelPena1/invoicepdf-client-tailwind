import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useLogOut = () => {
  const { setAuth } = useAuth();

  const logout = () => {
    setAuth("");
    Cookies.remove("auth-invoice-username");
    Cookies.remove("auth-invoice-roles");
    Cookies.remove("auth-invoice-access");
    Cookies.remove("auth-invoice-company");
    Cookies.remove("auth-invoice-accessToken");
    Cookies.remove("jwt");
  };
  return logout;
};

export default useLogOut;
