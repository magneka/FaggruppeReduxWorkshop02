export const FETCH_CUSTOMER_BEGIN = 'FETCH_CUSTOMER_BEGIN';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE';

export const fetchCustomerBegin = () => ({
    type: FETCH_CUSTOMER_BEGIN
});

export const fetchCustomerSuccess = Customers => ({
    type: FETCH_CUSTOMER_SUCCESS,
    payload: Customers
});

export const fetchCustomerFailure = error => ({
    type: FETCH_CUSTOMER_FAILURE,
    payload: error 
});

export const fetchCustomer = (id) => {

    return async dispatch => {

        dispatch({ type: FETCH_CUSTOMER_BEGIN, data: null })

        const fetchResult = await fetch(`/customer/${id}`, { method: 'GET' })
    
        const result = await fetchResult.json()
    
        if (fetchResult.ok) {
            dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: result })
            return;
        } else {
            dispatch({ type:  FETCH_CUSTOMER_FAILURE, payload: result.errorMessage })
        }
    }    
}

export const postCustomer = (customer) => { }


export const deleteCustomer = (id) => { }