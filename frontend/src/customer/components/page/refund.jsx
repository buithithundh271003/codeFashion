import React, { useState } from 'react';
import Layout from './layout';

const Refund = ({ title }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    amount: '',
    transType: '02',
    transDate: '',
    user: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Layout title={title}>
      <h3>{title}</h3>
      <div className="table-responsive">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mã giao dịch (vnp_TxnRef):</label>
            <input
              type="text"
              className="form-control"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Số tiền hoàn:</label>
            <input
              type="text"
              className="form-control"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Kiểu hoàn tiền (vnp_TransactionType):</label>
            <select
              className="form-control"
              name="transType"
              value={formData.transType}
              onChange={handleChange}
            >
              <option value="02">Hoàn toàn phần</option>
              <option value="03">Hoàn một phần</option>
            </select>
          </div>
          <div className="form-group">
            <label>Thời gian tạo giao dịch (vnp_TransactionDate)</label>
            <input
              type="text"
              className="form-control"
              name="transDate"
              placeholder="yyyyMMddHmmss"
              value={formData.transDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>User thực hiện hoàn (vnp_CreateBy)</label>
            <input
              type="text"
              className="form-control"
              name="user"
              value={formData.user}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-default">Refund</button>
          <p>&nbsp;</p>
        </form>
      </div>
    </Layout>
  );
};

export default Refund;