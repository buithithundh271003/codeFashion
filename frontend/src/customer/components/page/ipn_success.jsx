import React from 'react';

const IpnSuccess = ({ obj }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: obj }} />
  );
};

export default IpnSuccess;