import React from 'react';
import { useState, useEffect } from "react";

const BlockAd = ({ forwardedRef }) => {
  const [showAd, setShowAd] = useState(false);

  const clickClose = () => {
    setShowAd(false);
  }
  useEffect(() => {    
    setTimeout(() => {
      setShowAd(true);
    }, 3000);  
  }, []);
  
  return (
    <div className="ad" ref={forwardedRef} style={{display: showAd ? 'block' : 'none' }}>
      <i className="fas fa-window-close" onClick={clickClose}></i>
      <div className="prefix" ><h1>Now Showing</h1></div>
      <div className="lines">Alo alo alooooooooo</div>
    </div>
  )
}

export default BlockAd
