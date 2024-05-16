import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Cookies from "js-cookie";

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    try {
      if(auth) return

      const usernameCookie = Cookies.get("auth-invoice-username");
      const companyCookie = Cookies.get("auth-invoice-company");
      const tokenCookie = Cookies.get("auth-invoice-accessToken");
  
      if (!usernameCookie || !tokenCookie || !companyCookie) return navigate('/login')
      
      setAuth({
        username: usernameCookie,
        company: JSON.parse(companyCookie),
        accessToken: tokenCookie,
      });
  
    } catch (error) {
      console.log(error);
    }
  
  }, [auth])

  return <Outlet />
};

export default RequireAuth;
