import { useEffect, useState } from "react"

function isInt(value) {
    var x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

function isDecimal(value) {    
    return isNaN(value);
}

export const useUCForm = (formName) => {
    
    /*
    ┌──────────────────────────────────────────────────────────────────────────────┐
    │ Statehåndtering i form                                                       │
    │ TODO: FLYTT STATE TIL REDUX                                                  │
    │ TODO: KAN VI BRUKE EN REDUCER TIL FLERE FORMS?                               │
    └──────────────────────────────────────────────────────────────────────────────┘
    */
    
    const USE_LOCALSTATE = true

    let _formName = formName
    
    // Vi må ha state for feltene 
    const [formState, setFormState] = useState({})  
    const [formFields, setFormFields] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [isDirty, setIsDirty] = useState(false)

    const [formMessage, setFormMessage] = useState('')
    const [formErrorMessage, setFormErrorMessage] = useState('')

    
    let register = (fieldName, fieldProps) => {
        
        // Registrer feltet 
        if (!formFields.hasOwnProperty(fieldName)) {
            console.log('Register ', fieldName)
            
            if (USE_LOCALSTATE) {
                setFormFields(prevstate => ({ ...prevstate, [fieldName]: { ...fieldProps } }))
            }           
                   
        }
        
        // Lag til objekt med properties til input feltet
        const inputProps = {}
        inputProps['data-testid'] = fieldName
        inputProps.id = fieldName
        inputProps.name = fieldName        
        
        // Returner nye properties, og håndter verdier i input feltet
        return {
            ...inputProps,
            value: formState[fieldName] ? formState[fieldName] : '',
            onChange,
            style: showBorder(fieldName)
        }
    }
    
    // TODO dispatch verdi til REDUX
    const onChange = (e) => {
        setIsDirty(true)
        
        console.log('onChange ', e.target.name, '=', e.target.value)

        if (USE_LOCALSTATE) {            
            setFormState({ ...formState, [e.target.name]: e.target.value })
        }       

        onValidate(e)
    }
    
    // TODO dispatch verdi til REDUX
    const setValue = (fieldName, value) => {                         
        setFormState(prevstate => ({ ...prevstate, [fieldName]: value.toString() })) 
    }

    const setValues = (valObj) => {
        Object.keys(valObj).forEach(fieldName => setValue(fieldName, valObj[fieldName]))
    }
    
    const clearForm = () => {

        setIsDirty(false)
        // Ikke vis feilmeldinger
        setFormErrors({})
        
        // Nullstill alle feltene
        Object.keys(formFields).forEach(e => {
            setValue(e, '')
        })
    }
    
    const showBorder = (fieldName) => formErrors[fieldName] ? { border: '2px solid red'} : {}


    /*
    ┌──────────────────────────────────────────────────────────────────────────────┐
    │ Feilhåndtering i form                                                        │
    │ TODO: Hva med å godta en custom valideringsfunksjon fra formen               │
    └──────────────────────────────────────────────────────────────────────────────┘
    */

    const getMaxError = maxlen => `Feltet er lengre enn ${maxlen} tegn. `
    const getMinError = minlen => `Feltet må inneholde minst ${minlen} tegn. `
    const getReqError = () => `Feltet må fylles ut. `
    const getIntError = () => `Feltet må inneholde heltall. `
    const getDecimalError = () => `Feltet må inneholde tall med desimaler. `

    const onValidate = (e) => {

        // Hent feltinfo
        let formfield = ""
        
        formfield = formFields[e.target.name]               // useState
       

        // Skip validering om ingen info
        if (!formfield)
            return

        // Tøm feilmeldinger for feltet
        //setFormErrors(prevstate => ({ ...prevstate, [e.target.name]: '' }))
        let errmess = ''

        if (formfield.hasOwnProperty('required') && (e.target.value.trim().length === 0)) {
            errmess = errmess + getReqError()
        }

        if (e.target.value.length > 0) {
                 
            if (formfield.hasOwnProperty('max') && (e.target.value.trim().length > formfield.max)) {
                errmess = errmess + getMaxError(formfield.max)
            }
            
            if (formfield.hasOwnProperty('min') && (e.target.value.trim().length < formfield.min)) {
                errmess = errmess + getMinError(formfield.min)
            }
            
            if (formfield.hasOwnProperty('datatype') && (formfield.datatype === 'int') && (!isInt(e.target.value.trim()))) {
                errmess = errmess + getIntError()
            }
            
            if (formfield.hasOwnProperty('datatype') && (formfield.datatype === 'decimal') && (isDecimal(e.target.value.trim()))) {
                errmess = errmess + getDecimalError()
            }
                
            if (formfield.validatorFunc !== undefined) {
                errmess = errmess + formfield.validatorFunc(e, formState, isDirty)
            }
        }
        
        setFormErrors(prevstate => ({ ...prevstate, [e.target.name]: errmess }))       
    }

    const validateAll = () => {
        // Iterere alle felter
        Object.keys(formFields).forEach(e => {
            console.log(`key=${e}  value=${formFields[e]}`)
            console.log(formState[e])
            const fld = {
                target: {
                    name: e,
                    value: formState[e] ? formState[e] : ''
                }
            }
            onValidate(fld)
        });
    }
       

    return { register, formState, formErrors, isDirty, formFields, validateAll, setValue, setValues, clearForm }
}