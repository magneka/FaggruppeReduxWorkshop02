import { rest } from 'msw'
import { createFakeCustomersArray } from '../fakeDataGenerators/fakeDataGenerator'

// Vi lager en global array som faker en database
let fakeCustomers = null
if (!fakeCustomers) {
    fakeCustomers = createFakeCustomersArray() 
}


const getFakeCustomerById = (id) => {
   
    if (!isNaN(id)) {
        let intId = parseInt(id)
        let currcustomer = fakeCustomers.find(e => {
            console.log(e)
            return e.id === intId
        })
        if (currcustomer) {
            return currcustomer            
        }
        return null
    }
    return null
    
}

export const customersListMockHandlers = [

    rest.get('/customerlist', (req, res, ctx) => {
        return res(
            ctx.json(fakeCustomers)
        )
    }),

    rest.get('/customerlistX', (req, res, ctx) => {
        return res(
            ctx.status(400),
            ctx.json({
                errorMessage: `Not found`,
            }),
        )
    }),

    // Handling GET requests
    rest.get('/customer/:id', (req, res, ctx) => {
        
        const { id } = req.params
        const cust = getFakeCustomerById(id)
               
        if (cust) {
            return res(
                ctx.json({ ...cust })
            )
        } else {
            return res(
                ctx.status(404),
                ctx.json({
                    errorMessage: `Customer not found`,
                }),
            )
        }   
    }),

    
]