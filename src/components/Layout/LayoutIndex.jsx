import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar/Index";
// import backgroundApp from '../../assets/background-app.jpg'
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
      {auth !== "" ? (
        <div className="fixed inset-0 bg-new-blue-background overflow-hidden">
          {/* <img
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={
              "https://img.freepik.com/free-vector/blue-curve-background_53876-113113.jpg?w=2000&t=st=1715886845~exp=1715887445~hmac=842ef10d8a5849638ed35f9d50a0b0044a9e5d71b911af9707e78cd595a9e3d7"
            }
            alt=""
          /> */}
        </div>
      ) : null}
      {auth !== "" ? <Navbar /> : null}

      <div className={auth !== "" ? "relative" : ""}>
        <div
          className={
            auth
              ? "fixed inset-20 left-3 right-3 bottom-4 md:left-10 md:right-10 md:bottom-10 shadow-style-2 overflow-auto rounded-lg bg-new-blue-3 p-4"
              : ""
          }
        >
          <Outlet />
          {/* {auth !== "" ? <Config /> : null} */}
        </div>
      </div>
    </main>
  );
};

export default LayoutIndex;
