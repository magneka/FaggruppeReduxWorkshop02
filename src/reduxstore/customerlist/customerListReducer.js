import {
    FETCH_CUSTOMERS_BEGIN,
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_FAILURE
} from './customerListActions'

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function customerListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CUSTOMERS_BEGIN:
            // Skru på flagg for lasting, så kan vi vise spinner
            // og nullstill errors
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_CUSTOMERS_SUCCESS:
            // Nå seter vi items
            // Also, replace the items with the ones from the server
            return {
                ...state,
                items: [...action.payload],
                loading: false
            };

        case FETCH_CUSTOMERS_FAILURE:
            // Det gikk i dass, sett feilmelding, og markere at vi ikke lenger laster
            // Da skal spinneren forsvinne, og eventuell feilmelding dukke opp
            return {
                ...state,
                loading: false,
                items: [],
                error: action.payload,
            };

        default:
            // Du skal ALLTID ha en default i reduceren
            return state;
    }
}