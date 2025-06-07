
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Rating, Grid, IconButton, Button } from "@mui/material";
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Swal from 'sweetalert2';

import "./detail.css";
import ProductReview from "./ProductReview";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCart, updateCartItem } from "../../../State/Cart/Action";
import ReviewForm from "../../Review/ReviewForm";
import { getAllReview } from "../../../State/Review/Action";
import Pagination from "../Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faPinterest,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton
} from 'react-share';

export default function ProductDetails() {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [postsPerPage] = useState(3);

  // Router and Redux hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Selectors
  const { product: { product, products }, review, cart } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const params = location.pathname.split("/")[2];
  
  // Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Fetch product and reviews on mount
  useEffect(() => {
    dispatch(findProductsById({ productId: params }));
    dispatch(getAllReview(params));
  }, [dispatch, params]);

  // Filter similar products
  const similarProducts = products?.filter(item =>  item._id !== product?._id);
  console.log("kkkkkkkkkkkkk",similarProducts)
  // Kiểm tra trước khi filter


console.log("kkkkkkkkkkkkk similarProducts:", similarProducts);
console.log("gg:", products);
console.log("kkkkkkkkkkkkk similarProducts:", product);




  const currentPosts = review?.reviews?.slice(indexOfFirstPost, indexOfLastPost) || [];

  // Calculate average rating
  const averageRating = 5
    //  const averageRating = review?.reviews?.length > 0 
    // ? review.reviews.reduce((acc, curr) => acc + curr.rating, 0) / review.reviews.length 
    // : 0;

  // Handlers
  const handleAddToCart = (event) => {
    event.preventDefault();
    
    if (!jwt) {
      Swal.fire({
        title: "Yêu cầu đăng nhập",
        text: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location.pathname } });
        }
      });
      return;
    }

    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn kích thước",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const cartItem = {
      productId: params,
      quantity,
      size: selectedSize,
      color: selectedColor || product?.color
    };

    dispatch(addItemToCart(cartItem));

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
      title: "Đã thêm sản phẩm vào giỏ hàng"
    });
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= (product?.quantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(product)
  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6 container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="hover:text-black cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span> &gt; 
          <span className="hover:text-black cursor-pointer" onClick={() => navigate(`/products/${product.danhmuc}`)}> {product.danhmuc}</span> &gt; 
          <span className="text-black"> {product.name}</span>
        </div>

        {/* Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Product Images */}
          <div className="flex flex-col space-y-4">
            {/* <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product?.images[0]?.thumbUrl || "https://via.placeholder.com/500"} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div> */}
              <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
    <img 
      src={product?.images[0]?.thumbUrl|| "https://via.placeholder.com/500"} 
      alt={product.name} 
      className="max-w-full max-h-full object-contain"
      style={{ mixBlendMode: 'multiply' }} // Giúp ảnh trông tự nhiên hơn trên nền trắng
    />
  </div>
            {/* <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-24 bg-gray-100 rounded-md overflow-hidden cursor-pointer">
                  <img 
                    src={product.imageUrl || "https://via.placeholder.com/150"} 
                    alt={`${product.name} ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Rating and Status */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Rating 
                  name="product-rating" 
                  value={averageRating} 
                  precision={0.5} 
                  readOnly 
                />
                <span className="text-gray-500 text-sm ml-1">
                  ({review?.reviews?.length || 0} đánh giá)
                </span>
              </div>
              <span className={`text-sm font-medium ${
                product.quantity > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <p className="font-bold text-2xl text-gray-900">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.discountedPrice || product.price)}
              </p>
              {product.discountedPrice && (
                <p className="text-gray-500 line-through">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
              )}
              {product.discountedPrice && (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  -{Math.round((1 - product.discountedPrice / product.price) * 100)}%
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
            </div>

         

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-4">
                <p className="font-medium text-gray-900">Kích thước:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-4">
              <p className="font-medium text-gray-900 mb-2">Số lượng</p>
              <div className="flex items-center border rounded-md w-32">
                <IconButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  size="small"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <span className="px-4 py-1 flex-grow text-center">{quantity}</span>
                <IconButton 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product.quantity || 10)}
                  size="small"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              {product.quantity && (
                <p className="text-sm text-gray-500 mt-1">
                  {product.quantity} sản phẩm có sẵn
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`mt-6 w-full py-3 px-6 rounded-md transition-colors ${
                product.quantity > 0
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedSize || product.quantity <= 0}
            >
              {product.quantity > 0 ? 'THÊM VÀO GIỎ HÀNG' : 'HẾT HÀNG'}
            </button>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-200 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Danh mục:</span> {product.danhmuc}
              </p>
              {product.tags && product.tags.length > 0 && (
                <p className="text-sm">
                  <span className="font-medium">Tags:</span> {product.tags.join(', ')}
                </p>
              )}
            </div>

            {/* Share Buttons */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-2">Chia sẻ:</p>
              <ul className="flex space-x-2 p-0 m-0 items-center">
                <li>
                  <FacebookShareButton
                    url={window.location.href}
                    quote={`${product.name} - ${product.description}`}
                    hashtag="#fashion"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                      <FontAwesomeIcon icon={faFacebook} />
                    </div>
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={window.location.href}
                    title={product.name}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                      <FontAwesomeIcon icon={faTwitter} />
                    </div>
                  </TwitterShareButton>
                </li>
                <li>
                  <PinterestShareButton
                    url={window.location.href}
                    media={product.imageUrl}
                    description={product.description}
                  >
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                      <FontAwesomeIcon icon={faPinterest} />
                    </div>
                  </PinterestShareButton>
                </li>
                <li>
                  <a 
                    href={`https://www.youtube.com`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                      <FontAwesomeIcon icon={faYoutube} />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="mt-12 border-t border-gray-200 pt-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">
                Mô tả sản phẩm
              </button>
             
              <button className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Đánh giá ({review?.reviews?.length || 0})
              </button>
            </nav>
          </div>
          <div className="py-6 prose max-w-none">
            <p>{product.description}</p>
            {product.details && (
              <ul className="mt-4 list-disc pl-5">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-16">
          <h1 className="font-semibold text-xl pb-4 text-gray-900">ĐÁNH GIÁ SẢN PHẨM</h1>
          <div className="border border-gray-200 rounded-lg p-6">
            <ReviewForm productId={params} />
            
            {currentPosts.length > 0 ? (
              <>
                <Grid container spacing={4} className="mt-6">
                  <Grid item xs={12} md={8}>
                    <div className="space-y-6">
                      {currentPosts.map((review) => (
                        <ProductReview
                          key={review._id}
                          item={review}
                          productId={params}
                        />
                      ))}
                    </div>
                  </Grid>
                </Grid>
                
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={review?.reviews?.length || 0}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </>
            ) : (
              <p className="text-gray-500 text-center py-6">Chưa có đánh giá nào cho sản phẩm này.</p>
            )}
          </div>
        </section>

        {/* Similar Products Section */}
        {similarProducts?.length > 0 && (
          <section className="mt-16">
            <h1 className="font-semibold text-xl pb-6 text-gray-900">SẢN PHẨM TƯƠNG TỰ</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.slice(0, 4).map((product) => (
                <HomeSectionCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}