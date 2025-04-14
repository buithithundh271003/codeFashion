import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout';

const SuccessPage = ({ code }) => {
  return (
    <Layout title="Kết quả giao dịch">
      {code === "00" ? (
        <p style={{ textAlign: "center" }}>GD thành công</p>
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>GD thất bại</p>
      )}
      <p style={{ textAlign: "center" }}>
        <Link to="/order" className="btn btn-default">Về danh sách</Link>
      </p>
    </Layout>
  );
};

export default SuccessPage;