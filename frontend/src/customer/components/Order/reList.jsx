import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUSer } from '../../../State/Auth/Action';
import { getOrderUser } from '../../../State/Order/Action';
import ReturnRequestForm from './refundPage';
import { Chip, Button } from '@mui/material';
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
      setReturnRequests(response.data.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu cầu đổi trả:", error);
    }
  };

  const orderedItems = order?.orders?.flatMap(o => o.orderItems) || [];

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
      default: return '';
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Danh sách đơn hàng đã mua</h2>
      
      <div className="space-y-6">
        {orderedItems.map((item, idx) => {
          const status = getRequestStatus(item._id);
          console.log(status)
          
          return (
            <div key={idx} className="p-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                  <p className="text-gray-600">Số lượng: {item.quantity}</p>
                </div>
                
                <div>
                  <p className="text-gray-800">
                    <span className="font-medium">Giá:</span> {item.price.toLocaleString()} VND
                  </p>
                  {item.discount > 0 && (
                    <p className="text-gray-800">
                      <span className="font-medium">Giảm giá:</span> {item.discount.toLocaleString()} VND
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col items-start md:items-end">
                  {status ? (
                    <Chip 
                      label={getStatusLabel(status)} 
                      color={getStatusColor(status)} 
                      className="mb-2"
                    />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setSelectedOrder(item)}
                      className="w-full md:w-auto"
                    >
                      Yêu cầu đổi/trả
                    </Button>
                  )}
                </div>
              </div>
              
              {status && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Trạng thái yêu cầu:</span> {getStatusLabel(status)}
                  </p>
                  {status === 'rejected' && (
                    <p className="text-sm text-red-500 mt-1">
                      Yêu cầu của bạn đã bị từ chối. Vui lòng liên hệ hỗ trợ để biết thêm chi tiết.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal hiển thị form */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ReturnRequestForm 
              orderItem={selectedOrder} 
              onClose={() => {
                setSelectedOrder(null);
                fetchReturnRequests(); // Cập nhật lại danh sách sau khi gửi yêu cầu
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;