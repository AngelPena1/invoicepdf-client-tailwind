import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UploadDocument = (props) => {
  return (
    <section className="grid place-content-center fade-in-bottom">
      {!props.inputData?.pdf_file && (
        <div className="grid place-content-center text-center">
          <label
            htmlFor="input-file"
            className="w-72 h-96 bg-transparent border-2 border-dashed border-slate-300 rounded-lg grid place-content-center place-items-center cursor-pointer"
            accept=".pdf"
          >
            <FontAwesomeIcon icon={faFile} className="text-3xl mb-4" />
            Haga click para seleccionar el PDF
          </label>
          <input
            id="input-file"
            type="file"
            className="hidden"
            value={props.InputData?.pdf_file}
            onChange={props.HandlePdfChange}
          />
        </div>
      )}
    </section>
  );
};

export default UploadDocument;
