import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import trendingProductsReducer from './slices/trendingProductsSlice';
import bestSellerProductsReducer from './slices/bestSellerProductsSlice';
import categoriesReducer from './slices/categoriesSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice'; 
import shopReducer from './slices/shopSlice';


const store = configureStore({
    reducer: {
        products: productsReducer,
        trendingProducts: trendingProductsReducer,
        bestSellerProducts: bestSellerProductsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        wishlist: wishlistReducer, 
        shop: shopReducer,

    },
});

export default store;


