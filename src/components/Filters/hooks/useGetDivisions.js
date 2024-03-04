import useGetData from "../../../hooks/useGetData";
import useAuth from "../../../hooks/useAuth";

const useGetDivisions = () => {
  const { auth } = useAuth();

  const companyId = auth?.company?.id;

  const endpoint = `/brand/company/${companyId}/getall/subdivision`;

  const { data, loading } = useGetData({
    url: endpoint,
  })

  return { data, loading, };
};

export default useGetDivisions;
