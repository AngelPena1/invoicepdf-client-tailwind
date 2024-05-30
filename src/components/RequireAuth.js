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
      const rolesCookie = Cookies.get("auth-invoice-roles");
      const accessCookie = Cookies.get("auth-invoice-access");
  
      if (!usernameCookie || !tokenCookie || !companyCookie || !rolesCookie || !accessCookie) return navigate('/login')
      
      setAuth({
        username: usernameCookie,
        company: JSON.parse(companyCookie),
        roles: JSON.parse(rolesCookie)?.roles,
        access: JSON.parse(accessCookie)?.access,
        accessToken: tokenCookie,
      });
  
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line
  }, [auth])

  return <Outlet />
};

export default RequireAuth;
