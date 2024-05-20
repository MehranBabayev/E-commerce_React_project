import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellerProducts } from '../../redux/slices/bestSellerProductsSlice';
import AddToCartButton from '../Cart/AddToCartButton';
import WishlistButton from '../Shop/WishlistButton';
import QuickViewModal from '../Shop/QuickViewModal';
import { addItem } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { Link } from 'react-router-dom'; // Import Link component
import './bestseller.css';

const BestSellerProducts = () => {
    const dispatch = useDispatch();
    const bestSellerProducts = useSelector((state) => state.bestSellerProducts.bestSellerProducts);
    const loading = useSelector((state) => state.bestSellerProducts.loading);
    const error = useSelector((state) => state.bestSellerProducts.error);
    const wishlistItems = useSelector(state => state.wishlist.items);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    useEffect(() => {
        console.log('Dispatching fetchBestSellerProducts action...');
        dispatch(fetchBestSellerProducts());
    }, [dispatch]);
    
    console.log('Best seller products:', bestSellerProducts);
    console.log('Loading:', loading);
    console.log('Error:', error);
    
    useEffect(() => {
        // Filter products with sales count > 45 and keep only visible products
        const filteredProducts = bestSellerProducts.filter(product => product.sales > 45);
        setVisibleProducts(filteredProducts.slice(0, 8)); // Initially show only the first 8 products
    }, [bestSellerProducts]);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const isInWishlist = (product) => {
        return wishlistItems.some(item => item.id === product.id);
    };

    const handleToggleWishlist = (product) => {
        // Toggle wishlist item
        if (isInWishlist(product)) {
            // If product is already in wishlist, remove it
            dispatch(removeFromWishlist(product));
        } else {
            // If product is not in wishlist, add it
            dispatch(addToWishlist(product));
        }
    };

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };
    
    const handleCloseQuickView = () => {
        setIsQuickViewOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="shop-container1">
            <div className='bestseller'>
                <h3>BEST SELLER</h3>
                <p>Top sale in this week</p>
            </div>
            <div className="product-container">
                <div className='product_item_container'>
                    {visibleProducts.map(product => (
                        <div className='product_image' key={product.id}>
                            <div className="product-card">
                                <Link  to={`/product/${product.id}`}> {/* Wrap with Link component and provide appropriate URL */}
                                    <img src={product.image} alt={product.title} />
                                </Link>
                                <Link className='product-card_h3' to={`/product/${product.id}`}>
                                <h3 className='product-card_h3'>{product.title}</h3> 
                                </Link>
                                <p> ${product.price || 'Fiyat mevcut değil'}</p>
                                <AddToCartButton product={product} onClick={() => handleAddToCart(product)} className='cart_button' />
                                <WishlistButton product={product} isInWishlist={isInWishlist} handleToggleWishlist={handleToggleWishlist} />
                                <button onClick={() => handleQuickView(product)} className='quick_button'>Quick View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <QuickViewModal
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={handleCloseQuickView}
            />
        </div>
    );
};

export default BestSellerProducts;














