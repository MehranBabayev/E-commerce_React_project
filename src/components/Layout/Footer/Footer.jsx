import React from 'react'
import { Link } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";
import './footer.css'

const Footer = () => {
  return (
    <footer>
      <section className='section_footer'>
        <div className='footer_container'>
          <div className='footer_column'>
            <Link to="/home"  className='footer_heads1'><h3>Kalles</h3></Link>
            <div className='foot_row'>
                <div className='foot_1'>
                  <IoLocationOutline className="footer_location_icon"/>
                  <div className='foot1_text'>
                    <p>184 Main Rd E, St Albans ,</p>
                    <p>Australia</p>
                  </div>
                </div>
                <div className='foot_1'>
                    <TfiEmail className='footer_email_icon' />
                    <p>contact@company.com</p>
                </div>
                <div className='foot_1'>
                    <BsTelephone className="footer_contact_icon"/>
                    <p>+001 2233 456</p>
                </div>
                <div className='footer_icons'>
                  <div className='footer_face'><FaFacebookF /></div>
                  <div className='footer_twit'><FaXTwitter /></div>
                  <div className='footer_inst'><FaInstagram /></div>
                  <div className='footer_link'><FaLinkedinIn /></div>
                  <div className='footer_pint'><FaPinterestP /></div>
                </div>
            </div>
          </div>
          <div className='footer_column'>
            <h3 className='footer_heads'>Categories</h3>
            <ul className='footer_list'>
              <li>Men</li>
              <li>Women</li>
              <li>Accessories</li>
              <li>Shoes</li>
              <li>Watch</li>
              <li>Dress</li>
            </ul>
          </div>
          <div className='footer_column'>
            <h3 className='footer_heads'>Infomation</h3>
            <ul className='footer_list'>
              <li>About us</li>
              <li>Contact us</li>
              <li>Terms & Conditions</li>
              <li>Returns & Exchanges</li>
              <li>Shipping & Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className='footer_column'>
            <h3 className='footer_heads'>Useful links</h3>
            <ul className='footer_list'>
              <li>Latest News</li>
              <li>My Account</li>
              <li>Size Guide</li>
              <li>FAQs</li>
              <li>FAQs 2</li>
            </ul>
          </div>
          <div className='footer_column'>
            <h3 className='footer_heads'>Newsletter Signup</h3>
            <p>
              Subscribe to our newsletter and get 10% off your first purchase
            </p>
            <div className="input-container">
                <input type="search" className="input" placeholder="Your email address" />
                <button type="submit" className="subscribe-button">Subscribe</button>
            </div>
            <div>
                <ul className='footer_icons2'>
                  <li><FaCcPaypal /></li>
                  <li><RiVisaLine /></li>
                  <li><SiAmericanexpress /></li>
                </ul>
            </div>
          </div>
        </div>


        
      </section>
      <div className='end'>
        <div className='end_text'>
          <p className='end1'>
          All Rights Reserved © 2024
          </p>
          <p className='end2'>Kalles</p>
          <p className='end1'>- Developed by </p>
          <p className='end3'>The4</p>
        </div>
        <div>
          <ul className='end_list'>
            <li>Shop</li>
            <li>About Us</li>
            <li>Contact us</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer