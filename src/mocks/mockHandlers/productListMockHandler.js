import { rest } from 'msw'
import { createFakeProductsArray } from '../fakeDataGenerators/fakeDataGenerator'

let fakeProducts = null
const getFakeProducts = () => {
    if (!fakeProducts) {
        fakeProducts = createFakeProductsArray() 
    }
    return fakeProducts
}

export const productsListMockHandlers = [

    rest.get('/productlist', (req, res, ctx) => {
        return res(
            ctx.json(getFakeProducts())
        )
    })
]