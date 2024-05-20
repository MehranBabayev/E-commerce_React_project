import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addItem, updateCartItemQuantity } from '../../redux/slices/cartSlice';
import { FaHeart } from 'react-icons/fa';
import { fetchProductById } from '../../redux/slices/shopSlice';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import './productDetailed.css';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const cartItems = useSelector(state => state.cart.items);
    const product = useSelector(state => state.shop.products.find(product => product.id === id));

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const isInWishlist = (product) => {
        return wishlistItems.some(item => item.id === product.id);
    };

    const [quantity, setQuantity] = useState(1); // Local state for quantity
    const [selectedSize, setSelectedSize] = useState(''); // Local state for selected size

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setQuantity(1); 
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

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product_detail">
            <div className="product_detail_container">
                <div className="product_detail_image">
                    <SideBySideMagnifier 
                        imageSrc={product.image}
                        imageAlt={product.title}
                        fillAvailableSpace={true}
                        alwaysInPlace={true}
                        fillGapLeft={20}
                        fillGapRight={20}
                        fillGapTop={20}
                        fillGapBottom={20}
                        crosshair={true}
                    />
                </div>
                <div className="product_detail_info">
                    <h2>{product.title}</h2>
                    <p className='info_price'>${product.price}</p>
                    <p className='info_desc'>{product.description}</p>
                    <p className='info_cat'><strong>Category:</strong> {product.category.name}</p>
                    <p className='info_stock'><strong>In Stock:</strong> {product.InStock[0].stockCount}</p>
                    {product.sizes && (
                        <div className="product_sizes">
                            <p>Sizes:</p>
                            <ul>
                                {product.sizes.map(size => (
                                    <li 
                                        key={size} 
                                        className={selectedSize === size ? 'selected' : ''} 
                                        onClick={() => handleSizeChange(size)}
                                    >
                                        {size}
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

export default ProductDetail;




