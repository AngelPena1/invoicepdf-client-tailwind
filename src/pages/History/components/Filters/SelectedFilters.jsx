import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const SelectedFilters = (props) => {
  return (
    <ul className="">
      {props.filters?.from !== "" && <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 mb-2">
        <div
          onClick={() => {
            props.RemoveFilter("from")
          }}
          className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 duration-200">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">{props.filters?.from}</p>
      </li>
      }
      {props.filters?.to !== "" && <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 mb-2">
        <div
          onClick={() => {
            props.RemoveFilter("to")
          }}
          className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 duration-200">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">{props.filters?.to}</p>
      </li>
      }
      {props.filters?.from_to !== "" && <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 mb-2">
        <div
          onClick={() => {
            props.RemoveFilter("from_to")
          }}
          className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 duration-200">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">{props.filters?.from_to}</p>
      </li>
      }
      {/*       
      <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 last-of-type:mb-0">
        <div className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 duration-200">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">Juan Martinez</p>
      </li> */}
    </ul>
  );
};

export default SelectedFilters;
