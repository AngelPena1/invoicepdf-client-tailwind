import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();

  return auth !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login"  />
  );
};

export default RequireAuth;
