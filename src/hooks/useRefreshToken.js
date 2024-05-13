import axios from "../api/axios";
import useAuth from "./useAuth";
import Cookies from "js-cookie";


const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/user/refresh", {
      withCredentials: true,
    });

    Cookies.set("auth-invoice-accessToken", `${response?.data?.accessToken}`, {
      expires: 1,
    });

    Cookies.set("auth-invoice-roles",`${JSON.stringify({ roles: response?.data?.roles })}`, {
      expires: 1,
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response?.data?.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
