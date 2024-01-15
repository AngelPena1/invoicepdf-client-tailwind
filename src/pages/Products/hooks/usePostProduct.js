import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const usePostProduct = ({ data, ResetInputValues, CheckForNotEmptyValues }) => {
  const axiosPrivate = useAxiosPrivate();
  const [resfresh, setRefresh] = useState(false);
  const { auth } = useAuth();

  async function HandleCreateProduct(e) {
    e.preventDefault();

    if (CheckForNotEmptyValues())
      return toast.error("Por favor, llene todos los campos.");
    const endpoint = "product/create";

    await axiosPrivate
      .post(endpoint, {
        company_id: auth?.company?.id,
        category_id: data?.category_id,
        name: data?.name,
        code: data?.product_code,
        description: data?.description,
        size: data?.image_size,
        price: data?.price,
        createdBy: auth?.username,
        image: data?.image,
        isActive: true,
      })
      .then(() => {
        toast.success("El producto ha sido creado con exito!");
        return ResetInputValues(), HandleRefresh();
      })
      .catch((error) => {
        if (error?.response?.status === 409)
          return toast.error("El código del producto ya existe.");
        else {
          return toast.error("Ha ocurrido un error.");
        }
      });
  }

  async function HandleUpdateProduct(e) {
    e.preventDefault();

    if (CheckForNotEmptyValues())
      return toast.error("Por favor, llene todos los campos.");

    const endpoint = "product/update";

    await axiosPrivate
      .put(endpoint, {
        product_id: data?.product_id,
        category_id: data?.category_id,
        name: data?.name,
        code: data?.product_code,
        description: data?.description,
        size: data?.image_size,
        price: data?.price,
        image: data?.image,
        updatedBy: auth?.username,
        isActive: data?.isActive
      })
      .then(() => {
        toast.success("El producto ha sido actualizado con éxito!");
        return HandleRefresh()
      })
      .catch((error) => {
        if (error?.response?.status === 409)
          return toast.error("El codigo del producto ya existe.");
        else {
          console.log(error.message);
          return toast.error("Ha ocurrido un error.");
        }
      });
  }

  function HandleRefresh() {
    return setRefresh(!resfresh);
  }

  return { resfresh, HandleCreateProduct, HandleUpdateProduct };
};

export default usePostProduct;
