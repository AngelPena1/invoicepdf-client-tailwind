import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useLogOut = () => {
  const { setAuth } = useAuth();

  const logout = () => {
    setAuth(null);
    Cookies.remove("auth-username");
    Cookies.remove("auth-token");
    Cookies.remove("auth-business");
    Cookies.remove("auth-branches");
    Cookies.remove("auth-isMultibusiness");
  };
  return logout;
};

export default useLogOut;
