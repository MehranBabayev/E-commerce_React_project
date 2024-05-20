import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts, selectCategories, selectFilteredProducts, filterProductsByCategoryAndSubcategory, fetchColors, fetchBrands, selectColors, selectBrands, setSortingOption, selectSortingOption } from '../../redux/slices/shopSlice';


import './product.css';
import AddToCartButton from '../Cart/AddToCartButton';
import WishlistButton from './WishlistButton';
import { addItem } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import FilterModal from './FilterModal';
import QuickViewModal from './QuickViewModal';
import { Link } from 'react-router-dom';
import { CiFilter } from "react-icons/ci";

const Shop = () => {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts);
    const categories = useSelector(selectCategories);
    const colors = useSelector(selectColors);
    const brands = useSelector(selectBrands);
    const sortingOption = useSelector(selectSortingOption);
    const wishlistItems = useSelector(state => state.wishlist.items);

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [error] = useState(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    

    useEffect(() => {
        console.log('Fetching categories...');
        dispatch(fetchCategories());
        dispatch(fetchProducts());
        dispatch(fetchColors());
        dispatch(fetchBrands());
    }, [dispatch]);

    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName);
        setSelectedSubcategory('');
        if (categoryName === null) {
            setSelectedColors([]);
            setSelectedBrands([]);
            setMinPrice(0);
            setMaxPrice(Infinity);
        } else {
            dispatch(filterProductsByCategoryAndSubcategory({ categoryName, subcategoryName: '' }));
        }
    };

    const handleSubcategorySelect = (subcategoryName) => {
        setSelectedSubcategory(subcategoryName);
        if (selectedCategory) {
            dispatch(filterProductsByCategoryAndSubcategory({ categoryName: selectedCategory, subcategoryName }));
        }
    };

    const handleColorSelect = (color) => {
        setSelectedColors(prevColors => {
            if (prevColors.includes(color)) {
                return prevColors.filter(c => c !== color);
            } else {
                return [...prevColors, color];
            }
        });
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrands(prevBrands => {
            if (prevBrands.includes(brand)) {
                return prevBrands.filter(b => b !== brand);
            } else {
                return [...prevBrands, brand];
            }
        });
    };

    const filterProducts = (products) => {
        let filtered = products;
    
        if (selectedColors.length > 0) {
            filtered = filtered.filter(product => selectedColors.includes(product.color));
        }
    
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product => selectedBrands.includes(product.brand));
        }
    
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category.name === selectedCategory);
            if (selectedSubcategory) {
                filtered = filtered.filter(product => product.category.sub_category === selectedSubcategory);
            }
        }
    
        filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
        // Добавляем сортировку продуктов
        if (sortingOption === 'price_low_to_high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortingOption === 'price_high_to_low') {
            filtered.sort((a, b) => b.price - a.price);
        }
        // Добавьте другие варианты сортировки при необходимости
    
        return filtered;
    };
    

    const isInWishlist = (product) => {
        return wishlistItems.some(item => item.id === product.id);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const handleToggleWishlist = (product) => {
        if (isInWishlist(product)) {
            dispatch(removeFromWishlist(product));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    const openFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleCloseQuickView = () => {
        setIsQuickViewOpen(false);
    };

    const handleSortChange = (e) => {
        dispatch(setSortingOption(e.target.value));
    };

    return (
        <div className="shop-container">
            <div className="shop-header">
                <h2>Shop</h2>
            </div>

            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={closeFilterModal}
                colors={colors}
                brands={brands}
                selectedColors={selectedColors}
                selectedBrands={selectedBrands}
                onColorSelect={handleColorSelect}
                onBrandSelect={handleBrandSelect}
                onPriceChange={(minPrice, maxPrice) => {
                    setMinPrice(minPrice);
                    setMaxPrice(maxPrice);
                }}
            />

            {error && <p>{error}</p>}

            <div className="category-list">
                <div>
                    <CiFilter className="filter-icon" onClick={openFilterModal} />
                </div>
                <div className='shop_category_item'>
                    <div className='shop_category_item_row'>
                        <div className={`category-item ${!selectedCategory ? 'active' : ''}`} onClick={() => handleCategorySelect(null)}>
                            All
                        </div>
                        {categories.map((category) => (
                            <div key={category.id} className={`category-item ${selectedCategory === category.name ? 'active' : ''}`} onClick={() => handleCategorySelect(category.name)}>
                                <span>
                                    {category.name}
                                </span>
                                {category.subcategories && (
                                    <div className="subcategory-list">
                                        {category.subcategories.map(subcategory => (
                                            <div key={subcategory.id} className={`subcategory-item ${selectedSubcategory === subcategory.name ? 'active' : ''}`} onClick={() => handleSubcategorySelect(subcategory.name)}>
                                                {subcategory.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

            
                    <select className="sorting-select" value={sortingOption} onChange={handleSortChange}>
                        <option value="">Sort by...</option>
                        <option value="price_low_to_high">Price: Low to High</option>
                        <option value="price_high_to_low">Price: High to Low</option>
                        {/* Add more sorting options here if needed */}
                    </select>
                </div>
            </div>

            <div className="product-container">
                <div className='product_item_container'>
                    {filterProducts(filteredProducts).map((product) => (
                        <div key={product.id} className="product-card">
                            <div className='product_image'>
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image} alt={product.title} />
                                </Link>
                                <AddToCartButton product={product} onClick={() => handleAddToCart(product)} className='cart_button' />
                                <WishlistButton product={product} isInWishlist={isInWishlist} handleToggleWishlist={handleToggleWishlist} />
                                <button onClick={() => handleQuickView(product)} className='quick_button' >Quick View</button>
                            </div>
                            <Link className='product-card_h3' to={`/product/${product.id}`}>
                                <h3 className='product-card_h3'>{product.title}</h3>
                            </Link>
                            <p>${product.price || 'Цена недоступна'}</p>
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

export default Shop;
