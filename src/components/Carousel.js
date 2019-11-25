import React from 'react';
import { useRef, useState, useEffect } from "react";
import ItemImage from './ItemImage';

const initImages = [
  {
    index: 0,
    src: "https://i.pinimg.com/originals/a1/50/c2/a150c293e4552755748378a6b69a4bee.jpg"
  },
  {
    index: 1,
    src: "https://i.pinimg.com/564x/bb/34/83/bb34830c2dc5c1d19e30be9bfa4b4fba.jpg"
  },
  {
    index: 2,
    src: "https://thedesignest.net/wp-content/uploads/2019/10/The-Joker-Poster-by-Sorin-Ilie.jpg"
  },
  {
    index: 3,
    src: "https://i.pinimg.com/564x/5d/a8/ed/5da8ed3aa96a368706ddf7bb2ada8bd7.jpg"
  },
  {
    index: 4,
    src: "https://i.pinimg.com/564x/13/5d/61/135d61bc22b6a8ae1da20c691d3940d9.jpg"
  },
  {
    index: 5,
    src: "https://i.pinimg.com/564x/db/4d/b7/db4db7d853be1f41ec81f7ed32dac858.jpg",
  },
  {
    index: 6,
    src: "https://i.pinimg.com/564x/fc/34/04/fc3404fdb4306ead17d068be8288eadc.jpg"
  }
];

const cloneInitImage = [...initImages];
const cloneInitImage2 = [...initImages];

const Carousel = () => {
  const inputEl = useRef(null);
  const [images, setImages] = useState(initImages);
  const [index, setIndex] = useState(0);
  const [dot, setDot] = useState();
  const [flagDot, setFlagDot] = useState(false);
  const [parentShowModal, setParentShowModal] = useState();

  const myCallback = (dataFromChild) => {
    setParentShowModal(dataFromChild);
  }
  const handleDotClick = (e) => {
    setDot(e.currentTarget.getAttribute("data-order"));
    setFlagDot(!flagDot);
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = images.shift();
      images.push(newIndex);
      setIndex(newIndex);
    }, 3000);

    if (flagDot === true) {
      setImages(cloneInitImage);
      const cloneImages = [...cloneInitImage2];
      const removedImages = cloneImages.splice(dot - 1, cloneImages.length - dot + 1);
      const newImages = removedImages.concat(cloneImages);
      setImages(newImages);
      setFlagDot(!flagDot);
    }

    if (parentShowModal === false) {
      clearInterval(timer);
    }
    else {
      setInterval(timer, 3000);
    }
    return () => clearInterval(timer);
  });

  return (
    <div>
      <div className="carousel">
        <h3 className="title-gallery">Gallery</h3>
        <div className="carousel-container">
          <div className="carousel-list">
            {images.map((image, index) => (
              <ItemImage key={'xyz' + index} src={image.src} callbackFromParent={myCallback} />
            ))}
          </div>
        </div>
      </div>
      <div className="nav-dots">
        {images.map((image, index) => (
          <label ref={inputEl} className="nav-dot" data-order={index} key={'abc' + index} onClick={(e) => handleDotClick(e)} />
        ), 1)}
      </div>
    </div>
  )
}

export default Carousel


