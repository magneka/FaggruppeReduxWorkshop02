import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchCustomer } from "../../reduxstore/customerDetails/customerDetailsActions"
import { fetchCustomers } from "../../reduxstore/customerlist/customerListActions"
import { useUCForm } from "./useUcForm"

const spanStyle = {
    width: "200px",
    display: "inline-block"
}

const errorStyle = {
    color: "red"
}


/*
┌──────────────────────────────────────────────────────────────────────────────┐
│ Hva må en form ha?                                                           │
│   ==================                                                         │
│                                                                              │
│   Du må kunne sette verdier i feltene                                        │
│   Du må kunne validere mens du redigerer                                     │
│   Du må kunne tømme alle felter                                              │
│   Du må ha en melding som sier om noe er gjort (data lagret, slettet etc)    │
│   Du må ha en feilmelding på toppen som indierer at noe ikke kan gjøres      │
│       (kan ikke lagre pga ugyldige verdier i form)                           │                                             │
│   Du må enable og disable knapper basert på state ()                         │
└──────────────────────────────────────────────────────────────────────────────┘
*/

export const CustomerEditContainer = (props) => {
    
    const customerDetails = useSelector(state => state.customerDetails)
    const dispatch = useDispatch()
    
    const { register, formState, formErrors, isDirty, formFields, validateAll, setValue, setValues, clearForm } = useUCForm ('Customer')
    
    const customValidator = (e, fs) => {
       let result = ''
        Object.keys(fs).forEach(fieldName => {
            if (fieldName !== e.target.name) {
                if (fs[fieldName]) {
                    result = 'Du kan ikke lagre denne posten, id er endret etter posten ble hentet. '
                }                    
            }
        })
     
        return result
    }

    const fetchById = id => dispatch(fetchCustomer(props.customerId)) 
    const saveCustomer = () => validateAll() 
    const deleteCustomer = () => { }

    // Kjøres hver gang props endres
    useEffect(() => {
        dispatch(fetchCustomer(props.customerId))
    }, [props])

    // Kjøres hver gang state endres for å laste verdier inn i form
    useEffect(() => {        
        if (customerDetails.customer) {
            setValues({
                id: customerDetails.customer.id,
                company: customerDetails.customer.name,
                ceo: customerDetails.customer.ceo,
                numemp: customerDetails.customer.numemp,
                revenue: customerDetails.customer.revenue
            })            
        } else {
            setValues({
                id: '',
                company: '',
                ceo: '',
                numemp: '',
                revenue: ''
            })
        }            
    }, [customerDetails.customer])

    const debugInfo = () => {
        if (process.env.NODE_ENV == 'development') {
            return (
                <>
                    <br />
                    <br />
                    Isdirty:<br />
                    {isDirty ? 'J' : 'N'}<br /><br />
            
                    formState<br />
                    {JSON.stringify(formState)}<br /><br />

                    Errors<br />
                    {JSON.stringify(formErrors)}<br /><br />
            
                    Formfields:<br />
                    {JSON.stringify(formFields)}<br /><br />
                </>
            )
        }
    }
           
                
    if (customerDetails.loading)
        return (<div>loading data</div>)
    else if (customerDetails.error)
        return (<div>something bad has happened: {customerDetails.error}</div>)
    else return (
        <div>
            <div>
                <span style={spanStyle} >Id</span>
                <input {...register('id', { datatype: 'int', isId: true, 'validatorFunc': customValidator })} />
                <span style={errorStyle} >{formErrors.id}</span>
            </div>

            <div>
                <span style={spanStyle} >Company</span>
                <input {...register('company', { required: true, max: 20, min: 2 })}  size= "50" />                
                <span style={errorStyle} >{formErrors.company}</span>                
            </div>

            <div>
                <span style={spanStyle} >CEO</span>
                <input {...register('ceo')}  size= "40" />
                <span style={errorStyle} >{formErrors.ceo}</span>
            </div>

            <div>
                <span style={spanStyle} >Number of employees</span>
                <input {...register('numemp', { required: true, datatype: 'int'})} />
                <span style={errorStyle} >{formErrors.numemp}</span>
            </div>

            <div>
                <span style={spanStyle} >Revenue</span>
                <input {...register('revenue', { required: true, datatype: 'decimal' })} />
                <span style={errorStyle} >{formErrors.revenue}</span>
            </div>

            <div>Her kan vi jo liste info om hva har skjedd</div>
            <div>
                <button name="get" onClick={() => fetchById(formState.id)}>Get customer</button>&nbsp;
                <button name="clearForm" onClick={() => clearForm()}>Clear fields</button>&nbsp;
                <button name="save" disabled={!isDirty} onClick={() => validateAll()}>Save</button>&nbsp;
                <button name="delete" disabled={!isDirty}>Delete</button>&nbsp;
            </div>

            
            {debugInfo()}

           
        </div>
    )

}