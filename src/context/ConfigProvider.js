import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ConfigContext = createContext({});

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState("");
  const [refetchQuote, setRefetchQuote] = useState(false)
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate()

  function HandleRefetchQuote() {
    return setRefetchQuote(!refetchQuote)
  }

  useEffect(() => {
    if(auth === "") return
    try {
      axiosPrivate
      .get(`quote/config/company/${auth?.company?.id}/getall`)
      .then((res) => {
        setConfig({
          ...config,
          quote: res.data,
        });
      });
    } catch (error) {
      console.error(error?.message);
    }
      // eslint-disable-next-line
  }, [auth, refetchQuote]);

  return (
    <ConfigContext.Provider value={{ config, setConfig, HandleRefetchQuote }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
