import { useState } from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessModal from "./Modals/Business/Index";

const Config = () => {
  const [show, setShow] = useState(false);

  function toggleGear() {
    setShow(!show);
  }

  return (
    <>
      <section
        onClick={toggleGear}
        className="fixed left-6 bottom-6 text-4xl text-slate-400 hover:text-slate-500 duration-200 cursor-pointer"
      >
        <FontAwesomeIcon icon={faGear} className="" />
      </section>
      {show && <BusinessModal toggleCompanyInfo={toggleGear} />}
    </>
  );
};

export default Config;
