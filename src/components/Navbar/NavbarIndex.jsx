import { useState } from "react";
import NavbarForm from "./NavbarForm";
import AccountIndex from "../Modals/Account/AccountIndex";
import { useLocation, Link } from "react-router-dom";

const NavbarIndex = () => {
  const [show, setShow] = useState({
    maintenance: false,
  });

  const location = useLocation();

  function toggleMaintenance(bool) {
    setShow({ ...show, maintenance: bool });
  }

  return <NavbarForm show={show} toggleMaintenance={toggleMaintenance} />;
};

export default NavbarIndex;
