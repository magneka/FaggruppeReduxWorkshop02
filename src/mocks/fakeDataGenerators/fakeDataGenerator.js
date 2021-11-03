import faker from 'faker'
import { add } from 'rambda'

const NUMPRODUCTS = 20
const NUMCUSTOMERS = 20

export const createFakeProductsArray = () => {
    
    const prodArr = []
    for (let index = 0; index < NUMPRODUCTS; index++) {        
        let productName = faker.commerce.productName()
        let color = faker.commerce.color()
        let price = faker.datatype.number({ min: 10, max: 500, precision: 0.01 })
        let searchField =`${productName.toUpperCase()}|${color.toUpperCase()}|${price}|`
        prodArr.push({
            id: index,
            productName: productName,
            color: color,
            price: price,
            searchField: searchField
        })
    }
    return prodArr
}


export const createFakeCustomersArray = () => {
    
    const custArr = []
    for (let index = 0; index < NUMCUSTOMERS; index++) {        
        let name = faker.company.companyName()
        let ceo = faker.name.findName()
        let address = faker.address.streetAddress()
        let zip = faker.address.zipCode()
        let postal = faker.address.cityName()
        let numemp = faker.datatype.number({ min: 5, max: 100 })
        let revenue = faker.datatype.number({ min: 1000000, max: 5000000, precision: 0.01 })
        let searchField =`${name.toUpperCase()}|${ceo.toUpperCase()}|${address.toUpperCase()}|${zip.toUpperCase()}|${postal.toUpperCase()}|${numemp}||${revenue}`
        custArr.push({
            id: index,
            name: name,
            ceo: ceo,
            address: address,
            zip: zip,
            postal: postal,
            numemp: numemp,
            revenue: revenue,
            searchField: searchField
        })
    }
    return custArr
}