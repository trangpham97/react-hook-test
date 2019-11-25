import React from 'react';
import { useEffect, useState } from "react";
import CalendarCustom from './CalendarCustom';

const Book = () => {
  const [boxActive, setBoxActive] = useState(false);
  const [bookActive, setBookActive] = useState(false);

  const Dropdown = () => {
    setBoxActive(!boxActive);
    setBookActive(!bookActive);
  }
  
  useEffect(() => {
    const btnMinus = document.querySelectorAll('.minus');
    btnMinus.forEach(item => item.addEventListener('click', (e) => {
      let valueCurrent = e.currentTarget.parentNode.children[1];
      if (valueCurrent.textContent === '0') {
        valueCurrent.innerHTML = 0;
      }
      else {
        valueCurrent.innerHTML = parseInt(valueCurrent.textContent) - 1;
      }
    }))

    const btnPlus = document.querySelectorAll('.plus');
    btnPlus.forEach(item => item.addEventListener('click', (e) => {
      let valueCurrent = e.currentTarget.parentNode.children[1];
      valueCurrent.innerHTML = parseInt(valueCurrent.textContent) + 1;
    }))
  },[])
  return (
    <div className={`book ${bookActive ? "book-mobile" : ""}`}>
      <div className="where">
        <span className="article">when</span>
        <div className="calendar">
          <CalendarCustom />
        </div>
      </div>
      <div className={`wrap-box ${boxActive ? "mobile" : ""}`}>
        <div className="box adult">
          <span className="article">adult</span>
          <p className="sub-article erase">erase</p>
          <div className="wrap-button">
            <button className="btn-value minus">-</button>
            <span className="value value-col-1">0</span>
            <button className="btn-value plus">+</button>
          </div>
        </div>
        <div className="box children">
          <span className="article">children</span>
          <p className="sub-article">2-12 years old</p>
          <div className="wrap-button">
            <button className="btn-value minus">-</button>
            <span className="value value-col-2">0</span>
            <button className="btn-value plus">+</button>
          </div>
        </div>
        <div className="box babies">
          <span className="article">babies</span>
          <p className="sub-article">02 years old</p>
          <div className="wrap-button">
            <button className="btn-value minus">-</button>
            <span className="value value-col-3">0</span>
            <button className="btn-value plus">+</button>
          </div>
        </div>
        <div className="box disabled">
          <span className="article">disabled</span>
          <p className="sub-article erase">erase</p>
          <div className="wrap-button">
            <button className="btn-value minus">-</button>
            <span className="value value-col-4">0</span>
            <button className="btn-value plus">+</button>
          </div>
        </div>
        <div className="box pets">
          <span className="article">pets</span>
          <p className="sub-article erase">erase</p>
          <div className="wrap-button">
            <button className="btn-value minus">-</button>
            <span className="value value-col-5">0</span>
            <button className="btn-value plus">+</button>
          </div>
        </div>
      </div>

      <div className="search-order">Search</div>
      <div className="dropdown" onClick={Dropdown}>
        <span className="who">Who</span>
        <i className="fas fa-chevron-circle-down"></i>
      </div>


    </div>
  )
}

export default Book
