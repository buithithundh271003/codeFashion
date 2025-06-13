import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from "../../../config/apiConfig"

const ReturnRequestForm = ({ orderItem, onClose }) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [requestType, setRequestType] = useState('return');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwt');
      const requestData = {
        orderItemId: orderItem._id, // Sử dụng _id thay vì id
        productId: orderItem.product._id,
        requestType,
        reason,
        description
      };

      const response = await axios.post( `${API_BASE_URL}/api/refund`, requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        throw new Error(response.data.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi gửi yêu cầu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Box sx={{ p: 3, border: '1px solid #4caf50', borderRadius: 1, bgcolor: '#f8fff8' }}>
        <Typography variant="h6" color="success.main" gutterBottom>
          Yêu cầu của bạn đã được gửi thành công!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xử lý yêu cầu đổi/trả hàng.
        </Typography>
        <Button 
          variant="contained" 
          color="success" 
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Đóng
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Thông tin sản phẩm
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Tên sản phẩm:</strong> {orderItem?.product?.title} {/* Sửa title thành name */}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Số lượng:</strong> {orderItem.quanity} {/* Sửa quanity thành quantity */}
      </Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Loại yêu cầu</InputLabel>
        <Select
          value={requestType}
          label="Loại yêu cầu"
          onChange={(e) => setRequestType(e.target.value)}
          required
        >
          <MenuItem value="return">Trả hàng</MenuItem>
          <MenuItem value="exchange">Đổi hàng</MenuItem>
          <MenuItem value="refund">Hoàn tiền</MenuItem> {/* Thêm option refund */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Lý do</InputLabel>
        <Select
          value={reason}
          label="Lý do"
          onChange={(e) => setReason(e.target.value)}
          required
        >
          <MenuItem value="wrong-item">Sai sản phẩm</MenuItem>
          <MenuItem value="defective">Sản phẩm lỗi</MenuItem>
          <MenuItem value="not-as-described">Không giống mô tả</MenuItem>
          <MenuItem value="changed-mind">Đổi ý</MenuItem>
          <MenuItem value="other">Lý do khác</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Mô tả chi tiết"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Vui lòng mô tả chi tiết lý do đổi/trả hàng..."
      />

      {/* Hiển thị thông báo lỗi */}
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          disabled={isSubmitting}
        >
          Hủy
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
        </Button>
      </Box>
    </Box>
  );
};

export default ReturnRequestForm;