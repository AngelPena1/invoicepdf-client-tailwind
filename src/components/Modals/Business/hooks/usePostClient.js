import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";

const useUpdateCompany = ({ data, CheckForNotEmptyValues }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  async function HandleUpdateClient(e) {
    e.preventDefault();

    if (CheckForNotEmptyValues())
      return toast.error("Por favor, llene todos los campos.");

    const endpoint = `company/update`;

    await axiosPrivate
      .put(endpoint, {
        company_id: auth?.company?.id,
        name: data?.name,
        rnc: data?.rnc,
        email: data?.email,
        phone_1: data?.phone_1,
        phone_2: data?.phone_2,
        address: data?.address,
        image: data?.image,
        updatedBy: auth?.username,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("La información del negocio ha sido actualizado con éxito!");
      })
      .catch(() => {
        return toast.error("Ha ocurrido un error.");
      });
  }

  return { HandleUpdateClient };
};

export default useUpdateCompany;
