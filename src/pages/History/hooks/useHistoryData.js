import { useEffect, useState } from "react";

const useHistoryData = ({ data }) => {
  const [historyData, setHistoryData] = useState([]);
  const [order, setOrder] = useState({
    name: false,
    client: false,
    date: false,
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
      const clientA = a?.client?.id;
      const clientB = b?.client?.id;

      return order?.client ? clientA - clientB : clientB - clientA;
    });

    setOrder({ ...order, client: !order.client });
    setHistoryData(localArray);
  }

  function OrderByDate() {
    let localArray = data;

    localArray.sort(function (a, b) {
      const dateA = new Date(a?.createdAt);
      const dateB = new Date(b?.createdAt);

      return order?.date ? dateA - dateB : dateB - dateA;
    });

    setOrder({ ...order, date: !order.date });
    setHistoryData(localArray);
  }

  function OrderByTotal() {
    let localArray = data;

    localArray.sort(function (a, b) {
      const totalA = parseFloat(a?.total);
      const totalB = parseFloat(b?.total);

      return order?.total ? totalA - totalB : totalB - totalA;
    });

    setOrder({ ...order, total: !order.total });
    setHistoryData(localArray);
  }

  useEffect(() => {
    if (data) return setHistoryData(data);
  }, [data]);

  return {
    historyData,
    OrderByDescription,
    OrderByClient,
    OrderByDate,
    OrderByTotal,
  };
};

export default useHistoryData;
