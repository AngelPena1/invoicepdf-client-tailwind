import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar/NavbarIndex";
import Config from "../Config";

const LayoutIndex = () => {
  const { auth } = useAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="App">
      <div className={auth !== "" ? "main-container" : null}>
        {auth !== "" ? <Navbar /> : <></>}
        <Outlet />
        {auth !== "" ? <Config /> : <></>}
        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default LayoutIndex;