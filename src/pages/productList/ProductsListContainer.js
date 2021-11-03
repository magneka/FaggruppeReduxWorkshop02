import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from "../../reduxstore/productlist/productListActions"

export const ProductsListContainer = (props) => {

    // Aktiver react for siden (state og dispatcher)
    const state = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const TableRow = (props) => {
        return (
            <tr key={props.i}>
                <td>
                    {props.item.productName}
                </td>
                <td>
                    {props.item.color}
                </td>
                <td>
                    {props.item.price}
                </td>
            </tr>
        )
    }

    if (state.loading)
        return (<div>loading data</div>)
    else if (state.error)
        return (<div>something bad has happened: {state.error}</div>)
    else return (
        <div>
            <h1>Product list</h1>
            <table>
                <thead>
                <tr>
                    <td>Product</td>
                    <td>Color</td>
                    <td>Price</td>
                </tr>
                </thead>
                <tbody>

                    {state.items.map(function (item, i) {
                        return (<TableRow key={i} item={item} i={i} />)
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}