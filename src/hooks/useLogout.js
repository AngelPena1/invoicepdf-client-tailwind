import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useLogOut = () => {
  const { setAuth } = useAuth();

  const logout = () => {
    setAuth(null);
    Cookies.remove("auth-invoice-username");
    Cookies.remove("auth-invoice-company");
    Cookies.remove("auth-invoice-accessToken");
  };
  return logout;
};

export default useLogOut;
