import React from "react";
import AriannySign from "../assets/Firma-Arianny.png";

const CreateSign = (props) => {
  return (
    <section className="fade-in-bottom">
      <div className="h-44 w-72">
        <img className="w-full h-full object-cover" src={AriannySign} alt="" />
      </div>
      <div>
        <button className="w-32 button-2 px-4">Usar otra</button>
        <button 
          className="w-fit px-4"
          onClick={() => props.HandleChangeTabs("document")}
        >Utilizar esta firma</button>
      </div>
    </section>
  );
};

export default CreateSign;
