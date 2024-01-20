import { useState } from "react";
import NavbarForm from "./NavbarForm";
import BusinessModal from "../Modals/Business/Index";
import { useLocation, Link } from "react-router-dom";

const NavbarIndex = () => {
  const [show, setShow] = useState({
    maintenance: false,
  });

  const location = useLocation();

  function toggleMaintenance(bool) {
    setShow({ ...show, maintenance: bool });
  }

  return (
    <>
      <NavbarForm show={show} toggleMaintenance={toggleMaintenance} />
      <BusinessModal />
    </>
  );
};

export default NavbarIndex;
