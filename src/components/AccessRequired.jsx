import React from "react";
import useAuth from "../hooks/useAuth";

const AccessRequired = ({ isAccessRequired, accessName, children }) => {
  const { auth } = useAuth();
  const access = auth?.access;

  const notHasAccess = !access?.[accessName]
  
  if (isAccessRequired) {
    if(notHasAccess) {
      return null
    }
  }

  return <>{children}</>;
};

export default AccessRequired;
