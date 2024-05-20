import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceFilter } from '../../redux/slices/shopSlice';
import './filterModal.css';

const FilterModal = ({ isOpen, onClose, colors, selectedColors, onColorSelect, brands, selectedBrands, onBrandSelect }) => {
    const dispatch = useDispatch();

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleClose = () => {
        onClose();
    };


    const handlePriceFilter = () => {
        const min = parseInt(minPrice);
        const max = maxPrice !== '' ? parseInt(maxPrice) : undefined;
        dispatch(setPriceFilter({ minPrice: min, maxPrice: max }));
        handleClose();
    };
    

    const handleResetFilter = () => {
        setMinPrice('');
        setMaxPrice('');
    };

    const handleIncreaseMinPrice = () => {
        const newMinPrice = parseInt(minPrice || '0') + 1;
        setMinPrice(newMinPrice.toString());
    };

    const handleDecreaseMinPrice = () => {
        if (!minPrice || minPrice === '' || parseInt(minPrice) === 0) {
            return; // Prevent decreasing below zero
        } else {
            const newMinPrice = parseInt(minPrice) - 1;
            setMinPrice(newMinPrice.toString());
        }
    };

    const handleIncreaseMaxPrice = () => {
        const newMaxPrice = parseInt(maxPrice || '0') + 1;
        setMaxPrice(newMaxPrice.toString());
    };

    const handleDecreaseMaxPrice = () => {
        if (!maxPrice || maxPrice === '' || parseInt(maxPrice) === 0) {
            return; // Prevent decreasing below zero
        } else {
            const newMaxPrice = parseInt(maxPrice) - 1;
            setMaxPrice(newMaxPrice.toString());
        }
    };

    return (
        <div className={`filter-modal ${isOpen ? 'open' : ''}`} ref={modalRef}>
            <div className="modal-content">
                <span className="filter_modal_close" onClick={handleClose}>&times;</span>
                <h2 className='filter_modal_filter'>Filter</h2>
                <div className="price-filter">
                    <h3 className="price-filter_h3">Price</h3>
                    <div className="price-filter_inputs">
                        <div className="price-inputs">
                            <button onClick={handleDecreaseMinPrice}>-</button>
                            <input type="text" id="min-price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" />
                            <button onClick={handleIncreaseMinPrice}>+</button>
                        </div>
                        <div className="price-inputs">
                            <button onClick={handleDecreaseMaxPrice}>-</button>
                            <input type="text" id="max-price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" />
                            <button onClick={handleIncreaseMaxPrice}>+</button>
                        </div>
                        <div className="price-buttons">
                            <button onClick={handlePriceFilter}>Apply</button>
                            <button onClick={handleResetFilter}>Reset</button>
                        </div>
                    </div>
                </div>
                <div className="color-filter">
                    <h3 className="color-filter_h3">Colors</h3>
                    <ul>
                        {colors.map((colorObj) => (
                            <li key={colorObj.id}>
                                <input
                                    type="checkbox"
                                    id={colorObj.color}
                                    checked={selectedColors.includes(colorObj.color)}
                                    onChange={() => onColorSelect(colorObj.color)}
                                />
                                <label htmlFor={colorObj.color}>{colorObj.color}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="brand-filter">
                    <h3 className="brand-filter_h3">Brands</h3>
                    <ul>
                        {brands.map((brandObj) => (
                            <li key={brandObj.id}>
                                <input
                                    type="checkbox"
                                    id={brandObj.brand}
                                    checked={selectedBrands.includes(brandObj.brand)}
                                    onChange={() => onBrandSelect(brandObj.brand)}
                                />
                                <label htmlFor={brandObj.brand}>{brandObj.brand}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;

