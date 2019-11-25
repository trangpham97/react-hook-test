import React from 'react';
import { useRef, useState, useEffect } from "react";
import Calendar from './Calendar';
import CalendarCustom from '../CalendarCustom';
import { Language } from './Language';

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
  }
];

export const BodyDetail = () => {
  const refWrapBar = useRef(null);
  const [images] = useState(initImages);
  const [index, setIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [count, setCount] = useState(0);
  const [checkBox, setCheckBox] = useState(true);

  const handleChangeCheck = () => {
    setCheckBox(!checkBox);
  }

  const tooglePause = () => {
    setIsPause(!isPause);
    let temp = count;
    setCount(++temp);
    const barWidth = refWrapBar.current.children[currentIndex].parentNode.children[0].offsetWidth;
    refWrapBar.current.children[currentIndex].children[0].style.width
      = `${refWrapBar.current.children[currentIndex].children[0].offsetWidth * (100 / barWidth)}%`;
  }

  useEffect(() => {
    setShowTransition(true);
    const timer = setInterval(() => {
      if (refWrapBar.current.children[currentIndex].children[0].offsetWidth ===
        refWrapBar.current.children[currentIndex].parentNode.children[0].offsetWidth) {
        refWrapBar.current.children[currentIndex].children[0].style.width = `0`;
      }
      let temp = currentIndex;
      temp = (temp === images.length - 1) ? -1 : currentIndex;
      setCurrentIndex(++temp);
      const newIndex = images.shift();
      images.push(newIndex);
      setIndex(newIndex);
    }, 3000);

    if (isPause === true) {
      clearInterval(timer);
    }

    if (isPause === false && count > 0 && count % 2 === 0 &&
      refWrapBar.current.children[currentIndex].children[0].offsetWidth === 100) {
      let temp = currentIndex;
      temp = (temp === images.length - 1) ? -1 : currentIndex;
      setCurrentIndex(++temp);
      const newIndex = images.shift();
      images.push(newIndex);
    }

    return () => clearInterval(timer);
  }, [index, isPause]);

  return (
    <div className="main-detail">
      <div className="aside-left-detail">
        <div id="carousel" className="carousel-detail">
          {images.map((image, index) => (
            <div className="item" key={'' + index} >
              <img src={image.src} />
            </div>
          ))}
          <div className="wrap-bar" ref={refWrapBar} >
            {images.map((image, index) => (
              <div className="bar" key={index}>
                <div className={`sub ${showTransition && (index === currentIndex) && (isPause === false) && 'bar-transition'}`}
                  id={isPause && (index === currentIndex) ? 'pause' : undefined} />
              </div>
            ))}
          </div>
          <div className="play-btn">
            <img src={isPause ? require("../../img/play.svg") : require("../../img/pause.svg")}
              alt="play" onClick={tooglePause} />
          </div>
        </div>
      </div>
      <div className="aside-right-detail">
        <div className="box-1">
          <div className="row-1">
            <div className="wrap-price-detail">
              <h2 className="price-detail">€55</h2>
              <span className="title-price-detail">Price per person</span>
            </div>
            <div className="wrap-review">
              <div className="star-detail">
                <span className="fa fa-star star-detail"></span>
                <span className="fa fa-star star-detail"></span>
                <span className="fa fa-star star-detail"></span>
                <span className="fa fa-star star-detail"></span>
                <span className="fa fa-star star-detail"></span>
              </div>
              <span className="review">2 reviews</span>
            </div>
          </div>
          <div className="row-2">
            <div className="upcoming-event">
              <p className="title-option">Upcoming Events</p>
              <label className="container-check">
                <input type="checkbox" defaultChecked={checkBox} onChange={handleChangeCheck} />Pick Range Day
                <span className="checkmark" />
              </label>
              {checkBox && (
                <Calendar />
              )}
              {!checkBox && (
                <CalendarCustom />
              )}
            </div>
            <div className="attendee">
              <p className="title-option">Language</p>
              <Language />
              <button className="btn-request" type="submit"><span>Request to book</span></button>
            </div>
          </div>
        </div>
        <div className="box-2">
          <span className="share-text">Share this tour?</span>
          <div className="social-event">
            <img src={require("../../img/facebook.svg")} alt="fb" />
            <img src={require("../../img/twitter.svg")} alt="twitter" />
            <img src={require("../../img/envelope.svg")} alt="envelop" />
          </div>
        </div>
        <div className="box-3">
          <img></img>
          <img src={require("../../img/question.svg")} alt="question" />
          <span className="question">Question?</span>
          <span className="contact">Contact the phlocal</span>
        </div>
      </div>
    </div>
  )
}
