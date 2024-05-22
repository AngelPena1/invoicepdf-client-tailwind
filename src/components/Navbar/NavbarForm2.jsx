import { Link } from "react-router-dom"
import Logo from '../../assets/logo_1.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"



export default function NavbarForm({ dropdownRef, navbarRef, notificationRef, username, toggleProfile, logout, toggleShows, toggleNotifications, showMenuDropdown, showNotifications, showProfileDropdown, currentNavigation, navigation, HandleCurrentNavigation }) {
    return (
        <nav ref={navbarRef} className={showMenuDropdown ? "fixed top-0 w-full z-20 bg-white shadow-lg select-none" : "fixed top-0 rounded-b-lg w-full z-10 bg-white shadow-lg select-none"}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 z-20 bg-white">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <button
                            type="button"
                            name="collapse-menu"
                            onClick={() => {
                                toggleShows('menu_dropdown', !showMenuDropdown)
                            }}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {/*
                                Icon when menu is closed.

                                Menu open: "hidden", Menu closed: "block"
                                */}
                            <svg name="collapse-menu" className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path
                                    name="collapse-menu" strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {/*
                            Icon when menu is open.

                            Menu open: "block", Menu closed: "hidden"
                            */}
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src={Logo} alt="Your Company" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    return (
                                        <Link
                                            key={item?.name}
                                            name={item?.href}
                                            to={item?.href}
                                            className={item?.href === currentNavigation ? "bg-primary duration-200 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-500 duration-200 hover:bg-gray-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
                                            aria-current="page"
                                            onClick={HandleCurrentNavigation}
                                        >
                                            {item?.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div ref={notificationRef} onClick={() => { toggleNotifications(true) }} className="relative">
                            <button type="button" className="relative hidden md:block hover:bg-primary rounded-full p-1 text-gray-400 hover:text-white focus:outline-none">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </button>
                            {/* notification dropdown  */}
                            {showNotifications && <div className="w-52 h-44 fade-in-top bg-blue-100 shadow-lg rounded-lg z-30 absolute right-0 top-10">
                                <label className="grid text-center place-content-center h-full w-full" htmlFor="">No hay notificaciones!</label>
                            </div>}
                        </div>

                        {/* Profile dropdown */}
                        <div className="relative ml-3">
                            <div ref={dropdownRef} >
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleProfile(true)
                                    }}
                                    className="relative flex rounded-full text-sm focus:outline-none hover:bg-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <h4 className="text-slate-600 hidden md:block hover:text-slate-400 duration-200 relative top-0" htmlFor="">Bienvenido, {username} <FontAwesomeIcon icon={faCaretDown} /></h4>

                                    {/* Mobile username */}
                                    <h4 className="text-slate-600 block md:hidden hover:text-slate-400 duration-200 relative top-0" htmlFor="">{username} <FontAwesomeIcon icon={faCaretDown} /></h4>
                                    {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="/" /> */}
                                </button>
                            </div>
                            {showProfileDropdown && <div
                                className="absolute fade-in-top right-0 z-10  w-48 origin-top-right rounded-md bg-white  shadow-style-2 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                <button
                                    className="block w-full bg-white hover:bg-slate-100 px-4 py-2 text-sm text-gray-700 text-left"
                                    role="menuitem"
                                    onClick={() => {
                                        toggleShows('settings', true)
                                        toggleProfile(false)
                                    }}
                                    name="settings-btn"
                                >Configuración</button>
                                <button
                                    className="block w-full bg-white hover:bg-slate-100 px-4 py-2 text-sm text-gray-700 text-left"
                                    role="menuitem"
                                    onClick={logout}
                                >Cerrar sesión</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            {showMenuDropdown && <div className="sm:hidden slide-in-top  -z-10 rounded-b-lg absolute w-full bg-white" id="mobile-menu">
                {navigation.map((item) => {
                    return (
                        <Link
                            key={item?.name}
                            name={item?.href}
                            to={item?.href}
                            className={item?.href === currentNavigation ? "bg-primary block text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 block hover:bg-gray-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
                            aria-current="page"
                            onClick={(e) => {
                                toggleShows('menu_dropdown', false)
                                HandleCurrentNavigation(e)
                            }
                            }
                        >
                            {item?.name}
                        </Link>
                    )
                })}
            </div>}

        </nav>
    )
}
