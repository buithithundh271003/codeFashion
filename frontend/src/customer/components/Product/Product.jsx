import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCart';
import { filters } from './filterData';
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { findProducts } from '../../../State/Product/Action';

export default function Product() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { product } = useSelector(store => store);
  const decodeQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodeQueryString);
  const theloai = searchParams.get("theloai");
  const price = searchParams.get("price")
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSearch(form.get("ten"))
  }
  
  useEffect(() => {
    dispatch(findProducts());
  }, [price, theloai])

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options?.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb and search */}
          <div className="border-b border-gray-200 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <span>Home</span>
                <span className="mx-2">/</span>
                <span>Shop</span>
              </div>
              
              <form onSubmit={handleSubmitSearch} className="flex items-center">
                <input 
                  name="ten"
                  type="text" 
                  placeholder="Search..." 
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6">
            {/* Filters sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-medium text-gray-900">Filter By Pricing</h3>
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Pricing</span>
                    <span className="text-sm font-medium">$10 - $400</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="400" 
                    className="w-full mt-2"
                  />
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-medium text-gray-900">Categories</h3>
                {/* Categories would go here */}
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-medium text-gray-900">Size</h3>
                <div className="flex space-x-2 mt-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button 
                      key={size}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-medium text-gray-900">Brands</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Closed', 'Good', 'Human', 'D&G', 'Disc', 'Versace'].map((brand) => (
                    <span key={brand} className="text-sm text-gray-500">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">{product.products?.length} products</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sort by</span>
                  <select className="border border-gray-300 rounded text-sm px-2 py-1 focus:outline-none">
                    <option>Default Sorting</option>
                  </select>
                </div>
              </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {product.products && product.products.map((item) => (
    <div key={item.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition-shadow">
      {/* Product Image - Sử dụng hình ảnh thực tế từ dữ liệu */}
      <div className="relative h-48 mb-3 overflow-hidden">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-100 w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</h3>
        <p className="text-sm font-medium text-gray-900 mt-1">${item.price.toFixed(2)}</p>
      </div>
    </div>
  ))}
</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}