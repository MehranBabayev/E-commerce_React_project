import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './basketmodal.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from '../../../redux/slices/cartSlice.js';
import { RiDeleteBin6Line } from "react-icons/ri";

const BasketModalMenu = ({ showModal, handleCloseModal }) => {
    const modalRef = useRef(null); // Create a ref for the modal container
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);
    const dispatch = useDispatch();

    useEffect(() => {
        // Add event listener to detect clicks outside of the modal
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        // Add the event listener when the modal is shown
        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Remove the event listener when the modal is hidden
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal, handleCloseModal]);

    const handleIncreaseQuantity = (item) => {
        dispatch(increaseQuantity(item));
    };

    const handleDecreaseQuantity = (item) => {
        dispatch(decreaseQuantity(item));
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
    };

    return (
        <>
            {showModal && (
                <div className="basket-modal">
                    <div className="basket-modal-content" ref={modalRef}>
                        <h2>SHOPPING CART</h2>
                        {cartItems.map((item, index) => (
                            <div key={index} className="basket-product-info">
                                {item.image && <img src={item.image} alt={item.name} />}
                                <div className="basket-details">
                                    {item.name && <h3>{item.name}</h3>}
                                    {item.price && <p>Price: ${item.price}</p>}
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                    <div className='cart_basket_btn'>
                                        <button className='quantity_btn_menu' onClick={() => handleDecreaseQuantity(item)}>-</button>
                                        <button className='quantity_btn_menu' onClick={() => handleIncreaseQuantity(item)}>+</button>
                                        <RiDeleteBin6Line className='remove_btn_menu' onClick={() => handleRemoveItem(item)}></RiDeleteBin6Line>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='basket_end'>
                            <p>Total: ${total.toFixed(2)}</p> 
                            <div className='basket_end_btn'>
                                <Link to="/cart">
                                    <button className='basket_modal_menu_view' onClick={handleCloseModal}>View Cart</button>
                                </Link>
                                <button className='basket_modal_menu_close' onClick={handleCloseModal}>Close</button>
                            </div>                       
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BasketModalMenu;
