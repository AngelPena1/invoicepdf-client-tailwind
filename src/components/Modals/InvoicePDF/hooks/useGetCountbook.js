import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useGetData from "../../../../hooks/useGetData";

const useGetCountbook = () => {
  const { auth } = useAuth();
  const [countbook, setCountbook] = useState("")
  const endpoint = `/countbook/company/${auth?.company?.id}`;

  const { data, loading } = useGetData({
    url: endpoint,
  });

  function organizeDataForSelect() {
    let localArray = []
    localArray = data?.map((d) => {
      return {
        id: d?.id,
        name: d?.description,
        serie: d?.serie,
        begin: d?.begin,
        current: d?.current,
        end: d?.end,
        available: d?.available,
      }
    })
    return setCountbook(localArray)
  }

  useEffect(() => {
    if(!data) return
    organizeDataForSelect()
     // eslint-disable-next-line
  }, [data])
  
  return { data: countbook, loading };
};

export default useGetCountbook;
