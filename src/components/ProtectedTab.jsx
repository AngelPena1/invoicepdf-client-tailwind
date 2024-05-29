import React from "react";
import useAuth from "../hooks/useAuth";

const ProtectedTab = ({ permission, children }) => {
  const { auth } = useAuth();
  const roles = auth?.roles;

  const hasPermission = permission.some((allowed) => roles.includes(allowed));
  
  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedTab;
