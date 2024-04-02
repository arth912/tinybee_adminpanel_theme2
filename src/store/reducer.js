// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import userReducer from './slices/user';
import customerReducer from './slices/customer';
import productReducer from './slices/product';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    user: userReducer,
    customer: customerReducer,
    product: productReducer
});

export default reducer;
