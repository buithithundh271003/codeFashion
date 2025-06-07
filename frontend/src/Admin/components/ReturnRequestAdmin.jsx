import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Select, MenuItem, Typography, Box, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, TextField, InputLabel, FormControl, CircularProgress, Alert
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';

const ReturnRequestAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchReturnRequests();
  }, [filterStatus, searchQuery]);

  const fetchReturnRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('jwt');
      
      const response = await axios.get('http://localhost:4000/api/refund', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
          status: filterStatus !== 'all' ? filterStatus : undefined,
          search: searchQuery || undefined
        }
      });

      setRequests(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.put(
        `http://localhost:4000/api/refund/${selectedRequest._id}/status`,
        { status },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      setSuccessMessage('Cập nhật trạng thái thành công');
      fetchReturnRequests();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'primary';
      case 'rejected': return 'error';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const handleCloseDialog = () => {
    setSelectedRequest(null);
    setStatus('');
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccessMessage('');
  };

  if (loading && requests.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý yêu cầu đổi/trả
      </Typography>

      {error && (
        <Alert severity="error" onClose={handleCloseAlert} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" onClose={handleCloseAlert} sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Lọc theo trạng thái</InputLabel>
          <Select
            value={filterStatus}
            label="Lọc theo trạng thái"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="pending">Chờ xử lý</MenuItem>
            <MenuItem value="approved">Đã chấp nhận</MenuItem>
            <MenuItem value="rejected">Đã từ chối</MenuItem>
            <MenuItem value="completed">Hoàn thành</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, maxWidth: 400 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm theo ID, tên sản phẩm hoặc người dùng"
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Người yêu cầu</TableCell>
              <TableCell>Loại yêu cầu</TableCell>
              <TableCell>Lý do</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {loading ? 'Đang tải...' : 'Không có dữ liệu'}
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request._id} hover>
                  <TableCell>{request._id.substring(0, 8)}...</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{request.productId?.name || 'Đã xóa'}</Typography>
                    <Typography variant="body2">Số lượng: {request.orderItemId?.quantity}</Typography>
                    <Typography variant="body2">Giá: {request.productId?.price?.toLocaleString()}đ</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{request.userId?.name || 'Khách hàng'}</Typography>
                    <Typography variant="body2">{request.userId?.email}</Typography>
                  </TableCell>
                  <TableCell>
                    {request.requestType === 'return' && 'Trả hàng'}
                    {request.requestType === 'exchange' && 'Đổi hàng'}
                    {request.requestType === 'refund' && 'Hoàn tiền'}
                  </TableCell>
                  <TableCell>
                    {request.reason === 'wrong-item' && 'Sai sản phẩm'}
                    {request.reason === 'defective' && 'Sản phẩm lỗi'}
                    {request.reason === 'not-as-described' && 'Không giống mô tả'}
                    {request.reason === 'changed-mind' && 'Đổi ý'}
                    {request.reason === 'other' && request.description || 'Lý do khác'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={
                        request.status === 'pending' ? 'Chờ xử lý' :
                        request.status === 'approved' ? 'Đã chấp nhận' :
                        request.status === 'rejected' ? 'Đã từ chối' : 'Hoàn thành'
                      }
                      color={getStatusColor(request.status)} 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => {
                        setSelectedRequest(request);
                        setStatus(request.status);
                      }}
                    >
                      Cập nhật
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(selectedRequest)} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Cập nhật trạng thái yêu cầu</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Thông tin yêu cầu</strong>
            </Typography>
            <Typography><strong>ID:</strong> {selectedRequest?._id}</Typography>
            <Typography><strong>Sản phẩm:</strong> {selectedRequest?.productId?.name}</Typography>
            <Typography><strong>Loại yêu cầu:</strong> 
              {selectedRequest?.requestType === 'return' ? ' Trả hàng' : 
               selectedRequest?.requestType === 'exchange' ? ' Đổi hàng' : ' Hoàn tiền'}
            </Typography>
            <Typography><strong>Lý do:</strong> 
              {selectedRequest?.reason === 'wrong-item' ? ' Sai sản phẩm' :
               selectedRequest?.reason === 'defective' ? ' Sản phẩm lỗi' :
               selectedRequest?.reason === 'not-as-described' ? ' Không giống mô tả' :
               selectedRequest?.reason === 'changed-mind' ? ' Đổi ý' : ' Lý do khác'}
            </Typography>
            <Typography><strong>Mô tả:</strong> {selectedRequest?.description}</Typography>
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel>Trạng thái mới</InputLabel>
            <Select
              value={status}
              label="Trạng thái mới"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Chờ xử lý</MenuItem>
              <MenuItem value="approved">Đã chấp nhận</MenuItem>
              <MenuItem value="rejected">Đã từ chối</MenuItem>
              <MenuItem value="completed">Hoàn thành</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button 
            onClick={handleStatusChange} 
            variant="contained" 
            color="primary"
            disabled={status === selectedRequest?.status}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReturnRequestAdmin;