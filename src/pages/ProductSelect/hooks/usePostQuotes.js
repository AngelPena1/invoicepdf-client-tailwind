import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { getQuoteCounter } from "../axios/getQuoteCounter";
import { useParams } from "react-router-dom";

const usePostQuotes = ({
  selectedProducts,
  inputData,
  clientInputData,
  toggles,
  results,
  quoteHasData,
  quote_count,
  notesInPdf
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { quote_id } = useParams();

  async function HandleCreateQuote() {
    const create = "quote/create";
    const update = "quote/update";
    const endpoint = quoteHasData ? update : create;

    const quote_counter = await getQuoteCounter(auth?.company?.id);

    if (!quoteHasData) {
      await axiosPrivate
        .post(endpoint, {
          company_id: auth?.company?.id,
          client_id: clientInputData?.selected_client_id,
          name: "Cotización RC-" + quote_counter,
          has_itbis: toggles?.itbis,
          has_code: toggles?.code,
          has_cost: toggles?.cost,
          isDollar: toggles?.dollar,
          subtotal: results?.price,
          itbis: results?.itbis,
          total: results?.withITBIS,
          discount: results?.discount === '' ?  0 : parseFloat(inputData?.discount),
          deposit: inputData?.deposit === '' ? 0 : parseFloat(inputData?.deposit),
          with_delivery: inputData?.with_delivery === '' ? 0 : parseFloat(inputData?.with_delivery),
          selected_products_json: JSON.stringify(selectedProducts),
          notes: JSON.stringify(notesInPdf),
          quote_count: quote_counter,
          createdBy: auth?.username,
        })
        .then((res) => {
          if (res?.status === 201) {
            toast.success("La cotización ha sido creada exitosamente.");
          } else {
            toast.error("Ha ocurrido un error inesperado al momento de crear la cotización.");
          }
        })
        .catch(() => {
          toast.error("Ha ocurrido un error.");
        });
    } else {
      await axiosPrivate
        .put(endpoint, {
          quote_id: quote_id,
          company_id: auth?.company?.id,
          client_id: clientInputData?.selected_client_id,
          name: "Cotización RC-" + quote_count,
          isDollar: toggles?.dollar,
          has_itbis: toggles?.itbis,
          has_code: toggles?.code,
          has_cost: toggles?.cost,
          subtotal: results?.price,
          itbis: results?.itbis,
          total: results?.withITBIS,
          discount: results?.discount,
          deposit: inputData?.deposit === '' ? 0 : parseFloat(inputData?.deposit),
          with_delivery: inputData?.with_delivery === '' ? 0 : parseFloat(inputData?.with_delivery),
          selected_products_json: JSON.stringify(selectedProducts),
          notes: JSON.stringify(notesInPdf),
          updatedBy: auth?.username,
        })
        .then(() => {
          toast.success("La cotización ha sido editada exitosamente.");
        })
        .catch(() => {
          toast.error("Ha ocurrido un error.");
        });
    }
  }

  return { HandleCreateQuote };
};

export default usePostQuotes;
