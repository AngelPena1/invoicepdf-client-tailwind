import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar/NavbarIndex";
// import Footer from "../Footer/FooterIndex";
// import Sidebar from "../Sidebar/Index";

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
      <div className={auth !== null ? "main-container" : null}>
        {auth !== null ? <Navbar />: <></>}
        <Outlet />
        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default LayoutIndex;