import React, { useState, useRef, useEffect } from 'react';
import './searchModal.css'; // Add your CSS for the search modal
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectSearchQuery } from '../../../redux/slices/shopSlice'; // Import Redux actions and selectors
import { GrPowerReset } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const SearchModal = ({ showModal, handleCloseModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook from React Router
    const searchQuery = useSelector(selectSearchQuery); // Select the search query from the Redux store
    const [query, setQuery] = useState(searchQuery);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal, handleCloseModal]);

    const handleInputChange = (e) => {
        setQuery(e.target.value); // Update the local state with the input value
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        dispatch(setSearchQuery(query)); // Dispatch the action to set the search query in the Redux store
        handleCloseModal(); // Close the search modal
        navigate(`/shop?search=${encodeURIComponent(query)}`); // Navigate to the shop page with search query as URL parameter
        setQuery('');
    };

    const handleReset = () => {
        setQuery(''); // Clear the search query
        dispatch(setSearchQuery('')); // Dispatch the action to clear the search query in the Redux store
    };

    return (
        <div className={`search-modal ${showModal ? 'show' : ''}`}>
            <div className="search-modal-content" ref={modalRef}>
                
                <div className='search_input_area'>                
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} // Add onKeyDown event listener
                        placeholder="Search products..."
                        className="search-input" // Add a class for styling
                    />

                    <CiSearch className='search_icon_btn' onClick={handleSearch}></CiSearch>
                </div>
                <GrPowerReset className='search_reset' onClick={handleReset}></GrPowerReset> {/* Reset button to clear the search query */}
            </div>
        </div>
    );
}

export default SearchModal;
