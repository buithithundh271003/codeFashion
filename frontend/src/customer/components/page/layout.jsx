import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="../public/stylesheets/jumbotron-narrow.css" />
        <link rel="stylesheet" href="../public/stylesheets/bootstrap.min.css" />
      </head>
      <body>
        <div className="container">
          <div className="header clearfix">
            <ul className="nav nav-pills pull-right">
              <li role="presentation" className="active">
                <Link to="/order/create_payment_url">Tạo mới GD thanh toán</Link>
              </li>
              <li role="presentation" className="active">
                <Link to="/order/querydr">API truy vấn kết quả thanh toán</Link>
              </li>
              <li role="presentation" className="active">
                <Link to="/order/refund">API hoàn tiền giao dịch</Link>
              </li>
            </ul>
            <h3 className="text-muted">VNPAY DEMO</h3>
          </div>
          
          {children}
          
          <footer className="footer">
            <p>&copy; VNPAY {new Date().getFullYear()}</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;