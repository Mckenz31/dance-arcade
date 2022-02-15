import React from 'react';
import { useSelector } from 'react-redux';
import './Loaderstyles.css';

const Loader = () => {
  const tip = useSelector((state) => state.user.spinner.tip);
  return (
    <div
      className="loader-container"
      style={{
        borderColor: '#ccc transparent',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
    >
      <div className="load">
        <div
          style={{ borderColor: '#ccc transparent' }}
          className="loader"
        ></div>
        <div className="text-white">{tip && tip}</div>
      </div>
    </div>
  );
};
export default Loader;
