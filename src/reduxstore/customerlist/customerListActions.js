export const FETCH_CUSTOMERS_BEGIN = 'FETCH_CUSTOMERS_BEGIN';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE';

export const fetchCustomersBegin = () => ({
    type: FETCH_CUSTOMERS_BEGIN
});

export const fetchCustomersSuccess = Customers => ({
    type: FETCH_CUSTOMERS_SUCCESS,
    payload: Customers
});

export const fetchCustomersFailure = error => ({
    type: FETCH_CUSTOMERS_FAILURE,
    payload: error 
});

// Her er en Promise basert versjon av fetchCustomers
export function fetchCustomers1(extra) {
    return dispatch => {
        dispatch(fetchCustomersBegin());
        
        return fetch(`/customerlist`, { method: 'GET' })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchCustomersSuccess(json));
            })
            .catch(
                error => dispatch(fetchCustomersFailure(error.message)
            ));
            
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Her er en async versjon av FetchCustomers, merk at det er to await statements?
export function fetchCustomers(extra) {
    return async dispatch => {
        dispatch (fetchCustomersBegin());

        const fetchResult = await fetch('/customerlist', { method: 'GET' })
        
        if (fetchResult.ok) {
            const result = await fetchResult.json()
            dispatch (fetchCustomersSuccess(result));
        } else {
            dispatch (fetchCustomersFailure(fetchResult.statusText))
        }    
    };
}
