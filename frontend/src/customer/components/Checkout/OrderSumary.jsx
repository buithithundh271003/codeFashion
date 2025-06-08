// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getOrderById } from '../../../State/Order/Action';
// import { creatPayment } from '../../../State/Payment/Action';
// import AddressCard from '../AddressCard/AddressCard';
// import CartItemCheckout from '../Cart/CartItemCheckout';
// import { Card, Typography, Divider, Select, Button, Row, Col, message } from 'antd';

// const { Title, Text } = Typography;
// const { Option } = Select;

// const OrderSummary = () => {
//   const dispatch = useDispatch();
//   const { order } = useSelector(store => store);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const orderId = searchParams.get("order_id");

//   const [paymentMethod, setPaymentMethod] = useState(null);

//   useEffect(() => {
//     dispatch(getOrderById(orderId));
//   }, [orderId]);

//   let totalPrice = 0;
//   let totalDiscount = 0;
//   order?.order?.orderItems.forEach((item) => {
//     totalPrice += item.quanity * item.price;
//     totalDiscount += item.quanity * item.discount;
//   });

//   const handlePaymentChange = (value) => {
//     setPaymentMethod(value);
//   };

//   const handleThanhToan = () => {
//     if (!paymentMethod) {
//       message.warning('Vui lòng chọn phương thức thanh toán!');
//       return;
//     }
//     dispatch(creatPayment(orderId));
//     if (paymentMethod === 'ck') {
//       navigate(`/orderpay/?orderId=${orderId}&totalAmount=${Number(totalPrice)}`);
//     } else {
//       navigate(`/success/?orderId=${orderId}`);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <Row gutter={[16, 16]}>
//         {/* Địa chỉ giao hàng */}
//         <Col xs={24}>
//           <Card title="Địa chỉ giao hàng" bordered={false}>
//             <AddressCard address={order?.order} diachi={order?.order?.diachi} />
//           </Card>
//         </Col>

      

//         <Col xs={24} lg={8}>
//           <Card title="Hóa đơn" bordered={false}>
//             <div className="space-y-3">
//               <Row justify="space-between">
//                 <Text>Giá Tiền</Text>
//                 <Text>{totalPrice}đ</Text>
//               </Row>
//               <Row justify="space-between">
//                 <Text type="success">Giảm giá</Text>
//                 <Text type="success">-{totalDiscount}đ</Text>
//               </Row>
//               <Row justify="space-between">
//                 <Text>Phí Ship</Text>
//                 <Text>0đ</Text>
//               </Row>
//               <Divider />
//               <Row justify="space-between">
//                 <Title level={5}>Tổng cộng</Title>
//                 <Title level={5} type="success">
//                   {totalPrice - totalDiscount}đ
//                 </Title>
//               </Row>

//               <div className="mt-4">
//                 <Text strong>Phương thức thanh toán</Text>
//                 <Select
//                   placeholder="Chọn phương thức"
//                   onChange={handlePaymentChange}
//                   className="w-full mt-2"
//                   value={paymentMethod}
//                 >
//                   <Option value="gh">Giao hàng</Option>
//                   <Option value="ck">Chuyển khoản</Option>
//                 </Select>
//               </div>

//               <Button
//                 type="primary"
//                 block
//                 className="mt-6"
//                 onClick={handleThanhToan}
//               >
//                 THANH TOÁN
//               </Button>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default OrderSummary;
// import React, { useEffect, useState } from 'react'; 
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getOrderById } from '../../../State/Order/Action';
// import { creatPayment } from '../../../State/Payment/Action';
// import AddressCard from '../AddressCard/AddressCard';
// import CartItemCheckout from '../Cart/CartItemCheckout';
// import { Card, Typography, Divider, Select, Button, Row, Col, message } from 'antd';
// import { getUSer } from '../../../State/Auth/Action'

// const { Title, Text } = Typography;
// const { Option } = Select;


// const OrderSummary = () => {
//   const dispatch = useDispatch();
//   const { order } = useSelector(store => store);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const jwt = localStorage.getItem("jwt");

//   // const {auth} = useSelector(store=>store);
//   useEffect(()=>{
//     if(jwt){
//       dispatch(getUSer(jwt))
//     }

//   },[]);
//   const searchParams = new URLSearchParams(location.search);
//   const orderId = searchParams.get("order_id");

//   const [paymentMethod, setPaymentMethod] = useState(null);

//   useEffect(() => {
//     if (orderId) dispatch(getOrderById(orderId));
//   }, [orderId, dispatch]);

//   // Tính tổng tiền và giảm giá
//   const { totalPrice, totalDiscount } = order?.order?.orderItems?.reduce(
//     (acc, item) => {
//       acc.totalPrice += item.quanity * item.price;
//       acc.totalDiscount += item.quanity * item.discount;
//       return acc;
//     },
//     { totalPrice: 0, totalDiscount: 0 }
//   ) || { totalPrice: 0, totalDiscount: 0 };

//   const handlePaymentChange = (value) => {
//     setPaymentMethod(value);
//   };

//   const handleThanhToan = () => {
//     if (!paymentMethod) {
//       message.warning('Vui lòng chọn phương thức thanh toán!');
//       return;
//     }
//     dispatch(creatPayment(orderId));
//     if (paymentMethod === 'ck') {
//       navigate(`/orderpay/?orderId=${orderId}&totalAmount=${Number(totalPrice - totalDiscount)}&userid=${}`);
//     } else {
//       navigate(`/success/?orderId=${orderId}`);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
//       <Row gutter={[24, 24]}>
//         {/* Địa chỉ giao hàng */}
//         <Col xs={24}>
//           <Card title="Địa chỉ giao hàng" bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//             <AddressCard address={order?.order} diachi={order?.order?.diachi} />
//           </Card>
//         </Col>

//         {/* Danh sách sản phẩm trong đơn (nếu muốn show) */}
//         <Col xs={24} lg={16}>
//           <Card title="Chi tiết đơn hàng" bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//             {order?.order?.orderItems?.length > 0 ? (
//               order.order.orderItems.map(item => (
//                 <CartItemCheckout key={item.id} item={item} />
//               ))
//             ) : (
//               <Text>Không có sản phẩm trong đơn hàng.</Text>
//             )}
//           </Card>
//         </Col>

//         {/* Hóa đơn và thanh toán */}
//         <Col xs={24} lg={8}>
//           <Card title="Hóa đơn" bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               <Row justify="space-between">
//                 <Text>Giá Tiền</Text>
//                 <Text>{totalPrice.toLocaleString()}đ</Text>
//               </Row>
//               <Row justify="space-between">
//                 <Text type="success">Giảm giá</Text>
//                 <Text type="success">-{totalDiscount.toLocaleString()}đ</Text>
//               </Row>
//               <Row justify="space-between">
//                 <Text>Phí Ship</Text>
//                 <Text>0đ</Text>
//               </Row>
//               <Divider />
//               <Row justify="space-between" align="middle">
//                 <Title level={5} style={{ margin: 0 }}>Tổng cộng</Title>
//                 <Title level={5} type="success" style={{ margin: 0 }}>
//                   {(totalPrice - totalDiscount).toLocaleString()}đ
//                 </Title>
//               </Row>

//               <div>
//                 <Text strong>Phương thức thanh toán</Text>
//                 <Select
//                   placeholder="Chọn phương thức"
//                   onChange={handlePaymentChange}
//                   value={paymentMethod}
//                   style={{ width: '100%', marginTop: 8 }}
//                 >
//                   <Option value="gh">Giao hàng</Option>
//                   <Option value="ck">Chuyển khoản</Option>
//                 </Select>
//               </div>

//               <Button
//                 type="primary"
//                 block
//                 size="large"
//                 style={{ marginTop: 24 }}
//                 onClick={handleThanhToan}
//               >
//                 THANH TOÁN
//               </Button>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default OrderSummary;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { creatPayment } from '../../../State/Payment/Action';
import AddressCard from '../AddressCard/AddressCard';
import CartItemCheckout from '../Cart/CartItemCheckout';
import { Card, Typography, Divider, Select, Button, Row, Col, message } from 'antd';
import { getUSer } from '../../../State/Auth/Action';
import { getCart } from '../../../State/Cart/Action';
const { Title, Text } = Typography;
const { Option } = Select;

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { order, auth } = useSelector(store => store);
  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector(store => store);
   useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Gọi API lấy thông tin user
  useEffect(() => {
    if (jwt) {
      dispatch(getUSer(jwt));
    }
  }, [dispatch, jwt]);

  // Lấy orderId từ URL
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const [paymentMethod, setPaymentMethod] = useState(null);

  // Gọi API lấy order
  useEffect(() => {
    if (orderId) dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  // Tính tổng tiền và giảm giá
  const { totalPrice, totalDiscount } = order?.order?.orderItems?.reduce(
    (acc, item) => {
      acc.totalPrice += item.quanity * item.price;
      acc.totalDiscount += item.quanity * item.discount;
      return acc;
    },
    { totalPrice: 0, totalDiscount: 0 }
  ) || { totalPrice: 0, totalDiscount: 0 };

  const handlePaymentChange = (value) => {
    setPaymentMethod(value);
  };
      console.log("---------------",cart);


  const handleThanhToan = async() => {
    if (!paymentMethod) {
      message.warning('Vui lòng chọn phương thức thanh toán!');
      return;
    }

    // Gọi action tạo payment
    dispatch(creatPayment(orderId));

    // Lấy userId từ Redux store
    const userId = auth.user._id;

    if (paymentMethod === 'ck') {
      // CK: chuyển hướng đến trang orderpay
      navigate(`/orderpay/?orderId=${orderId}&totalAmount=${Number(totalPrice - totalDiscount)}&userid=${userId}`);
        try {
      const response = await fetch("http://localhost:4000/api/mail/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: auth.user.email, // Lấy từ state hoặc profile người dùng
          cartItems: cart.cartItem,
          total: totalPrice - totalDiscount,
        }),
      });

      const data = await response.json();
    
    } catch (err) {
      console.error(err);
    }

    } else {
      // GH: chuyển hướng đến success
      navigate(`/success/?orderId=${orderId}`);
       try {
      const response = await fetch("http://localhost:4000/api/mail/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: auth.user.email, // Lấy từ state hoặc profile người dùng
          cartItems: cart.cartItem,
          total: totalPrice - totalDiscount,
        }),
      });

      const data = await response.json();
    
    } catch (err) {
      console.error(err);
    }
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <Row gutter={[24, 24]}>
        {/* Địa chỉ giao hàng */}
        <Col xs={24}>
          <Card
            title="Địa chỉ giao hàng"
            bordered={false}
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <AddressCard address={order?.order} diachi={order?.order?.diachi} />
          </Card>
        </Col>

        {/* Danh sách sản phẩm */}
        <Col xs={24} lg={16}>
          <Card
            title="Chi tiết đơn hàng"
            bordered={false}
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            {order?.order?.orderItems?.length > 0 ? (
              order.order.orderItems.map(item => (
                <CartItemCheckout key={item.id} item={item} />
              ))
            ) : (
              <Text>Không có sản phẩm trong đơn hàng.</Text>
            )}
          </Card>
        </Col>

        {/* Hóa đơn và thanh toán */}
        <Col xs={24} lg={8}>
          <Card
            title="Hóa đơn"
            bordered={false}
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Row justify="space-between">
                <Text>Giá Tiền</Text>
                <Text>{totalPrice.toLocaleString()}đ</Text>
              </Row>
              <Row justify="space-between">
                <Text type="success">Giảm giá</Text>
                <Text type="success">-{totalDiscount.toLocaleString()}đ</Text>
              </Row>
              <Row justify="space-between">
                <Text>Phí Ship</Text>
                <Text>0đ</Text>
              </Row>
              <Divider />
              <Row justify="space-between" align="middle">
                <Title level={5} style={{ margin: 0 }}>Tổng cộng</Title>
                <Title level={5} type="success" style={{ margin: 0 }}>
                  {(totalPrice - totalDiscount).toLocaleString()}đ
                </Title>
              </Row>

              <div>
                <Text strong>Phương thức thanh toán</Text>
                <Select
                  placeholder="Chọn phương thức"
                  onChange={handlePaymentChange}
                  value={paymentMethod}
                  style={{ width: '100%', marginTop: 8 }}
                >
                  <Option value="gh">Giao hàng</Option>
                  <Option value="ck">Chuyển khoản</Option>
                </Select>
              </div>

              <Button
                type="primary"
                block
                size="large"
                style={{ marginTop: 24 }}
                onClick={handleThanhToan}
              >
                THANH TOÁN
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderSummary;
