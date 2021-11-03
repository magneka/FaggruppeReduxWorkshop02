export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = Products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: Products
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});


export function fetchProducts(extra) {
    return dispatch => {
        dispatch(fetchProductsBegin());

        return fetch(`/productlist`, { method: 'GET' })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchProductsSuccess(json));
            })
            .catch(
                error => dispatch(fetchProductsFailure(error.message)
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