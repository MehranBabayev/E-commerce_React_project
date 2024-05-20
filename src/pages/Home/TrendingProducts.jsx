import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingProducts, fetchMoreTrendingProducts } from '../../redux/slices/trendingProductsSlice';
import AddToCartButton from '../Cart/AddToCartButton';
import WishlistButton from '../Shop/WishlistButton';
import QuickViewModal from '../Shop/QuickViewModal';
import { addItem } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { Link } from 'react-router-dom'; // Import Link component
import './trend.css';

const TrendingProducts = () => {
    const dispatch = useDispatch();
    const [visibleProducts, setVisibleProducts] = useState([]);
    const trendingProducts = useSelector(state => state.trendingProducts.trendingProducts);
    const loading = useSelector(state => state.trendingProducts.loading);
    const error = useSelector(state => state.trendingProducts.error);
    const wishlistItems = useSelector(state => state.wishlist.items);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    useEffect(() => {
        console.log('Trending ürünler getiriliyor...');
        dispatch(fetchTrendingProducts());
    }, [dispatch]);
    
    useEffect(() => {
        const filteredProducts = trendingProducts.filter(product => product.views > 450);
        setVisibleProducts(filteredProducts.slice(0, 8));
    }, [trendingProducts]);

    const handleLoadMore = () => {
        console.log('Daha fazla Trending Ürünler getiriliyor...');
        const newStartIndex = visibleProducts.length; 
    
        const newProducts = trendingProducts.slice(newStartIndex, newStartIndex + 4);
        const uniqueNewProducts = newProducts.filter(product => !visibleProducts.some(visibleProduct => visibleProduct.id === product.id));
    
        if (uniqueNewProducts.length > 0) {
            const newVisibleProducts = [...visibleProducts, ...uniqueNewProducts];
            setVisibleProducts(newVisibleProducts);
        } else {
            dispatch(fetchMoreTrendingProducts());
        }
    };
    
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const isInWishlist = (product) => {
        return wishlistItems.some(item => item.id === product.id);
    };

    const handleToggleWishlist = (product) => {
        if (isInWishlist(product)) {
            dispatch(removeFromWishlist(product));
        } else {
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

    if (error) {
        return <div>Hata: {error}</div>;
    }

    return (
        <div className="shop-container1">
            <div className='trending'>
                <h3 >TRENDING</h3>
                <p>Top view in this week</p>
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
            {visibleProducts.length < trendingProducts.length && (
                <button onClick={handleLoadMore} disabled={loading} className='trend_button'>Load More</button>
            )}
        </div>
    );
};

export default TrendingProducts;


