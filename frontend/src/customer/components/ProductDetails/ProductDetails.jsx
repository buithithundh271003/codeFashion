
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
  const [selectedColor, setSelectedColor] = useState('Trắng');
  const [postsPerPage] = useState(3);

  // Router and Redux hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Selectors
  const { product: { product: Product, products }, review, cart } = useSelector(store => store);
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
  const similarProducts = products?.products?.filter(item => item.danhmuc === Product?.danhmuc);
  const currentPosts = review?.reviews?.slice(indexOfFirstPost, indexOfLastPost) || [];

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

    const cartItem = {
      productId: params,
      quantity,
      size: selectedSize,
      color: selectedColor
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
    navigate('/cart');
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white">
      <div className="pt-6 container mx-auto px-4">
        
          <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="hover:text-black cursor-pointer">Home</span> &gt; 
        <span className="hover:text-black cursor-pointer"> Product</span> &gt; 
        <span className="text-black"> Denim Worker Jacket</span>
      </div>

      {/* Product Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Product Image - Placeholder */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Denim Worker Jacket</h1>
          
          {/* Rating and Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Rating name="product-rating" value={5} precision={0.5} readOnly />
              <span className="text-gray-500 text-sm ml-1">(1 reviewed)</span>
            </div>
            <span className="text-green-600">Status: In Stock</span>
          </div>

          {/* Price */}
          <p className="font-bold text-2xl text-gray-900">$392.00</p>

          {/* Description */}
          <div className="prose max-w-none text-gray-700">
            <p>
              Enhobbying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplug the chords, and takes the show on the road.
            </p>
            <p className="mt-2">
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stockfastened hero with a well-balanced audio which boasts a clear midrange and extended lights for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
            </p>
          </div>

          {/* Size Selection */}
          <div className="pt-4">
            <p className="font-medium text-gray-900">Size:</p>
            <div className="flex space-x-4 mt-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className={`w-12 h-12 flex items-center justify-center border rounded-full ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="pt-4">
            <p className="font-medium text-gray-900 mb-2">Quantity</p>
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
                disabled={quantity >= 10}
                size="small"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
            disabled={!selectedSize}
          >
            ADD TO CART
          </button>

          {/* Tags */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Tags: <span className="text-gray-700">jackets & Coats Hermes</span>
            </p>
          </div>

          {/* Share */}
          <div className="pt-2">
            <p className="text-sm text-gray-500">Share:</p>
            {/* Add social share buttons here */}
             {/* Share Buttons */}
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-2">Share:</p>
            <ul className="flex space-x-2 p-0 m-0 items-center">
              <li>
                <FacebookShareButton
                  // url={productUrl}
                  // quote={productDescription}
                  // hashtag="#fashion"
                  // className="flex"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <FontAwesomeIcon icon={faFacebook} />
                  </div>
                </FacebookShareButton>
              </li>
              
              <li>
                <TwitterShareButton
                 
                >
                  <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </TwitterShareButton>
              </li>
              
              <li>
                <PinterestShareButton
                 
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
                  className="flex"
                >
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    <FontAwesomeIcon icon={faYoutube} />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        
          </div>
        </div>
      </section>
    </div>

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