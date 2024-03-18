import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const usePostData = ({ url, refresh, isNullValue, search, bodyData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  //Esto hace que si no tiene valor el search, pase la validación
  const isAllowToFetch = search === undefined ? true : search;

  function ResetValue() {
    return setData([]);
  }

  useEffect(() => {
    if (!isAllowToFetch) return;
    if (isNullValue) return setData([]);

    const controller = new AbortController();

    setLoading(true);
    
    const getData = async () => {
      await axiosPrivate
        .post(
          url,
          {
            array_products_id: bodyData,
          },
          {
            signal: controller.signal,
            crossDomain: true,
          }
        )
        .then((res) => {
          setData(res.data);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          if (!err?.message === "canceled") {
            setLoading(false);
            console.error(err);
          }
        });
    };
    getData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [url, isNullValue, refresh, search]);

  return {
    data,
    loading,
    ResetValue,
  };
};

export default usePostData;
