import useGetData from "../../../hooks/useGetData";

const useGetQuoteById = (quote_id) => {

  const endpoint = `/quote/get/${quote_id}`;

  const { data, loading, ResetValue } = useGetData({
    url: endpoint
  });

  const quoteHasData = data?.length > 0 ? true : false

  return { data, loading, quoteHasData, ResetValue,  };
};

export default useGetQuoteById;
