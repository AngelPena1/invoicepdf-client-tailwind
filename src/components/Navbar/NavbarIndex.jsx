import { useEffect, useRef, useState } from "react";
// import NavbarForm from "./NavbarForm";
import NavbarForm2 from "./NavbarForm2";
import BusinessModal from "../Modals/Business/Index";
import useLogOut from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/products' },
  { name: 'Clientes', href: '/clients' },
  { name: 'Historial', href: '/history' },
]

const NavbarIndex = () => {
  const rutaActual = window.location.pathname;
  const [currentNavigation, setCurrentNavigation] = useState(rutaActual)
  const { auth } = useAuth()
  const username = capitalizeFirstLetter(auth?.username)

  const dropdownRef = useRef(null)
  const navbarRef = useRef(null)
  const notificationRef = useRef(null)
  const settingsRef = useRef(null)

  const logout = useLogOut()

  const [show, setShow] = useState({
    company_info: false,
    settings: false,
    menu_dropdown: false
  });

  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  function HandleCurrentNavigation(event) {
    const { name } = event?.target
    return setCurrentNavigation(name)
  }

  function capitalizeFirstLetter(str) {
    if (!str) {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function toggleShows(name, value) {
    let hideOthers = {
      company_info: false,
      settings: false,
      menu_dropdown: false
    }
    return setShow({ ...hideOthers, [name]: value });
  }

  function toggleProfile(bool) {
    return setShowProfile(bool);
  }

  function toggleNotifications(bool) {
    return setShowNotifications(bool);
  }

  function hideSettings() {
    return setShow({ ...show, settings: false })
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleProfile(false)
    }

    // if (navbarRef.current && !navbarRef.current.contains(event.target)) {
    //   toggleShows('menu_dropdown', false)
    // }

    if(notificationRef.current && !notificationRef.current.contains(event.target)) {
      toggleNotifications(false)
    }

  };


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarForm2
        dropdownRef={dropdownRef}
        navbarRef={navbarRef}
        notificationRef={notificationRef}
        username={username}
        showProfileDropdown={showProfile}
        showNotifications={showNotifications}
        showMenuDropdown={show?.menu_dropdown}
        navigation={navigation}
        logout={logout}
        currentNavigation={currentNavigation}
        toggleShows={toggleShows}
        toggleProfile={toggleProfile}
        toggleNotifications={toggleNotifications}
        HandleCurrentNavigation={HandleCurrentNavigation}
      />

      {show?.settings && (
        <BusinessModal
          settingsRef={settingsRef}
          onHide={hideSettings}
        />
      )}
    </>
  );
};

export default NavbarIndex;
