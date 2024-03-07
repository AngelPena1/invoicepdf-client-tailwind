import { useEffect, useState } from "react";

const useHistoryData = ({ data }) => {
  const [historyData, setHistoryData] = useState([]);
  const [order, setOrder] = useState({
    name: false,
    client: false,
    total: false,
  });

  function OrderByDescription() {
    let localArray = data;

    localArray.sort(function (a, b) {
        const nameA = a?.name.split("-")[1];
        const nameB = b?.name.split("-")[1];

      return order?.name ? nameA - nameB : nameB - nameA;
    });
    setOrder({ ...order, name: !order.name });
    setHistoryData(localArray);
  }

  function OrderByClient() {
    let localArray = data;

    localArray.sort(function (a, b) {
      const clientA = a?.total;
      const clientB = b?.total;

      return order?.total ? clientA - clientB : clientB - clientA;
    });

    setOrder({ ...order, client: !order.client });
    setHistoryData(localArray);
  }

  useEffect(() => {
    if (data) return setHistoryData(data);
  }, [data]);

  return { historyData, OrderByDescription, OrderByClient };
};

export default useHistoryData;
