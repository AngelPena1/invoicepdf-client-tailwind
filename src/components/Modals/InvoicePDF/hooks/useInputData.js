import { useEffect, useState } from "react";
import { fullDateFormat } from "../../../../utils/dateFormat/dateFormat";

const useInputData = ({ selectedQuote, countbookData}) => {
  const [inputData, setInputData] = useState({
    invoice_type: "default",
    quote_name: "",
    client: "",
    date: "",
  })

  function HandleInputData(event) {
    const { name, value } = event?.target;
    return setInputData({ ...inputData, [name]: value });
  }

  function onClickSelect(data_id) {
    const getCountbook = countbookData?.filter(countbook => {
      if(countbook?.id === data_id) return countbook
      return null
    })
    return setInputData({ ...inputData, invoice_type: getCountbook[0]?.name })
  }

  useEffect(() => {
    if (!selectedQuote) return

    setInputData({
      ...inputData,
      client: selectedQuote?.client?.name,
      rnc: selectedQuote?.client?.rnc,
      date: fullDateFormat(new Date())
    })
    
    // eslint-disable-next-line
  }, [selectedQuote])

  return { inputData, onClickSelect, HandleInputData };
};

export default useInputData;
