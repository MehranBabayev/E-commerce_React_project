import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTrendingProducts } from '../../redux/slices/trendingProductsSlice';
import { fetchBestSellerProducts } from '../../redux/slices/bestSellerProductsSlice';
import FirstSwiper from './FirstSwiper';
import CategoryImage from './CategoryImage';
import TrendingProducts from './TrendingProducts'; // Проверьте путь к файлу TrendingProducts

import BestSellerProducts from './BestSellerProducts';
import Lookbook from './Lookbook'
import Latest from './Latest';
import SecondSwiper from './SecondSwiper';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingProducts());
        dispatch(fetchBestSellerProducts());
    }, [dispatch]);

    return (
        <div className="home-container">
            <FirstSwiper />
            <CategoryImage />
            <TrendingProducts />
            <Lookbook />
            <BestSellerProducts />
            <Latest/>
            <SecondSwiper/>
        </div>
    );
};

export default Home;


