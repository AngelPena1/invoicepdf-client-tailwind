import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { getQuoteCounter } from "../axios/getQuoteCounter";

const usePostQuotes = ({ selectedProducts, inputData, clientInputData, toggles, results, CheckForNotEmptyValues }) => {
  const axiosPrivate = useAxiosPrivate();
  const [resfresh, setRefresh] = useState(false);
  const { auth } = useAuth();

  async function HandleCreateQuote() {
    const endpoint = "quote/create";

    // const quote_counter = companyData[0]?.quote_counter

    const quote_counter = await getQuoteCounter(auth?.company?.id)
    
    await axiosPrivate
      .post(endpoint, {
        company_id: auth?.company?.id,
        client_id: clientInputData?.selected_client_id,
        name: "Cotización RC-" + quote_counter,
        has_itbis: toggles?.itbis,
        has_code: toggles?.code,
        has_cost: toggles?.cost,
        discount: inputData?.discount,
        subtotal: results?.price,
        itbis: results?.itbis,
        total: results?.withITBIS,
        deposit: inputData?.deposit,
        with_delivery: inputData?.with_delivery,
        selected_products_json: JSON.stringify(selectedProducts),
        createdBy: auth?.username
      })
      .then(() => {
        toast.success("La cotización ha sido creada exitosamente.");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error.");
      });
  }

  // async function HandleUpdateQuote(e) {
  //   e.preventDefault();

  //   if (CheckForNotEmptyValues())
  //     return toast.error("Por favor, llene todos los campos.");

  //   const endpoint = "product/update";
    
  //   await axiosPrivate
  //     .put(endpoint, {
  //       product_id: data?.product_id,
  //       brand_id: data?.brand_id,
  //       finishes_id: data?.finishes_id,
  //       category_id: data?.category_id,
  //       subcategory_id: data?.subcategory_id,
  //       name: data?.name,
  //       code: data?.product_code,
  //       description: data?.description,
  //       size: data?.image_size,
  //       price: data?.price,
  //       cost: data?.cost,
  //       image: data?.image,
  //       updatedBy: auth?.username,
  //       isActive: data?.isActive
  //     })
  //     .then(() => {
  //       toast.success("El producto ha sido actualizado con éxito!");
  //       return HandleRefresh()
  //     })
  //     .catch((error) => {
  //       if (error?.response?.status === 409)
  //         return toast.error("El codigo del producto ya existe.");
  //       else {
  //         console.log(error.message);
  //         return toast.error("Ha ocurrido un error.");
  //       }
  //     });
  // }

  function HandleRefresh() {
    return setRefresh(!resfresh);
  }

  return { resfresh, HandleCreateQuote };
};

export default usePostQuotes;
