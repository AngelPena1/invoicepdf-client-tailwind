import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar/NavbarIndex";
import backgroundApp from '../../assets/background-app.jpg'
// import Config from "../Config";

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
      {auth !== "" ? <img className="fixed -z-10" src={"https://img.freepik.com/free-vector/blue-curve-background_53876-113113.jpg?w=2000&t=st=1715886845~exp=1715887445~hmac=842ef10d8a5849638ed35f9d50a0b0044a9e5d71b911af9707e78cd595a9e3d7"} alt="" /> : <></>}
      {auth !== "" ? <Navbar /> : <></>}
      <div className={auth !== "" ? "relative" : null}>
        <div className="fixed left-3 right-3 top-20 bottom-4 rounded-lg bg-white p-4">
          <Outlet />
          {/* {auth !== "" ? <Config /> : <></>} */}
        </div>
      </div>
    </main>
  );
};

export default LayoutIndex;