import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectedWithValue }) => {
        try {
            console.log('Fetching products...'); // Log fetching products
            const response = await axios.get('http://localhost:8000/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error.message); // Log error fetching products
            return rejectedWithValue({ message: 'Failed to fetch products' });
        }
    }
);

// Initial state
const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('Fetching products...'); // Log fetching products
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                console.log('Products fetched successfully:', action.payload); // Log successful fetching
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                console.error('Error fetching products:', action.payload.message); // Log error fetching products
            });
    },
});

// Selector for products
export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;

