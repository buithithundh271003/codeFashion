import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUSer } from '../../../State/Auth/Action';
import { getOrderUser } from '../../../State/Order/Action';
import ReturnRequestForm from './refundPage';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Chip, Avatar, Typography 
} from '@mui/material';
import axios from 'axios';

const OrderList = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, order } = useSelector(store => store);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnRequests, setReturnRequests] = useState([]);

  useEffect(() => {
    if (jwt) dispatch(getUSer(jwt));
  }, [jwt, dispatch]);

  useEffect(() => {
    if (jwt && auth.user) {
      dispatch(getOrderUser(auth.user));
      fetchReturnRequests();
    }
  }, [jwt, auth.user, dispatch]);

  const fetchReturnRequests = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/refund/user', {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setReturnRequests(response.data?.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu cầu đổi trả:", error);
    }
  };

  const getRequestStatus = (orderItemId) => {
    const request = returnRequests.find(req => req.orderItemId === orderItemId);
    return request ? request.status : null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Đang chờ xử lý';
      case 'approved': return 'Đã chấp nhận';
      case 'rejected': return 'Đã từ chối';
      case 'completed': return 'Hoàn thành';
      default: return 'Chưa yêu cầu';
    }
  };

  const getPaymentStatus = (paymentStatus) => {
    return paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán';
  };

  const getPaymentStatusColor = (status) => {
    return status === 'PAID' ? 'success' : 'error';
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'PROCESSING': return 'info';
      case 'SHIPPED': return 'primary';
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  const getOrderStatusLabel = (status) => {
    switch (status) {
      case 'PROCESSING': return 'Đang xử lý';
      case 'SHIPPED': return 'Đang giao';
      case 'DELIVERED': return 'Đã giao';
      case 'CANCELLED': return 'Đã hủy';
      default: return status || 'Không xác định';
    }
  };

  // Hàm lấy ID an toàn
  const getSafeId = (id) => {
    return id?.substring?.(0, 8) || 'N/A';
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Typography variant="h4" component="h1" gutterBottom>
        Danh sách đơn hàng
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="right">Giá tiền</TableCell>
              <TableCell align="center">Trạng thái đơn</TableCell>
              <TableCell align="center">Thanh toán</TableCell>
              <TableCell align="center">Yêu cầu đổi trả</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.orders?.length > 0 ? (
              order.orders.flatMap(order => 
                order?.orderItems?.map?.((item, idx) => {
                  const refundStatus = getRequestStatus(item?._id);
                  
                  return (
                    <TableRow key={`${order?._id || idx}-${idx}`}>
                      {/* Tên và hình ảnh sản phẩm */}
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar 
                            src={item?.product?.images[0].thumbUrl} 
                            alt={item?.product?.title}
                            sx={{ width: 56, height: 56, mr: 2 }}
                            variant="rounded"
                          />
                          <div>
                            <Typography variant="subtitle1">{item?.product?.title || 'Không xác định'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Mã đơn: {getSafeId(order?._id)}...
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      
                      {/* Số lượng */}
                      <TableCell align="center">
                        {item?.quanity || 0}
                      </TableCell>
                      
                      {/* Giá tiền */}
                      <TableCell align="right">
                        <Typography variant="body1">
                          {((item?.price || 0) * (item?.quanity || 0)).toLocaleString()} VND
                        </Typography>
                        {(item?.discount || 0) > 0 && (
                          <Typography variant="body2" color="text.secondary">
                            (Giảm {(item?.discount || 0).toLocaleString()} VND)
                          </Typography>
                        )}
                      </TableCell>
                      
                      {/* Trạng thái đơn hàng */}
                      <TableCell align="center">
                        <Chip 
                          label={getOrderStatusLabel(order?.orderStatus)}
                          color={getOrderStatusColor(order?.orderStatus)}
                        />
                      </TableCell>
                      
                      {/* Trạng thái thanh toán */}
                      <TableCell align="center">
                        <Chip 
                          label={getPaymentStatus(order?.paymentDetails?.paymentStatus)}
                          color={getPaymentStatusColor(order?.paymentDetails?.paymentStatus)}
                        />
                      </TableCell>
                      
                      {/* Yêu cầu đổi trả */}
                      <TableCell align="center">
                        <Chip 
                          label={getStatusLabel(refundStatus)}
                          color={getStatusColor(refundStatus)}
                        />
                      </TableCell>
                      
                      {/* Thao tác */}
                      <TableCell align="center">
                        {!refundStatus && order?.orderStatus === 'DELIVERED' && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setSelectedOrder(item)}
                          >
                            Yêu cầu đổi trả
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }) || []
            ) ): (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal hiển thị form đổi trả */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ReturnRequestForm 
              orderItem={selectedOrder} 
              onClose={() => {
                setSelectedOrder(null);
                fetchReturnRequests();
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;