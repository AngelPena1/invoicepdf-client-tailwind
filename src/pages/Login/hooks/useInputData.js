import { useState } from "react";

const useInputData = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState({
    change_password: "",
    confirmPassword: "",
  });

  const [accessToken, setAccessToken] = useState("");

  function HandleAccessToken(value) {
    return setAccessToken(value);
  }

  function HandleChangeInput(e) {
    const { name, value } = e.target;
    const isCredentials = name === "username" || name === "password";
    const isNewPassword =
      name === "change_password" || name === "confirmPassword";

    if (isCredentials) return setCredentials({ ...credentials, [name]: value });

    if (isNewPassword) return setNewPassword({ ...newPassword, [name]: value });
  }

  function ResetValues() {
    setCredentials({
      username: "",
      password: "",
    });
    setNewPassword({
      change_password: "",
      confirmPassword: "",
    });

    return null;
  }

  return {
    credentials,
    newPassword,
    accessToken,
    ResetValues,
    HandleChangeInput,
    HandleAccessToken,
  };
};

export default useInputData;
