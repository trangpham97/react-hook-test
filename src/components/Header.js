import React from 'react';
import { useState, useEffect } from "react";
import LogIn from './LogIn';
import Book from './Book';

const Header = ({ handleLogIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [signAndLog, setSignAndLog] = useState('');

  handleLogIn = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    const btnLog = document.querySelectorAll('.aside-right li a');
    btnLog.forEach(item => item.addEventListener('click', function () {
      setSignAndLog(this.textContent);
    }))
  }, [])

  return (
    <div className="hero-section">
      <div className="navbar">
        <div className="aside-left">
          <a id="logo" href="#">logo</a>
          <input className="btn-search" placeholder="Search by location..." />
        </div>
        <ul className="aside-right">
          <li className="wrap-sign-in" onClick={handleLogIn}>
            <a className="sign-in">Sign up</a>
          </li>
          <li className="wrap-log-in" onClick={handleLogIn}>
            <a className="log-in">Log in</a>
          </li>
        </ul>
      </div>
      <p className="slogan">“Lorem Ipsum is simply dummy text of the printing
       and typesetting industry. Lorem Ipsum has been the industry's standard
       dummy text ever since the 1500s”
      </p>

      <Book/>

      {showModal && (
        <LogIn
          handleLogIn={handleLogIn} getSignOrLog={signAndLog}
        />
      )}

    </div>

  )
}

export default Header
