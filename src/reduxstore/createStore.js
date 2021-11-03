import { createStore, compose, applyMiddleware } from 'redux'
import combinedReducers from './index'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

/*
export const createReduxStore = () => {

    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(
        combinedReducers,
        // {}, // <- default state
        composedEnhancers
    )

    return store
}
*/

export const createReduxStore = () => {
    const store = createStore(
        combinedReducers,
        composeWithDevTools(...[applyMiddleware(...[thunkMiddleware])])
    )
    return store
}
