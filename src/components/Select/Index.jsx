import { useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Select = ({ className, onClick, value, elements }) => {
  const [toggle, setToggle] = useState(false);

  const searchIdElement = () => {
    const result = elements.filter((element) => {
      return element?.id === value;
    });
    return result[0]?.name;
  };

  const valueIsDefault =
    value === null || value === "default" || !elements || !value
      ? "Seleccione"
      : searchIdElement();

  function HandleToggle(bool) {
    return setToggle(bool);
  }

  return (
    <div className={className + "relative"}>
      <button
        className="w-full bg-transparent border-2 text-primary hover:bg-primary hover:text-white outline-none duration-200"
        onClick={() => {
          HandleToggle(!toggle);
        }}
      >
        {valueIsDefault}
        <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
      </button>
      {toggle && (
        <div
          id="elements"
          className="absolute w-full bg-white left-0 top-12 rounded-lg shadow-lg"
        >
          <ul className="overflow-y-auto max-h-24 rounded">
            {elements?.map((element, index) => {
              return (
                <li
                  onClick={() => {
                    if(!onClick) return
                    onClick(element?.id);
                    HandleToggle(false);
                  }}
                  key={index}
                  className="p-2 border-b last-of-type:border-none hover:bg-slate-100"
                >
                  {element?.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
