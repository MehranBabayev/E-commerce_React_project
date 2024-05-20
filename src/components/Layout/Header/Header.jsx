// Header.js

import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";

import BasketModalMenu from './BasketModalMenu';
import WishlistModal from './WishlistModal';
import SearchModal from './SearchModal'; // Import the SearchModal component
import './header.css';
import { useSelector } from 'react-redux';
import { BsTelephone } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import UsFlag from '../../../assets/image/us.svg';
import Logo from '../../../assets/image/kalles_babcb241-47cc-4352-a0ae-1458bbff9dcc.webp'
// import GbFlag from '../../../assets/image/gb.svg';
// import GeFlag from '../../../assets/image/de.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showCartModal, setShowCartModal] = useState(false);
    const [showWishlistModal, setShowWishlistModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false); // State for showing the search modal

    const handleCartIconClick = () => {
        setShowCartModal(true);
    };

    const handleWishlistIconClick = () => {
        setShowWishlistModal(true);
    };

    const handleSearchIconClick = () => {
        setShowSearchModal(true); // Toggle the visibility of the search modal
    };

    // Select cart items from the Redux store
    const cartItems = useSelector(state => state.cart.items);

    // Select wishlist items from the Redux store
    const wishlistItems = useSelector(state => state.wishlist.items);

    // Calculate total quantity of items in the cart
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Calculate total quantity of items in the wishlist
    const totalWishlistQuantity = wishlistItems.length;

    return (
<>
    <div className='head'>
        <div className='head_container'>
            <div className='head_1'>
                <div className="head_contact">
                    <BsTelephone className="head_contact_icon"/>
                    <span>+01 23456789</span>
                </div>
                <div className="head_email">
                    <TfiEmail />
                    <span>Kalles@domain.com</span>
                </div>
            </div>
            <div className='head_sail'>
                <p>Summer sale discount off</p> <span className='span_1'>50%!</span> <span className='span_2'>Shop Now</span>
            </div>
            <div className="language-dropdown">
                <div className="location">
                    <IoLocationOutline className="location_icon"/>
                    <span>Location</span>
                </div>
                <div className='language'>
                    <span>English</span>
                    <RiArrowDropDownLine className='drop_icon'/>
                </div>
                <div className='head_flag'>
                    <img src={UsFlag} alt="US Flag" className='head_flag_image' />
                    <span>USD</span>
                    <RiArrowDropDownLine className='drop_icon'/>
                </div>

            </div>
        </div>
    </div>
    <header>
        <nav>
            <div className='header_logo'>
            <Link to="/home" className='link'>
                <img src={Logo} alt="Logo"/>
            </Link>
            </div>
            <ul className='nav_menu'>
                <li><Link to="/home" className='link'>Home</Link></li>
                <li><Link to="/shop" className='link'>Shop</Link></li>
                <li><Link to="/sale" className='link'>Sale</Link></li>
                <li><Link to="/blog" className='link'>Blog</Link></li>
                <li><Link to="/contact" className='link'>Contact</Link></li>
            </ul>
            <div className='header_icons'>
                <div>
                    {/* Search icon */}
                    <GoSearch  className="search-modal_header" onClick={handleSearchIconClick} />
                </div>
                <div>
                    {/* Display the total quantity in the wishlist icon */}
                    <IoMdHeartEmpty className="wishlist-modal_header" onClick={handleWishlistIconClick} />
                    <span className="wishlist-counter">{totalWishlistQuantity}</span>
                </div>
                <div>
                    {/* Display the total quantity in the cart icon */}
                    <BsCart2 className="basket-modal-menu_header" onClick={handleCartIconClick} />
                    <span className="cart-counter">{totalQuantity}</span>
                </div>
            </div>                    
        </nav>
        <div>
            <BasketModalMenu
                showModal={showCartModal}
                handleCloseModal={() => setShowCartModal(false)}
            />
            <WishlistModal
                showModal={showWishlistModal}
                handleCloseModal={() => setShowWishlistModal(false)}
            />
            <SearchModal 
                showModal={showSearchModal} 
                handleCloseModal={() => setShowSearchModal(false)} 
            />
        </div>

    </header>
</>





    

    );
}

export default Header;

