import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { TableHeaderComponent } from "./TableHeaderComponent"
import { TableRowComponent } from "./TableRowComponent"

/*
Denne klassen bruker localstate.

Hva må du kjøre for å få den til å bruke REDUX?
===============================================

  Hente data:
  -----------
  - Redux storen er allerede laget (customers)
  - Imorter nødvendige redux importer
  - Aktiver state i containeren
  - Dispatch fetchCustomers i actions for customer store

  Filtrere:
  ---------
  - Nå må du endre i getItems metoden slik at denne tar hensyn
    til filteret.
  
*/
export const CustomersListContainer = (props) => {

    const [isloading, setIsloading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [customers, setCustomers] = useState([])

    async function fetchCustomers() {

        setIsloading(true)
        setErrorMessage('')

        const fetchResult = await fetch(`/customerlist`, { method: 'GET' })

        const result = await fetchResult.json()

        if (fetchResult.ok) {
            setCustomers([...result])
            setIsloading(false)
            return;
        } else {
            setIsloading(false)
            setErrorMessage(result.errorMessage)
        }
    }

// ┌──────────────────────────────────────────────────────────────────────────────┐
// │  For å bruke filter må vi sjekke om filterstate er state                     │
// │  I så fall må vi finne poster som matcher og vise kun disse                  │
// │  Vi vil også unngå at vi ikke får treff pga upper / lowercase                │
// └──────────────────────────────────────────────────────────────────────────────┘    
    const getItems = () => {

        // Sjekk om filter er satt på
        /*
         let filterString = filterState.filter ? filterState.filter.toUpperCase() : ''
         if (filterString) {
            let filteredItems = state.items.filter(e => e.searchField.includes(filterString))

            // Skriver ut filtrerte
            return (filteredItems.map(function (item, i) {
                return (<TableRowComponent key={i} item={item} i={i} />)
            }))


        } else {
        */

            // Skriver ut alle
            return (customers.map(function (item, i) {
                return (<TableRowComponent key={i} item={item} i={i} />)
            }))
           
        //}
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    if (isloading)
        return (<div>loading data</div>)
    else if (errorMessage)
        return (<div>something bad has happened: {errorMessage}</div>)
    else return (
        <div>
            <h1>Customer list</h1>
            <table>
                <TableHeaderComponent />        
                {getItems()}
            </table>
        </div>
    )
}