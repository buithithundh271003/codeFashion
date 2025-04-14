import React from 'react';
import Layout from './layout';

const OrderList = ({ title }) => {
  return (
    <Layout title={title}>
      <h1>{title}</h1>
    </Layout>
  );
};

export default OrderList;