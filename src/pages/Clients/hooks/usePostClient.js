import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const usePostClient = ({ data, ResetInputValues, CheckForNotEmptyValues }) => {
  const axiosPrivate = useAxiosPrivate();
  const [resfresh, setRefresh] = useState(false);
  const { auth } = useAuth();

  async function HandleCreateClient(e) {
    e.preventDefault();

    if (CheckForNotEmptyValues())
      return toast.error("Por favor, llene todos los campos.");
    const endpoint = "client/create";

    await axiosPrivate
      .post(endpoint, {
        company_id: auth?.company?.id,
        name: data?.name,
        rnc: data?.rnc,
        email: data?.email,
        razon_social: data?.razon_social,
        phone: data?.phone,
        phone_2: data?.phone_2,
        createdBy: auth?.username,
        isActive: true,
      })
      .then(() => {
        toast.success("El cliente ha sido creado con exito!");
        return ResetInputValues(), HandleRefresh();
      })
      .catch(() => {
        return toast.error("Ha ocurrido un error.");
      });
  }

  async function HandleUpdateClient(e) {
    e.preventDefault();

    if (CheckForNotEmptyValues())
      return toast.error("Por favor, llene todos los campos.");

    const endpoint = "client/update";

    await axiosPrivate
      .put(endpoint, {
        client_id: data?.client_id,
        name: data?.name,
        rnc: data?.rnc,
        email: data?.email,
        razon_social: data?.razon_social,
        phone: data?.phone,
        phone_2: data?.phone_2,
        updatedBy: auth?.username,
        isActive: data?.isActive,
      })
      .then(() => {
        toast.success("El cliente ha sido actualizado con éxito!");
        return HandleRefresh()
      })
      .catch(() => {
        return toast.error("Ha ocurrido un error.");
      });
  }

  function HandleRefresh() {
    return setRefresh(!resfresh);
  }

  return { resfresh, HandleCreateClient, HandleUpdateClient };
};

export default usePostClient;
