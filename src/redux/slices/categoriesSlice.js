import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectProducts } from './productsSlice';

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/category');
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to load categories');
        }
    }
);

// Initial state
const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the selector for categories
export const selectCategories = (state) => state.categories.categories;

export const selectProductsByCategory = (state, categoryId) => {
    const products = selectProducts(state);
    if (!categoryId) {
        return products;
    }
    return products.filter(product => product.category && product.category.id === categoryId);
};


export default categoriesSlice.reducer;




