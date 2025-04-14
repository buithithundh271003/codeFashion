// // /*
// //   This example requires some changes to your config:
  
// //   ```
// //   // tailwind.config.js
// //   module.exports = {
// //     // ...
// //     theme: {
// //       extend: {
// //         gridTemplateRows: {
// //           '[auto,auto,1fr]': 'auto auto 1fr',
// //         },
// //       },
// //     },
// //     plugins: [
// //       // ...
// //       require('@tailwindcss/aspect-ratio'),
// //     ],
// //   }
// //   ```
// // */
// // import "./detail.css"
// // import {useNavigate,useLocation, useSearchParams} from "react-router-dom"
// // import { useEffect, useState } from 'react'
// // import {useDispatch,useSelector} from 'react-redux'
// // import { StarIcon } from '@heroicons/react/20/solid'
// // import { RadioGroup } from '@headlessui/react'
// // import {Rating, Grid} from "@mui/material"
// // import ProductReview from "./ProductReview"
// // import { truyendai } from "../../../Data/truyendai"
// // import HomeSectionCard from "../HomeSectionCard/HomeSectionCard"
// // import { findProducts, findProductsById } from "../../../State/Product/Action"
// // import { store } from "../../../State/Store"
// // import { addItemToCart } from "../../../State/Cart/Action"
// // import ReviewForm from "../../Review/ReviewForm"
// // import { getAllReview } from "../../../State/Review/Action"
// // import Swal from 'sweetalert2'
// // import Pagination from "../Pagination/Pagination"

// // export default function ProductDetails({props}) {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [postsPerPage] = useState(3); 
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const products = useSelector(store=>store);
// //   const {review} = useSelector(store=>store);
// //   const {product}=useSelector(store=>store);
// //  const {cart} = useSelector(store=>store);
// //   const location = useLocation();
// //   const params = location.pathname.split("/")[2];
// //   const jwt = localStorage.getItem("jwt")
// //   console.log(params)
// //   const indexOfLastPost = currentPage * postsPerPage;
// //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
// //   useEffect(()=>{
// //     const req = {productId: params}
// //    dispatch(findProductsById(req));
   
// //   },[dispatch, params])
// //   useEffect(()=>{
// //     dispatch(getAllReview(params));
// //   },[dispatch, params, review.payload])
// //   console.log(products?.product)
// //   const handleAddToCart =(event)=>{
// //     // event.preventDefault()
// //     const data = {productId: params}
// //     dispatch(addItemToCart(data))
// //     if(jwt){
// //       const Toast = Swal.mixin({
// //         toast: true,
// //         position: "top-end",
// //         showConfirmButton: false,
// //         timer: 3000,
// //         timerProgressBar: true,
// //         didOpen: (toast) => {
// //           toast.onmouseenter = Swal.stopTimer;
// //           toast.onmouseleave = Swal.resumeTimer;
// //         }
// //       });
// //     Toast.fire({
// //       icon: "success",
// //       title: "Thêm sản phẩm vào giỏ hàng thành công"
// //     });
// //     navigate('/cart')
// //     }else{
// //       Swal.fire({
// //         title: "Đăng nhập để thêm sản phẩm",
// //         showClass: {
// //           popup: `
// //             animate__animated
// //             animate__fadeInUp
// //             animate__faster
// //           `
// //         },
// //         hideClass: {
// //           popup: `
// //             animate__animated
// //             animate__fadeOutDown
// //             animate__faster
// //           `
// //         }
// //       });
// //       navigate('/login')
// //     }
    
// //   }
// //   const paginate = pageNumber => setCurrentPage(pageNumber);

// //   const Product = products.product.product;
// //   console.log(products.product.products)
// //   const truyentuongtu = products.product.products?.filter((item)=>item.danhmuc===Product?.danhmuc)
// //   console.log(review);
// //   const currentPosts = review?.reviews.slice(indexOfFirstPost, indexOfLastPost);

// //   return (
// //     <div className="bg-white lb:px-20">
// //       <div className="pt-6">
// //         <nav aria-label="Breadcrumb">
// //           <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            
// //             <li className="text-sm">
// //               <a href={products.product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
// //                 {Product?.title}
// //               </a>
// //             </li>
// //           </ol>
// //         </nav>
// // <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
// //    {/* Image gallery */}
// //    <div className="flex flex-col items-center">
// //           <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
// //             <img
// //               src={Product?.images[0]?.thumbUrl}
// //               alt={"anh san pham"}
// //               className="h-full w-full object-cover object-center"
// //             />
// //           </div>
           
         
// //         </div>

// //         {/* Product info */}
// //         <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
// //           <div className="lg:col-span-2 ">
// //             <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{Product?.title}</h1>
// //             <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'></h1>
// //           </div>

// //           {/* Options */}
// //           <div className="mt-4 lg:row-span-3 lg:mt-0">
// //             <h2 className="sr-only">{Product?.description}</h2>
// //             <div className='flex space-x-5 items-center text-lg lg:text-x1 text-gray-900 mt-6'>
// //               <p className='font-semibold'>{Product?.price} đ</p>
              
// //               <p className='text-green-600 font-semibold'>Giảm giá -{Product?.discount}đ</p>
// //             </div>

// //             {/* Reviews */}
// //             <div className="mt-6">
// //             <Rating name="read-only" value={3.5} disabled />
// //             {/* <p className='opacity-50 text-sm'>  {Product?.reviews?.length} đã đánh giá</p> */}
// //             </div>

// //             <form   className="mt-10">
// //               {/* Colors */}
             

// //               {/* Sizes */}
            
// //               <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
// //             {/* Description and details */}
// //             <div>
// //               <h3 className="sr-only">Description</h3>

// //               <div className="space-y-6">
// //                 <p className="text-base text-gray-900">{Product?.description}</p>
// //               </div>
// //             </div>

            

        
// //           </div>
// //               <button
// //                 onClick={handleAddToCart}
// //                 type="submit"
// //                 className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
// //               >
// //                 ADD TO CART
// //               </button>
// //             </form>
// //           </div>

         
// //         </div>
// // </section>
// // {/* rating and review */}
// //        <section>
// //             <h1 className="font-semibold text-lg pb-4">Đánh giá gần đây</h1>
// //             <div className="border p-5">
// //               <ReviewForm/>
// //               <Grid container spacing={7}>
// //               <Grid item xs={7}>
// //                 <div className="space-y-5">
// //                   {currentPosts.map((item)=><>
// //                     <ProductReview
                  
// //                   item={item}productId = {location.pathname.split("/")[2]}/>
// //                   </>
// //                 )  }
// //                 </div>
// //                 <Pagination
// //                   postsPerPage={postsPerPage}
// //                   totalPosts={review?.reviews.length}
// //                   paginate={paginate}
// //                   product = {location.pathname.split("/")[2]}
// //                 />
// //               </Grid>
// //               </Grid>
// //             </div>
// //        </section>
// // {/* san pham tuong tu */}
// // <section className="pt-10">
// //             <h1 className="font-semibold text-lg pb-4">Sản phẩm tương tự</h1>
// //             <div className="px-10 flex flex-wrap space-y-5">
// //               {truyentuongtu?.map((item)=>
               
// //               <HomeSectionCard  product={item}/>)}
// //             </div>
// // </section>
// //       </div>
// //     </div>
// //   )
// // }

// import "./detail.css"
// import {useNavigate,useLocation, useSearchParams} from "react-router-dom"
// import { useEffect, useState } from 'react'
// import {useDispatch,useSelector} from 'react-redux'
// import { StarIcon } from '@heroicons/react/20/solid'
// import { RadioGroup } from '@headlessui/react'
// import {Rating, Grid} from "@mui/material"
// import ProductReview from "./ProductReview"
// import { truyendai } from "../../../Data/truyendai"
// import HomeSectionCard from "../HomeSectionCard/HomeSectionCard"
// import { findProducts, findProductsById } from "../../../State/Product/Action"
// import { store } from "../../../State/Store"
// import { addItemToCart } from "../../../State/Cart/Action"
// import ReviewForm from "../../Review/ReviewForm"
// import { getAllReview } from "../../../State/Review/Action"
// import Swal from 'sweetalert2'
// import Pagination from "../Pagination/Pagination"
// import {IconButton, Button} from '@mui/material'
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';
// // import {useDispatch} from 'react-redux'

// export default function ProductDetails({props}) {
// const [currentPage, setCurrentPage] = useState(1);
// const [postsPerPage] = useState(3); 
// const navigate = useNavigate();
// const dispatch = useDispatch();
// const products = useSelector(store=>store);
// const {review} = useSelector(store=>store);
// const {product}=useSelector(store=>store);
// const {cart} = useSelector(store=>store);
// const location = useLocation();
// const params = location.pathname.split("/")[2];
// const jwt = localStorage.getItem("jwt")
// console.log(params)
// const indexOfLastPost = currentPage * postsPerPage;
// const indexOfFirstPost = indexOfLastPost - postsPerPage;
// useEffect(()=>{
//   const req = {productId: params}
//  dispatch(findProductsById(req));
 
// },[dispatch, params])
// useEffect(()=>{
//   dispatch(getAllReview(params));
// },[dispatch, params, review.payload])
// console.log(products?.product)
// const handleAddToCart =(event)=>{
//   // event.preventDefault()
//   const data = {productId: params}
//   dispatch(addItemToCart(data))
//   if(jwt){
//     const Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       }
//     });
//   Toast.fire({
//     icon: "success",
//     title: "Thêm sản phẩm vào giỏ hàng thành công"
//   });
//   navigate('/cart')
//   }else{
//     Swal.fire({
//       title: "Đăng nhập để thêm sản phẩm",
//       showClass: {
//         popup: `
//           animate__animated
//           animate__fadeInUp
//           animate__faster
//         `
//       },
//       hideClass: {
//         popup: `
//           animate__animated
//           animate__fadeOutDown
//           animate__faster
//         `
//       }
//     });
//     navigate('/login')
//   }
  
// }
// const paginate = pageNumber => setCurrentPage(pageNumber);

// const Product = products.product.product;
// console.log(products.product.products)
// const truyentuongtu = products.product.products?.filter((item)=>item.danhmuc===Product?.danhmuc)
// console.log(review);
// const currentPosts = review?.reviews.slice(indexOfFirstPost, indexOfLastPost);
// const handleUpdateAddToCart=(num )=>{
//   const data= {data:{quanity:item?.quanity+num}, cartItemId: item._id}
//           console.log(data, item)
//           dispatch(updateCartItem(data));
// }

// return (
//   <div className="bg-white">
//     <div className="pt-6 container mx-auto px-4">
//       {/* Breadcrumb */}
//       <nav aria-label="Breadcrumb">
//         <ol className="flex items-center space-x-2 text-sm">
//           <li>
//             <a href="/" className="text-gray-500 hover:text-gray-600">TRANG CHỦ</a>
//           </li>
//           <li>/</li>
//           <li>
//             <a href="/san-pham" className="text-gray-500 hover:text-gray-600">SẢN PHẨM</a>
//           </li>
//           <li>/</li>
        
//           <li>/</li>
//           <li>
//             <a href="/san-pham/vay-dam" className="text-gray-500 hover:text-gray-600">VÁY ĐẦM</a>
//           </li>
//           <li>/</li>
//           <li className="font-medium text-gray-900">
//             {Product?.title}
//           </li>
//         </ol>
//       </nav>

//       {/* Product Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//         {/* Image */}
//         {/* <div className="flex justify-center">
//           <img
//             src={Product?.images[0]?.thumbUrl}
//             alt={Product?.title}
//             className="w-full max-w-md object-cover"
//           />
//         </div> */}
//         <div className="flex justify-center">
//           <img
//             src={Product?.images[0]?.thumbUrl}
//             alt={Product?.title}
//             className="w-[400px] h-[400px] object-contain" // Kích thước cố định 200x200px
//           />
//         </div>

//         {/* Product Info */}
//         <div className="space-y-4">
//           <h1 className="text-2xl font-bold">{Product?.title}</h1>
          
//           <div className="text-lg">
//             <p className="text-gray-500">MSP: {Product?.id}</p>
//             <p className="font-bold text-2xl text-gray-900">{Product?.price?.toLocaleString('vi-VN')}đ</p>
//           </div>

//           {/* Color Selection */}
//           <div className="pt-4">
//             <p className="font-medium" onClick={()=>handleUpdateAddToCart()}sx={{color:'#7E5FBE'}}>COLOR: <span className="font-normal">Trắng</span></p>
//           </div>

//           {/* Size Selection */}
//           <div className="pt-4">
//             <p className="font-medium">SIZE:</p>
//             <div className="flex space-x-2 mt-2" onClick={()=>handleUpdateAddToCart()}sx={{color:'#7E5FBE'}}>
//               {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
//                 <button 
//                   key={size}
//                   className="border border-gray-300 px-3 py-1 hover:bg-gray-100"
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity */}
//                <div className='lg:flex items-center lg:space-x-10 pt-4'>
//                               <div className='flex items-center space-x-2'>
//                               <IconButton onClick={()=>handleUpdateAddToCart(-1)}sx={{color:'#7E5FBE'}}  disabled={item?.quanity<=1}>
//                                   <RemoveCircleOutlineIcon/>
//                               </IconButton>
//                               <span className='py-1 px-7 border rounded-sm'>{item?.quanity}</span>
//                               <IconButton onClick={()=>handleUpdateAddToCart(1)}sx={{color:'#7E5FBE'}}>
//                                   <AddCircleOutlineIcon/>
//                               </IconButton>
                             
//                               </div>
                           
//                          </div>

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="mt-6 bg-black text-white px-8 py-3 w-full md:w-auto hover:bg-gray-800 transition-colors"
//           >
//             THÊM VÀO GIỎ HÀNG
//           </button>

//           {/* Product Details */}
//           <div className="pt-8">
//             <div className="mt-4">
//               <h3 className="font-medium">MÔ TẢ SẢN PHẨM</h3>
//               <ul className="list-disc pl-5 mt-2 space-y-1">
//                 <li> {Product.description}</li>
                
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section className="mt-16">
//         <h1 className="font-semibold text-lg pb-4">Đánh giá gần đây</h1>
//         <div className="border p-5">
//           <ReviewForm/>
//           <Grid container spacing={7}>
//             <Grid item xs={7}>
//               <div className="space-y-5">
//                 {currentPosts.map((item)=>(
//                   <ProductReview
//                     key={item.id}
//                     item={item}
//                     productId={location.pathname.split("/")[2]}
//                   />
//                 ))}
//               </div>
//               <Pagination
//                 postsPerPage={postsPerPage}
//                 totalPosts={review?.reviews.length}
//                 paginate={paginate}
//                 product={location.pathname.split("/")[2]}
//               />
//             </Grid>
//           </Grid>
//         </div>
//       </section>

//       {/* Similar Products */}
//       <section className="pt-10">
//         <h1 className="font-semibold text-lg pb-4">Sản phẩm tương tự</h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
//         </div>
//       </section>
//     </div>
//   </div>
// )
// }
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
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-600">TRANG CHỦ</a>
            </li>
            <li>/</li>
            <li>
              <a href="/san-pham" className="text-gray-500 hover:text-gray-600">SẢN PHẨM</a>
            </li>
            <li>/</li>
            <li>
              <a href="/san-pham/vay-dam" className="text-gray-500 hover:text-gray-600">VÁY ĐẦM</a>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">
              {Product?.title}
            </li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={Product?.images[0]?.thumbUrl}
              alt={Product?.title}
              className="w-full max-w-md object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">{Product?.title}</h1>
            
            {/* Product ID and Price */}
            <div className="space-y-2">
              <p className="text-gray-500">Mã sản phẩm: {Product?.id}</p>
              <p className="font-bold text-2xl text-gray-900">
                {Product?.price?.toLocaleString('vi-VN')}đ
              </p>
              {Product?.discount && (
                <p className="text-green-600 font-medium">
                  Giảm giá: {Product?.discount?.toLocaleString('vi-VN')}đ
                </p>
              )}
            </div>

            {/* Product Rating */}
            <div className="flex items-center space-x-2">
              <Rating 
                name="product-rating" 
                value={Product?.averageRating || 0} 
                precision={0.5} 
                readOnly 
              />
              <span className="text-gray-500 text-sm">
                ({Product?.reviews?.length || 0} đánh giá)
              </span>
            </div>

            {/* Color Selection */}
            <div className="pt-4">
              <p className="font-medium text-gray-900">Màu sắc: 
                <span className="font-normal ml-2">{selectedColor}</span>
              </p>
              <div className="flex space-x-2 mt-2">
                {['Trắng', 'Đen', 'Xanh', 'Hồng'].map(color => (
                  <button
                    key={color}
                    className={`px-3 py-1 border rounded-md ${
                      selectedColor === color 
                        ? 'border-black bg-gray-100' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="pt-4">
              <p className="font-medium text-gray-900">Kích cỡ:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
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
            <div className="pt-4 flex items-center space-x-4">
              <p className="font-medium text-gray-900">Số lượng:</p>
              <div className="flex items-center border rounded-md">
                <IconButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  size="small"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <span className="px-4 py-1">{quantity}</span>
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
              className="mt-6 w-full md:w-3/4 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
              disabled={!selectedSize}
            >
              THÊM VÀO GIỎ HÀNG
            </button>

            {/* Product Description */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-medium text-lg text-gray-900 mb-3">MÔ TẢ SẢN PHẨM</h3>
              <div className="prose max-w-none text-gray-700">
                {Product?.description || 'Không có mô tả chi tiết.'}
              </div>
            </div>
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