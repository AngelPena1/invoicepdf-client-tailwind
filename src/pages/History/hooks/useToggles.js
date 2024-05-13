import { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    deleteConfirmation: false,
    invoiceForm: false
  });

  function toggleCreateInvoice(bool) {
    return setToggles({ ...toggles, invoiceForm: bool });
  }

  function showDeleteConfirmation() {
    return setToggles({ ...toggles, deleteConfirmation: true });
  }
  
  function hideDeleteConfirmation() {
    return setToggles({ ...toggles, deleteConfirmation: false });
  }

  return { toggles, toggleCreateInvoice, showDeleteConfirmation, hideDeleteConfirmation };
};

export default useToggles;
