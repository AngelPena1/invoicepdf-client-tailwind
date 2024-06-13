import { useEffect, useRef, useState } from "react";
import NavbarForm2 from "./NavbarForm2";
import BusinessModal from "../Modals/Business/Index";
import useLogOut from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import useToggles from "./hooks/useToggles";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/capitalize";

const navigation = [
  {
    name: "Inicio",
    href: "/",
    rolesAllowed: [7397, 5829],
    isAccessRequired: false,
  },
  {
    name: "Productos",
    href: "/products",
    rolesAllowed: [7397, 5829],
    isAccessRequired: false,
  },
  {
    name: "Clientes",
    href: "/clients",
    rolesAllowed: [7397],
    isAccessRequired: false,
  },
  {
    name: "Historial",
    href: "/history",
    rolesAllowed: [7397, 5829],
    isAccessRequired: false,
  },
  {
    name: "Firmar",
    href: "/sign",
    rolesAllowed: [7397, 5829],
    isAccessRequired: true,
    accessName: "sign",
  },
];

const NavbarIndex = () => {
  const { auth } = useAuth();
  const logout = useLogOut();

  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);

  const navigate = useNavigate();

  const rutaActual = window.location.pathname;
  const [currentNavigation, setCurrentNavigation] = useState(rutaActual);

  function HandleCurrentNavigation(event) {
    const { name } = event?.target;
    return setCurrentNavigation(name);
  }

  const username = capitalizeFirstLetter(auth?.username);
  const roles = auth?.roles;

  const {
    show,
    showProfile,
    showNotifications,
    toggleShows,
    toggleProfile,
    toggleNotifications,
    hideSettings,
  } = useToggles();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleProfile(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      toggleNotifications(false);
    }
  };

  function GoToHome() {
    return navigate("/");
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarForm2
        logout={logout}
        roles={roles}
        dropdownRef={dropdownRef}
        navbarRef={navbarRef}
        notificationRef={notificationRef}
        username={username}
        showProfileDropdown={showProfile}
        showNotifications={showNotifications}
        showMenuDropdown={show?.menu_dropdown}
        navigation={navigation}
        currentNavigation={currentNavigation}
        toggleShows={toggleShows}
        toggleProfile={toggleProfile}
        toggleNotifications={toggleNotifications}
        GoToHome={GoToHome}
        HandleCurrentNavigation={HandleCurrentNavigation}
      />

      {show?.settings && (
        <BusinessModal settingsRef={settingsRef} onHide={hideSettings} />
      )}
    </>
  );
};

export default NavbarIndex;
