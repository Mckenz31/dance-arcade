import React from 'react';
import './Loaderstyles.css';

const Loader = ({ tip }) => {
  return (
    <div
      className="loader-container"
      style={{
        borderColor: '#ccc transparent',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
    >
      <div style={{ borderColor: '#ccc transparent' }} className="loader">
        <p className="text-white">{tip}</p>
      </div>
    </div>
  );
};
export default Loader;
