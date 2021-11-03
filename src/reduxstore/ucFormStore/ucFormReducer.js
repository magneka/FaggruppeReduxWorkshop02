import {
    SET_FORMFIELDS,
    SET_FORMVALUES,
    SET_FORMERRORS
} from './ucFormActions'
import * as R from 'rambda'
import { StrictMode } from 'react'

// ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
// │ NOTE:                                                                                                                │
// │ Spread operatoren kloner ikke subobjekter(dvs arrays eller objekter, fordi det er                                    │
// │ pekere som ligger i objektet)                                                                                        │
// │ Har du bruk for å kopiere dypt, kan du bruke Rambda biblioteket,                                                     │
// │                                                                                                                      │
// │ npm install--save Rambda                                                                                             │
// │                                                                                                                      │
// │ import * as R from 'rambda'                                                                                          │
// │ cloned_A = R.clone(a)                                                                                                │
// │                                                                                                                      │
// │ Da har du fått klonet dypt.                                                                                          │
// │                                                                                                                      │
// └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

const initialState = {
    formFields: {},
    formState: {},
    formErrors: {},
    isDirty: false,
    message: '',
    errorMessage: ''    
};

export default function ucFormReducer(state = initialState, action) {

    let newState = null

    switch (action.type) {
        
        case SET_FORMFIELDS:
            return state


        
        case SET_FORMVALUES:
            return state
    

        default:
            // Du skal ALLTID ha en default i reduceren
            return state;
    }
}