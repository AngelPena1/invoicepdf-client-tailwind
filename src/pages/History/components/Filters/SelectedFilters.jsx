import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { fullDateFormat } from "../../../../utils/dateFormat/dateFormat";

const SelectedFilters = (props) => {
  return (
    <ul className="">
      {props.filters?.from !== "" && <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 mb-2">
        <div
          onClick={() => {
            props.RemoveFilter("from")
          }}
          className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 ">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">{`Desde: ${fullDateFormat(props.filters?.from, 'spanish')}`}</p>
      </li>
      }
      {props.filters?.to !== "" && <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 mb-2">
        <div
          onClick={() => {
            props.RemoveFilter("to")
          }}
          className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 ">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">{`Hasta: ${fullDateFormat(props.filters?.to, 'spanish')}`}</p>
      </li>
      }
      {props.filters?.from_to !== "" && <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 mb-2">
        <div
          onClick={() => {
            props.RemoveFilter("from_to")
          }}
          className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 ">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">{fullDateFormat(props.filters?.from_to, 'spanish')}</p>
      </li>
      }
      {props.filters?.client !== "" && <li className="w-fit text-sm border-2 border-slate-500 rounded-lg inline-block mr-2 mb-2">
        <div
          onClick={() => {
            props.RemoveFilter("client")
          }}
          className="text-xs inline-block h-full p-1 px-2 border-r-2 border-slate-500 hover:bg-slate-500 ">
          <FontAwesomeIcon icon={faX} />
        </div>
        <p className="inline-block px-2">{props.filters?.client?.name}</p>
      </li>
      }
    </ul>
  );
};

export default SelectedFilters;
