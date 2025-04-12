import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {Grid, TextField, Button} from '@mui/material'
import { addItemToCart } from "../../../State/Cart/Action"
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';


const HomeProduct = ({data}) => {
    const navigate = useNavigate();


  const { auth } = useSelector(store => store);
  console.log("auth",auth);
  const a=localStorage.getItem("jwt");
  console.log("a",a);
  const dispatch = useDispatch();
 
  const location = useLocation();
  const params = location.pathname.split("/")[2];
 
 
  const handleAddToCart =(event)=>{
    // event.preventDefault()
    const data = {productId: params}
    dispatch(addItemToCart(data))
    if(a){
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
      title: "Thêm sản phẩm vào giỏ hàng thành công"
    });
    navigate('/cart')
    }else{
      Swal.fire({
        title: "Đăng nhập để thêm sản phẩm",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      navigate('/login')
    }
    
  }


    console.log("homepro",data);
    return (
        <>
 
       </>
       
    )
}


export default HomeProduct;
