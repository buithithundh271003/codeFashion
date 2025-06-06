
// import React, { useEffect } from 'react';
// import CartItem from './CartItem';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getCart } from '../../../State/Cart/Action';
// import Swal from 'sweetalert2';

// const Cart = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { cart } = useSelector(store => store);

//   const handleCheckPayment = (cartItemCount) => {
//     if (cartItemCount === 0) {
//       Swal.fire({
//         title: "Chọn mua sản phẩm để tiếp tục",
//         icon: "warning",
//       });
//     } else {
//       navigate("/checkout?step=2");
//     }
//   }

//   useEffect(() => {
//     dispatch(getCart());
//   }, [dispatch]);

//   // Tính toán tổng
//   let totalPrice = 0;
//   let totalItem = 0;
//   let totalDiscount = 0;

//   const cartItem = cart.cartItem || [];

//   for (let i = 0; i < cartItem.length; i++) {
//     const item = cartItem[i];
//     if (!item) continue; // Bỏ qua phần tử undefined

//     totalItem += item.quanity || 0;
//     totalPrice += (item.price || 0) * (item.quanity || 0);
//     totalDiscount += (item.discount || 0) * (item.quanity || 0);
//   }

//   cart.total = totalPrice;
//   cart.totalItem = totalItem;

//   return (
//     <div>
//       <div className='flex lg:grid grid-cols-3 lg:px-16 relative'>
//         <div className='col-span-2'>
//           {cartItem
//             .filter(item => item && item._id) // Lọc bỏ phần tử undefined hoặc không có _id
//             .map((item) => (
//               <CartItem key={item._id} item={item} />
//           ))}
//         </div>

//         <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
//           <div className='border'>
//             <p className='uppercase font-bold opacity-60 pb-4'>HOÁ ĐƠN</p>
//             <hr />
//             <div className='space-y-3 font-semibold'>
//               <div className='flex justify-between pt-3 text-black'>
//                 <span>Giá tiền</span>
//                 <span>{totalPrice}đ</span>
//               </div>
//               <div className='flex justify-between pt-3 text-green-600'>
//                 <span>Giảm giá</span>
//                 <span>-{totalDiscount}đ</span>
//               </div>
//               <div className='flex justify-between pt-3 text-green-600'>
//                 <span>Phí Ship</span>
//                 <span>0đ</span>
//               </div>
//               <div className='flex justify-between pt-3 font-bold'>
//                 <span>Tổng tiền</span>
//                 <span className='text-green-600'>{totalPrice - totalDiscount}đ</span>
//               </div>
//             </div>

//             <button
//               onClick={() => handleCheckPayment(cartItem.length)}
//               type="button"
//               className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               THANH TOÁN
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;

import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../../State/Cart/Action';
import Swal from 'sweetalert2';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(store => store);

  const handleCheckPayment = (cartItemCount) => {
    if (cartItemCount === 0) {
      Swal.fire({
        title: "Chọn mua sản phẩm để tiếp tục",
        icon: "warning",
      });
    } else {
      navigate("/checkout?step=2");
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Tính toán tổng
  let totalPrice = 0;
  let totalItem = 0;
  let totalDiscount = 0;

  const cartItem = cart.cartItem || [];

  for (let i = 0; i < cartItem.length; i++) {
    const item = cartItem[i];
    if (!item) continue; // Bỏ qua phần tử undefined

    totalItem += item.quanity || 0;
    totalPrice += (item.price || 0) * (item.quanity || 0);
    totalDiscount += (item.discount || 0) * (item.quanity || 0);
  }

  cart.total = totalPrice;
  cart.totalItem = totalItem;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItem
            .filter(item => item && item._id)
            .map(item => (
              <CartItem key={item._id} item={item} />
            ))}
          {cartItem.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              Giỏ hàng của bạn đang trống.
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-lg shadow sticky top-4 h-fit">
          <h2 className="text-lg font-bold text-gray-700 mb-4 uppercase">Hoá Đơn</h2>
          <hr className="mb-4" />
          <div className="space-y-3 text-sm font-medium">
            <div className="flex justify-between text-gray-600">
              <span>Giá tiền</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Giảm giá</span>
              <span>-{totalDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí Ship</span>
              <span>0đ</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-gray-800 text-base">
              <span>Tổng tiền</span>
              <span className="text-green-600 font-bold">
                {(totalPrice - totalDiscount).toLocaleString()}đ
              </span>
            </div>
          </div>
          <button
            onClick={() => handleCheckPayment(cartItem.length)}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md shadow hover:bg-indigo-700 transition duration-200"
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
