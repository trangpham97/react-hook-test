import React from 'react'

const HeaderDetail = () => {
  return (
    <header id="showcase" className="grid">
      <div className="image-bg" />
      <div className="bar-menu">
        <div className="logo">Lightpose</div>
        <input className="btn-search" placeholder="Search by location..." />
        <div className="wrap-icon">
          <ul className="icons">
            <li className="search-icon"><img src={require("../../img/search.png")} alt="" /></li>
            <li className="menu-icon"><img src={require("../../img/menu.png")} alt="" /></li>
          </ul>
        </div>
        <ul className="bar-right">
          <li><a className="add-porfolio" href="#">+ Add Your Portfolio</a></li>
          <li><a className="sign-up" href="#">Sign Up</a></li>
          <li><a className="log-in" href="#">Log In</a></li>
        </ul>
      </div>

      <div className="info">
        <div className="avatar"></div>
        <div className="right-aside-info">
          <h1 className="title">Mcklyn Valenciano </h1>
          <p className="sub-title">Photographer</p>
          <div className="price-and-time">
            <span className="price">$200/</span>
            <span className="time">30 minutes</span>
          </div>
          <div className="star">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </div>
          <div className="btn-booking">
            <a className="text-btn-booking" href="#">Request Booking</a>
          </div>
        </div>
      </div>

    </header>
  )
}

export default HeaderDetail

