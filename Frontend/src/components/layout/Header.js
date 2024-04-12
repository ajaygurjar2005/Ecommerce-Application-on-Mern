import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setAuth, auth } = useAuth();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const [cart] = useCart();

  const MenuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Logout",
      link: "/login",
    },
    {
      name: "Sign up",
      link: "/register",
    },
    {
      name: "DASHBOARD",
      link: "/dashboard/user",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout successfully");
    window.location.reload(navigate('/login'))
    
  };

  return (
    <div>
      <header className="w-full  text-gray-700 dark:bg-gray-800 border-t border-gray-100 shadow-sm body-font md:block hidden text-white">
        <div className="container flex flex-col items-start justify-between p-4 mx-auto md:flex-row ">
          <h1 className="text-[25px]  font-bold pl-4">ECOMMERCE APP</h1>
          <nav className="flex flex-wrap items-center justify-center  text-base md:ml-auto mt-1 md:mr-auto text-[20px] md:block hidden">
            <Link to="/" className="mr-5 font-medium  hover:underline">
              HOME
            </Link>
            <Link to="/about" className="mr-5 font-medium  hover:underline">
              ABOUT
            </Link>
            <Link to="/contact" className="mr-5 font-medium  hover:underline">
              CONTACT
            </Link>
            
          </nav>
          <div className="items-center h-full">
            <div className="hidden md:flex items-center space-x-5 items-center">
              {auth?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setToggle(!toggle)}
                    className="font-medium hover:underline"
                  >
                    {auth.user.name}
                  </button>
                  {toggle && (
                    <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg py-2">
                      <Link
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        DASHBOARD
                      </Link>
                      <Link
                        to={"/login"}
                        onClick={() => handleLogout()}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        LOGOUT
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="flex items-center hover:text-gray-200 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              )}

              <Link to={"/cart"} className="relative group">
                {/* Cart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500 group-hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* Cart Count Badge */}
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full h-[150px] flex md:hidden block dark:bg-gray-800 text-white">
        <h1 className="text-[35px]  font-bold pl-4 ml-[30px] mt-8 w-[290px] sm:ml-[150px]">
          ECOMMERCE APP
        </h1>
        <div>
          <ul
            className={`md:hidden  fixed w-screen h-[100vh] bg-[rgba(0,0,0,0.7)] text-white flex flex-col   items-center     duration-300 top-[0px] ${
              toggle ? "left-[0%]" : "left-[-100%]"
            }`}
          >
            {MenuItems.map((data, index) => (
              <li
                key={index}
                className="hover:underline  mt-14 text-[25px] cursor-pointer"
              >
                <Link to={data.link}>{data.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {toggle ? (
          <AiOutlineClose
            style={{ zIndex: "100" }}
            className="text-[30px]   md:hidden text-[white] ml-[130px] mt-[50px]"
            onClick={() => setToggle(false)}
          />
        ) : (
          <AiOutlineMenu
            onClick={() => setToggle(true)}
            className="md:hidden  text-[white] text-[30px] ml-[130px] mt-[50px]"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
