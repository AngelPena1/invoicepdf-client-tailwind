import { useState } from "react";
import NavbarForm from "./NavbarForm";
import BusinessModal from "../Modals/Business/Index";
const NavbarIndex = () => {
  const [show, setShow] = useState({
    maintenance: false,
    company_info: false,
  });

  function toggleMaintenance(bool) {
    setShow({ ...show, maintenance: bool });
  }

  function toggleCompanyInfo(bool) {
    setShow({ ...show, company_info: bool });
  }

  return (
    <>
      <NavbarForm
        show={show}
        toggleMaintenance={toggleMaintenance}
        toggleCompanyInfo={toggleCompanyInfo}
      />
      {show?.company_info && (
        <BusinessModal toggleCompanyInfo={toggleCompanyInfo} />
      )}
    </>
  );
};

export default NavbarIndex;
