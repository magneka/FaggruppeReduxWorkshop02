import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../reduxstore/counter/counterActions';

export const CounterContainer = () => {

    const counterState = useSelector(state => state.counter)
    const dispatch = useDispatch()

    const handleIncement = () => dispatch(increment())
    const handleDecrement = () => dispatch(decrement())
    
    return (
        <>
            <h1>counter {counterState}</h1>

            <button onClick={handleIncement}>+</button>
            <button onClick={handleDecrement}>-</button>
            
        </>
    )
}