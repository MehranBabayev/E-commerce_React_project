// import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchCategories = createAsyncThunk(
//     'shop/fetchCategories',
//     async (_, { rejectWithValue }) => {
//         try {
//             console.log('Fetching categories...');
//             const response = await axios.get('http://localhost:8000/category');
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching categories:', error.message);
//             return rejectWithValue({ message: 'Failed to fetch categories' });
//         }
//     }
// );

// // Async Thunk for fetching products
// export const fetchProducts = createAsyncThunk(
//     'shop/fetchProducts',
//     async (_, { rejectWithValue }) => {
//         try {
//             console.log('Fetching products...');
//             const response = await axios.get('http://localhost:8000/products');
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching products:', error.message);
//             return rejectWithValue({ message: 'Failed to fetch products' });
//         }
//     }
// );

// export const fetchColors = createAsyncThunk(
//     'shop/fetchColors',
//     async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/colors');
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     }
// );

// export const fetchBrands = createAsyncThunk(
//     'shop/fetchBrands',
//     async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/brands');
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     }
// );

// export const fetchProductById = createAsyncThunk(
//     'shop/fetchProductById',
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`http://localhost:8000/products/${id}`);
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching product by ID:', error.message);
//             return rejectWithValue({ message: 'Failed to fetch product details' });
//         }
//     }
// );

// const initialState = {
//     categories: [],
//     products: [],
//     colors: [],
//     brands: [],
//     filteredProducts: [],
//     loading: false,
//     error: null,
//     searchQuery: '',
//     selectedSize: '',
//     minPrice: 0,
//     maxPrice: Infinity,
// };

// export const shopSlice = createSlice({
//     name: 'shop',
//     initialState,
//     reducers: {
//         setCategoriesAndProducts: (state, action) => {
//             state.categories = action.payload.categories;
//             state.products = action.payload.products;
//             state.filteredProducts = action.payload.products;
//             state.loading = false;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//             state.loading = false;
//         },
//         setLoading: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         filterProductsByCategoryAndSubcategory: (state, action) => {
//             const { categoryName, subcategoryName } = action.payload || {};
//             console.log('categoryName:', categoryName, 'subcategoryName:', subcategoryName);
        
//             state.filteredProducts = state.products.filter(product => {
//                 const categoryMatch = !categoryName || product.category.name === categoryName;
//                 const subcategoryMatch = !subcategoryName || product.category.sub_category === subcategoryName;
//                 return categoryMatch && subcategoryMatch;
//             });
//         },
        
        
        
        
        
//         setSearchQuery: (state, action) => {
//             state.searchQuery = action.payload;
//         },
//         setSelectedSize: (state, action) => {
//             state.selectedSize = action.payload;
//         },
//         setPriceFilter: (state, action) => {
//             const { minPrice, maxPrice } = action.payload;
//             state.minPrice = minPrice;
//             state.maxPrice = maxPrice;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCategories.pending, (state) => {
//                 console.log('Fetching categories...');
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCategories.fulfilled, (state, action) => {
//                 console.log('Categories fetched successfully.');
//                 state.loading = false;
//                 state.categories = action.payload;
//             })
//             .addCase(fetchCategories.rejected, (state, action) => {
//                 console.error('Error fetching categories.');
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(fetchProducts.pending, (state) => {
//                 console.log('Fetching products...');
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchProducts.fulfilled, (state, action) => {
//                 console.log('Products fetched successfully.');
//                 state.loading = false;
//                 state.products = action.payload;
//                 state.filteredProducts = action.payload;
//             })
//             .addCase(fetchProducts.rejected, (state, action) => {
//                 console.error('Error fetching products.');
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(fetchColors.fulfilled, (state, action) => {
//                 state.colors = action.payload;
//             })
//             .addCase(fetchBrands.fulfilled, (state, action) => {
//                 state.brands = action.payload;
//             })
//             .addCase(fetchProductById.pending, (state) => {
//                 console.log('Fetching product by ID...');
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchProductById.fulfilled, (state, action) => {
//                 console.log('Product details fetched successfully.');
//                 state.loading = false;
//                 const updatedProducts = state.products.map(product => {
//                     if (product.id === action.payload.id) {
//                         return action.payload; // Update existing product with new data
//                     }
//                     return product; // Return unchanged product if IDs don't match
//                 });
//                 state.products = updatedProducts;
//             })
            
            
//             .addCase(fetchProductById.rejected, (state, action) => {
//                 console.error('Error fetching product by ID.');
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export const {
//     setCategoriesAndProducts,
//     setError,
//     setLoading,
//     filterProductsByCategoryAndSubcategory,
//     setSearchQuery,
//     setSelectedSize,
//     setPriceFilter,
// } = shopSlice.actions;


// export const selectCategories = (state) => state.shop.categories;
// export const selectProducts = (state) => state.shop.products;


// export const selectFilteredProducts = createSelector(
//     [selectProducts, state => state.shop.searchQuery, state => state.shop.minPrice, state => state.shop.maxPrice],
//     (products, searchQuery, minPrice, maxPrice) => {
//         return products.filter(product =>
//             product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//             product.price >= minPrice &&
//             product.price <= maxPrice
//         );
//     }
// );
// export const selectColors = state => state.shop.colors;
// export const selectBrands = state => state.shop.brands;

// export const selectSearchQuery = state => state.shop.searchQuery;
// export const selectSelectedSize = state => state.shop.selectedSize;
// export const selectMinPrice = state => state.shop.minPrice;
// export const selectMaxPrice = state => state.shop.maxPrice;

// export default shopSlice.reducer;


import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching categories
export const fetchCategories = createAsyncThunk(
    'shop/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching categories...');
            const response = await axios.get('http://localhost:8000/category');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error.message);
            return rejectWithValue({ message: 'Failed to fetch categories' });
        }
    }
);

// Async Thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'shop/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching products...');
            const response = await axios.get('http://localhost:8000/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error.message);
            return rejectWithValue({ message: 'Failed to fetch products' });
        }
    }
);

// Async Thunk for fetching colors
export const fetchColors = createAsyncThunk(
    'shop/fetchColors',
    async () => {
        try {
            const response = await axios.get('http://localhost:8000/colors');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Async Thunk for fetching brands
export const fetchBrands = createAsyncThunk(
    'shop/fetchBrands',
    async () => {
        try {
            const response = await axios.get('http://localhost:8000/brands');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Async Thunk for fetching product by ID
export const fetchProductById = createAsyncThunk(
    'shop/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error.message);
            return rejectWithValue({ message: 'Failed to fetch product details' });
        }
    }
);

const initialState = {
    categories: [],
    products: [],
    colors: [],
    brands: [],
    filteredProducts: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedSize: '',
    minPrice: 0,
    maxPrice: Infinity,
    sortingOption: null, // New state for sorting option
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCategoriesAndProducts: (state, action) => {
            state.categories = action.payload.categories;
            state.products = action.payload.products;
            state.filteredProducts = action.payload.products;
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        filterProductsByCategoryAndSubcategory: (state, action) => {
            const { categoryName, subcategoryName } = action.payload || {};
            console.log('categoryName:', categoryName, 'subcategoryName:', subcategoryName);
        
            state.filteredProducts = state.products.filter(product => {
                const categoryMatch = !categoryName || product.category.name === categoryName;
                const subcategoryMatch = !subcategoryName || product.category.sub_category === subcategoryName;
                return categoryMatch && subcategoryMatch;
            });
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSelectedSize: (state, action) => {
            state.selectedSize = action.payload;
        },
        setPriceFilter: (state, action) => {
            const { minPrice, maxPrice } = action.payload;
            state.minPrice = minPrice;
            state.maxPrice = maxPrice;
        },
        setSortingOption: (state, action) => { // New reducer for setting sorting option
            state.sortingOption = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                console.log('Fetching categories...');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                console.log('Categories fetched successfully.');
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                console.error('Error fetching categories.');
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProducts.pending, (state) => {
                console.log('Fetching products...');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log('Products fetched successfully.');
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                console.error('Error fetching products.');
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchColors.fulfilled, (state, action) => {
                state.colors = action.payload;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                console.log('Fetching product by ID...');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                console.log('Product details fetched successfully.');
                state.loading = false;
                const updatedProducts = state.products.map(product => {
                    if (product.id === action.payload.id) {
                        return action.payload; // Update existing product with new data
                    }
                    return product; // Return unchanged product if IDs don't match
                });
                state.products = updatedProducts;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                console.error('Error fetching product by ID.');
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    setCategoriesAndProducts,
    setError,
    setLoading,
    filterProductsByCategoryAndSubcategory,
    setSearchQuery,
    setSelectedSize,
    setPriceFilter,
    setSortingOption, // Export new action
} = shopSlice.actions;

// Selector functions
export const selectCategories = (state) => state.shop.categories;
export const selectProducts = (state) => state.shop.products;
export const selectColors = state => state.shop.colors;
export const selectBrands = state => state.shop.brands;
export const selectSearchQuery = state => state.shop.searchQuery;
export const selectSelectedSize = state => state.shop.selectedSize;
export const selectMinPrice = state => state.shop.minPrice;
export const selectMaxPrice = state => state.shop.maxPrice;
export const selectSortingOption = state => state.shop.sortingOption || "";



export const selectFilteredProducts = createSelector(
    [selectProducts, state => state.shop.searchQuery, state => state.shop.minPrice, state => state.shop.maxPrice],
    (products, searchQuery, minPrice, maxPrice) => {
        return products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            product.price >= minPrice &&
            (!maxPrice || product.price <= maxPrice)
            // If maxPrice is not provided (undefined), all products with prices greater than or equal to minPrice will be included
        );
    }
);



export const selectFilteredAndSortedProducts = createSelector(
    [selectProducts, selectSortingOption],
    (products, sortingOption) => {
        console.log('Sorting option:', sortingOption);
        
        let sortedProducts = [...products]; // Copy the products array

        if (sortingOption === 'price_low_to_high') {
            sortedProducts.sort((a, b) => a.price - b.price); // Sort by price low to high
        } else if (sortingOption === 'price_high_to_low') {
            sortedProducts.sort((a, b) => b.price - a.price); // Sort by price high to low
        }
        // Add more sorting options as needed
        
        console.log('Sorted products:', sortedProducts); // Log the sorted products array
        return sortedProducts;
    }
);




export default shopSlice.reducer;








