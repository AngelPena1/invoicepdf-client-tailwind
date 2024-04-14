import React, { useRef, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginIndex = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState(null);

  const { setAuth } = useAuth();

  async function HandleLogin(e) {
    e.preventDefault();
    setErrMsg(null);
    if (usernameRef.current.value === "" || passwordRef.current.value === "")
      return setErrMsg("Campos faltantes");

    await axios
      .post("user/auth", {
        username: usernameRef.current.value.toUpperCase(),
        password: passwordRef.current.value.toUpperCase(),
      })
      .then(async (res) => {
        if (!res?.data?.isActive) return setErrMsg("Cuenta desactivada");

        setAuth({
          username: usernameRef?.current?.value,
          company: res.data?.company,
          roles: res.data?.roles,
          accessToken: res.data?.accessToken,
        });

        HandleSetCookie({
          username: usernameRef?.current?.value,
          company: res.data?.company,
          roles: res.data?.roles,
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
      expires: 7
    });
  }

  function HandleSetCookie({ username, roles, company, accessToken }) {
    Cookies.set("auth-invoice-username", `${username}`, {
      expires: 1,
    });
    Cookies.set("auth-invoice-roles", `${JSON.stringify({ roles })}`, {
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

      if (!usernameCookie || !tokenCookie || !companyCookie) return;

      setAuth({
        username: usernameCookie,
        // roles:
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
    <LoginForm
      usernameRef={usernameRef}
      passwordRef={passwordRef}
      errMsg={errMsg}
      HandleLogin={HandleLogin}
    />
  );
};

export default LoginIndex;
