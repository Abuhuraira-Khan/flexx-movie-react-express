import React from 'react';
import './preloader.css';

const PreLoader = () => {

  const styles = {
    minHeight:location.pathname==='/'?'100vh':'100%'
  }

  return (
    <div style={styles}  id="pl_preloader-container">
      <div id="pl_dancing-character"></div>
      <div id="pl_preloader-text">
        {Array.from('FLEXX').map((char, index) => (
          <span key={index} className={`pl_char pl_char-${index}`}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PreLoader;
