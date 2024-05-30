import React, { useState } from "react";

const useToggles = () => {
  const [show, setShow] = useState({
    company_info: false,
    settings: false,
    menu_dropdown: false,
  });

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  function toggleShows(name, value) {
    let hideOthers = {
      company_info: false,
      settings: false,
      menu_dropdown: false,
    };
    return setShow({ ...hideOthers, [name]: value });
  }

  function toggleProfile(bool) {
    return setShowProfile(bool);
  }

  function toggleNotifications(bool) {
    return setShowNotifications(bool);
  }

  function hideSettings() {
    return setShow({ ...show, settings: false });
  }

  return {
    show,
    showProfile,
    showNotifications,
    toggleShows,
    toggleProfile,
    toggleNotifications,
    hideSettings,
  };
};

export default useToggles;
