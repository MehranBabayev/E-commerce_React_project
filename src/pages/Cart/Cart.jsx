import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice.js';
import './cart.css'
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
    // Используем useSelector для получения данных из Redux store
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);
    const dispatch = useDispatch();

    const handleIncreaseQuantity = (item) => {
        dispatch(increaseQuantity(item)); // Отправляем действие на увеличение количества
    };

    const handleDecreaseQuantity = (item) => {
        dispatch(decreaseQuantity(item)); // Отправляем действие на уменьшение количества
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item)); // Отправляем действие на удаление
    };

    return (
        <div className='cart_page'>
            <div className='cart_container'>
                <h2>Shopping cart</h2>
                <div className="cart-item_head">
                    <div>
                        <p>PRODUCT</p>
                    </div>
                    <div className="cart-item_head_right">
                        <p>PRICE</p>
                        <p>QUANTITY</p>
                        <p>TOTAL</p>
                    </div>
                </div>
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div className="cart-item-info">
                            <div className="cart-item-img">
                                <img className="cart-item-image" src={item.image} alt={item.name} />
                                <div className="cart-item-name">
                                    <h3>{item.title}</h3>
                                    <RiDeleteBin6Line className='cart_bin' onClick={() => handleRemoveItem(item)}>Удалить</RiDeleteBin6Line>
                                </div>                                
                            </div>
                            <div className="cart-item_price">    
                                <p>${item.price}</p>
                                <div className='cart-item_quantity'>
                                    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                                </div>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='cart_total_line'>
                    <div></div>
                    <div className='cart_total'>
                        <div className='cart_total_end'>
                            <span>Total Price: </span>
                            <p> ${total.toFixed(2)}</p>
                        </div>
                        <button className='cart_check'>Check Out</button>
                    </div> 
                </div>               
            </div>
        </div>    
    );
}

export default Cart;
