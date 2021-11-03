import { NavLink } from "react-router-dom"

export const TableRowComponent = (props) => {
    let item = props.item
    return (
        <tr key={props.i}>
            <td>
                <NavLink to={`/customerEdit/${item.id}`}>
                    <b>{item.name}</b>
                </NavLink>
            </td>
            <td><span>{item.ceo}</span></td>
            <td><span>{item.address}</span></td>
            <td><span>{item.zip}</span></td>
            <td><span>{item.postal}</span></td>
            <td style={{ textAlign: "right" }}><span>{item.numemp}</span></td>
            <td style={{ textAlign: "right" }}><span>{item.revenue}</span></td>
        </tr>
    )
}