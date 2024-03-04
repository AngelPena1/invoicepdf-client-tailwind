import { useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Select = ({
  className,
  onClick,
  value,
  value_id,
  placeHolder,
  elements,
}) => {
  const [toggle, setToggle] = useState(false);

  const searchIdElement = () => {
    const result = elements.filter((element) => {
      return element?.id === value;
    });
    return result[0]?.name;
  };

  const placeHolderHasValue = placeHolder ? placeHolder : "Seleccione";

  const valueIsIdentificator = value_id ? searchIdElement() : value;

  const valueIsDefault =
    value === null || value === "default" || !elements || !value
      ? placeHolderHasValue
      : valueIsIdentificator;

  function HandleToggle(bool) {
    return setToggle(bool);
  }

  return (
    <div className={className ? className : "" + "relative"}>
      <button
        className="w-full bg-transparent border-2 text-primary-dark hover:bg-primary hover:text-white outline-none duration-200"
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
          className="absolute w-full bg-white rounded-lg shadow-style-2 z-20 left-0"
        >
          <ul className="overflow-y-auto max-h-24 rounded">
            {elements?.map((element, index) => {
              return (
                <li
                  onClick={() => {
                    if (!onClick) return;
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
