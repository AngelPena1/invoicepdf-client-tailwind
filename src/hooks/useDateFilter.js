import { useEffect, useState } from "react";
import { fullDateFormat } from "../utils/dateFormat/dateFormat";
import { getDateFromSelect } from "../utils/dateFormat/dateFormat";

export default function useDateFilter(fromDate, toDate) {
  const currentDate = new Date();

  const [date, setDate] = useState({
    from: "",
    to: "",
  });


  //The HandleSearch function, is for automaticly for searching when is a interval of time like month, days, etc.

  function HandleDateChange(e, config, HandleSearch) {
    const event = e.target.value
    const newDate = config?.isSelect
      ? getDateFromSelect(event)
      : event;
      
    if(config?.isSelect && event === "Sin Filtro") {
      return clearDateState()
    }

    if(config?.type === "interval-time") {
      IntervalTime(e, HandleSearch)
    }

    if (config?.property === "from")
      return setDate({
        to: config?.isSelect ? fullDateFormat(currentDate) : date?.to,
        from: fullDateFormat(newDate),
      });

    if (config?.property === "to")
      return setDate({
        from: config?.isSelect ? fullDateFormat(currentDate) : date?.from,
        to: fullDateFormat(newDate),
      });
  }

  function IntervalTime(e, HandleSearch) {
    const value = e.target.value
    const intervalDate = getDateFromSelect(value)
    
    return (setDate({
      from: fullDateFormat(intervalDate),
      to: fullDateFormat(currentDate),
    }), 
    HandleSearch())
  }

  function clearDateState() {
    return setDate({
      from: "",
      to: "",
    });
  }

  useEffect(() => {
    if(fromDate==="" && toDate === "") {
      return setDate({ from: fullDateFormat(currentDate), to: fullDateFormat(currentDate)});
    }
    setDate({ from: fullDateFormat(fromDate), to: fullDateFormat(toDate) });
  }, []);

  return { date, HandleDateChange, clearDateState };
}
