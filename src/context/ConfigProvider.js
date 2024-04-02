import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";
const ConfigContext = createContext({});

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState("");
  const [refetchQuote, setRefetchQuote] = useState(false)
  const { auth } = useAuth();

  function HandleRefetchQuote() {
    return setRefetchQuote(!refetchQuote)
  }

  useEffect(() => {
    if(auth === "") return
    axiosPrivate
      .get(`quote/config/company/${auth?.company?.id}/getall`)
      .then((res) => {
        setConfig({
          ...config,
          quote: res.data,
        });
      });
      // eslint-disable-next-line
  }, [auth, refetchQuote]);

  return (
    <ConfigContext.Provider value={{ config, setConfig, HandleRefetchQuote }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
