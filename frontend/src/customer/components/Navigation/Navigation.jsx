import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthModel from "../../Auth/AuthModel";
import Swal from "sweetalert2";
import { getUSer, logout } from "../../../State/Auth/Action";

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Truyện ngắn", href: "/truyenngan" },
  { name: "Truyện dài", href: "/truyendai" },
  { name: "Truyện thiếu nhi", href: "/truyenthieunhi" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [openAuthModel, setOpenAuthModel] = useState(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) dispatch(getUSer(jwt));
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user) setOpenAuthModel(false);
  }, [auth.user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
    Swal.fire({
      icon: "success",
      title: "Đăng xuất thành công",
      showConfirmButton: false,
      timer: 2000,
      position: "top-end",
      toast: true,
    });
  };

  const handleCart = () => navigate("/cart");
  const handleOpenAuthModal = () => setOpenAuthModel(true);

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow border-b border-gray-200 sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <h1
                    className="text-2xl font-extrabold text-indigo-600 tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => navigate("/")}
                  >
                    📚 Fashion store
                  </h1>

                  {/* Desktop navigation */}
                  <div className="hidden sm:flex gap-6 ml-6">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={classNames(
                          location.pathname === item.href
                            ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                            : "text-gray-600 hover:text-indigo-500 hover:font-medium transition-colors duration-200",
                          "text-sm py-1"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                  {/* Cart */}
                  <button
                    onClick={handleCart}
                    className="relative p-2 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    {cart?.totalItem > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cart.totalItem}
                      </span>
                    )}
                  </button>

                  {/* User */}
                  {auth.user ? (
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center text-gray-700 font-semibold hover:text-indigo-600 transition-colors focus:outline-none">
                        {auth.user.lastName.toUpperCase()}
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block w-full text-left px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Đăng xuất
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button
                      onClick={handleOpenAuthModal}
                      className="text-sm text-gray-600 hover:text-indigo-600 font-semibold transition-colors"
                    >
                      Đăng nhập
                    </button>
                  )}

                  {/* Mobile menu button */}
                  <div className="sm:hidden flex items-center">
                    <Disclosure.Button className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none">
                      {open ? (
                        <XMarkIcon className="h-6 w-6" />
                      ) : (
                        <Bars3Icon className="h-6 w-6" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <Disclosure.Panel className="sm:hidden bg-white border-t border-gray-200">
              <div className="px-3 py-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={classNames(
                      location.pathname === item.href
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-600 hover:text-indigo-500",
                      "block w-full text-left px-3 py-2 text-base"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Auth Modal */}
      {openAuthModel && (
        <AuthModel open={openAuthModel} handleClose={() => setOpenAuthModel(false)} />
      )}
    </>
  );
}
