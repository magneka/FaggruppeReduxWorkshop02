import {
    FETCH_CUSTOMER_BEGIN,
    FETCH_CUSTOMER_SUCCESS,
    FETCH_CUSTOMER_FAILURE
} from './customerDetailsActions'

const initialState = {
    customer: null,
    loading: false,
    error: null
};

export default function customerDetailsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CUSTOMER_BEGIN:
            // Skru på flagg for lasting, så kan vi vise spinner
            // og nullstill errors
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_CUSTOMER_SUCCESS:
            // Nå seter vi items
            // Also, replace the items with the ones from the server
            return {
                ...state,
                customer: {...action.payload},
                loading: false
            };

        case FETCH_CUSTOMER_FAILURE:
            // Det gikk i dass, sett feilmelding, og markere at vi ikke lenger laster
            // Da skal spinneren forsvinne, og eventuell feilmelding dukke opp
            return {
                ...state,
                loading: false,
                customer: null,
                error: action.payload,
            };

        default:
            // Du skal ALLTID ha en default i reduceren
            return state;
    }
}