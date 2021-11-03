import { combineReducers } from 'redux'
import counterReducer from './counter/counterReducer'
import customerDetailsReducer from './customerDetails/customerDetailsReducer';
import customerListReducer from './customerlist/customerListReducer';
//import filterReducer from './filter/filterReducer';
import productListReducer from './productlist/productListReducer';
import ucFormReducer from './ucFormStore/ucFormReducer';


const allReducersCombined = combineReducers({
    counter: counterReducer,
    customers: customerListReducer,
    products: productListReducer,
    customerDetails: customerDetailsReducer,
    ucForm: ucFormReducer,
    //filter: filterReducer,
})

// *****************************************************
// reset the state of a redux store (gjør ved innlogging)
// *****************************************************

const combinedReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return allReducersCombined(state, action)
}
export const resetStore = () => {

    return {
        type: 'RESET_STORE'
    }
}

export default combinedReducer