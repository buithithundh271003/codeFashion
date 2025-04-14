import React from 'react';
import Layout from './layout';

const ErrorPage = ({ message, status, stack }) => {
  return (
    <Layout title="Error">
      <h1>{message}</h1>
      <h2>{status}</h2>
      <pre>{stack}</pre>
    </Layout>
  );
};

export default ErrorPage;