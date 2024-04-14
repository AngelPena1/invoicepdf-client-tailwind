import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import useLogOut from "./useLogout";

const useAxiosPrivate = () => {
  const logout = useLogOut();
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let requestInterceptor;
    let responseInterceptor;

    const setupInterceptors = () => {
      requestInterceptor = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      responseInterceptor = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          if (error.response && [404].includes(error.response.status)) {
            return logout();
          }
          if (
            error.response &&
            [401, 403].includes(error.response.status) &&
            !originalRequest._retry
          ) {
            originalRequest._retry = true;
            try {
              const newAccessToken = await refresh();
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return axiosPrivate(originalRequest);
            } catch (refreshError) {
              return Promise.reject(refreshError);
            }
          }
          return Promise.reject(error);
        }
      );
    };

    setupInterceptors();

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
