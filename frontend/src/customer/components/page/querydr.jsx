import React, { useState } from 'react';
import Layout from './layout';

const QueryDr = ({ title }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    transDate: ''
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
            <label>Mã giao dịch (vnp_TxnRef)</label>
            <input
              type="text"
              className="form-control"
              name="orderId"
              placeholder="txnRef"
              value={formData.orderId}
              onChange={handleChange}
            />
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
          <button type="submit" className="btn btn-default">QueryDr</button>
        </form>
      </div>
    </Layout>
  );
};

export default QueryDr;