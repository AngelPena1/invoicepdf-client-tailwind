import { useEffect, useState } from "react";
import { fullDateFormat } from "../utils/dateFormat/dateFormat";
import { getDateFromSelect } from "../utils/dateFormat/dateFormat";

export default function useDateFilter(fromDate, toDate, noAssignDefaultValue) {
  const currentDate = new Date();

  const [date, setDate] = useState({
    from: "",
    to: "",
    from_to: ""
  });

  //The HandleSearch function, is for automaticly for searching when is a interval of time like month, days, etc.

  function HandleDateChange(event, config, HandleSearch) {
    const event_value = event.target.value
    const newDate = config?.isSelect
      ? getDateFromSelect(event_value)
      : event_value;

    if (config?.isSelect && event_value === "Sin Filtro") {
      return clearDateState()
    }

    if (config?.type === "interval-time") {
      IntervalTime(event, HandleSearch)
    }

    if (config?.property === "from")
      return setDate({
        to: config?.isSelect ? fullDateFormat(currentDate) : date?.to,
        from: fullDateFormat(newDate),
        from_to: ""
      });

    if (config?.property === "to")
      return setDate({
        from: config?.isSelect ? fullDateFormat(currentDate) : date?.from,
        to: fullDateFormat(newDate),
        from_to: ""
      });

    if (config?.property === "from_to")
      return setDate({
        from: "", to: "", from_to: fullDateFormat(newDate)
      });
  }

  function IntervalTime(event, HandleSearch) {
    const event_value = event.target.value
    const intervalDate = getDateFromSelect(event_value)

    return (setDate({
      from: fullDateFormat(intervalDate),
      to: fullDateFormat(currentDate),
      from_to: ""
    }),
      HandleSearch())
  }

  function clearDateState() {
    return setDate({
      from: "",
      to: "",
      from_to: "",
    });
  }

  function clearSpecificDate(name) {
    return setDate({...date, [name]: ""})
  }

  useEffect(() => {
    if(noAssignDefaultValue) return
    if (fromDate === "" && toDate === "") {
      return setDate({ from: fullDateFormat(currentDate), to: fullDateFormat(currentDate), from_to: "" });
    }
    setDate({ from: fullDateFormat(fromDate), to: fullDateFormat(toDate), from_to: "" });
    // eslint-disable-next-line
  }, []);

  return { date, HandleDateChange, clearDateState, clearSpecificDate };
}
