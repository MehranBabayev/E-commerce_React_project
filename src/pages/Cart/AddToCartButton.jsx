// AddToCartButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice'; // Изменил путь к файлу cartSlice.js


import './addToCartButton.css';

const AddToCartButton = ({ product }) => { // Переименовал компонент в AddToCartButton и добавил проп product
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Вызываем действие addItem с данными о товаре
        dispatch(addItem(product)); // Исправил вызов addItem и передал в него product
    };

    return (
        <button className="cart_button" onClick={handleAddToCart}>
        Add to Cart
        </button>
    );
};

export default AddToCartButton; // Изменил экспорт компонента