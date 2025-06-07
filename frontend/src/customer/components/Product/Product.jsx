
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCart';
import { filters } from './filterData';
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { findProducts } from '../../../State/Product/Action';

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { product } = useSelector(store => store);
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortOption, setSortOption] = useState("featured");

  // Parse query parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("theloai");
  const price = searchParams.get("price");
  const size = searchParams.get("size");
  const search = searchParams.get("search");

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    params.set("search", searchQuery);
    navigate(`?${params.toString()}`);
  };

  // Handle price range change
  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value) || 0;
    setPriceRange(newPriceRange);

    // Update URL when price range changes
    const params = new URLSearchParams(location.search);
    params.set("price", newPriceRange.join("-"));
    navigate(`?${params.toString()}`);
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    let newSizes = [...selectedSizes];
    if (newSizes.includes(size)) {
      newSizes = newSizes.filter(s => s !== size);
    } else {
      newSizes.push(size);
    }
    setSelectedSizes(newSizes);

    // Update URL with selected sizes
    const params = new URLSearchParams(location.search);
    if (newSizes.length > 0) {
      params.set("size", newSizes.join(","));
    } else {
      params.delete("size");
    }
    navigate(`?${params.toString()}`);
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    // Here you would typically dispatch an action to sort products
    // For now we'll just update the state
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = product.products || [];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply price filter
    if (price) {
      const [min, max] = price.split("-").map(Number);
      filtered = filtered.filter(item => 
        item.price >= min && item.price <= max
      );
    }

    // Apply size filter
    if (size) {
      const sizes = size.split(",");
      filtered = filtered.filter(item => 
        sizes.some(s => item.sizes?.includes(s))
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default sorting (featured)
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Load initial filters from URL
  useEffect(() => {
    if (search) setSearchQuery(search);
    if (price) {
      const [min, max] = price.split("-").map(Number);
      setPriceRange([min, max]);
    }
    if (size) setSelectedSizes(size.split(","));
  }, [location.search]);

  // Fetch products when filters change
  useEffect(() => {
    const params = {
      category,
      price,
      size,
      search,
      sort: sortOption
    };
    dispatch(findProducts(params));
  }, [category, price, size, search, sortOption]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        {/* Mobile filter dialog - unchanged from original */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          {/* ... existing mobile filter dialog code ... */}
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb and search */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">Home</span>
              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium text-gray-900">Shop</span>
            </div>
            
            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              
              <form onSubmit={handleSearchSubmit} className="ml-4 relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    name="search"
                    type="text" 
                    placeholder="Search products..." 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          <section className="pt-6 pb-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters sidebar */}
              <div className="hidden lg:block">
                <div className="space-y-6 border-b border-gray-200 pb-6">
                  <h3 className="font-medium text-gray-900">Filter By Price</h3>
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Price range</span>
                      <span className="text-sm font-medium">${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        min="0"
                        max={priceRange[1]}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        min={priceRange[0]}
                        max="1000000"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <input 
                        type="range" 
                        min="0" 
                        max="1000000" 
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full mt-2 accent-indigo-600"
                      />
                      <input 
                        type="range" 
                        min="0" 
                        max="1000000" 
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full mt-2 accent-indigo-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Categories filter - unchanged */}
                <div className="border-b border-gray-200 py-6">
                  {/* ... existing categories code ... */}
                </div>

                {/* Size filter */}
                <div className="border-b border-gray-200 py-6">
                  <h3 className="font-medium text-gray-900">Size</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button 
                        key={size}
                        className={`w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium transition-colors ${
                          selectedSizes.includes(size) 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands filter - unchanged */}
                <div className="border-b border-gray-200 py-6">
                  {/* ... existing brands code ... */}
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <span className="text-sm text-gray-500 mb-2 sm:mb-0">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                  <div className="flex items-center">
                    <label htmlFor="sort" className="text-sm text-gray-500 mr-2">Sort by:</label>
                    <select 
                      id="sort"
                      className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={sortOption}
                      onChange={handleSortChange}
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="newest">Newest Arrivals</option>
                    </select>
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                    <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}