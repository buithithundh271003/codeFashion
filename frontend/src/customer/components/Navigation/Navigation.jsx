
// import { Fragment, useEffect, useState } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AuthModel from "../../Auth/AuthModel";
// import Swal from "sweetalert2";
// import { getUSer, logout } from "../../../State/Auth/Action";

// const navigation = [
//   { name: "Shop", href: "/" },
//   { name: "About us", href: "/" },
  
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navigation() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { auth, cart } = useSelector((store) => store);
//   const dispatch = useDispatch();

//   const [openAuthModel, setOpenAuthModel] = useState(false);
//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) dispatch(getUSer(jwt));
//   }, [jwt, dispatch]);

//   useEffect(() => {
//     if (auth.user) setOpenAuthModel(false);
//   }, [auth.user]);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     navigate("/");
//     Swal.fire({
//       icon: "success",
//       title: "Đăng xuất thành công",
//       showConfirmButton: false,
//       timer: 2000,
//       position: "top-end",
//       toast: true,
//     });
//   };

//   return (
//     <>
//       <Disclosure as="nav" className="bg-white border-b border-gray-200 shadow sticky top-0 z-50">
//         {({ open }) => (
//           <>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="flex justify-between h-16 items-center">
//                 {/* Logo */}
//                 <div className="flex items-center gap-3">
//                   <h1
//                     className="text-2xl font-extrabold text-indigo-600 cursor-pointer hover:scale-105 transition-transform"
//                     onClick={() => navigate("/")}
//                   >
//                     📚 Fashion store
//                   </h1>
//                   {/* Desktop navigation */}
//                   <div className="hidden sm:flex gap-6 ml-6">
//                     {navigation.map((item) => (
//                       <button
//                         key={item.name}
//                         onClick={() => navigate(item.href)}
//                         className={classNames(
//                           location.pathname === item.href
//                             ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
//                             : "text-gray-600 hover:text-indigo-500 transition-colors",
//                           "text-sm py-1"
//                         )}
//                       >
//                         {item.name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Right side */}
//                 <div className="flex items-center gap-4">
//                   {/* Cart */}
//                   <button
//                     onClick={() => navigate("/cart")}
//                     className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
//                   >
//                     <ShoppingCartIcon className="h-5 w-5" />
//                     {cart?.totalItem > 0 && (
//                       <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
//                         {cart.totalItem}
//                       </span>
//                     )}
//                   </button>

//                   {/* User */}
//                   {auth.user ? (
//                     <Menu as="div" className="relative">
//                       <Menu.Button className="flex items-center rounded-full bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700 transition">
//                         {auth.user.lastName?.toUpperCase() || "User"}
//                       </Menu.Button>
//                       <Transition
//                         as={Fragment}
//                         enter="transition ease-out duration-100"
//                         enterFrom="transform opacity-0 scale-95"
//                         enterTo="transform opacity-100 scale-100"
//                         leave="transition ease-in duration-75"
//                         leaveFrom="transform opacity-100 scale-100"
//                         leaveTo="transform opacity-0 scale-95"
//                       >
//                         <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           <Menu.Item>
//                             {({ active }) => (
//                               <Link
//                                 to="/profile"
//                                 className={classNames(
//                                   active ? "bg-gray-100" : "",
//                                   "block px-4 py-2 text-sm text-gray-700"
//                                 )}
//                               >
//                                 Hồ sơ
//                               </Link>
//                             )}
//                           </Menu.Item>
//                           {auth.user.role === "ADMIN" && (
//                             <Menu.Item>
//                               {({ active }) => (
//                                 <Link
//                                   to="/admin"
//                                   className={classNames(
//                                     active ? "bg-gray-100" : "",
//                                     "block px-4 py-2 text-sm text-gray-700"
//                                   )}
//                                 >
//                                   Trang quản trị
//                                 </Link>
//                               )}
//                             </Menu.Item>
//                           )}
//                           <Menu.Item>
//                             {({ active }) => (
//                               <Link
//                                 to="/account/order"
//                                 className={classNames(
//                                   active ? "bg-gray-100" : "",
//                                   "block px-4 py-2 text-sm text-gray-700"
//                                 )}
//                               >
//                                 Trạng thái đơn hàng
//                               </Link>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 onClick={handleLogout}
//                                 className={classNames(
//                                   active ? "bg-gray-100" : "",
//                                   "block w-full text-left px-4 py-2 text-sm text-gray-700"
//                                 )}
//                               >
//                                 Đăng xuất
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </Menu.Items>
//                       </Transition>
//                     </Menu>
//                   ) : (
//                     <button
//                       onClick={() => setOpenAuthModel(true)}
//                       className="text-sm text-gray-600 hover:text-indigo-600 font-semibold transition-colors"
//                     >
//                       Đăng nhập
//                     </button>
//                   )}

//                   {/* Mobile menu button */}
//                   <div className="sm:hidden">
//                     <Disclosure.Button className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none transition">
//                       {open ? (
//                         <XMarkIcon className="h-6 w-6" />
//                       ) : (
//                         <Bars3Icon className="h-6 w-6" />
//                       )}
//                     </Disclosure.Button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile menu */}
//             <Disclosure.Panel className="sm:hidden bg-white border-t border-gray-200">
//               <div className="px-3 py-4">
//                 {navigation.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => navigate(item.href)}
//                     className={classNames(
//                       location.pathname === item.href
//                         ? "text-indigo-600 font-semibold"
//                         : "text-gray-600 hover:text-indigo-500",
//                       "block w-full text-left px-3 py-2 text-base"
//                     )}
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>

//       {/* Auth Modal */}
//       {openAuthModel && (
//         <AuthModel open={openAuthModel} handleClose={() => setOpenAuthModel(false)} />
//       )}
//     </>
//   );
// }
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AuthModel from "../../Auth/AuthModel";
import Swal from "sweetalert2";
import { getUSer, logout } from "../../../State/Auth/Action";

const navigation = [
  { name: "Trang chủ", href: "/", current: false },
  { name: "Sản phẩm", href: "/products", current: false },
  { name: "Bộ sưu tập", href: "/collections", current: false },
  { name: "Về chúng tôi", href: "/about", current: false },
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

  return (
    <>
      <Disclosure as="nav" className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-20 items-center">
                {/* Logo */}
                <div className="flex items-center gap-8">
                  <div 
                    className="flex items-center cursor-pointer group"
                    onClick={() => navigate("/")}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      FASHIONSTORE
                    </span>
                  </div>

                  {/* Desktop navigation */}
                  <div className="hidden lg:flex gap-1">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:text-indigo-500 hover:bg-gray-50",
                          "px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                  {/* Wishlist */}
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="p-2 text-gray-600 hover:text-pink-500 transition-colors relative"
                  >
                    <FavoriteBorderIcon className="h-5 w-5" />
                    {auth.user?.wishlist?.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {auth.user.wishlist.length}
                      </span>
                    )}
                  </button>

                  {/* Cart */}
                  <button
                    onClick={() => navigate("/cart")}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition-colors relative"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    {cart?.totalItem > 0 && (
                      <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cart.totalItem}
                      </span>
                    )}
                  </button>

                  {/* User */}
                  {auth.user ? (
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                          {auth.user.firstName?.charAt(0).toUpperCase() || "U"}
                        </div>
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
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm font-medium text-gray-900">
                              {auth.user.firstName} {auth.user.lastName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {auth.user.email}
                            </p>
                          </div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-50 text-indigo-600" : "text-gray-700",
                                  "block px-4 py-2 text-sm transition-colors"
                                )}
                              >
                                Hồ sơ cá nhân
                              </Link>
                            )}
                          </Menu.Item>
                          {auth.user.role === "ADMIN" && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/admin"
                                  className={classNames(
                                    active ? "bg-gray-50 text-indigo-600" : "text-gray-700",
                                    "block px-4 py-2 text-sm transition-colors"
                                  )}
                                >
                                  Trang quản trị
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/account/order"
                                className={classNames(
                                  active ? "bg-gray-50 text-indigo-600" : "text-gray-700",
                                  "block px-4 py-2 text-sm transition-colors"
                                )}
                              >
                                Đơn hàng của tôi
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-50 text-indigo-600" : "text-gray-700",
                                  "block w-full text-left px-4 py-2 text-sm transition-colors"
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
                    <div className="hidden sm:flex items-center gap-2">
                      <button
                        onClick={() => setOpenAuthModel(true)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => setOpenAuthModel(true)}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm hover:shadow-md transition-all"
                      >
                        Đăng ký
                      </button>
                    </div>
                  )}

                  {/* Mobile menu button */}
                  <div className="lg:hidden ml-2">
                    <Disclosure.Button className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none transition">
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

            {/* Mobile menu */}
            <Disclosure.Panel className="lg:hidden bg-white border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="button"
                    onClick={() => navigate(item.href)}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-500 hover:bg-gray-50",
                      "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {!auth.user && (
                  <div className="pt-4 pb-2 border-t border-gray-100">
                    <Disclosure.Button
                      as="button"
                      onClick={() => setOpenAuthModel(true)}
                      className="w-full px-4 py-2 text-center rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Đăng nhập
                    </Disclosure.Button>
                  </div>
                )}
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