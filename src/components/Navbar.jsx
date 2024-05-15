import { useContext } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo2 from "../../public/charity.png";
import "../App.css";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut, loading } = useContext(AuthContext);
  // handle log out function here
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Log out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to log out");
    }
  };

  const Links = [
    <>
      <div className="flex font-medium md:flex-col lg:flex-row flex-col gap-2 md:gap-5 text-base">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "nav-link-active"
              : "nav-link-inactive"
          }
        >
          {" "}
          Home
        </NavLink>

        <NavLink
          to={"/available-foods"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "nav-link-active"
              : "nav-link-inactive"
          }
        >
          {" "}
          Available Foods
        </NavLink>

        {user && (
          <>
            <NavLink
              to={"/add-food"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "nav-link-active"
                  : "nav-link-inactive"
              }
            >
              {" "}
              Add Food
            </NavLink>

            <NavLink
              to={"/manage-my-foods"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "nav-link-active"
                  : "nav-link-inactive"
              }
            >
              {" "}
              Manage My Foods
            </NavLink>

            <NavLink
              to={"/my-food-requests"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "nav-link-active"
                  : "nav-link-inactive"
              }
            >
              {" "}
              My Food Requests
            </NavLink>
          </>
        )}
      </div>

      {}
    </>,
  ];
  return (
    <>
      <div className="min-w-full border-b">
        <div className="navbar mt-3 bg-base-100  container px-4 mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {Links}
              </ul>
            </div>
            <Link to={"/"} className="flex items-center gap-2">
              <img className="size-8" src={logo2} alt="" />
              <a className="font-lobster text-2xl">ShareDine</a>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal space-x-2 px-1">{Links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                {loading ? (
                  <div className="size-10 rounded-full bg-gray-100 animate-pulse"></div>
                ) : (
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div
                        title={user.displayName}
                        className="w-10 rounded-full "
                      >
                        <img src={user.photoURL} />
                      </div>
                    </div>
                    <div className=" ">
                      <div
                        tabIndex={0}
                        className="menu menu-sm dropdown-content   p-2  absolute right-0 z-20 w-64 py-2  mt-3 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                      >
                        <a
                          href="#"
                          className="flex items-center p-3 -mt-1 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <img
                            className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                            src={user.photoURL}
                          />
                          <div className="mx-1">
                            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                              {user.displayName}
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </a>

                        <hr className="border-gray-200 dark:border-gray-700 " />

                        <a
                          href="#"
                          onClick={handleLogOut}
                          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <Skeleton height={12} width={100} />
                ) : (
                  <div className="flex font-medium gap-5">
                    <NavLink
                      to={"/login"}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "nav-link-active"
                          : "nav-link-inactive"
                      }
                    >
                      {" "}
                      Login
                    </NavLink>
                    <NavLink
                      to={"/register"}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "nav-link-active"
                          : "nav-link-inactive"
                      }
                    >
                      {" "}
                      Register
                    </NavLink>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
