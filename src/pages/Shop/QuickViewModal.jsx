import React, { useEffect, useRef, useState } from 'react';
import './quickViewModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addItem, updateCartItemQuantity } from '../../redux/slices/cartSlice'; // Import actions
import { FaHeart } from 'react-icons/fa';
import { SideBySideMagnifier } from 'react-image-magnifiers'; // Import SideBySideMagnifier

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const modalRef = useRef(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1); // Local state for quantity
    const cartItems = useSelector(state => state.cart.items);

    
    const isInWishlist = (product) => {
        return wishlistItems.some(item => item.id === product.id);
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            const existingCartItem = cartItems.find(item => item.id === product.id && item.size === selectedSize);
            if (existingCartItem) {
                const newQuantity = existingCartItem.quantity + quantity;
                dispatch(updateCartItemQuantity({ id: product.id, quantity: newQuantity }));
            } else {
                dispatch(addItem({ ...product, quantity, size: selectedSize }));
            }
            setQuantity(1); 
            setSelectedSize(''); 
        } else {
            alert('Please select a size.');
        }
    };

    const handleToggleWishlist = () => {
        if (isInWishlist(product)) {
            dispatch(removeFromWishlist(product));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="quick-view-modal">
            <div className="quick-view-modal-content" ref={modalRef}>
                <span className="quick-view-close" onClick={onClose}>&times;</span>
                <div className="product-image-magnifier">
                    {/* Use SideBySideMagnifier component for product image */}
                    <SideBySideMagnifier 
                        className="product-image-magnifier"
                        imageSrc={product.image} // Image source
                        imageAlt={product.title} // Alt text
                        fillAvailableSpace={true} // Fill available space
                        alwaysInPlace={true} // Magnifier always in place
                        fillGapLeft={20} // Adjust left gap
                        fillGapRight={20} // Adjust right gap
                        fillGapTop={20} // Adjust top gap
                        fillGapBottom={20} // Adjust bottom gap
                        crosshair={true}
                    />
                </div>
                <div className="product-details">
                    <h2>{product.title}</h2>
                    <p className='info_price'> ${product.price || 'Цена недоступна'}</p>
                    <p className='info_desc1'>Desvription: {product.description || 'Описание недоступно'}</p> 
                    <p className='info_cat'><strong>Category:</strong> {product.category.name}</p>
                    <p className='info_stock'><strong>In Stock:</strong> {product.InStock[0].stockCount}</p> 
                    {product.sizes && (                  
                        <div className="product_sizes">
                            <p>Size:</p>
                            <ul>
                                {product.sizes && product.sizes.map(size => (
                                    <li key={size} onClick={() => setSelectedSize(size)} className={selectedSize === size ? 'selected' : ''}>
                                        <span>{size}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className='product_detailed_btns'>
                        <div className='product_quantity_actions_detailed'>
                            <button onClick={() => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                        </div>
                        <button className='product_detailed_add_btn' onClick={handleAddToCart}>Add to Cart</button>
                        <button className='product_detailed_wish_btn' onClick={handleToggleWishlist}>
                            {isInWishlist(product) ? <FaHeart color="red" /> : <FaHeart />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default QuickViewModal;

