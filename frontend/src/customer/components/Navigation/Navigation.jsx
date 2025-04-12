import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AuthModel from '../../Auth/AuthModel'
import Swal from 'sweetalert2'
import a from '../../../../src/organic-1.0.0/images/logo.svg'
import { getUSer, logout } from '../../../State/Auth/Action'
const navigation = [
  { name: 'Trang chủ', id: '/', href: '/', current: true },
  { name: 'Truyện ngắn', id: '/truyenngan', href: '/truyenngan', current: false },
  { name: 'Truyện dài', id: '/truyendai', href: '/truyendai', current: false },
  { name: 'Truyện thiếu nhi', id: '/truyenthieunhi', href: '/truyenthieunhi', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
 
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector(store => store);
  const {cart} = useSelector(store=>store)
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [active, setActive] = useState(false);
  const handleClose = () => {
    setOpenAuthModel(false);
  }
  const handleCart = ()=>{
    navigate('/cart')
  }
  const handleOpen = () => {
    setOpenAuthModel(true);
   
  }
  useEffect(() => {
    if (jwt) {
      dispatch(getUSer(jwt));
       
    }
  }, [jwt])
  console.log(cart)
  console.log(auth)
  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (auth.use) {
      setActive(true)
    }
    if (location.pathname === '/login' || location.pathname === '/register') {
      navigate(-1);
    }
  }, [auth.user])
  useEffect(()=>{

    
  },[])
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    setActive(false)
    localStorage.clear()
    navigate('/')
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Đăng xuất thành công"
    });
    
  }
  console.log(auth)
  return (
    <>
       <header>
      <div className="container-fluid">
        <div className="row py-3 border-bottom">
          <div className="col-sm-4 col-lg-2 text-center text-sm-start d-flex gap-3 justify-content-center justify-content-md-start">
            <div className="d-flex align-items-center my-3 my-sm-0">
              <a href="index.html">
                <img src={a} alt="logo" className="img-fluid" />
              </a>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlinkHref="#menu"></use>
              </svg>
            </button>
          </div>

          <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-4">
            <div className="search-bar row bg-light p-2 rounded-4">
              <div className="col-md-4 d-none d-md-block">
                <select className="form-select border-0 bg-transparent">
                  <option>All Categories</option>
                  <option>Groceries</option>
                  <option>Drinks</option>
                  <option>Chocolates</option>
                </select>
              </div>
              <div className="col-11 col-md-7">
                <form id="search-form" className="text-center" action="index.html" method="post">
                  <input type="text" className="form-control border-0 bg-transparent" placeholder="Search for more than 20,000 products" />
                </form>
              </div>
              <div className="col-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <ul className="navbar-nav list-unstyled d-flex flex-row gap-3 gap-lg-5 justify-content-center flex-wrap align-items-center mb-0 fw-bold text-uppercase text-dark">
              <li className="nav-item active">
                <a href="index.html" className="nav-link">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle pe-3"
                  role="button"
                  id="pages"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <ul className="dropdown-menu border-0 p-3 rounded-0 shadow" aria-labelledby="pages">
                  {["About Us", "Shop", "Single Product", "Cart", "Checkout", "Blog", "Single Post", "Styles", "Contact", "Thank You", "My Account", "404 Error"].map((item, index) => (
                    <li key={index}>
                      <a href="index.html" className="dropdown-item">{item}</a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            
          </div>
          
          <div className="col-sm-8 col-lg-2 d-flex gap-5 align-items-center justify-content-center justify-content-sm-end">
            <ul className="d-flex justify-content-end list-unstyled m-0">
              {[
                { href: "#", icon: "#user" },
                { href: "#", icon: "#wishlist" },
                { href: "#", icon: "#shopping-bag", offcanvas: "offcanvasCart" },
              ].map(({ href, icon, offcanvas }, index) => (
                <li key={index}>
                  <a
                    href={href}
                    className="p-2 mx-1"
                    {...(offcanvas ? { "data-bs-toggle": "offcanvas", "data-bs-target": `#${offcanvas}`, "aria-controls": offcanvas } : {})}
                  >
                    <svg width="24" height="24">
                      <use xlinkHref={icon}></use>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <Disclosure as="nav" >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button" onClick={handleCart} 
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                   <ShoppingCartIcon  className="h-6 w-6" aria-hidden="true" />({cart?.totalItem})
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {!auth.user?.lastName ? (
                         <Menu.Button onClick={handleOpen} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                         <span className="absolute -inset-1.5" />
                         <span className="sr-only ">Open user menu</span>
                         <span onClick={handleOpen}className='p-2 text-white'>SIGN IN</span>

                       </Menu.Button>
                      ):(
                        <>
                          <Menu.Button  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only ">Open user menu</span>
                        <span className='p-2 text-white'>{auth.user.lastName.toUpperCase()}</span>
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <Link
                              to={'/profile'}
                              className= {classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        {auth?.user?.role==="ADMIN"?<>
                        
                        <Menu.Item>
                          {({ active }) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <Link
                              to={'/admin'}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Trang quản trị
                            </Link>
                          )}
                        </Menu.Item>
                        </>:""}
                        <Menu.Item >
                          {({ active }) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <Link
                              to={"/account/order"}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Trạng thái đơn hàng
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item onClick={handleLogout}>
                          {({ active }) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <Link
                              href="/"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Đăng xuất
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                        </>
                      
                      )}
                     
                    </div>
                    
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <AuthModel handleClose={handleClose} open={openAuthModel} />
          </div>
         
        </div>
      </div>
    </header>
    </>

  )
  // return (
  //   <>
  //     <Disclosure as="nav" className="bg-gray-800">
  //       {({ open }) => (
  //         <>
  //           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  //             <div className="relative flex h-16 items-center justify-between">
  //               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
  //                 {/* Mobile menu button*/}
  //                 <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
  //                   <span className="absolute -inset-0.5" />
  //                   <span className="sr-only">Open main menu</span>
  //                   {open ? (
  //                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
  //                   ) : (
  //                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
  //                   )}
  //                 </Disclosure.Button>
  //               </div>
              
  //               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
  //                 <button
  //                   type="button" onClick={handleCart} 
  //                   className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
  //                 >
  //                   <span className="absolute -inset-1.5" />
  //                   <span className="sr-only">View notifications</span>
  //                  <ShoppingCartIcon  className="h-6 w-6" aria-hidden="true" />({cart?.totalItem})
  //                 </button>

  //                 {/* Profile dropdown */}
  //                 <Menu as="div" className="relative ml-3">
  //                   <div>
  //                     {!auth.user?.lastName ? (
  //                        <Menu.Button onClick={handleOpen} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
  //                        <span className="absolute -inset-1.5" />
  //                        <span className="sr-only ">Open user menu</span>
  //                        <span onClick={handleOpen}className='p-2 text-white'>SIGN IN</span>

  //                      </Menu.Button>
  //                     ):(
  //                       <>
  //                         <Menu.Button  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
  //                       <span className="absolute -inset-1.5" />
  //                       <span className="sr-only ">Open user menu</span>
  //                       <span className='p-2 text-white'>{auth.user.lastName.toUpperCase()}</span>
  //                     </Menu.Button>
  //                     <Transition
  //                     as={Fragment}
  //                     enter="transition ease-out duration-100"
  //                     enterFrom="transform opacity-0 scale-95"
  //                     enterTo="transform opacity-100 scale-100"
  //                     leave="transition ease-in duration-75"
  //                     leaveFrom="transform opacity-100 scale-100"
  //                     leaveTo="transform opacity-0 scale-95"
  //                   >
  //                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  //                       <Menu.Item>
  //                         {({ active }) => (
  //                           // eslint-disable-next-line jsx-a11y/anchor-is-valid
  //                           <Link
  //                             to={'/profile'}
  //                             className= {classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
  //                           >
  //                             Your Profile
  //                           </Link>
  //                         )}
  //                       </Menu.Item>
  //                       {auth?.user?.role==="ADMIN"?<>
                        
  //                       <Menu.Item>
  //                         {({ active }) => (
  //                           // eslint-disable-next-line jsx-a11y/anchor-is-valid
  //                           <Link
  //                             to={'/admin'}
  //                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
  //                           >
  //                             Trang quản trị
  //                           </Link>
  //                         )}
  //                       </Menu.Item>
  //                       </>:""}
  //                       <Menu.Item >
  //                         {({ active }) => (
  //                           // eslint-disable-next-line jsx-a11y/anchor-is-valid
  //                           <Link
  //                             to={"/account/order"}
  //                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
  //                           >
  //                             Trạng thái đơn hàng
  //                           </Link>
  //                         )}
  //                       </Menu.Item>
  //                       <Menu.Item onClick={handleLogout}>
  //                         {({ active }) => (
  //                           // eslint-disable-next-line jsx-a11y/anchor-is-valid
  //                           <Link
  //                             href="/"
  //                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
  //                           >
  //                             Đăng xuất
  //                           </Link>
  //                         )}
  //                       </Menu.Item>
  //                     </Menu.Items>
  //                   </Transition>
  //                       </>
                      
  //                     )}
                     
  //                   </div>
                    
  //                 </Menu>
  //               </div>
  //             </div>
  //           </div>

  //           <Disclosure.Panel className="sm:hidden">
  //             <div className="space-y-1 px-2 pb-3 pt-2">
  //               {navigation.map((item) => (
  //                 <Disclosure.Button
  //                   key={item.name}
  //                   as="a"
  //                   href={item.href}
  //                   className={classNames(
  //                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
  //                     'block rounded-md px-3 py-2 text-base font-medium'
  //                   )}
  //                   aria-current={item.current ? 'page' : undefined}
  //                 >
  //                   {item.name}
  //                 </Disclosure.Button>
  //               ))}
  //             </div>
  //           </Disclosure.Panel>
  //         </>
  //       )}
  //     </Disclosure>
  //     <AuthModel handleClose={handleClose} open={openAuthModel} />
  //   </>

  // )
}
