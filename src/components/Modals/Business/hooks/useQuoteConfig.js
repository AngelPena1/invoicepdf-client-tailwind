import { useEffect } from "react";
import useConfig from "../../../../hooks/useConfig";
import toast from "react-hot-toast";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";

const useQuoteConfig = ({ quoteInput, AsignQuoteData }) => {
  const { config, HandleRefetchQuote } = useConfig();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  async function HandleUpdateConfig(e) {
    e.preventDefault();

    const endpoint = "quote/config/update";

    await axiosPrivate
      .put(endpoint, {
        company_id: auth?.company?.id,
        has_images: quoteInput?.has_images,
      })
      .then(() => {
        toast.success("Cambios han sido aplicados!");
        HandleRefetchQuote()
      })
      .catch((error) => {
        if (error?.response?.status === 409)
          return toast.error("Error inesperado.");
        else {
          return toast.error("Ha ocurrido un error.");
        }
      });
  }

  function resetQuoteValue() {
    return AsignQuoteData(config?.quote[0])
    // return toast.success("");
  }

  useEffect(() => {
    if(!config) return
    AsignQuoteData(config?.quote[0])
    // eslint-disable-next-line
  }, [config]);

  return {
    resetQuoteValue,
    HandleUpdateConfig,
  };
};

export default useQuoteConfig;
