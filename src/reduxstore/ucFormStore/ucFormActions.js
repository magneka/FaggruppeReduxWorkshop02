export const SET_FORMFIELDS = 'SET_FORMFIELDS';
export const SET_FORMVALUES = 'SET_FORMVALUES';
export const SET_FORMERRORS = 'SET_FORMERRORS';


export function setFormFieldsRedux(fieldProps) {
    return async dispatch => {
        dispatch({ type: SET_FORMFIELDS, payload: fieldProps })
    }
}

export function setFormStateRedux(fieldValue) {
    return async dispatch => {
        dispatch({type: SET_FORMVALUES, payload: fieldValue})
    }
}
    
