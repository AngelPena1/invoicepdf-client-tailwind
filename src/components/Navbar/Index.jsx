import { useEffect, useRef, useState } from "react";
// import NavbarForm from "./NavbarForm";
import NavbarForm2 from "./NavbarForm2";
import BusinessModal from "../Modals/Business/Index";
import useLogOut from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import useToggles from "./hooks/useToggles";
import { capitalizeFirstLetter } from "../../utils/capitalize";

const navigation = [
  { name: "Inicio", href: "/", rolesAllowed: [7397, 5829] },
  { name: "Productos", href: "/products", rolesAllowed: [7397, 5829] },
  { name: "Clientes", href: "/clients", rolesAllowed: [7397] },
  { name: "Historial", href: "/history", rolesAllowed: [7397, 5829] },
  { name: "Firmar", href: "/sign", rolesAllowed: [] },
];

const NavbarIndex = () => {
  const { auth } = useAuth();
  const logout = useLogOut();

  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);

  const rutaActual = window.location.pathname;
  const [currentNavigation, setCurrentNavigation] = useState(rutaActual);

  function HandleCurrentNavigation(event) {
    const { name } = event?.target;
    return setCurrentNavigation(name);
  }

  const username = capitalizeFirstLetter(auth?.username);
  const roles = auth?.roles;;

  // function HasPermission() {
  //   navigation.forEach((item) => {
  //     const hasPermission = item?.rolesAllowed.some(allowed => roles.includes(allowed))
  //     if(hasPermission) {
  //       return console.log("User has permission to enter in " + item?.name);
  //     } else {
  //       return console.log("User doesn't has permission to enter in " + item?.name);
  //     }
  //   })
  // }
  // HasPermission()

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

    // if (navbarRef.current && !navbarRef.current.contains(event.target)) {
    //   toggleShows('menu_dropdown', false)
    // }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      toggleNotifications(false);
    }
  };

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
        roles={roles}
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
        <BusinessModal settingsRef={settingsRef} onHide={hideSettings} />
      )}
    </>
  );
};

export default NavbarIndex;
