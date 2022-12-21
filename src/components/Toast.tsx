import React, { useState } from 'react';
import './css/Toast.css';

function Toast(props: any) {
  const [visible, setVisible] = useState(true);

  console.log('toast');

  const hideToast = () => {
    setVisible(false);
  };

  return (
    <div
      className='toast'
      style={{
        display: visible ? 'block' : 'none',
      }}
    >
      <p>{props.message}</p>
      <button onClick={hideToast}>Close</button>
    </div>
  );
}

export default Toast;
