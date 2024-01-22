import useAuth from "../../../../hooks/useAuth";
import useGetData from "../../../../hooks/useGetData";

const useGetCompanyImage = () => {
  const { auth } = useAuth();
  const company_id = auth?.company?.id;

  const endpoint = `/company/get/${company_id}/image`

  const { data, loading } = useGetData({
    url: endpoint
  })

  return { data, loading };
};

export default useGetCompanyImage;
