import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Form from "./components/Form";
import useInputData from "./hooks/useInputData";
import RestartPassword from "./components/RestartPassword";

const LoginIndex = () => {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState(null);

  const { username, password, HandleChangeUsername, HandleChangePassword } =
    useInputData();

  const { setAuth } = useAuth();

  async function HandleLogin(e) {
    e.preventDefault();
    setErrMsg(null);
    if (username === "" || password === "")
      return setErrMsg("Campos faltantes");

    await axios
      .post("user/auth", {
        username: username.toUpperCase(),
        password: password,
      })
      .then(async (res) => {
        if (!res?.data?.isActive) return setErrMsg("Cuenta desactivada");

        setAuth({
          username: username,
          company: res.data?.company,
          roles: res.data?.roles,
          access: res.data?.access,
          accessToken: res.data?.accessToken,
        });

        HandleSetCookie({
          username: username,
          company: res.data?.company,
          roles: res.data?.roles,
          access: res.data?.access,
          accessToken: res.data?.accessToken,
        });

        setJwtCookie(res.data?.refreshToken);

        navigate("/", { replace: true });
      })
      .catch((error) => {
        if (error?.message === "Network Error") {
          setErrMsg("No server response");
        } else if (error?.response?.status === 401) {
          setErrMsg("Usuario o contraseña incorrecta");
        } else {
          console.error(error);
          setErrMsg("Error inesperado");
        }
      });
  }

  function setJwtCookie(refreshToken) {
    return Cookies.set("jwt", `${refreshToken}`, {
      expires: 7,
    });
  }

  function HandleSetCookie({ username, roles, access, company, accessToken }) {
    Cookies.set("auth-invoice-username", `${username}`, {
      expires: 1,
    });
    Cookies.set("auth-invoice-roles", `${JSON.stringify({ roles })}`, {
      expires: 1,
    });
    Cookies.set("auth-invoice-access", `${JSON.stringify({ access })}`, {
      expires: 1,
    });
    Cookies.set(
      "auth-invoice-company",
      `${JSON.stringify({ id: company?.id, name: company?.name })}`,
      {
        expires: 1,
      }
    );
    Cookies.set("auth-invoice-accessToken", `${accessToken}`, {
      expires: 1,
    });
  }

  useEffect(() => {
    try {
      const usernameCookie = Cookies.get("auth-invoice-username");
      const companyCookie = Cookies.get("auth-invoice-company");
      const tokenCookie = Cookies.get("auth-invoice-accessToken");
      const rolesCookie = Cookies.get("auth-invoice-roles");

      if (!usernameCookie || !tokenCookie || !companyCookie || !rolesCookie)
        return;

      setAuth({
        username: usernameCookie,
        roles: JSON.parse(rolesCookie)?.roles,
        company: JSON.parse(companyCookie),
        accessToken: tokenCookie,
      });

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Form
        HandleLogin={HandleLogin}
        errMsg={errMsg}
        username={username}
        HandleChangeUsername={HandleChangeUsername}
        password={password}
        HandleChangePassword={HandleChangePassword}
      />
    </>
  );
};

export default LoginIndex;
