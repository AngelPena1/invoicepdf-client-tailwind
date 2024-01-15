import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/user/refresh", {
      withCredentials: true, //this settings allows us to send cookies with our request
    });

    // Cookies.set('social-media-auth', [auth.username, auth.roles, response.data.accessToken], { expires: 7, path: '/' })

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
