import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import UserDropdown from './../components/Dropdown.jsx';
import { userLogoutAction } from './../../redux/actions/User.js';

const Navbar = () => {
    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(0);

    useEffect(() => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
  
    // Atualiza se a janela mudar de tamanho
    const handleResize = () => {
    if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
    }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const userLoginReducer = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLoginReducer;
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(userLogoutAction());
    };

    const quantity = useSelector((state) => state.cartReducer.cartItems.reduce((total, item) => total + item.quantity, 0));

    return(
        <>
            <nav ref={navRef} className="bg-white dark:bg-red-800 fixed w-full z-20 top-0 start-0 border-b border-red-200 dark:border-red-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gre-Commerce</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {!userInfo ?
                    (<div className="space-x-1">
                        <Link to="/login"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Login</Link>
                        <Link to="/register"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Get Started</Link>
                    </div>)
                : (
                    <div className="flex items-center space-x-2">
                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-cta"
                            aria-expanded="false"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>

                            <span>{quantity}</span>
                        </button>
                        <UserDropdown logoutHandler={logoutHandler} />
                    </div>
                )}
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-red-100 rounded-lg bg-red-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-red-800 md:dark:bg-red-800 dark:border-red-700">
                <li>
                    <a href="#" className="block py-2 px-3 text-white bg-gray-700 rounded-sm md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-gray-500" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-red-900 rounded-sm hover:bg-red-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700">About</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-red-900 rounded-sm hover:bg-red-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700">Services</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-red-900 rounded-sm hover:bg-red-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700">Contact</a>
                </li>
                </ul>
            </div>
            </div>
            </nav>
            <div style={{ height: navHeight }}></div>
        </>
    )
}

export default Navbar
