// import React, { useEffect } from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {TableContainer,MenuItem,Menu,AvatarGroup,Card,CardHeader,Button,Table,Avatar,TableBody,TableHead, TableRow,TableCell} from '@mui/material'
// import { store } from '../../State/Store';
// import { getOrder, shipOrder, confirmOrder, deliveryOrderOrder, deleteOrder } from '../../State/Admin/Order/Action';
// const OrdersTable = () => {
//   const dispatch = useDispatch();
//   const {adminOrder} = useSelector(store=>store);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleShipOrder = (orderId)=>{
//     dispatch(shipOrder(orderId))
//     handleClose()
//   }
//   const handleconfirmOrder = (orderId)=>{
//     console.log(orderId)
//     dispatch(confirmOrder(orderId))
//     handleClose()

//   }
//   const deliveryOrder = (orderId)=>{

//     console.log(orderId)

//     dispatch(deliveryOrderOrder(orderId))
//     handleClose()

//   }
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleOrderDelete = (orderId)=>{
//     console.log(orderId)

//     dispatch(deleteOrder(orderId))
//   }
//   useEffect(()=>{
//     dispatch(getOrder())
//   },[])
//   const arr = adminOrder.orders
   

//   return (
//     <div>
//             <Card className='mt-2 p-5'>
//       <CardHeader title='All Products'>
      
//       </CardHeader>
//       <TableContainer  >
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//           <TableCell>Hinh anh</TableCell>

//             <TableCell>Ma Khach Hang</TableCell>
//             <TableCell align="right">Ten Khach Hang</TableCell>
//             <TableCell align="right">Ten San pham</TableCell>
//             <TableCell align="right">Gia</TableCell>
//             <TableCell align="right">Trang Thai</TableCell>
//             <TableCell>Update Status don hang</TableCell>

//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {arr.map((row) => (
              
//             <TableRow
//               key={row.product?.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             ><Menu
//             id="basic-menu"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             MenuListProps={{
//               'aria-labelledby': 'basic-button',
//             }}
//           >
//             {row._id}
//             <MenuItem onClick={()=>handleconfirmOrder(row._id)}>Confirm</MenuItem>
//             <MenuItem onClick={()=>handleShipOrder(row._id)}>Shipped</MenuItem>
//             <MenuItem onClick={()=>deliveryOrder(row._id)}>Delivery</MenuItem>
//           </Menu>
//               <TableCell component="th" scope="row">
//                 <AvatarGroup max={3} sx={{justifyContent:'start'}} src={row.imageUrl}>
//                   {row?.orderItems.map((item)=><Avatar src={item?.product?.imageUrl}/>)}
//                 </AvatarGroup>
//               </TableCell>
//               <TableCell component="th" scope="row">
//                 {row.user._id}
//               </TableCell>
//               <TableCell align="right">{row.user.lastName}</TableCell>
//               <TableCell align="right">{row.danhmuc}</TableCell>
//               <TableCell align="right">{row.price}</TableCell>
//               <TableCell align="right"><span className={`${row.paymentDetails.paymentStatus==="DANG XU LY"?"bg-[green]":
//             row.paymentDetails.paymentStatus==="SHIPPED"?"bg-[red]":
//             row.paymentDetails.paymentStatus==="PLACED"?"bg-[gray]":
//             row.paymentDetails.paymentStatus==="PENDING"?"bg-[gray]":"bg-[red]"
//             } text-white px-5 py-2 rounded full`}
            
//             >{row.paymentDetails.paymentStatus}</span></TableCell>
//               <Button
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Status

//       </Button>
//       <Button onClick={()=>handleOrderDelete(row._id)} variant='outlined'>Xoa</Button>
      

//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//       </Card>
//     </div>
//   )
// }

// export default OrdersTable
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer, MenuItem, Menu, AvatarGroup, Card, CardHeader,
  Button, Table, Avatar, TableBody, TableHead, TableRow, TableCell,
  Chip, Typography
} from '@mui/material';
import { getOrder, shipOrder, confirmOrder, deliveryOrderOrder, deleteOrder } from '../../State/Admin/Order/Action';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector(store => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleShipOrder = () => {
    dispatch(shipOrder(selectedOrderId));
    handleClose();
  };

  const handleConfirmOrder = () => {
    dispatch(confirmOrder(selectedOrderId));
    handleClose();
  };

  const handleDeliveryOrder = () => {
    dispatch(deliveryOrderOrder(selectedOrderId));
    handleClose();
  };

  const handleOrderDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PROCESSING': return 'info';
      case 'SHIPPED': return 'primary';
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'error';
      case 'PLACED': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'PROCESSING': return 'Đang xử lý';
      case 'SHIPPED': return 'Đang giao';
      case 'DELIVERED': return 'Đã giao';
      case 'CANCELLED': return 'Đã hủy';
      case 'PLACED': return 'Đã đặt hàng';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === 'PAID' ? 'success' : 'error';
  };

  const getPaymentStatusLabel = (status) => {
    return status === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán';
  };

  return (
    <div>
      <Card className='mt-2 p-5'>
        <CardHeader title='Danh sách đơn hàng' />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thanh toán</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                      {order?.orderItems?.map((item, index) => (
                        <Avatar 
                          key={index} 
                          src={item?.product?.imageUrl} 
                          alt={item?.product?.title}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {order._id.substring(0, 8)}...
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography>{order.tennguoinhan}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.user?.lastName || 'Khách hàng'}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    {order.orderItems?.map((item, index) => (
                      <div key={index}>
                        <Typography>{item?.product?.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          SL: {item.quanity}
                        </Typography>
                      </div>
                    ))}
                  </TableCell>
                  
                  <TableCell align="right">
                    <Typography>
                      {order.orderItems?.reduce((total, item) => 
                        total + (item.price * item.quanity), 0
                      ).toLocaleString()} VND
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="center">
                    <Chip 
                      label={getStatusLabel(order.orderStatus)}
                      color={getStatusColor(order.orderStatus)}
                    />
                  </TableCell>
                  
                  <TableCell align="center">
                    <Chip
                      label={getPaymentStatusLabel(order.paymentDetails?.paymentStatus)}
                      color={getPaymentStatusColor(order.paymentDetails?.paymentStatus)}
                    />
                  </TableCell>
                  
                  <TableCell align="center">
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(e) => handleClick(e, order._id)}
                      variant="outlined"
                      size="small"
                    >
                      Cập nhật
                    </Button>
                    
                    <Button 
                      onClick={() => handleOrderDelete(order._id)} 
                      variant="outlined" 
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleConfirmOrder}>Xác nhận đơn</MenuItem>
        <MenuItem onClick={handleShipOrder}>Đang giao hàng</MenuItem>
        <MenuItem onClick={handleDeliveryOrder}>Đã giao hàng</MenuItem>
      </Menu>
    </div>
  );
};

export default OrdersTable;