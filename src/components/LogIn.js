import React from 'react'
import { useEffect } from "react";


const LogIn = ({ handleLogIn, getSignOrLog }) => {
  useEffect(() => {
    if (getSignOrLog === "Log in") {
      document.querySelector('#tab-1').classList.add('current');
      document.querySelector('.tab-link-1').classList.add('current');
    } else {
      document.querySelector('#tab-2').classList.add('current');
      document.querySelector('.tab-link-2').classList.add('current');
    }

    const tabs = document.querySelectorAll('ul.tabs li');
    tabs.forEach(item => item.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      for (const item of document.querySelectorAll('ul.tabs li')) {
        item.classList.remove('current');
      }
      for (const item of document.querySelectorAll('.tab-content')) {
        item.classList.remove('current');
      }
      this.classList.add('current');
      document.querySelector('#' + tabId).classList.add('current');
    }))
  });

  return (
    <div className="modal-background">
      <div className="modal-box">
        <i onClick={() => handleLogIn()} className="fas fa-times close-login-btn"></i>
        <div className="content content-login">
          <div id="container container-login">
            <ul className="tabs tabs-login">
              <li className="tab-link tab-link-1" data-tab="tab-1">Log in</li>
              <li className="tab-link tab-link-2" data-tab="tab-2">Sign up</li>
            </ul>
            <div id="tab-1" className="login tab-content">
              <form>
                <div className="form-section">
                  <i className="far fa-user input-icon"></i>
                  <input type="text" name="name" placeholder="Username" />
                </div>
                <div className="form-section">
                  <span className="fa fa-unlock-alt input-icon" />
                  <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="form-section btn-container">
                  <input type="submit" defaultValue="Login" />
                </div>
              </form>
            </div>
            <div id="tab-2" className="register tab-content">
              <form>
                <div className="form-section">
                  <i className="far fa-user input-icon"></i>
                  <input type="text" name="name" placeholder="Username" />
                </div>
                <div className="form-section">
                  <i className="far fa-envelope input-icon"></i>
                  <input type="email" name="name" placeholder="Email" className="email" />
                </div>
                <div className="form-section">
                  <span className="fa fa-unlock-alt input-icon" />
                  <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="form-section btn-container">
                  <input type="submit" defaultValue="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
