import React from 'react';
import './categoryImage.css';
import { Link } from 'react-router-dom';

function CategoryImage() {
    return (
        <section className='category_container'>
            <div className='category_pic'>        
                <div className='pic1_con'>
                    <div className='pic_1'>
                        <Link to="/shop?category=women">
                            <button className='women'>Women</button>
                        </Link>
                    </div>
                </div>
                <div className='pic2_con'>
                    <div className='pic_2'>
                        <Link to="/shop?category=accessories">
                            <button className='accessories'>Accessories</button>
                        </Link>
                    </div>
                    <div className='pic_3'>
                        <Link to="/shop?category=shoes">
                            <button className='shoes'>Shoes</button>
                        </Link>
                    </div>
                </div>
                <div className='pic3_con'>
                    <div className='pic_4'>
                        <Link to="/shop?category=men">
                            <button className='men'>Men</button>
                        </Link>
                    </div>
                </div>
            </div>    
        </section>
    )
}

export default CategoryImage;
