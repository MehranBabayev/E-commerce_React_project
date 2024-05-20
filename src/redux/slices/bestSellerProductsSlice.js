import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBestSellerProducts = createAsyncThunk(
    'bestSellerProducts/fetchBestSellerProducts',
    async (_, { rejectedWithValue }) => {
        try {
            const response = await axios('http://localhost:8000/products');
            return response.data;
        } catch (error) {
            return rejectedWithValue('Не удалось загрузить продукты');
        }
    }
);

const initialState = {
    bestSellerProducts: [],
    loading: false,
    error: null
};

const bestSellerProductsSlice = createSlice({
    name: 'bestSellerProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBestSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.bestSellerProducts = action.payload;
            })
            .addCase(fetchBestSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bestSellerProductsSlice.reducer;
