// redux/slices/trendingProductsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrendingProducts = createAsyncThunk(
    'trendingProducts/fetchTrendingProducts',
    async (_, { rejectedWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/products');
            return response.data.filter(product => product.views > 450);
        } catch (error) {
            return rejectedWithValue('Trend məhsulları əldə etmək mümkün olmadı');
        }
    }
);

export const fetchMoreTrendingProducts = createAsyncThunk(
    'trendingProducts/fetchMoreTrendingProducts',
    async (_, { getState, rejectedWithValue }) => {
        try {
            const existingProducts = getState().trendingProducts.trendingProducts;
            const loadedProductIds = existingProducts.map(product => product.id);
            const response = await axios.get('http://localhost:8000/products', {
                params: {
                    loadedIds: loadedProductIds.join(','),
                    limit: 8,
                    viewsGreaterThan: 450
                }
            });
            return response.data;
        } catch (error) {
            return rejectedWithValue('Daha çox trend məhsullarını gətirmək mümkün olmadı');
        }
    }
);

const initialState = {
    trendingProducts: [],
    loading: false,
    error: null
};

const trendingProductsSlice = createSlice({
    name: 'trendingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.trendingProducts = action.payload;
            })
            .addCase(fetchTrendingProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMoreTrendingProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoreTrendingProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.trendingProducts = [...state.trendingProducts, ...action.payload];
            })
            .addCase(fetchMoreTrendingProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default trendingProductsSlice.reducer;

