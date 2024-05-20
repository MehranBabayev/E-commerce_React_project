import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import './firstSwiper.css'


export default function App() {
return (
    <>
    <Swiper
        slidesPerView={1}
        spaceBetween={-1}

        pagination={{
        clickable: true,
        }}
        cssMode={true}
        modules={[Pagination]}
        className="mySwiper"
    >
        <SwiperSlide className='handmade'>
            <section>
                <div className="container_swiper_1">
                    <p className='pclass'>SUMMER 2023</p>
                    <h2 className='h2class'>New Arrival Collection</h2>
                    <button className='button_page'>Explore Now</button>
                </div>
            </section></SwiperSlide>
        <SwiperSlide className='different'>
            <section >
                <div className="container_swiper_2">
                    <p className='pclass'>NEW SEASON</p>
                    <h2 className='h2class'>Lookbook Collection</h2>
                    <button className='button_page1'>Explore Now</button>
                </div>
            </section></SwiperSlide>
        <SwiperSlide className='high'>
            <section >
                <div className="container_swiper_3">
                    <p className='pclass'>SUMMER SALE</p>
                    <h2 className='h2class'>Save up to 70%</h2>
                    <button className='button_page'>Explore Now</button>
                </div>        
            </section>

        </SwiperSlide>
        

        
    </Swiper>
        
    </>
);
}