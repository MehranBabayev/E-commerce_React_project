import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import { Navigation} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import './secondSwiper.css'
import { IoCarOutline } from "react-icons/io5";
import { GrSupport } from "react-icons/gr";
import { IoRefresh } from "react-icons/io5";
import { RiDoorLockLine } from "react-icons/ri";


const SecondSwiper = () => {



    return (
        <>
        <section className='instagram'>
            <div className='insta'>
                <h3 className='insta_head'>@ FOLLOW US ON INSTAGRAM</h3>
            </div>
            
            
            
            <Swiper
            style={{
            "--swiper-navigation-size":"25px"
            }}
            slidesPerView={6}
            spaceBetween={0}           

            navigation={true}
            modules={[Navigation]}
            className="swipers"
            >
            
            
                <SwiperSlide  >
                
                <div className='sale1'>
                        
                </div>

                
                </SwiperSlide>
                <SwiperSlide  >
                
                <div className='sale2'>
                    
                </div>

                
                </SwiperSlide>
                <SwiperSlide  >
                
                <div className='sale3'>
                    
                </div>

                
                </SwiperSlide>
                <SwiperSlide  >
                
                <div className='sale4'>
                    
                </div>

                
                </SwiperSlide>
                <SwiperSlide  >
                
                <div className='sale5'>
                    
                </div>

                
                </SwiperSlide>
                <SwiperSlide  >
                
                <div className='sale6'>
                    
                </div>

                
                </SwiperSlide>
                <SwiperSlide  >
                
                <div className='sale7'>
                    
                </div>

                
                </SwiperSlide>
                <SwiperSlide  >
                
                <div className='sale8'>
                    
                </div>

                
                </SwiperSlide>
            
            
            </Swiper>
            <div className='under'>
                <div className='under_container'>
                    <div className='under_item'>
                        <div className='under_icon'>
                            <IoCarOutline />
                        </div>
                        <div className='under_text'>
                            <h4 className='under_h4'>
                            FREE SHIPPING
                            </h4>
                            <p className='under_p'>
                            Free shipping on all US order or order above $100
                            </p>
                        </div>
                    </div>
                    <div className='under_item'>
                        <div className='under_icon'>
                            <GrSupport />
                        </div>
                        <div className='under_text'>
                            <h4 className='under_h4'>
                            SUPPORT 24/7
                            </h4>
                            <p className='under_p'>
                            Contact us 24 hours a day, 7 days a week
                            </p>
                        </div>
                    </div>
                    <div className='under_item'>
                        <div className='under_icon'>
                            <IoRefresh />
                        </div>
                        <div className='under_text'>
                            <h4 className='under_h4'>
                            30 DAYS RETURN
                            </h4>
                            <p className='under_p'>
                            Simply return it within 30 days for an exchange.
                            </p>
                        </div>
                    </div>
                    <div className='under_item'>
                        <div className='under_icon'>
                            <RiDoorLockLine />
                        </div>
                        <div className='under_text'>
                            <h4 className='under_h4'>
                            100% PAYMENT SECURE
                            </h4>
                            <p className='under_p'>
                            We ensure secure payment with PEV
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        </>
    );
}

export default SecondSwiper;