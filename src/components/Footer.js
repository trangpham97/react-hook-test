import React from 'react'

const Footer = () => {
  return (
    <footer>
      <ul className="col-1">
        <li><a id="logo-footer" href="#">logo</a></li>
        <li className="slogan-footer">Lorem ipsum dolor sit amet, conseca
        scing elit. Sed vulputate non ligula at malesuada. Quisque vestibulum
        </li>
        <li className="social" />
      </ul>
      <ul className="col-mb">
        <li className="head">About Us</li>
        <li>Terms &amp; Conditions</li>
        <li>Privacy Policy</li>
        <li>FAQ</li>
      </ul>
      <ul className="col-2">
        <li className="head">About Us</li>
        <li>Our Story</li>
        <li>Benefits</li>
        <li>FAQ</li>
      </ul>
      <ul className="col-3">
        <li>Legal</li>
        <li>Terms &amp; Conditions</li>
        <li>Privacy Policy</li>
      </ul>
      <ul className="col-4">
        <li>Keep In Touch</li>
        <li>hello@homehase.org</li>
        <li>813-534-6365</li>
      </ul>
    </footer>
  )
}

export default Footer
