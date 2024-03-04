import { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    deleteConfirmation: false,
  });

  function showDeleteConfirmation() {
    return setToggles({ ...toggles, deleteConfirmation: true });
  }
  function hideDeleteConfirmation() {
    return setToggles({ ...toggles, deleteConfirmation: false });
  }

  return { toggles, showDeleteConfirmation, hideDeleteConfirmation };
};

export default useToggles;
