import React from 'react';
import { useRef } from "react";
import './App.css';
import './css/Normalize.css';
import './components/detail/detail.css'
import Carousel from './components/Carousel';
import Header from './components/Header';
import Advertisement from './components/Advertisement';
import BlockAd from './components/BlockAd';
import Footer from './components/Footer';
import HeaderDetail from './components/detail/HeaderDetail';
import { BodyDetail } from './components/detail/BodyDetail';
import MapboxGLMap from './components/detail/MapboxGLMap';

function App() {
  // const childRef = useRef(null);
  // const childAdRef = useRef(null);
  // useEffect(() => {   
  //   const scrollHandler = () => {
  //     const rect = childRef.current.getBoundingClientRect();
  //     const rectAd = childAdRef.current.getBoundingClientRect();
  //     if (rect.top + 100 > rectAd.top) {
  //       childRef.current.style.visibility = "hidden";
  //     } 
  //     else {
  //       childRef.current.style.visibility = "visible";
  //     }
  //   }
  //   window.addEventListener("scroll", scrollHandler, true);

  // },[])
  return (
    <>
      <HeaderDetail />
      <BodyDetail />
      <MapboxGLMap />

      {/* <Header /> */}
      {/* <BlockAd forwardedRef={childRef} /> */}
      {/* <Carousel /> */}
      {/* <Advertisement adRef={childAdRef} /> */}
      <Footer/>
    </>
  );
}

export default App;
