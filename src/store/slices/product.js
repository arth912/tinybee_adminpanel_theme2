// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    products: [],
    product: null,
    relatedProducts: [],
    reviews: [],
    addresses: [],
    categories: []
};

const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        addProductSuccess(state, action) {
            state.product = action.payload;
        },
        // GET PRODUCTS
        getProductsSuccess(state, action) {
            state.products = action.payload;
        },

        // GET CATEGORY LIST
        getProductCategoryListSuccess(state, action) {
            state.categories = action.payload;
        },

        // FILTER PRODUCTS
        filterProductsSuccess(state, action) {
            state.products = action.payload;
        },

        // GET PRODUCT
        getProductSuccess(state, action) {
            state.product = action.payload;
        },

        // GET RELATED PRODUCTS
        getRelatedProductsSuccess(state, action) {
            state.relatedProducts = action.payload;
        },

        // GET PRODUCT REVIEWS
        getProductReviewsSuccess(state, action) {
            state.reviews = action.payload;
        },

        // GET ADDRESSES
        getAddressesSuccess(state, action) {
            state.addresses = action.payload;
        },

        // ADD ADDRESS
        addAddressSuccess(state, action) {
            state.addresses = action.payload;
        },

        // EDIT ADDRESS
        editAddressSuccess(state, action) {
            state.addresses = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addProduct(data) {
    return async () => {
        try {
            const response = await axios.post('/products/add',{data})
            dispatch(slice.actions.addProductSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

export function getProducts(page, limit) {
    return async () => {
        try {
            const response = await axios.post('/products/product-list', { page, limit });
            // console.log(response.data.data.products);
            dispatch(slice.actions.getProductsSuccess(response.data.data.products));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getCategories() {
    return async () => {
        try {
            const response = await axios.get('/products/category-list');
            console.log(response.data.data);
            dispatch(slice.actions.getProductCategoryListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterProducts(filter) {
    return async () => {
        try {
            const response = await axios.post('/api/products/filter', { filter });
            dispatch(slice.actions.filterProductsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProduct(id) {
    return async () => {
        try {
            const response = await axios.post('/api/product/details', { id });
            dispatch(slice.actions.getProductSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getRelatedProducts(id) {
    return async () => {
        try {
            const response = await axios.post('/api/product/related', { id });
            dispatch(slice.actions.getRelatedProductsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProductReviews() {
    return async () => {
        try {
            const response = await axios.get('/api/review/list');
            dispatch(slice.actions.getProductReviewsSuccess(response.data.productReviews));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getAddresses() {
    return async () => {
        try {
            const response = await axios.get('/api/address/list');
            dispatch(slice.actions.getAddressesSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addAddress(address) {
    return async () => {
        try {
            const response = await axios.post('/api/address/new', address);
            dispatch(slice.actions.addAddressSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function editAddress(address) {
    return async () => {
        try {
            const response = await axios.post('/api/address/edit', address);
            dispatch(slice.actions.editAddressSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
