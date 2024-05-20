import { createSlice } from '@reduxjs/toolkit';

// Получаем элементы списка желаний из localStorage, если они доступны
const storedWishlist = localStorage.getItem('wishlist');
const initialState = {
    items: storedWishlist ? JSON.parse(storedWishlist) : [], // Инициализировать с данными из localStorage, если они доступны
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action) {
            state.items.push(action.payload); // Добавить товар в список желаний
            localStorage.setItem('wishlist', JSON.stringify(state.items)); // Обновить localStorage
        },
        removeFromWishlist(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id); // Удалить товар из списка желаний
            localStorage.setItem('wishlist', JSON.stringify(state.items)); // Обновить localStorage
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
